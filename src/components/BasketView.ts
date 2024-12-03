import { Component } from './base/Component';
import { IEvents } from './base/events';
import { ensureElement, createElement } from '../utils/utils';

interface IBasket {
	content: HTMLElement[];
	price: HTMLElement;
}

export class BasketView extends Component<IBasket> {
	protected _title: HTMLTitleElement;
	protected _list: HTMLUListElement;
	protected _button: HTMLButtonElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._title = ensureElement<HTMLTitleElement>(
			'.modal__title',
			this.container
		);
		this._button = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container
		);
		this._list = ensureElement<HTMLUListElement>(
			'.basket__list',
			this.container
		);
		this._price = ensureElement<HTMLUListElement>(
			'.basket__price',
			this.container
		);

		this._button.addEventListener('click', () => {
			events.emit('basket:submit');
		});
	}
	set content(items: HTMLLIElement[]) {
		if (items.length === 0) {
			const plug = createElement<HTMLLIElement>('p');
			plug.textContent = 'Корзина пуста';
			items.push(plug);
		}
		this._list.replaceChildren(...items);
	}
	set price(value: number) {
		this._price.textContent = value + ' синапсов';
	}
	set title(value: string) {
		this.setTextContent(this._title, value);
	}
	set button(value: string) {
		this._button = this.container.querySelector('.basket__button');
		this.setTextContent(this._button, value);
	}

	lockBasketButton(value: boolean) {
		this._button.disabled = value;
	}
}
