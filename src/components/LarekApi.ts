import { Api, ApiListResponse } from './base/api';
import { IGood, IOrderModel, IOrderResponse } from '../types';

interface ILarekApi {
	//getGoodById(id: string): Promise<IGood>
	getGoodList(): Promise<IGood[]>;
}

export class LarekApi extends Api  implements ILarekApi {
	constructor(readonly cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options)
	}
	/* 
  getGoodById(id: string): Promise<IGood> {
    return this._api.get(`card/${id}`)
      .then((item) => ({...item}))
  } */

	getGoodList(): Promise<IGood[]> {
		return this
			.get('/product')
			.then((data: ApiListResponse<IGood>) =>
				data.items.map((item) => ({ ...item, image: this.cdn + item.image }))
			);
	}

	sendOrder(data:/*  IOrderModel & */ IOrderResponse){
		return this
		  .post('/order', data)
			.then((data : IOrderResponse ) => data)
	}
}
