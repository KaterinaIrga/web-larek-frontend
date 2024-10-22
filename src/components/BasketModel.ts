import { IGood } from '../types/index';
import { GoodModel } from './GoodModel';

export class BasketModel {
  protected itemsList: Set<IGood>;
  constructor() {};
  addGood(good: IGood): void {
    this.itemsList.add(good)
  };

 /*  addGoodById(id: string): void {
     this.itemsList.push()
   }; */

  removeGood(id: IGood['id']): Set<IGood> {
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
    this.itemsList.forEach(value => {summ + value.price});
    return summ
    /* return this.itemsList.reduce((summ, item) => {return item.price + summ}, 0) */
  }

  getBasketCount(): number {return 22}
}