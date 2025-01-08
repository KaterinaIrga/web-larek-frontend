import { IOrderModel, Payment } from '../types/index';
import { Model } from './base/Model';

export type FormErrors = Partial<Record<keyof OrderModel, string>>;

export class OrderModel extends Model<IOrderModel> {
	public address?: string;
	public payment?: Payment;
	public email?: string;
	public phone?: string;

	setOrderField(field: keyof IOrderModel, value: string) {
		switch (
			field //реализация выбрана из-за невозможности динамического вызова метода класса
		) {
			case 'address': {
				this.address = value;
				break;
			}
			case 'email': {
				this.email = value;
				break;
			}
			case 'payment': {
				this.payment = value as Payment;
				break;
			}
			case 'phone': {
				this.phone = value;
			}
		}
		this.CheckData(field);
	}

	CheckData(field: keyof IOrderModel): boolean {
		const errors: FormErrors = {};

		if (!this.payment && field === 'payment') {
			errors.payment = 'Необходимо указать способ оплаты';
		}
		if (!this.address && field === 'address') {
			errors.address = 'Необходимо указать адрес';
		}

		if (!this.email && field === 'email') {
			errors.email = 'Необходимо указать email';
		}

		if (!this.phone && field === 'phone') {
			errors.phone = 'Необходимо указать телефон';
		}

		if (['payment', 'address'].some((item) => item === field)) {
			( Boolean(this.address) && Boolean(this.payment))
				? this.events.emit('order:isOk', this)
				:  this.events.emit('order:isNoOk', this);
		} else {
			( Boolean(this.email) && Boolean(this.phone))
				? this.events.emit('contacts:isOk', this)
				: this.events.emit('contacts:isNoOk', this);
		}

		this.events.emit('formErrors:change', errors);
		return Object.keys(errors).length === 0;
	}

	clear() {
		this.payment = null;
		this.address = '';
		this.email = '';
		this.phone = '';
	}
}
