import { Api, ApiListResponse } from './base/api';
import { IGood } from '../types';

interface ILarekApi {
	//getGoodById(id: string): Promise<IGood>
	getGoodList(): Promise<IGood[]>;
}

export class LarekApi implements ILarekApi {
	protected _api: Api;
	constructor(readonly cdn: string, baseUrl: string, options?: RequestInit) {
		this._api = new Api(baseUrl, options);
	}
	/* 
  getGoodById(id: string): Promise<IGood> {
    return this._api.get(`card/${id}`)
      .then((item) => ({...item}))
  } */

	getGoodList(): Promise<IGood[]> {
		return this._api
			.get('/product')
			.then((data: ApiListResponse<IGood>) =>
				data.items.map((item) => ({ ...item, image: this.cdn + item.image }))
			);
	}
}
