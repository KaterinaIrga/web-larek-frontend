import { IGood } from '../types/index';
import { Model } from './base/Model';

export class GoodModel extends Model<IGood> {
	protected _itemsList: IGood[] = [];

	getItem(id: string): IGood {
		return this._itemsList.find((item) => item.id === id);
	}
	addItem(data: IGood): void {
		this._itemsList.push(data);
	}
	fillGoodList(data: IGood[]): void {
		this._itemsList = data;
		this.emitChanges('goodModel:changed', { data: this._itemsList });
	}
	getGoodList(): IGood[] {
		return this._itemsList;
	}
}
