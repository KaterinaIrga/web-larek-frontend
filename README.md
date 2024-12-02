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
  setVisible(element: HTMLElement, isVisible: boolean = true) {};
  setDisable(element: HTMLElement, isDisable: boolean = true) {};
  setTextContent(element: HTMLElement, value: string) {};
  setImage(element: HTMLElement, src: string, alt: string) {};
  hasClass(element: HTMLElement, className: string): boolean {};
  toggleClass(element: HTMLElement, className: string, force?: boolean) {};
  render(data?: Partial<T>): HTMLElement {};
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement
**Поля класса**
- `component` - защищенное поле, содержит элемент разметки.
**Методы класса**
- `setVisible` - метод добавляет видимость элементу. Входящий параметр - HTMLElement. Возвращаемого значениея нет;
- `setDisable` - метод делает элемент недоступным для взаимодействия. Входящий параметр - HTMLElement. Возвращаемого значениея нет;
- `setTextContent` - метод устанавливает текстовое значение для элемента. Входящие параметры - HTMLElement и значение для установки. Возвращаемого значения нет;
- `setImage` - метод устанавливает изображение для элемента. Входящие параметры - HTMLElement, ссылка на изображение, альтернативный текст. Возвращаемого значения нет;
- `hasClass` - метод проверяет наличие у элемента класса, переданного в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращает значение типа boolean.
- `toggleClass` - метод добавляет переданный в качестве аргумента класс у элемента, если его нет и удаляет, если он есть. Входящие параметры - HTMLElement, имя класса. Возвращаемого значениея нет;
- `render` - метод возвращает текущее значение поля component. Метод принимает в качестве необязательного входящего параметра данные для обновления содержимого элемента component. Тип возвращаемого значение - HTMLElement.

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


### Класс Model

Абстрактный дженерик-класс, описывающий базовый компонент модели данных. Класс является элементом слоя данных.

```
export abstract class Model<T> {
	constructor(data: Partial<T>, protected events: IEvents) {
		Object.assign(this, data);
	}
	// если модель поменялась - оповещаем
	emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}
```
**Конструктор класса** в качестве аргументов принимает объект модели данных и брокер событий

**Методы класса**

## Компоненты модели данных

### Класс GoodModel 
Содержит массив товаров itemsList и методы работы с ним. Согласно выбранной архитектуре приложения класс относится к слою данных.

```
export class GoodModel extends Model<IGood> {
	protected _itemsList: IGood[] = [];

	getItem(id: string): IGood {
		return this._itemsList.find((item) => item.id === id);
	}
	addItem(data: IGood): void {
		this._itemsList.push(data);
	}
	fillGoodList(data: IGood[]): void {
		this._itemsList = data;
		this.emitChanges('goodModel:changed', { data: this._itemsList });
	}
	getGoodList(): IGood[] {
		return this._itemsList;
	}
}
```

**Конструктор класса** принимает объект данных модели.

**Поля класса**
- `itemsList` - защищенное поле, содержащее массив товаров (объектов реализующих интерфейс IGood)

**Методы класса**
- `getItem` - метод возвращает данные о товаре по его ID
- `addItem` - метод добавляет товар в массив товаров
- `fillGoodList` - метод выполняет множественное добавление товаров в массив
- `getGoodList` - метод возвращает массив товаров

### Класс BasketModel
Содержит массив товаров itemsList, выбранных пользователем для покупки и методы работы с ним.
Согласно выбранной архитектуре приложения класс относится к слою данных.

```
export class BasketModel extends Model<IGood> {
	protected itemsList: Set<IGood>;
	constructor(data: Partial<IGood>, protected events: IEvents) {
		super(data, events);
		this.itemsList = new Set();
	}
	addGood(good: IGood): void {
		this.itemsList.add(good);
	}
	removeGood(good: IGood): Set<IGood> {
		this.itemsList.delete(good);
		return this.itemsList; 
	}
	getBasket(): IGood[] {
		const result: IGood[] = [];
		this.itemsList.forEach((value) => {
			result.push(value);
		});
		return result;
	}
	clearBasket(): void {
		this.itemsList.clear();
	}
	isGoodInBasket(good: IGood): boolean {
		return this.itemsList.has(good);
	}
	getBasketSumm(): number {
		let summ: number = 0;
		this.itemsList.forEach((value) => {
			summ += value.price ? value.price : 0;
			return summ;
		});
		return summ;
	}
	getBasketCount(): number {
		return this.itemsList.size;
	}
  getBasketGoods(): string[] {
    let result: string[] = []

		for (let item of  this.itemsList) {
			result.push(item.id)
		}
		return result;
	}
}
```

**Конструктор класса** принимает объект данных модели.
**Поля класса**
- `_itemsList` - защищенное поле, содержащее массив товаров, добавленных в корзину (объектов реализующих интерфейс IGood)
**Методы класса**
- `addGood` - метод добавляет товар в массив товаров для покупки, выбранных пользователем.В качестве входящего параметра принимает объект товара, реализующий интерфейс IGood. Возвращаемого значениея нет.
- `removeGood` - метод удаляет товар из массива товаров для покупки, выбранных пользователем.В качестве входящего параметра принимает id товара. Метод возвращает обновленное значение поля itemsList.
- `getBasket` - Метод возвращает массив товаров - текущее значение поля itemsList. Входящих параметров нет.
- `clearBasket` - Метод очищает поле itemsList. Входящих параметров нет. Возвращаемого значения нет.
- `isGoodInBasket` - Метод проверяет, присутствует ли товар в корзине. Входящий параметр - id товара. Возвращает значение типа boolean.
- `getBasketSumm` - Метод возвращает суммарную стоимость всех товаров, находящихся в корзине. Входящих параметров у метода нет.
- `getBasketCount`- Метод возвращает количество товаров, находящихся в корзине. Входящих параметров у метода нет.
- `getBasketGoods` - Метод возвращает массив ID заказанныхтоваров. Входящих параметров у метода нет.

### Класс OrderModel
Содержит данные для отправки заказа. Согласно выбранной архитектуре приложения класс относится к слою данных.

```
export class OrderModel extends Model<IOrderModel> {
	public address?: string;
	public payment?: payment;
	public email?: string;
	public phone?: string;

	setOrderField(field: keyof IOrderModel, value: string) {}
	CheckData(field: keyof IOrderModel): boolean {}	
}

```

**Конструктор класса** принимает объект данных модели.
**Поля класса**
- `email` - необязятельное поле, содержит email заказчика.
- `telephone` - необязятельное поле, содержит телефон заказчика.
- `payType` - необязятельное поле, содержит тип оплаты заказа.
- `address` - необязятельное поле, содержит адрес для отправки заказа.
**Методы класса**
- `setOrderField` - метод устанавливает значение для поля. Входящие параметры: имя поля и значение поля.
- `CheckData` - Метод проверки корректности данных заказа. Возвращает значение логического типа. Входящий параметр - имя поля.

## Компоненты слоя представления

### Класс Page
Класс описывает главную страницу приложения. Относится к слою представления. 

```
export class Page extends Component<IPage> {
	protected _gallery: HTMLElement;
	protected _basketButton: HTMLButtonElement;
	protected _counter: HTMLElement;

	constructor(protected container: HTMLElement, protected events: IEvents) {}
	set gallery(items: HTMLElement[]) {}
	set counter(value: string) {}
	set locked(value: boolean) {}
}

```

**Конструктор класса** в качестве аргумента принимает HTMLElement
#### **Поля класса**
- `_gallery` - поле содержит каталог товаров (тип поля - HTMLElement);
- `_basketButton` - поле кнопку корзины (тип поля - HTMLButtonElement);
- `_counter` - поле счетчик товаров (тип поля - HTMLElement);

### Класс CardView
Класс относится к слою представления. Наследует класс Component и реализует интерфейс ICardView.

```
export class CardView extends Component<IGood> {
	protected _title: HTMLTitleElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _description: HTMLElement;
	protected _price: HTMLElement;
	protected _deleteButton?: HTMLButtonElement;
	protected _basketButton?: HTMLButtonElement;
	protected _index?: HTMLElement;
	toggleLockBasketButton() {}
	constructor(
		container: HTMLElement,
		cardType: CardType,
		protected actions: ICardActions
	) {}
	set title(value: string) {}
	get title() {}
	set index(value: string) {}
	get index() {}
	set image(src: string) {}
	set category(value: string) {}
	set description(value: string) {}
	set price(value: string) {}
}

```
**Конструктор класса** в качестве аргумента принимает HTMLElement, тип карточки и объект, содержащий события для карточки.
#### **Поля класса**
- `title` - поле содержит заголовок карточки (тип поля - HTMLTitleElement);
- `image` - поле содержит изображение товара (тип поля - HTMLImageElement);
- `category` - поле отображает категорию товара(тип поля - HTMLElement);
- `description` - поле отображает блок с описанием товара в карточке (тип поля - HTMLElement);
- `price` - поле отображает цену товара (тип поля - HTMLElement);
- `_deleteButton` - необязательное поле, содержит кнопку удаления товара (тип поля - HTMLButtonElement);
- `_basketButton` - необязательное поле, содержит кнопку добавления товара в корзину (тип поля - HTMLButtonElement);
- `_index` - необязательное поле, содержит номер товара в корзине (тип поля - HTMLElement);

### Класс ModalView
Класс реализует компонент модального окна приложения. Используется для отображения карточки товара, карточки корзины и карточки оформления заказа. Класс относится к слою представления. Наследует класс Component и реализует интерфейс IModalView.
```
export class ModalView extends Component<IModalView> {
	protected _content: HTMLElement;
	protected _exitButton: HTMLButtonElement;
	constructor(protected container: HTMLElement, protected events: IEvents) {}

	set content(content: HTMLElement) {}
	open() {}
	close() {}
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement и функцию, вызываемую при нажатии кнопки Submit.
#### **Поля класса**
- `_content` - поле содержит контейнер для отображения (тип поля - HTMLElement);
- `_exitButton` - поле содержит кнопку закрытия окна (тип поля - HTMLButtonElement); HTMLButtonElement;
#### **Методы класса**
- `open` - Метод открывает модальное окно. Входящих параметров у метода нет.
- `close`- Метод закрывает модальное окно. Входящих параметров у метода нет.

### Класс FormView
Базовый класс, реализует компонент формы, используемый при оформлении заказа. Класс относится к слою представления. Наследует класс Component. 

```
export class FormView<T> extends Component<IFormState> {
	protected _submit: HTMLButtonElement;
	protected _errors: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {}
	set valid(value: boolean) {}
	set errors(value: string) {}
	setPlaceholder(inputName: string, value: string) {}
	onInputChange(field: string, value: string) {}
	clear() {}
	render(data: Partial<T> & IFormState) {}
}
```

**Конструктор класса** в качестве аргумента принимает HTMLElement и объект брокера событий
#### **Поля класса**
- `_errors` - поле содержит элемент сообщения об ошибке (тип поля - IFormFields); 
- `_submit` - поле содержит элемент кнопки с типом submit (тип поля - HTMLButtonElement);
#### **Методы класса**
- `setPlaceholder` - Метод устанавливает значение плейсхолдера для поля ввода.  Входящие параметры - HTMLInputElement и string. 
- `onInputChange` - Метод вызывает событие изменения поля ввода.  Входящие параметры - имя поля и значение.
- `clear` - Метод очищает значение поля (или всех полей формы, если поле не передано).  Входящий параметр - HTMLInputElement.
- `render` - Метод отрисовывает форму 

### Класс FormOrder
Класс реализует форму выбора типа оплаты и адреса. Наследует класс FormView, относится к слою представления. Отображается в модальном окне.

```
export class FormOrder extends FormView<
	Pick<IOrderModel, 'address' | 'payment'>
> {
	protected _buttonCash: HTMLButtonElement;
	protected _buttonCard: HTMLButtonElement;
	constructor(protected container: HTMLFormElement, protected events: IEvents) {}
	set address(value: string) {}
	set payType(value: string) {}
}
```
**Конструктор класса** в качестве аргумента принимает HTMLFormElement и объект брокера событий
#### **Поля класса**
- `_buttonCash` - поле содержит кнопку для выбора типа оплаты "при получении" (тип поля - HTMLButtonElement); 
- `_buttonCard` - поле содержит кнопку для выбора типа оплаты "онлайн" (тип поля - HTMLButtonElement);

### Класс FormContacts 
Класс реализует форму выбора типа телефона и электронной почты. Наследует класс FormView, относится к слою представления. Отображается в модальном окне.

```
export class FormContacts  extends FormView<Pick<IOrderModel, 'email' | 'phone' >>{

  constructor(protected container: HTMLFormElement, protected events: IEvents) {}
  set email (value: string) {}
  set phone (value: string) {}
 }
```

**Конструктор класса** в качестве аргумента принимает HTMLFormElement и объект брокера событий


### Класс SuccessView
Класс реализует окно удачного завершения покупки. Наследует класс Component. Является элементом слоя представления. Отображается в модальном окне.

```

export class SuccessView extends Component<ISuccess> {
  protected _title: HTMLElement;
  protected _result: HTMLElement;
  protected _buttonClose: HTMLButtonElement;
  constructor(protected container: HTMLElement, protected events: IEvents){}
  set result (value: number) {}
}
```
**Конструктор класса** в качестве аргумента принимает HTMLElement и объект брокера событий
#### **Поля класса**
- `_title` - поле содержит элемент заголовка карточки. (тип поля - HTMLElement); 
- `_result` - поле содержит сумму списания по заказу. (тип поля - HTMLElement); 
- `_buttonClose` - поле содержит элемент заголовка карточки. (тип поля - HTMLButtonElement); 

### Класс BasketView
Класс реализует отображениее корзины товаров. Наследует класс Component. Является элементом слоя представления. Отображает массив карточек товаров. Отображается в модальном окне. 

``` 
export class BasketView extends Component<IBasket> {
	protected _title: HTMLTitleElement;
	protected _list: HTMLUListElement;
	protected _button: HTMLButtonElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {}
	set content(items: HTMLLIElement[]) {}
	set price(value: number) {}
	set title(value: string) {}
	set button(value: string) {}
  lockBasketButton(value: boolean) {}
}

```

**Конструктор класса** в качестве аргумента принимает HTMLElement и объект брокера событий
#### **Поля класса**
- `_title` - поле содержит заголовок (тип поля - HTMLTitleElement); 
- `_list` - поле содержит список выбранных товаров (тип поля - HTMLUListElement);
- `_button` - поле содержит элемент кнопки подтверждения заказа (тип поля - HTMLButtonElement); 
- `_price` - поле содержит общуюю сумму заказа (тип поля - HTMLElement);
#### **Методы класса**
- `lockBasketButton` - метод меняет доступность кнопки подтверждения заказа

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

### Payment
Содержит допустимые варианты оплаты.
Возможные значения: онлайн, при получении.
`export type Payment = "Онлайн" | "При получении"`

### Интерфейс IGood 
Описывает информацию о товаре. Используется в классах: GoodModel, BasketModal.
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
  address: string;
	payment: Payment;
	email: string;
	phone: string;
}
```

**Поля интерфейса**
- `address` - поле содержит адрес доставки заказа (тип данных - текстовый);
- `payment` - поле содержит данные о варианте оплаты заказа (тип данных пользовательский - PayType);
- `email` - поле содержит адрес электронной почты покупателя (тип данных - текстовый);
- `phone` - поле содержит телефон покупателя (тип данных - текстовый);

### Интерфейс IPage
Описывает главную страницу приложения. Интерфейс относится к слою представления.
```
interface IPage {
  header: HTMLElement;
	gallery: HTMLElement;
	locked: boolean;
}
```
**Поля интерфейса**
- `header` - поле содержит заголовок страницы (тип поля - HTMLElement);
- `gallery` - поле содержит каталог товаров (тип поля - HTMLElement);
- `locked` - поле содержит информацию, заблокирована ли страница (тип поля - boolean);

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

### Интерфейс IBasketView
Интерфейс относится к слою представления. Описывает карточку корзины. Отображается в классе ModelView
```
export interface IBasketView {
  goodCards: Map<number, BasketItemView>;
  summ: HTMLElement;
  buttonRegister: HTMLButtonElement;
  registerFunction: Function;
  title: HTMLTitleElement;
}
```

**Поля интерфейса**
- `goodCards` - поле содержит список карточек товаров, реализующих интерфейс BasketItemView.
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
- `Basket_CHANGE` - событие инициируется при изменении перечня товаров корзины
- `MODAL_CLOSE` - событие инициируется при клике по кнопке закрытия модального окна
- `MODAL_OPEN` - событие инициируется при клике по кнопке корзины или по карточке товара
- `MODAL_SUBMIT` - событие инициируется при клике по кнопке submit в модальном окне.
- `INPUT_CHANGE` - событие инициируется при изменении поля ввода

```
enum Events  {
  BUTTON_CLICK = 'button:click',
  BUTTON_HOVER = 'button:hover',
  BUTTON_UNHOVER = 'button:unhover',
 CARD_CLOSE = 'card:close',
  CARD_OPEN = 'card:open',

  GOOD_ADD = 'good:add',
  GOOD_DELETE = 'good:delete',
  BASKET_CHANGE = 'basket:changed',
  BASKET_CLOSE = 'basket:close',
  BASKET_OPEN = 'basket:open',
  BASKET_SUBMIT = 'basket:submit',

  MODAL_CLOSE = 'modal:close',
  MODAL_OPEN = 'modal:open',
  MODAL_SUBMIT = 'modal:submit',
  ORDER_CLOSE = 'order:close',
  ORDER_IS_OK = 'order:isOk'
  ORDER_OPEN = 'order:open',
  INPUT_CHANGE = 'input:changed'
  GOODMODEL_CHANGE = 'goodModel:changed'
}
```