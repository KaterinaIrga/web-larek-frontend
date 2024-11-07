import { IEvents } from './events';

export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}
	// если модель поменялась - оповещаем
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
