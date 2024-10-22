import { Component} from './base/Component';
import { ICardView, CardType, IGood } from '../types/index';
import { IEvents } from './base/events';

export class CardView extends Component<IGood> /* implements ICardView */{
  private _title: HTMLTitleElement;
  private _image: HTMLImageElement;
  private _category: HTMLElement;
  private _description: HTMLElement;
  private _price: HTMLElement;
  private _deleteButton?: HTMLButtonElement;
  private _basketButton?: HTMLButtonElement;
  private _functionDeleteItem?: Function;
  deleteItem(elem: HTMLElement) {};
  showCardByType(elem: HTMLElement, cardType: CardType): HTMLElement {return {} as HTMLElement};
  constructor(container: HTMLElement, cardType: CardType, protected events: IEvents) {
    super(container);    
    switch (cardType) {
      case 'minimalCard': {
        this._deleteButton = container.querySelector('.basket__item-delete');
        this._deleteButton.addEventListener('click', (e: Event) => {})
        break;
      }
      case 'mediumCard': {
        this._image = container.querySelector('.card__image');
        this._category = container.querySelector('.card__category');
        this._description = container.querySelector('.card__text');
        this.container.addEventListener('click', (e: Event) => {})
        break;
      }
      case 'standartCard': {
        this._image = container.querySelector('.card__image');
        this._category = container.querySelector('.card__category');
        this._description = container.querySelector('.card__text');
        this._basketButton = container.querySelector('.button');
        this._basketButton.addEventListener('click', (e: Event) => {})
        break;
      }
      default: {
        this._title = container.querySelector('.card__title');
        this._price = container.querySelector('.card__price');
        break;
      }
    }
    
  }
  set title (value:string){
    this.setTextContent(this._title, value);
  }
  set image (value:string){
    this.setTextContent(this._image, value);
  }
/*   get image(): string {
    return this._image.textContent
  } */
  set category (value:string){
    this.setTextContent(this._category, value);
  }
  set description (value:string){
    this.setTextContent(this._description, value);
  }
  set price (value:string){
    this.setTextContent(this._price, value);
  }
/*   set deleteButton (value:HTMLButtonElement){
    this._deleteButton = value;
  }
  set functionDeleteItem (value:Function){
    this._functionDeleteItem = value;
  } */
}

