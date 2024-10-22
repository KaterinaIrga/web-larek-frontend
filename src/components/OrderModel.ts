import { IOrderModel, PayType } from '../types/index';
export class OrderModel implements IOrderModel{
  private _address: string;
  private _payType: PayType;
  private _email: string;//добавить шаблон
  private _telephone: string; //добавить шаблон
  private _summ: number;
  constructor() {
  }
   set address(value: string) {};
   set email(value: string) {};
   set telephone(value: string) {};
   set payType(value: PayType) {};
   set summ(value: number) {};
   CheckData():boolean {return false}; 
   Clear(){};

}