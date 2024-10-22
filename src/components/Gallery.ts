import {IMainView, ICardView} from '../types/index';
import {Component} from './base/Component';
import {CardView} from './CardView';
import {IEvents} from './base/events';

export class Gallery extends Component<IMainView> {
protected _gallery: HTMLElement;
constructor(protected container:HTMLElement, protected events: IEvents) {
  super(container)
  this._gallery = container.querySelector('.gallery');
}
set gallery(items: HTMLElement[]) {
  console.log('я где-то тут')
  this._gallery.replaceChildren(... items)
}
}