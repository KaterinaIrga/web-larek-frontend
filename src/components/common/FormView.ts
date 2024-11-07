import { Component } from '../base/Component';
import { IFormFields, IForm } from '../../types/index';
import { IEvents } from '../base/events';

export interface IFormActions {
	onClick: (event: MouseEvent) => void;
}

export interface IFormState {
	valid: boolean;
	errors: string[];
}

export class FormView<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container as HTMLFormElement);
		this._submit = this.container.querySelector('.button[type=submit]');
		this._errors = this.container.querySelector('.form__errors');

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(String(field), value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}
	set valid(value: boolean) {
		this._submit.disabled = !value;
	}
	set errors(value: string) {
		this.setTextContent(this._errors, value);
	}
	setPlaceholder(inputName: string, value: string) {
		const input = this.container[inputName];
		input.placeholder = value;
	}
	onInputChange(field: string, value: string) {
		this.events.emit(`${this.container.name}.${field}:change`, {
			field,
			value,
		});
	}
	clear() {
		this.container.reset();
	}
	render(data: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = data;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}
