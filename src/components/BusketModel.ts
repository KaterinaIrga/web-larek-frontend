import { IGood } from '../types/index';
import { GoodModel } from './GoodModel';

export class BusketModel {
  protected itemsList: Set<IGood>;
  protected idOrder: number;
  constructor(idOrder:number) {};
  addGood(good: IGood): void {
    this.itemsList.add(good)
  };

 /*  addGoodById(id: string): void {
     this.itemsList.push()
   }; */

  removeGood(id: IGood['id']): IGood[] {
    return this.itemsList.filter(item => item.id !== id)
  };

  refreshGoodList() {}

  getBusket(): IGood[] {
    const result: IGood[]= [];
    this.itemsList.forEach(value => {result.push(value)});
    return result;
  };

  clearBusket():void {
    this.itemsList.clear()
  };

/*   isGoodInBusket(id: IGood['id']): boolean {
    return this.itemsList.some(row => row.id === id)
  } */

  isGoodInBusket(good: IGood): boolean {
    return this.itemsList.has(good)
  }


  getBusketSumm(): number {
    let summ: number = 0;
    this.itemsList.forEach(value => {summ + value.price});
    return summ
    /* return this.itemsList.reduce((summ, item) => {return item.price + summ}, 0) */
  }

  getBusketCount(): number {return 22}
}