export interface IGood {
  id: string;
  image: string;
  category: GoodCategory;
  title: string;
  description: string;
  price: Price;
}
export type GoodCategory = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";

type Price = number | null;
export type PayType = "Онлайн" | "При получении"

export interface IModalView {
  title: HTMLTitleElement;
  content: HTMLElement;
  exitButton: HTMLButtonElement;
}

export interface IForm {
  hendlerFunction: Function;
  buttonText: string;
  submit: HTMLButtonElement;
  setPlaceholder(element: HTMLInputElement, value: string): void  ;
  setHendler(element: HTMLElement, event:Event, hendlerFunction: Function): void;
  getValue(element: HTMLElement): void   ;
  clear(): void ;
}


export interface IFormFields {
  address: HTMLInputElement;
  payType: HTMLSelectElement;
  email: HTMLInputElement;
  telephone: HTMLInputElement; 
}
/* 
export interface IOrderView {
  content: HTMLElement;
} */

export interface IOrderModel {
  idOrder: number;
  address: string;
  payType: PayType;
  email: string;//добавить шаблон
  telephone: string; //добавить шаблон
  summ: number;
}

export interface ICardView {
  title: HTMLTitleElement;
  image: HTMLImageElement;
  category: HTMLElement;
  description: HTMLElement;
  price: HTMLElement;

}

export interface IOrderSucsessView {
  image: HTMLImageElement;
  title: HTMLElement;
  summ: HTMLElement;
}

interface IKioiskAPI {

}
export interface IBusketItemView extends ICardView{
  deleteItem(elem: HTMLElement): void ;
  showGoodCard(elem: HTMLElement): HTMLElement ;
}

export interface IBusketView {
  //goodCards: Map<number, Partial<IGood>>;
  goodCards: Map<number, IBusketItemView>;
  summ: HTMLElement;
  buttonRegister: HTMLButtonElement;
  registerFunction: Function;
  title: HTMLTitleElement;
}

export interface IBusketButton {
  busketButton: HTMLButtonElement;
  counter: HTMLElement;
}

// class BusketButton implements IBusketButton {
//   updateCounter(value: number) {}
// }


