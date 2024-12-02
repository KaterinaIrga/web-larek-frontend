import { IGood } from '../types/index';
import { Component } from './base/Component';
import { IEvents } from './base/events';

export interface IGallery {
	gallery: IGood[];
} 

export class Gallery extends Component<IGallery> {
	protected _gallery: HTMLElement;
	constructor(protected container: HTMLElement, protected events: IEvents) {
		super(container);
		this._gallery = container.querySelector('.gallery');
	}
	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items);
	}
}
