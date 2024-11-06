import { IGood } from '../types/index';
import { Model } from './base/Model';
import { GoodModel } from './GoodModel';
import { IEvents } from './base/events';

export class BasketModel extends Model<IGood> {
  protected itemsList: Set<IGood> ;
  constructor(data: Partial<IGood>, protected events: IEvents) {
    super(data, events)
    this.itemsList = new Set()
  };
  addGood(good: IGood): void {
    this.itemsList.add(good)
  };

  removeGood(good: IGood): Set<IGood> {
    this.itemsList.delete(good)
    return this.itemsList/* .filter(item => item.id !== id) */
  };

  refreshGoodList() {}

  getBasket(): IGood[] {
    const result: IGood[]= [];
    this.itemsList.forEach(value => {result.push(value)});
    return result;
  };

  clearBasket():void {
    this.itemsList.clear()
  };

/*   isGoodInBasket(id: IGood['id']): boolean {
    return this.itemsList.some(row => row.id === id)
  } */

  isGoodInBasket(good: IGood): boolean {
    return this.itemsList.has(good)
  }


  getBasketSumm(): number {
    let summ: number = 0;
this.itemsList.forEach(value => {
  summ += value.price ? value.price : 0; 
  return summ })
  return summ 
  }

  getBasketCount(): number {
    return this.itemsList.size
  }
}