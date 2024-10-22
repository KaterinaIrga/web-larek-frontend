import {Component} from '../base/Component';
import {IFormFields, IForm} from '../../types/index';
import {IEvents} from '../base/events';

export class FormView<T> extends Component<IForm> {
  protected _submit: HTMLButtonElement;
  protected _errors: HTMLElement;
  //protected _formFields: IFormFields;

  constructor(protected container: HTMLFormElement, protected events: IEvents) {    
  super(container as HTMLFormElement);
  this._submit = this.container.querySelector('.button[type=submit]');
  this._errors = this.container.querySelector('.form__errors');

  this.container.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    this.events.emit(`${this.container.name}:submit`)
  })
  };
  setPlaceholder(element: HTMLElement, value: string) {};
  onInputChange(field: keyof T, value: string){}
  getValue(element: HTMLElement)  {};
  clear(field?: HTMLInputElement) {};
}

