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

		if (this.CheckData(field)) {
			if (['payment', 'address'].some(item => item === field)) {
				this.events.emit('order:isOk', this);
			} else 
			{
				this.events.emit('contacts:isOk', this);
			}
			
		}
	}
	CheckData(field: keyof IOrderModel): boolean {
		const errors: FormErrors = {};
	  if (['payment', 'address'].some(item => item === field)) {
			if (!this.payment) {
				errors.payment = 'Необходимо указать способ оплаты';
			}
			if (!this.address) {
				errors.address = 'Необходимо указать адрес';
			}
		} else {
			if (!this.email) {
				errors.email = 'Необходимо указать email';
			}
			
			if (!this.phone) {
				errors.phone = 'Необходимо указать телефон';
			}
		}
		
		this.events.emit('formErrors:change', errors);
		return Object.keys(errors).length === 0;
	}

	clear(){
		this.payment = null;
		this.address = '';
		this.email = '';
		this.phone = '';
	}
	
}
