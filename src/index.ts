import './scss/styles.scss';
import {GoodModel} from './components/GoodModel';
import { LarekApi } from './components/LarekApi';
import { BasketModel } from './components/BasketModel';
import { ModalView } from './components/common/ModalView';
import { CardView } from './components/CardView';
import { Page } from './components/Page';
import { IGood, IFormFields, IOrderModel } from './types';
import { Component } from './components/base/Component';
import { FormView, IFormState } from './components/common/FormView';
import  {EventEmitter} from './components/base/events';
import {API_URL, CDN_URL} from "./utils/constants";
import {Api} from './components/base/api';
import { cloneTemplate } from './utils/utils';
import { BasketView } from './components/BasketView';
import { FormOrder } from './components/FormOrder';
import { FormContacts } from './components/FormContacts';
import { OrderModel, FormErrors } from './components/OrderModel';



//templates
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const cardPreviewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement
const cardBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement
const orderTemplate = document.querySelector('#order') as HTMLTemplateElement
const contactsTemplate = document.querySelector('#contacts') as HTMLTemplateElement

const events = new EventEmitter();
const page = new Page(document.querySelector('.page__wrapper'), events);
//const modalBasket = new ModalView(document.querySelector('#modal-container'), events);
const modalPreview = new ModalView(document.querySelector('#modal-container'), events);
const basketView = new BasketView(cloneTemplate(basketTemplate), events) ;
const data = new GoodModel({}, events)
const basketData = new BasketModel({}, events)
const api = new LarekApi(CDN_URL , API_URL )
const orderData= new OrderModel({}, events);
const formState: IFormState = {valid: false, errors:[]};
Object.assign(orderData, formState)
const formOrder = new FormOrder(cloneTemplate(orderTemplate), events)

/* FormView<Pick<IFormFields, 'address' | 'payOnline' | 'payOnReceipt'>>
(cloneTemplate(orderTemplate), {
  onClick: () => {console.log('rr')}
}) */
const formContacts = new FormContacts(cloneTemplate(contactsTemplate), events)
/* FormView<Pick<IFormFields, 'email' | 'telephone'>>(cloneTemplate(orderTemplate), {
  onClick: () => {console.log('rr')}
}) */


api.getGoodList()
  .then((res) => {console.log(res)
    data.fillGoodList(res);
  })

  events.on('goodModel:changed', () => {
    page.gallery = data.getGoodList().map(item => {
      
      const cardMedium = new CardView(cloneTemplate(cardCatalogTemplate), 'mediumCard', {
        onClick: () => {
          events.emit('card:open', item)}
      });
      return cardMedium.render(item)
    })
  })

  events.on('basket:open', () => {
    let basketIndes = 1;
    basketView.content = basketData.getBasket().map(item => {
      
      const cardBasket = new CardView(cloneTemplate(cardBasketTemplate), 'minimalCard', {
        onClick: () => {
          events.emit('good:delete', item)}
        })
        return cardBasket.render(Object.assign(item, {index: basketIndes++})) as HTMLLIElement;
      })
      basketView.price = basketData.getBasketSumm()
      modalPreview.content = basketView.render();
     // modalBasket.content = basketView.render();
      modalPreview.open()
   // modalBasket.open()
    })
    
  events.on('good:delete', (item: IGood) => {
    console.log('events_on delete')
    basketData.removeGood(item);
    page.counter = String(basketData.getBasketCount());
    //ToDo: убрать дубирование кода 
    basketView.content = basketData.getBasket().map(item => {
      const cardBasket = new CardView(cloneTemplate(cardBasketTemplate), 'minimalCard', {
        onClick: () => {
          events.emit('good:delete', item)}
        })
        return cardBasket.render(item) as HTMLLIElement;
      })
      //modalBasket.content = basketView.render();
      modalPreview.content = basketView.render();
  })

  events.on('good:add', (item: IGood) => {
    basketData.addGood(item);
    page.counter = String(basketData.getBasketCount());
  })
  
  events.on('card:open', (item: IGood)=>{   
    const cardPreview = new CardView(cloneTemplate(cardPreviewTemplate), 'standartCard', {
      onClick: () => {
        events.emit('good:add', item)}
    }) 
    modalPreview.content = cardPreview.render(item);
    modalPreview.open()
  })
  
events.on('basket:submit', () => {
  //modalPreview.content =  formSecond.render()

  modalPreview.content = formOrder.render(orderData as OrderModel & IFormState )
  
})

events.on(/^order\..*:change/, (data: { field: keyof IOrderModel, value: string }) => {
  console.log('orderData.setOrderField(data.field, data.value)', data.field, data.value)
  orderData.setOrderField(data.field, data.value);
});

events.on('formErrors:change', (errors: FormErrors) => {

})

events.on('order:isOk', (order: IOrderModel) => {
  formOrder.valid = true;
})

events.on('order:submit', () => {
  modalPreview.content = formContacts.render(orderData as OrderModel & IFormState )
})

events.on('modal:open', () => {
  page.locked = true;
})

events.on('modal:close', () => {
  page.locked = false;
})

/* const testGall = document.querySelector('.gallery');
const testCard = { 
  title: 'eee', 
  image: 'tst',
   
  description: 'fdfdfd',
  price: 99 }
//debugger;
card.render(testCard)
  testGall.append(card.render(testCard))
  console.log(card)

enum Events  {
  BUTTON_CLICK = 'button:click',
  BUTTON_HOVER = 'button:hover',
  BUTTON_UNHOVER = 'button:unhover',
  GOOD_ADD = 'good:add',
  GOOD_DELETE = 'good:delete',
  BUSKET_CHANGE = 'busket:change',
  MODAL_CLOSE = 'modal:close',
  MODAL_OPEN = 'modal:open',
  MODAL_SUBMIT = 'modal:submit',
  INPUT_CHANGE = 'input:change'
}


//formFirst.render() */