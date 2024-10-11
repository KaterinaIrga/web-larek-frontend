interface IPage {
 headerContainer: HTMLElement;
 catalogContainer: HTMLElement[];  
 modalContainer: HTMLElement;
}

export class Page implements IPage {
  protected _headerContainer: HTMLElement;
  protected _catalogContainer: HTMLElement;
  protected _modalContainer: HTMLElement;
  //protected _orderContainer: HTMLElement;  Это вариация содержимого модалки
  //protected _busketContainer: HTMLElement;  Это вариация содержимого модалки
  constructor (protected container: HTMLElement) {
    this._headerContainer = container.querySelector('.header');
    this._catalogContainer = container.querySelector('.gallery');
  }

  set headerContainer(header: HTMLElement) {
    this._headerContainer.replaceChildren(header)
  }

  set catalogContainer(items: HTMLElement[]) {
    this._catalogContainer.replaceChildren(... items);
  }

  set modalContainer(modal: HTMLElement) {
    this._modalContainer.replaceChildren(modal)
  }


}