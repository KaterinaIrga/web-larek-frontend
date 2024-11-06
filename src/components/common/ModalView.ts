import {Component} from '../base/Component';
import { IModalView } from '../../types/index';
import {IEvents} from '../base/events';


export class ModalView extends Component<IModalView> {
  protected _content: HTMLElement;
  protected _exitButton: HTMLButtonElement;
   constructor(protected container: HTMLElement, protected events: IEvents) {
     super(container); 

     this._content = container.querySelector('.modal__container')
     this._exitButton = container.querySelector('.modal__close')

  

     this._exitButton.addEventListener('click', this.close.bind(this));
     this._content.addEventListener('click', (e)=>{e.stopPropagation()})
     this.container.addEventListener('click', this.close.bind(this))

   };

  /* set title (content: HTMLTitleElement) {
    this._title = content;

  } */

  set content (content: HTMLElement) {
    this._content.replaceChildren(content);
  }

/*   set exitButton (content: HTMLButtonElement) {
    this._exitButton = content;
  } */

  open(/* element: HTMLElement */){//нет параметров
    this.container.classList.add('modal_active');
    this.events.emit('modal:open')
  }; 
  close(/* element: HTMLElement */){//нет параметров
    this.container.classList.remove('modal_active');
    this.content = null;
    this.events.emit('modal:close')
  };
/*   render(data: IModalView): HTMLElement {
    return this.container;
  }; */
}
