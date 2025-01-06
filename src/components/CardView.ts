import { Component } from './base/Component';
import { CardType, IGood } from '../types/index';

interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class CardView extends Component<IGood> {
	protected _title: HTMLTitleElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _description: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton?: HTMLButtonElement;
	protected _basketButton?: HTMLButtonElement;
	protected _index?: HTMLElement;

	toggleLockBasketButton() {
		this._basketButton.disabled = !this._basketButton.disabled;
	}
	constructor(
		container: HTMLElement,
		cardType: CardType,
		protected actions: ICardActions
	) {
		super(container);
		switch (cardType) {
			case 'minimalCard': {
				this._index = container.querySelector('.basket__item-index');
				this._deleteButton = container.querySelector('.basket__item-delete');
				if (actions.onClick) {
					this._deleteButton.addEventListener('click', actions.onClick);
				}
				break;
			}
			case 'mediumCard': {
				this._image = container.querySelector('.card__image');
				this._category = container.querySelector('.card__category');
				this._description = container.querySelector('.card__text');
				if (actions.onClick) {
					this.container.addEventListener('click', actions.onClick);
				}
				break;
			}
			case 'standartCard': {
				this._image = container.querySelector('.card__image');
				this._category = container.querySelector('.card__category');
				this._description = container.querySelector('.card__text');
				this._basketButton = container.querySelector('.button');

				if (actions.onClick) {
					this._basketButton.addEventListener('click', actions.onClick);
				}
				break;
			}
		}
		this._title = container.querySelector('.card__title');
		this._price = container.querySelector('.card__price');
	}
	set title(value: string) {
		this.setTextContent(this._title, value);
	}
	get title() {
		return this._title.textContent;
	}
	set index(value: string) {
		this.setTextContent(this._index, value);
	}
	get index() {
		return this._index.textContent;
	}
	set image(src: string) {
		this.setImage(this._image, src, this.title);
	}
	set category(value: string) {
		this.setTextContent(this._category, value);
		switch (value) {
			case 'софт-скил': {
				this.setClassName(this._category, 'card__category_soft');
				break;
			}
			case 'другое': {
				this.setClassName(this._category, 'card__category_other');
				this.removeClassName(this._category, 'card__category_soft');
				break;
			}
			case 'дополнительное': {
				this.setClassName(this._category, 'card__category_additional');
				this.removeClassName(this._category, 'card__category_soft');
				break;
			}
			case 'кнопка': {
				this.setClassName(this._category, 'card__category_button');
				this.removeClassName(this._category, 'card__category_soft');
				break;
			}
			case 'хард-скил': {
				this.setClassName(this._category, 'card__category_hard');
				this.removeClassName(this._category, 'card__category_soft');

				break;
			}
		}
	}
	set description(value: string) {
		this.setTextContent(this._description, value);
	}
	set price(value: string) {
		if (value) {
			this.setTextContent(this._price, value + ' синапсов');
		} else {
			this.setTextContent(this._price, 'бесценно');
		}
	}
}
