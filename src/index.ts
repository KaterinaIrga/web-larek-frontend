import './scss/styles.scss';
import { GoodModel } from './components/GoodModel';
import { LarekApi } from './components/LarekApi';
import { BasketModel } from './components/BasketModel';
import { ModalView } from './components/common/ModalView';
import { CardView } from './components/CardView';
import { Page } from './components/Page';
import { IGood, IOrderModel, IOrderResponse } from './types';
import { IFormState } from './components/common/FormView';
import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate } from './utils/utils';
import { BasketView } from './components/BasketView';
import { FormOrder } from './components/FormOrder';
import { FormContacts } from './components/FormContacts';
import { OrderModel, FormErrors } from './components/OrderModel';
import { SuccessView } from './components/SuccessView';

//templates
const cardCatalogTemplate = document.querySelector(
	'#card-catalog'
) as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector(
	'#card-preview'
) as HTMLTemplateElement;
const cardBasketTemplate = document.querySelector(
	'#card-basket'
) as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement;
const contactsTemplate = document.querySelector(
	'#contacts'
) as HTMLTemplateElement;
const successTemplate = document.querySelector(
	'#success'
) as HTMLTemplateElement;

const events = new EventEmitter();
const page = new Page(document.querySelector('.page__wrapper'), events);
const modalPreview = new ModalView(
	document.querySelector('#modal-container'),
	events
);
const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const data = new GoodModel({}, events);
const basketData = new BasketModel({}, events);
const api = new LarekApi(CDN_URL, API_URL);
const orderData = new OrderModel({}, events);
const formState: IFormState = { valid: false, errors: [] };
Object.assign(orderData, formState);
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events);
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), events);
const successCard = new SuccessView(cloneTemplate(successTemplate), events);

events.on('goodModel:changed', () => {
	page.gallery = data.getGoodList().map((item) => {
		const cardMedium = new CardView(
			cloneTemplate(cardCatalogTemplate),
			'mediumCard',
			{
				onClick: () => {
					events.emit('card:open', item);
				},
			}
		);
		return cardMedium.render(item);
	});
});

events.on('basket:open', () => {
	let basketIndes = 1;
	basketView.content = basketData.getBasket().map((item) => {
		const cardBasket = new CardView(
			cloneTemplate(cardBasketTemplate),
			'minimalCard',
			{
				onClick: () => {
					events.emit('good:delete', item);
				},
			}
		);
		return cardBasket.render(
			Object.assign(item, { index: basketIndes++ })
		) as HTMLLIElement;
	});

	if (basketData.getBasketSumm() === 0) {
		basketView.lockBasketButton(true);
	} else {
		basketView.lockBasketButton(false);
	}
	basketView.price = basketData.getBasketSumm();
	modalPreview.content = basketView.render();
	modalPreview.open();
});

events.on('good:delete', (item: IGood) => {
	basketData.removeGood(item);
	const basketCount = basketData.getBasketCount();
	page.counter = String(basketCount);

	basketView.lockBasketButton(basketCount === 0);
	basketView.price = basketData.getBasketSumm();
	basketView.content = basketData.getBasket().map((item) => {
		const cardBasket = new CardView(
			cloneTemplate(cardBasketTemplate),
			'minimalCard',
			{
				onClick: () => {
					events.emit('good:delete', item);
				},
			}
		);
		return cardBasket.render(item) as HTMLLIElement;
	});
	modalPreview.content = basketView.render();
});

events.on('good:add', (item: IGood) => {
	basketData.addGood(item);
	page.counter = String(basketData.getBasketCount());
});

events.on('card:open', (item: IGood) => {
	const cardPreview = new CardView(
		cloneTemplate(cardPreviewTemplate),
		'standartCard',
		{
			onClick: () => {
				events.emit('good:add', item);
				events.emit('card:refresh', cardPreview);
			},
		}
	);
	if (basketData.isGoodInBasket(item)) {
		cardPreview.toggleLockBasketButton();
	}
	modalPreview.content = cardPreview.render(item);
	modalPreview.open();
});

events.on('card:refresh', (cardPreview: CardView) => {
	cardPreview.toggleLockBasketButton();
});

events.on('basket:submit', () => {
	modalPreview.content = formOrder.render(orderData as OrderModel & IFormState);
});

events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderModel; value: string }) => {
		orderData.setOrderField(data.field, data.value);
		if (data.field === 'payment') {
			formOrder.payment = data.value;
		}
	}
);

events.on('formErrors:change', (errors: FormErrors) => {
	if ('payment' in errors || 'address' in errors || Object.keys(errors).length === 0) {
		formOrder.errors = Object.values(errors).join(',');
	} else {
		formContacts.errors = Object.values(errors).join(',');
	}
});

events.on('order:isOk', () => {
	formOrder.valid = true;
});

events.on('contacts:isOk', () => {
	formContacts.valid = true;
});

events.on('order:isNoOk', () => {
	formOrder.valid = false;
});
events.on('contacts:isNoOk', () => {
	formContacts.valid = false;
});

events.on('order:submit', () => {
	modalPreview.content = formContacts.render(
		orderData as OrderModel & IFormState
	);
});

events.on('contacts:submit', () => {
	events.emit(
		'order:send',
		Object.assign(orderData, {
			total: basketData.getBasketSumm(),
			items: basketData.getBasketGoods(),
		})
	);
});

events.on('order:send', (data: IOrderResponse) => {
	api.sendOrder(data).then((res) => {
		successCard.result = basketData.getBasketSumm();
		basketData.clearBasket();
		page.counter = String(basketData.getBasketCount());
		modalPreview.content = successCard.render();
	});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
	orderData.clear();
});

events.on('success:close', () => {
	page.locked = false;
	modalPreview.close();
});

api.getGoodList().then((res) => {
	data.fillGoodList(res);
});
