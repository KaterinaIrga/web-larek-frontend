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
export type Payment = 'card' | 'cash';
export type CardType = 'minimalCard' | 'mediumCard' | 'standartCard';

export interface IOrderModel {
	address: string;
	payment: Payment;
	email: string;
	phone: string;
}

export interface IOrderResponse extends IOrderModel {
	total: number;
	items: string[];
}
