import { IGood } from '../types/index';

export class GoodModel {
  protected itemsList: IGood[] = [];
  constructor() {};
  getItem(id: Partial<IGood>):IGood {
    //ToDo: Здесь какая-то фигня накручена с объектом и массивом его значений
    return this.itemsList.find(item => item.id === Object.values(id)[0])
  };

  getItemById(id: string) : IGood {
    return this.itemsList.find(item => item.id === id)
  }

  addItem(data: IGood): void{
  this.itemsList.push(data);
  }

  fillGoodList(data: IGood[] ):void {
    this.itemsList = data;
  };
  getGoodList():IGood[] {
    return this.itemsList
  };
}