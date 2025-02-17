import { FormView } from './common/FormView';
import { IOrderModel } from '../types';
import { ensureElement } from '../utils/utils';
import { IEvents } from './base/events';

export class FormOrder extends FormView<
	Pick<IOrderModel, 'address' | 'payment'>
> {
	protected _buttonCash: HTMLButtonElement;
	protected _buttonCard: HTMLButtonElement;
	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._buttonCard = ensureElement<HTMLButtonElement>(
			'.button_alt[name=card]',
			container
		);
		this._buttonCash = ensureElement<HTMLButtonElement>(
			'.button_alt[name=cash]',
			container
		);
		this.valid = false;

		this._buttonCard.addEventListener('click', (e: Event) => {
			this.onInputChange('payment', 'card');
		});

		this._buttonCash.addEventListener('click', (e: Event) => {
			this.onInputChange('payment', 'cash');
		});
	}
	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
	set payment(value: string) {
		this._buttonCard.classList.toggle('button_alt-active', value === 'card');
		this._buttonCash.classList.toggle('button_alt-active', value === 'cash');
	}
}
