import { IGood } from '../types/index';
import { Model } from './base/Model';
import { IEvents } from './base/events';

export class BasketModel extends Model<IGood> {
	protected itemsList: Set<IGood>;
	constructor(data: Partial<IGood>, protected events: IEvents) {
		super(data, events);
		this.itemsList = new Set();
	}
	addGood(good: IGood): void {
		this.itemsList.add(good);
	}
	removeGood(good: IGood): Set<IGood> {
		this.itemsList.delete(good);
		return this.itemsList;
	}
	getBasket(): IGood[] {
		const result: IGood[] = [];
		this.itemsList.forEach((value) => {
			result.push(value);
		});
		return result;
	}
	clearBasket(): void {
		this.itemsList.clear();
		//this.events.emit()
	}
	isGoodInBasket(good: IGood): boolean {
		return this.itemsList.has(good);
	}
	getBasketSumm(): number {
		let summ: number = 0;
		this.itemsList.forEach((value) => {
			summ += value.price ? value.price : 0;
			return summ;
		});
		return summ;
	}
	getBasketCount(): number {
		return this.itemsList.size;
	}
	getBasketGoods(): string[] {
		let result: string[] = [];

		for (let item of this.itemsList) {
			result.push(item.id);
		}
		return result;
	}
}
