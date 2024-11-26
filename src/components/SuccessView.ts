import { Component } from "./base/Component";
import { IEvents } from './base/events';
import { ensureElement } from "../utils/utils";

interface ISuccess {
  summ: number;
}


export class SuccessView extends Component<ISuccess> {
  protected _title: HTMLElement;
  protected _result: HTMLElement;
  protected _buttonClose: HTMLButtonElement;
  constructor(protected container: HTMLElement, protected events: IEvents){
    super(container);
    this._title = ensureElement<HTMLElement>('.order-success__title', container);
    this._result = ensureElement<HTMLElement>('.order-success__description', container);
    this._buttonClose = ensureElement<HTMLButtonElement>('.order-success__close', container);

    this._buttonClose.addEventListener('click', () => {
      this.events.emit('modal:close');
    })
  }
  set result (value: number) {
    this.setTextContent(this._result, `Списано ${value} синапсов`);
  }
}