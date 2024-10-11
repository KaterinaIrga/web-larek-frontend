# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## О проекте
Архитектура проекта будет построена по принципу MVC и будет содержать слой данных (Модель), слой отображения (Представление) и связующий данные слои контроллер.


## Базовые компоненты

### Класс Component
Абстрактный дженерик-класс, описывающий базовый компонент представления. Класс является элементом слоя представления.

```
export abstract class Component<T> {
  constructor(protected container: HTMLElement) {};
  setVisible(element: HTMLElement) {};
  setDisable(element: HTMLElement) {};
  setTextContent(element: HTMLElement, value: string) {};
  setImage(element: HTMLElement, url: string, alt: string) {};
  cloneElement(elementID: string): HTMLElement {};
  addClass(element: HTMLElement, className: string) {};
  hasClass(element: HTMLElement, className: string): boolean {};
  removeClass(element: HTMLElement, className: string) {};
  toggleClass(element: HTMLElement, className: string) {};
  render(data?: Partial<T>): HTMLElement {};
  setHendler(element: HTMLElement, event:Event, hendlerFunction: Function) {};
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement
**Поля класса**
- `component` - защищенное поле, содержит элемент разметки.
**Методы класса**
- `setVisible` - метод добавляет видимость элементу. Входящий параметр - HTMLElement. Возвращаемого значениея нет;
- `setDisable` - метод убирает видимость у элемента. Входящий параметр - HTMLElement. Возвращаемого значениея нет;
- `setTextContent` - метод устанавливает текстовое значение для элемента. Входящие параметры - HTMLElement и значение для установки. Возвращаемого значения нет;
- `setImage` - метод устанавливает изображение для элемента. Входящие параметры - HTMLElement, ссылка на изображение, альтернативный текст. Возвращаемого значения нет;
- `cloneElement` - метод копирует элемент, переданный в качестве аргумента. Возвращает HTMLElement;
- `addClass` - метод добавляет элементу класс, переданный в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращаемого значения нет;
- `hasClass` - метод удаляет у элемента класс, переданный в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращает значение типа boolean.
- `removeClass` - метод удаляет у элемента класс, переданный в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращаемого значения нет;
- `toggleClass` - метод добавляет переданный в качестве аргумента класс у элемента, если его нет и удаляет, если он есть. Входящие параметры - HTMLElement, имя класса. Возвращаемого значениея нет;
- `render` - метод возвращает текущее значение поля component. Метод принимает в качестве необязательного входящего параметра данные для обновления содержимого элемента component. Тип возвращаемого значение - HTMLElement.
- `setHendler`- метод устанавливает событие для элемента. Входящие параметры: HTMLElement, Event, Function.

### Класс api
Класс предоставляет методы для взаимодействия с сервером.

**Конструктор класса** принимает в качестве аргументов адрес сервера и тип запроса.

**Методы класса**
- `get` - Метод выполняет запрос на сервер, используя метод GET.
- `post` - Метод передает на сервер данные, полученные им в качестве аргумента. Также в качестве опционального аргумента метод получает тип запроса.

### Класс EventEmitter
Класс является брокером событий. Предоставляет методы генерации и инициализации событий, подписки на события.

**Конструктор класса** не принимает аргументов.

**Методы класса**

- `on` - метод устанавливает обработчик на событие, переданное в качестве аргумента.
- `off` - метод снимает обработчик с события, переданного в качестве аргумента.
- `emit` - метод инициирует событие с данными, переданными в качестве аргумента.
- `onAll` - метод устанавливает обработчик на все события.
- `offAll` - метод сбрасывает все обработчики
- `trigger` - метод инициирует событие, переданное в качестве аргумента.


## Компоненты модели данных

### Класс GoodModel 
Содержит массив товаров itemsList и методы работы с ним. Согласно выбранной архитектуре приложения класс относится к слою данных.

```
export class GoodModel {
  protected itemsList: IGood[] = [];
  constructor() {};
  getItem(id: Partial<IGood>):IGood {
    return this.itemsList.find(item => item.id === Object.values(id)[0])
  };

  getItemById(id: string) : IGood {
    return this.itemsList.find(item => item.id === id)
  }

  addItem(data: IGood): void{
  this.itemsList.push(data);
  }

  fillGoodList(data: IGood[] ):void {
    this.itemsList = data;
  };
  getGoodList():IGood[] {
    return this.itemsList
  };
}
```

**Конструктор класса** не принимает аргументов.

**Поля класса**
- `itemsList` - защищенное поле, содержащее массив товаров (объектов реализующих интерфейс IGood)

**Методы класса**
- `getItem` - метод возвращает данные о товаре по его ID
- `addItem` - метод добавляет товар в массив товаров
- `fillGoodList` - метод выполняет множественное добавление товаров в массив
- `getGoodList` - метод возвращает массив товаров

### Класс BusketModel
Содержит id заказа и массив товаров itemsList, выбранных пользователем для покупки и методы работы с ним. Перед созданием корзины создается заказ, идентификатор заказа передается в конструктор корзины.
Согласно выбранной архитектуре приложения класс относится к слою данных.

```
export class BusketModel {
  protected itemsList: Set<IGood>;
  protected idOrder: number;
  constructor(idOrder) {};
  addGood(good: IGood): void {};

  removeGood(id: IGood['id']): IGood[] {};

  refreshGoodList() {}

  getBusket(): IGood[] {};

  clearBusket():void {};

  isGoodInBusket(good: IGood): boolean {}

  getBusketSumm(): number {}
}
```

**Конструктор класса** в качестве аргумента принимает ID заказа.
**Поля класса**
- `_itemsList` - защищенное поле, содержащее массив товаров, добавленных в корзину (объектов реализующих интерфейс IGood)
**Методы класса**
- `addGood` - метод добавляет товар в массив товаров для покупки, выбранных пользователем.В качестве входящего параметра принимает объект товара, реализующий интерфейс IGood. Возвращаемого значениея нет.
- `removeGood` - метод удаляет товар из массива товаров для покупки, выбранных пользователем.В качестве входящего параметра принимает id товара. Метод возвращает обновленное значение поля itemsList.
- `getBusket` - Метод возвращает массив товаров - текущее значение поля itemsList. Входящих параметров нет.
- `clearBusket` - Метод очищает поле itemsList. Входящих параметров нет. Возвращаемого значения нет.
- `isGoodInBusket` - Метод проверяет, присутствует ли товар в корзине. Входящий параметр - id товара. Возвращает значение типа boolean.
- `getBusketSumm` - Метод возвращает суммарную стоимость всех товаров, находящихся в корзине. Входящих параметров у метода нет.
- `getBusketCount`- Метод возвращает количество товаров, находящихся в корзине. Входящих параметров у метода нет.

### Класс OrderModel
Содержит id заказа и данные для отправки заказа. Согласно выбранной архитектуре приложения класс относится к слою данных.

```
export class OrderModel implements IOrderModel{
  private static _idOrder: number;
  private _address: string;
  private _payType: PayType;
  private _email: string;
  private _telephone: string; 
  private _summ: number;
  constructor() {
    _idOrder = GenerateNewID()
  }
   set address(value: string) {};
   set email(value: string) {};
   set telephone(value: string) {};
   set payType(value: PayType) {};
   get idOrder(): number {};
   set summ(): number {};
   GenerateNewID(): number{};
   CheckData():boolean {};
   Clear(){};
}
```

**Конструктор класса** не принимает аргументов.
**Поля класса**
- `_idOrder` - защищенное статическое поле, содержит ID заказа.
- `_email` - защищенное поле, содержит email заказчика.
- `_telephone` - защищенное поле, содержит телефон заказчика.
- `_payType` - защищенное поле, содержит тип оплаты заказа.
- `_address` - защищенное поле, содержит адрес для отправки заказа.
-  `_summ` - поле содержит суммарную стоимость всех товаров в заказе.
**Методы класса**
- `GenerateNewID` - Метод генерирует ID. Входящих параметров у метода нет.
- `CheckData` - Метод проверки корректности данных заказа. Возвращает значение логического типа. Входящих параметров у метода нет.
- `Clear` - Метод очищает все поля заказа, кроме поля ID и суммарной стоимости всех товаров. Входящих параметров у метода нет.

## Компоненты слоя представления

### Класс Page
Класс описывает главную страницу приложения. Относится к слою представления. 

```
export class Page implements IPage {
  protected _headerContainer: HTMLElement;
  protected _catalogContainer: HTMLElement;
  protected _modalContainer: HTMLElement;
  constructor (protected container: HTMLElement) {}
  set headerContainer(header: HTMLElement) {}
  set catalogContainer(items: HTMLElement[]) {}
  set modalContainer(modal: HTMLElement) {}
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement
#### **Поля класса**
- `_headerContainer` - поле содержит заголовок страницы (тип поля - HTMLElement);
- `_catalogContainer` - поле содержит каталог товаров (тип поля - HTMLElement[]);
- `_modalContainer` - поле отображает модальное окно(тип поля - HTMLElement);

### Класс CardView
Класс относится к слою представления. Наследует класс Component и реализует класс ICardView.

```
export class CardView extends Component<ICardView>{
  title: HTMLTitleElement;
  image: HTMLImageElement;
  category: HTMLElement;
  description: HTMLElement;
  price: HTMLElement;
  constructor(container: HTMLElement) {
    super(container);
    
  }
}
```
**Конструктор класса** в качестве аргумента принимает HTMLElement
#### **Поля класса**
- `title` - поле содержит заголовок карточки (тип поля - HTMLTitleElement);
- `image` - поле содержит изображение товара (тип поля - HTMLImageElement);
- `category` - поле отображает категорию товара(тип поля - HTMLElement);
- `description` - поле отображает блок с описанием товара в карточке (тип поля - HTMLElement);
- `price` - поле отображает цену товара (тип поля - HTMLElement);

### Класс ModalView
Класс реализует компонент модального окна приложения. Используется для отображения карточки товара, карточки корзины и карточки оформления заказа. Класс относится к слою представления. Наследует класс Component и реализует класс IModalView.
```
export class ModalView extends Component<IModalView> {
  protected _title: HTMLTitleElement;
  protected _content: HTMLElement;
  constructor(protected container: HTMLElement, submitEvent: string) {};

  set title(value: string) {}
  set content (content: HTMLElement) {}
  open(){}; 
  close(){};
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement и функцию, вызываемую при нажатии кнопки Submit.
#### **Поля класса**
- `_title` - поле содержит заголовок модального окна (тип поля - HTMLTitleElement);
- `_content` - поле содержит контейнер для отображения (тип поля - HTMLElement);
- `_exitButton` - поле содержит кнопку закрытия окна (тип поля - HTMLButtonElement); HTMLButtonElement;
#### **Методы класса**
- `open` - Метод открывает модальное окно. Входящих параметров у метода нет.
- `close`- Метод закрывает модальное окно. Входящих параметров у метода нет.

### Класс FormView
Класс реализует компонент формы, используемый при оформлении заказа. Класс относится к слою представления. Наследует класс Component и реализует класс IForm. 

```
class FormView extends Component<IForm> {
  protected _submit: HTMLButtonElement;
  protected _formFields: IFormFields;
  constructor(templateElement: HTMLTemplateElement) {};
  setPlaceholder(element: HTMLElement, value: string) {};
  getValue(element: HTMLElement) {};
  clear(field?: HTMLInputElement) {};
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement
#### **Поля класса**
- `_formFields` - поле содержит блок полей ввода для формы (тип поля - IFormFields); 
- `_submit` - поле содержит элемент кнопки с типом submit (тип поля - HTMLButtonElement);
#### **Методы класса**
- `setPlaceholder` - Метод устанавливает значение плейсхолдера для поля ввода.  Входящие параметры - HTMLInputElement и string. 
- `getValue` - Метод возвращает значение поля.  Входящий параметр - HTMLInputElement.
- `clear` - Метод очищает значение поля (или всех полей формы, если поле не передано).  Входящий параметр - HTMLInputElement.

### Класс BusketView
Класс реализует отображениее корзины товаров. Наследует класс Component и реализует класс IBusketView. Является элементом слоя представления. Используется как контейнер для отображения массива карточек товаров. Отображжается в модальном окне. [ToDo] [1]

[1]: <> 'Не совсем понятно, что должен содержать класс. Поля - в интерфейсе, все функции - в компоненте модульного окна. А эта штука - зачем? '


``` 
export class BusketView extends Component<IBusketView> {

} 
```

**Конструктор класса** в качестве аргумента принимает HTMLElement

### Класс BusketItemView
Класс реализует отображениее товара в корзине. Наследует класс CardView. Является элементом слоя представления. Используется в классе BusketView.

```
class BusketItemView extends CardView {
deleteItem(elem: HTMLElement) {}
showGoodCard(elem: HTMLElement) {}
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement
#### **Методы класса**
- `deleteItem` - Метод удаляет товар из корзины. Входящий параметр - HTMLElement.
- `showGoodCard` - Метод открывает карточку товара в модальном окне. Входящий параметр - HTMLElement.

## Пользовательские типы

### Price
Содержит типы, используемые для указания цены товара.
Возможные значения: number, null.
`type Price = number | null;`

### GoodCategory
Содержит используемые категории товаров.
Возможные значения: софт-скил, другое, дополнительное, кнопка, хард-скил;

```
export type GoodCategory = "софт-скил" | "другое" | "дополнительное" | "кнопка" | "хард-скил";
```

### PayType
Содержит допустимые варианты оплаты.
Возможные значения: онлайн, при получении.
`export type PayType = "Онлайн" | "При получении"`

### Интерфейс IGood 
Описывает информацию о товаре. Используется в классах: GoodModel, BusketModal.
```
export interface IGood {
  id: string;
  image: string;
  category: GoodCategory;
  title: string;
  description: string;
  price: Price;
}
```

**Поля интерфейса**
- `id` - поле содержит уникальный код товара (тип данных - текстовый);
- `image` - поле содержит ссылку на изображение товара (тип данных - текстовый);
- `category` - поле содержит информацию о категории товара (тип данных пользовательский - GoodCategory);
- `title` - поле содержит наименование товара (тип данных - текстовый);
- `description` - поле содержит описание товара (тип данных - текстовый);
- `price` - поле содержит данные о цене товара  (тип данных пользовательский - Price);

### Интерфейс IOrderModel 
Описывает информацию о заказе. Интерфейс относится к слою модели данных.
```
export interface IOrderModel {
  idOrder: number;
  address: string;
  payType: PayType;
  email: string;
  telephone: string; 
  summ: number;
}
```

**Поля интерфейса**
- `address` - поле содержит адрес доставки заказа (тип данных - текстовый);
- `payType` - поле содержит данные о варианте оплаты заказа (тип данных пользовательский - PayType);
- `email` - поле содержит адрес электронной почты покупателя (тип данных - текстовый);
- `telephone` - поле содержит телефон покупателя (тип данных - текстовый);
- `idOrder` - поле содержит ID заказа.
-  `summ` - поле содержит суммарную стоимость всех товаров, добавленных в корзину.

### Интерфейс IPage
Описывает главную страницу приложения. Интерфейс относится к слою представления.
```
interface IPage {
 headerContainer: HTMLElement;
 catalogContainer: HTMLElement[];  
 modalContainer: HTMLElement;
}
```
**Поля интерфейса**
- `headerContainer` - поле содержит заголовок страницы (тип поля - HTMLElement);
- `catalogContainer` - поле содержит каталог товаров (тип поля - HTMLElement[]);
- `modalContainer` - поле отображает модальное окно(тип поля - HTMLElement);

### Интерфейс ICardView
Описывает карточку товара. Интерфейс относится к слою представления.

````
export interface ICardView {
  title: HTMLTitleElement;
  image: HTMLImageElement;
  category: HTMLElement;
  description?: HTMLElement;
  price: HTMLElement;}
````

**Поля интерфейса**
- `title` - поле содержит заголовок карточки (тип поля - HTMLTitleElement);
- `image` - поле содержит изображение товара (тип поля - HTMLImageElement);
- `category` - поле отображает категорию товара(тип поля - HTMLElement);
- `description` - поле отображает блок с описанием товара в карточке (тип поля - HTMLElement);
- `price` - поле отображает цену товара (тип поля - HTMLElement);

### Интерфейс IModalView
Описывает модальное окно приложения. Интерфейс относится к слою представления.
**Поля интерфейса**
- `title` - поле содержит заголовок модального окна (тип поля - HTMLTitleElement);
- `content` - поле содержит контейнер для отображения (тип поля - HTMLElement);
- `exitButton` - поле содержит элемент кнопки закрытия модального окна (тип поля - HTMLButtonElement);

### Интерфейс IForm
Описывает элемент формы, используемый в карточке оформления заказа. Интерфейс относится к слою представления.
**Поля интерфейса**
- `hendlerFunction` - поле содержит функцию, вызываемую при отправке данных формы (тип поля - Function);
- `buttonText` - поле содержит текст кнопки с типом submit (тип поля - строка);
- `submit` - поле содержит элемент кнопки с типом submit (тип поля - HTMLButtonElement);
**Методы интерфейса**
- `setPlaceholder` - метод устанавливает значение плейсхолдера для элемента, переданного в качестве аргумента. Входящие параметры: элемент, текст сообщения. Возвращаемого значения нет;
- `setHendler` - метод устанавливает обработчик события для переданного в качестве аргумента элемента формы. Входящие параметры: элемент, событие, функция. Возвращаемого значения нет;
- `getValue` - метод возвращает значение поля, переданного в качестве аргумента. Возвращаемого значения нет;
- `clear` - метод очищает все поля формы. Входящих параметров и возвращаемого значения нет;

### Интерфейс IFormFields
Интерфейс относится к слою представления. Описывает поля ввода для формы.Используется в классе FormView. [ToDo] [2]

[2]: <> 'Так ли должно быть? Интерфейс использую как содержание формы'


```
export interface IFormFields {
  address: HTMLInputElement;
  payType: HTMLSelectElement;
  email: HTMLInputElement;
  telephone: HTMLInputElement; 
}
```

### Интерфейс IBusketView
Интерфейс относится к слою представления. Описывает карточку корзины. Отображается в классе ModelView
```
export interface IBusketView {
  goodCards: Map<number, BusketItemView>;
  summ: HTMLElement;
  buttonRegister: HTMLButtonElement;
  registerFunction: Function;
  title: HTMLTitleElement;
}
```

**Поля интерфейса**
- `goodCards` - поле содержит список карточек товаров, реализующих интерфейс BusketItemView.
-  `summ` - поле содержит суммарную стоимость всех товаров, добавленных в корзину.
-  `buttonRegister` - поле содержит элемент кнопки с типом submit (тип поля - HTMLButtonElement);
-  `registerFunction`- поле содержит функцию, вызываемую при оформлении заказа.
-  `title` - поле содержит заголовок карточки
**Методы интерфейса**

## События, генерируемые в приложении:
- `BUTTON_CLICK` - событие инициируется при клике по кнопке
- `BUTTON_HOVER` - событие инициируется при наведении курсора на кнопку
- `BUTTON_UNHOVER` - событие инициируется при снятии наведения курсора с кнопки
- `GOOD_ADD` - событие инициируется при добавлении товара в корзину
- `GOOD_DELETE` - событие инициируется при удалении товара из корзины
- `BUSKET_CHANGE` - событие инициируется при изменении перечня товаров корзины
- `MODAL_CLOSE` - событие инициируется при клике по кнопке закрытия модального окна
- `MODAL_OPEN` - событие инициируется при клике по кнопке корзины или по карточке товара
- `MODAL_SUBMIT` - событие инициируется при клике по кнопке submit в модальном окне.
- `INPUT_CHANGE` - событие инициируется при изменении поля ввода

```
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
```