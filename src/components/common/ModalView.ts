import {Component} from '../base/Component';
import { IModalView } from '../../types/index';
import {IEvents} from '../base/events';

export class ModalView extends Component<IModalView> implements IModalView{
  protected _content: HTMLElement;
  //protected _title?: HTMLTitleElement;//?????? есть только у корзины
  protected _exitButton: HTMLButtonElement;
   constructor(protected container: /* IModal */HTMLElement, protected events: IEvents) {
     super(container); 
     this._content = container.querySelector('.modal__container')
     this._exitButton = container.querySelector('.modal__close')

   };

  /* set title (content: HTMLTitleElement) {
    this._title = content;

  } */

  set content (content: HTMLElement) {
    this._content.replaceChildren(content);
  }

  set exitButton (content: HTMLButtonElement) {
    this._exitButton = content;
  }

  open(/* element: HTMLElement */){//нет параметров
    console.log('Открыли модалку', this.container.classList)
    this.container.classList.add('modal__active');
  }; 
  close(/* element: HTMLElement */){//нет параметров
    console.log('Закрыли модалку', this.container.classList);
    this.container.classList.remove('modal__active');
  };
/*   render(data: IModalView): HTMLElement {
    return this.container;
  }; */
}
