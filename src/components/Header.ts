/* import {IHeaderView} from '../types/index';
import {Component} from './base/Component';
import {IEvents} from './base/events';

export class Header extends Component<IHeaderView>{
  protected _basketButton: HTMLButtonElement;
  protected _counter: HTMLElement;
  protected _logo: HTMLElement;
  protected _logoImg: HTMLElement;
  constructor(protected container:HTMLElement, protected events: IEvents) {
    super(container)
    this._basketButton = container.querySelector('.header__basket');
    this._counter = container.querySelector('.header__basket-counter');
    this._logo = container.querySelector('.header__logo');
    this._logoImg = container.querySelector('.header__logo-image');

    
    this._basketButton.addEventListener('click', () => {
      events.emit('basket:open')
    })
  }
  get counter() {
    return this._counter.textContent;
  }
  set counter(value: string) {
    this._counter.textContent = value;
  }
} */