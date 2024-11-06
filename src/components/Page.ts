
import {Gallery} from './Gallery';
import {IEvents} from './base/events';
import {Component} from './base/Component';
import { ModalView } from './common/ModalView';
import { ensureElement } from '../utils/utils';

interface IPage {
 header: HTMLElement;
 gallery: Gallery; 
 locked: boolean;
}

//это класс page__wrapper
export class Page extends Component<IPage> /* implements IPage  */{
  protected _gallery: HTMLElement;
  protected _basketButton: HTMLButtonElement;
  protected _counter: HTMLElement;
/*   protected _logo: HTMLElement;
  protected _logoImg: HTMLElement; */
  //protected _wrapper: HTMLElement;
  constructor (protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this._basketButton = ensureElement<HTMLButtonElement>('.header__basket', container);
    this._counter = ensureElement<HTMLElement>('.header__basket-counter', container);
/*     this._logo = container.querySelector('.header__logo');
    this._logoImg = container.querySelector('.header__logo-image'); */
    this._gallery = ensureElement<HTMLElement>('.gallery', container);
    //this._wrapper = ensureElement<HTMLElement>('.page__wrapper', container);

    this._basketButton.addEventListener('click', 
      () => {
        events.emit('basket:open');

      })

    /* console.log('this._gallery', this._gallery) */
  }

   set gallery(items: HTMLElement[]) {
    this._gallery.replaceChildren(...items);
  } 

  set counter(value: string) {
    this._counter.textContent = value;
  }

  set locked(value: boolean) {
    if (value) {
      this.container.classList.add('.page__wrapper_locked')
    }
    else {
      this.container.classList.remove('.page__wrapper_locked')
    }
  }

  /* get gallery() :Gallery {
    return this._gallery ;
  } */ 
/*   set gallery(item: HTMLElement) {
    this._gallery.replaceChild(item);
  } */

}