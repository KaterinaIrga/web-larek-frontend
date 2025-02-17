import { Gallery } from './Gallery';
import { IEvents } from './base/events';
import { Component } from './base/Component';
import { ensureElement } from '../utils/utils';

interface IPage {
	header: HTMLElement;
	gallery: Gallery;
	locked: boolean;
}

//это класс page__wrapper
export class Page extends Component<IPage> {
	protected _gallery: HTMLElement;
	protected _basketButton: HTMLButtonElement;
	protected _counter: HTMLElement;
	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._basketButton = ensureElement<HTMLButtonElement>(
			'.header__basket',
			container
		);
		this._counter = ensureElement<HTMLElement>(
			'.header__basket-counter',
			container
		);
		this._gallery = ensureElement<HTMLElement>('.gallery', container);

		this._basketButton.addEventListener('click', () => {
			events.emit('basket:open');
		});
	}
	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}
	set counter(value: string) {
		this._counter.textContent = value;
	}
	set locked(value: boolean) {
		if (value) {
			this.container.classList.add('page__wrapper_locked');
		} else {
			this.container.classList.remove('page__wrapper_locked');
		}
	}
}
