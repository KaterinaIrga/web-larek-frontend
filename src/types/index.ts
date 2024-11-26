export interface IGood {
	id: string;
	image: string;
	category: GoodCategory;
	title: string;
	description: string;
	price: Price;
}
export type GoodCategory =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

type Price = number | null;
export type PayType = 'card' | 'cash';
export type CardType = 'minimalCard' | 'mediumCard' | 'standartCard';

export interface IModalView {
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

export interface IGallery {
	gallery: IGood[];
}

export interface IForm {
	hendlerFunction: Function;
	buttonText: string;
	submit: HTMLButtonElement;
	setPlaceholder(element: HTMLInputElement, value: string): void;
	getValue(element: HTMLElement): void;
	clear(): void;
}

export interface IFormFields {
	address: HTMLInputElement;
	payOnline: HTMLButtonElement;
	payOnReceipt: HTMLButtonElement;
	email: HTMLInputElement;
	phone: HTMLInputElement;
}

export interface IOrderModel {
	address: string;
	payType: PayType;
	email: string;
	phone: string;
}

export interface IOrderResponse extends IOrderModel
 {
	total: number;
	/* items: IOrderModel; */
}

export interface ICardView {
	title: HTMLTitleElement;
	image: HTMLImageElement;
	category: HTMLElement;
	description: HTMLElement;
	price: HTMLElement;
}


export interface IBasketView {
	goodCards: Set<ICardView>;
	summ: HTMLElement;
	buttonRegister: HTMLButtonElement;
	registerFunction: Function;
	title: HTMLTitleElement;
}

export interface IBasketButton {
	basketButton: HTMLButtonElement;
	counter: HTMLElement;
}
