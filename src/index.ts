import './scss/styles.scss';
import {GoodModel} from './components/GoodModel';
import { BasketModel } from './components/BasketModel';
import { ModalView } from './components/common/ModalView';
import { CardView } from './components/CardView';
import { Page } from './components/Page';
import { IGood, IFormFields } from './types';
import { Component } from './components/base/Component';
import { FormView } from './components/common/FormView';
import  {EventEmitter} from './components/base/events';
import {API_URL, CDN_URL} from "./utils/constants";
import {Api} from './components/base/api';
import { cloneTemplate } from './utils/utils';
import {Header} from './components/Header';
import {Gallery} from './components/Gallery';


//templates
const cardCatalogTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement

const elemTest = document.createElement('div');
elemTest.textContent = 'tro-lo-lo';

const events = new EventEmitter();
const page = new Page(document.querySelector('.page__wrapper'), events);
const gall = new Gallery(document.querySelector('.gallery'), events)
const header = new Header(document.querySelector('.header'), events)
const modal = new ModalView(document.querySelector('#modal-container'), events);
const data = new GoodModel()
const api = new Api(CDN_URL/* , API_URL */)
const card = new CardView(cloneTemplate(cardCatalogTemplate), 'mediumCard', events);

card.render(
  { 
  image: 'tst',
  category: 'другое',
  title: 'eee',
  description: 'fdfdfd',
  price: 99 })
  

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

//const formFirst = new FormView<Pick<IFormFields, 'address' | 'payType'>>({} as HTMLFormElement, events)
//const formSecond = new FormView<Pick<IFormFields, 'email' | 'telephone'>>({} as HTMLFormElement, events)

//formFirst.render()