import { IOrderModel, PayType } from '../types/index';
import { Model } from './base/Model';

export type FormErrors = Partial<Record<keyof OrderModel, string>>;

export class OrderModel extends Model<IOrderModel> {
	private _address?: string;
	private _payType?: PayType;
	private _email?: string;
	private _telephone?: string;

	set address(value: string) {
		this._address = value;
	}
	set email(value: string) {
		this._email = value;
	}
	set telephone(value: string) {
		this._telephone = value;
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
	get telephone() {
		return this._telephone;
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
			}
			case 'email': {
				this.email = value;
			}
			case 'payType': {
				this.payType = value as PayType;
			}
			case 'telephone': {
				this.telephone = value;
			}
		}

		if (this.CheckData()) {
			this.events.emit('order:isOk', this);
		}
	}
	CheckData(): boolean {
		const errors: FormErrors = {};
		if (!this.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.address) {
			errors.address = 'Необходимо указать адрес';
		}
		if (!this.telephone) {
			errors.telephone = 'Необходимо указать телефон';
		}
		this.events.emit('formErrors:change', errors);
		return Object.keys(errors).length === 0;
	}
	//Clear() {}
}
