import { FormView } from "./common/FormView";
import { IOrderModel } from "../types";
import {IEvents} from './base/events';

export class FormContacts  extends FormView<Pick<IOrderModel, 'email' | 'phone' >>{

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
  }
  set email (value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value
  }
  set phone (value: string) {
    (this.container.elements.namedItem('phone') as HTMLInputElement).value = value
  }
 }
