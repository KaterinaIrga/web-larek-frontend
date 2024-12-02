import { Component } from '../base/Component';
import { IEvents } from '../base/events';

interface IModalView {
	content: HTMLElement;
	exitButton: HTMLButtonElement;
} 

export class ModalView extends Component<IModalView> {
	protected _content: HTMLElement;
	protected _exitButton: HTMLButtonElement;
	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);

		this._content = container.querySelector('.modal__container');
		this._exitButton = container.querySelector('.modal__close');

		this._exitButton.addEventListener('click', this.close.bind(this));
		this._content.addEventListener('click', (e) => {
			e.stopPropagation();
		});
		this.container.addEventListener('click', this.close.bind(this));
	}

	set content(content: HTMLElement) {
		this._content.replaceChildren(content);
	}
	open() {
		this.container.classList.add('modal_active');
		this.events.emit('modal:open');
	}
	close() {
		this.container.classList.remove('modal_active');
		this.content = null;
		this.events.emit('modal:close');
	}
}
