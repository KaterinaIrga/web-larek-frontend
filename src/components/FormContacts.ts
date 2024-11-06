import { FormView } from "./common/FormView";
import { IOrderModel } from "../types";
import {IEvents} from './base/events';

export class FormContacts  extends FormView<Pick<IOrderModel, 'email' | 'telephone' >>{

  constructor(protected container: HTMLFormElement, protected events: IEvents) {
    super(container, events);
  }

  set email (value: string) {
    (this.container.elements.namedItem('email') as HTMLInputElement).value = value
  }

  set telephone (value: string) {
    (this.container.elements.namedItem('telephone') as HTMLInputElement).value = value
  }


 }
