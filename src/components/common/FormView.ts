import {Component} from '../base/Component';
import {IFormFields, IForm} from '../../types/index'

class FormView extends Component<IForm> {
  protected _submit: HTMLButtonElement;
  protected _formFields: IFormFields;

  constructor(templateElement: HTMLTemplateElement) {    
  super(templateElement.content.cloneNode(true) as HTMLFormElement);
  //this._submit = this.container.querySelector('.button[type=submit]')
  };
  setPlaceholder(element: HTMLElement, value: string) {};
  getValue(element: HTMLElement)  {};
  clear(field?: HTMLInputElement) {};
}

