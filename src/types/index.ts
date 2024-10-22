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
export type CardType = "minimalCard" | "mediumCard" | "standartCard";

export interface IModalView {
  //title: HTMLTitleElement;
  content: HTMLElement;
  exitButton: HTMLButtonElement;
}

export interface IHeaderView {
  logo: HTMLElement;
  basketButton: HTMLButtonElement;  
  counter: HTMLElement;
}

export interface IMainView { 
  gallery: HTMLElement;
}

export interface IForm {
  hendlerFunction: Function;
  buttonText: string;
  submit: HTMLButtonElement;
  setPlaceholder(element: HTMLInputElement, value: string): void  ;
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
  address: string;
  payType: PayType;
  email: string;//добавить шаблон
  telephone: string; //добавить шаблон
  summ: number;
}

export interface ICardView {//добавлять ли сюда поля для 3х типов карточки?
  title: HTMLTitleElement;
  image: HTMLImageElement;
  category: HTMLElement;
  description: HTMLElement;
  price: HTMLElement;

}

export interface IOrderSucsessView { // Наверно, тоже переделать на 1 карточку и case
  image: HTMLImageElement;
  title: HTMLElement;
  summ: HTMLElement;
}

export interface IBasketView {
  //goodCards: Map<number, Partial<IGood>>;
  goodCards: Map<number, ICardView>;
  summ: HTMLElement;
  buttonRegister: HTMLButtonElement;
  registerFunction: Function;
  title: HTMLTitleElement;
}

export interface IBasketButton {
  basketButton: HTMLButtonElement;
  counter: HTMLElement;
}

// class BasketButton implements IBasketButton {
//   updateCounter(value: number) {}
// }


