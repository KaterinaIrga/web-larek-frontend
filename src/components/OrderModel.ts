import { IOrderModel, PayType } from '../types/index';
import { Model } from './base/Model';

export type FormErrors = Partial<Record<keyof OrderModel, string>>;

export class OrderModel extends Model<IOrderModel> {
	private _address?: string;
	private _payType?: PayType;
	private _email?: string;
	private _phone?: string;

	set address(value: string) {
		this._address = value;
	}
	set email(value: string) {
		this._email = value;
	}
	set phone(value: string) {
		this._phone = value;
	}
	set payType(value: PayType) {
		this._payType = value;
	}
	get address() {
		return this._address;
	}
	get email() {
		return this._email;
	}
	get phone() {
		return this._phone;
	}
	get payType() {
		return this._payType;
	}
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
			case 'payType': {
				this.payType = value as PayType;
				break;
			}
			case 'phone': {
				this.phone = value;
			}
		}

		if (this.CheckData(field)) {
			if (['payType', 'address'].some(item => item === field)) {
				this.events.emit('order:isOk', this);
			} else 
			{
				this.events.emit('contacts:isOk', this);
			}
			
		}
	}
	CheckData(field: keyof IOrderModel): boolean {
		const errors: FormErrors = {};
	  if (['payType', 'address'].some(item => item === field)) {
			if (!this._payType) {
				errors.payType = 'Необходимо указать способ оплаты';
			}
			if (!this._address) {
				errors.address = 'Необходимо указать адрес';
			}
		} else {
			if (!this._email) {
				errors.email = 'Необходимо указать email';
			}
			
			if (!this._phone) {
				errors.phone = 'Необходимо указать телефон';
			}
		}
		
		this.events.emit('formErrors:change', errors);
		return Object.keys(errors).length === 0;
	}
	//Clear() {}
}
