import { Api, ApiListResponse } from './base/api';
import { IGood, IOrderModel, IOrderResponse } from '../types';

interface ILarekApi {
	//getGoodById(id: string): Promise<IGood>
	getGoodList(): Promise<IGood[]>;
}

export class LarekApi extends Api implements ILarekApi {
	constructor(readonly cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
	}

	getGoodList(): Promise<IGood[]> {
		return this.get('/product').then((data: ApiListResponse<IGood>) =>
			data.items.map((item: IGood) => ({ ...item, image: this.cdn + item.image }))
		);
	}

	sendOrder(data: IOrderResponse) {
		return this.post('/order', data).then((data: IOrderResponse) => data);
	}
}
