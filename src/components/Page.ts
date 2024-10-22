import {Header} from './Header';
import {Gallery} from './Gallery';
import {IEvents} from './base/events';
import {Component} from './base/Component';

interface IPage {
 header: HTMLElement;
 gallery: Gallery; 
 test: string;
}

//это класс page__wrapper
export class Page extends Component<IPage> /* implements IPage  */{
  protected _header: Header;
  protected _gallery: Gallery;
  protected _test: HTMLElement;
  constructor (protected container: HTMLElement, protected events: IEvents) {
    super(container);
    this._header = new Header(container.querySelector('.header'), events);
    this._gallery = new Gallery(container.querySelector('.gallery'), events);
    this._test = container.querySelector('.gallery');

    /* console.log('this._gallery', this._gallery) */
  }

   set header(header: HTMLElement) {
    this._header.replaceChild(header)
    
  }
 
   get header() :HTMLElement {
    return this._header.render();
  } 

set test(value: string) {
this.setTextContent(this._test, value)
}

 get test(): string {
  return this._test.textContent;
} 

set title(value: string) {
  this.setTextContent(this._test, value);
}
/* 
get title(): string {
  return this._test.textContent || '';
} */

   set gallery(items: HTMLElement[]) {
    this._gallery.replaceChildren(items);
  } 

  /* get gallery() :Gallery {
    return this._gallery ;
  } */ 
/*   set gallery(item: HTMLElement) {
    this._gallery.replaceChild(item);
  } */

}