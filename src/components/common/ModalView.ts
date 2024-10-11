import {Component} from '../base/Component';
import { IModalView } from '../../types/index';

export class ModalView extends Component<IModalView> {
  protected _content: HTMLElement;
  protected _title: HTMLTitleElement;
  protected _exitButton: HTMLButtonElement;
  // constructor(protected container: IModal/* HTMLElement */, submitEvent: string) {
  //   super(container); 
  //   this._content = container.querySelector('.modal__container')
  // };

  set title(value: string) {
    this._title.textContent = value;
  }

  set content (content: HTMLElement) {
    this._content.replaceChildren(content);
  }

  open(/* element: HTMLElement */){//нет параметров
    console.log('Открыли модалку')
  }; 
  close(/* element: HTMLElement */){//нет параметров
    console.log('Закрыли модалку')
  };
/*   render(data: IModalView): HTMLElement {
    return this.container;
  }; */
}
