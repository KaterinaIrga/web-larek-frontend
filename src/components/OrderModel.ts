import { IOrderModel, PayType } from '../types/index';
export class OrderModel implements IOrderModel{
  private static _idOrder: number;
  private _address: string;
  private _payType: PayType;
  private _email: string;//добавить шаблон
  private _telephone: string; //добавить шаблон
  private _summ: number;
  constructor() {
    _idOrder = GenerateNewID()
  }
   set address(value: string) {};
   set email(value: string) {};
   set telephone(value: string) {};
   set payType(value: PayType) {};
   get idOrder(): number {};
   set summ(value: number) {};
   GenerateNewID(): number{};
   CheckData():boolean {};
   Clear(){};

}