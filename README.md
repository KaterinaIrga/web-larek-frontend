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
**Конструктор класса** 
принимает аргументы: component
**Поля класса**
- *component* - защищенное поле, содержит элемент разметки.
**Методы класса**
- *setVisible* - метод добавляет видимость элементу. Входящий параметр - HTMLElement. Возвращаемого значениея нет;
- *setDisable* - метод убирает видимость у элемента. Входящий параметр - HTMLElement. Возвращаемого значениея нет;
- *setTextContent* - метод устанавливает текстовое значение для элемента. Входящие параметры - HTMLElement и значение для установки. Возвращаемого значения нет;
- *setImage* - метод устанавливает изображение для элемента. Входящие параметры - HTMLElement, ссылка на изображение, альтернативный текст. Возвращаемого значения нет;
- *cloneElement* - метод копирует элемент, переданный в качестве аргумента. Возвращает HTMLElement;
- *addClass* - метод добавляет элементу класс, переданный в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращаемого значения нет;
- *hasClass* - метод удаляет у элемента класс, переданный в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращает значение типа boolean.
- *removeClass* - метод удаляет у элемента класс, переданный в качестве аргумента. Входящие параметры - HTMLElement, имя класса. Возвращаемого значения нет;
- *toggleClass* - метод добавляет переданный в качестве аргумента класс у элемента, если его нет и удаляет, если он есть. Входящие параметры - HTMLElement, имя класса. Возвращаемого значениея нет;
- *render* - метод возвращает текущее значение поля component. Метод принимает в качестве необязательного входящего параметра данные для обновления содержимого элемента component. Тип возвращаемого значение - HTMLElement.

## Компоненты модели данных

### Класс GoodModel 
Содержит массив товаров itemsList и методы работы с ним. Согласно выбранной архитектуре приложения класс относится к слою данных.

**Конструктор класса**
принимает аргументы:

**Поля класса**
- itemsList - защищенное поле, содержащее массив товаров (объектов реализующих интерфейс IGood)

**Методы класса**
- getItem
- addItem
- fillGoodList
- getGoodList

### Класс BusketModal
Содержит массив товаров itemsList, выбранных пользователем для покупки и методы работы с ним. Согласно выбранной архитектуре приложения класс относится к слою данных.

**Конструктор класса** 
принимает аргументы:
**Поля класса**
- itemsList - защищенное поле, содержащее массив товаров, добавленных в корзину (объектов реализующих интерфейс IGood)
**Методы класса**
- addGood - метод добавляет товар в массив товаров для покупки, выбранных пользователем.В качестве входящего параметра принимает объект товара, реализующий интерфейс IGood. Возвращаемого значениея нет.
- removeGood - метод удаляет товар из массива товаров для покупки, выбранных пользователем.В качестве входящего параметра принимает id товара. Метод возвращает обновленное значение поля itemsList.
- getBusket - Метод возвращает массив товаров - текущее значение поля itemsList. Входящих параметров нет.
- clearBusket - Метод очищает поле itemsList. Входящих параметров нет. Возвращаемого значения нет.
- isGoodInBusket - Метод проверяет, присутствует ли товар в корзине. Входящий параметр - id товара. Возвращает значение типа boolean.
- getBusketSumm - Метод возвращает суммарную стоимость всех товаров, находящихся в корзине. Входящих параметров у метода нет.

## Компоненты слоя представления

### Класс CardView
Класс относится к слою представления. Наследует класс Component и реализует класс ICardView.
**Конструктор класса** 
принимает аргументы:
**Поля класса**
- title - поле содержит заголовок карточки (тип поля - HTMLTitleElement);
- image - поле содержит изображение товара (тип поля - HTMLImageElement);
- category - поле отображает категорию товара(тип поля - HTMLElement);
- description - поле отображает блок с описанием товара в карточке (тип поля - HTMLElement);
- price - поле отображает цену товара (тип поля - HTMLElement);
**Методы класса**

### Класс ModalView
Класс реализует компонент модального окна приложения. Используется для отображения карточки товара, карточки корзины и карточки оформления заказа. Класс относится к слою представления. Наследует класс Component и реализует класс IModal.
**Конструктор класса** 
принимает аргументы:
**Поля класса**
- title - поле содержит заголовок модального окна (тип поля - HTMLTitleElement);
- content - поле содержит контейнер для отображения (тип поля - HTMLElement);
**Методы класса**

### Класс FormView
Класс реализует компонент формы, используемый при оформлении заказа. Класс относится к слою представления. Наследует класс Component и реализует класс IForm.
**Конструктор класса** 
принимает аргументы:
**Поля класса**
- hendlerFunction - поле содержит функцию, вызываемую при отправке данных формы (тип поля - Function);
- buttonText - поле содержит текст кнопки с типом submit (тип поля - строка);
- submit - поле содержит элемент кнопки с типом submit (тип поля - HTMLButtonElement);
**Методы класса**

### Класс BusketItemView
Класс реализует отображениее товара в корзине. Наследует класс CardView. Является элементом слоя представления.
**Конструктор класса**
**Поля класса**
**Методы класса**
- deleteItem
- showGoodCard

## Пользовательские типы

### Price
Содержит типы, используемые для указания цены товара.
Возможные значения: number, null.

### GoodCategory
Содержит используемые категории товаров.
Возможные значения: софт-скил, другое, дополнительное, кнопка, хард-скил;

### PayType
Содержит допустимые варианты оплаты.
Возможные значения: онлайнб при получении.

### Интерфейс IGood 
Описывает информацию о товаре. Используется в классах: GoodModel, BusketModal.

**Поля интерфейса**
- id - поле содержит уникальный код товара (тип данных - текстовый);
- image - поле содержит ссылку на изображение товара (тип данных - текстовый);
- category - поле содержит информацию о категории товара (тип данных пользовательский - GoodCategory);
- title - поле содержит наименование товара (тип данных - текстовый);
- description - поле содержит описание товара (тип данных - текстовый);
- price - поле содержит данные о цене товара  (тип данных пользовательский - Price);

### Интерфейс IOrder 
Описывает информацию о заказе. Интерфейс относится к слою модели данных.
**Поля интерфейса**
- address - поле содержит адрес доставки заказа (тип данных - текстовый);
- payType - поле содержит данные о варианте оплаты заказа (тип данных пользовательский - PayType);
- email - поле содержит адрес электронной почты покупателя (тип данных - текстовый);
- telephone - поле содержит телефон покупателя (тип данных - текстовый);

### Интерфейс ICardView
Описывает карточку товара. Интерфейс относится к слою представления.

``export interface ICardView {
title: HTMLTitleElement;
image: HTMLImageElement;
category: HTMLElement;
description: HTMLElement;
price: HTMLElement;}``

  export interface ICardView {
  title: HTMLTitleElement;
  image: HTMLImageElement;
  category: HTMLElement;
  description: HTMLElement;
  price: HTMLElement;}

`title: HTMLTitleElement;`

````export interface ICardView {
title: HTMLTitleElement;
image: HTMLImageElement;
category: HTMLElement;
description: HTMLElement;
price: HTMLElement;}````

**Поля интерфейса**
- title - поле содержит заголовок карточки (тип поля - HTMLTitleElement);
- image - поле содержит изображение товара (тип поля - HTMLImageElement);
- category - поле отображает категорию товара(тип поля - HTMLElement);
- description - поле отображает блок с описанием товара в карточке (тип поля - HTMLElement);
- price - поле отображает цену товара (тип поля - HTMLElement);

### Интерфейс IModal
Описывает модальное окно приложения. Интерфейс относится к слою представления.
**Поля интерфейса**
- title - поле содержит заголовок модального окна (тип поля - HTMLTitleElement);
- content - поле содержит контейнер для отображения (тип поля - HTMLElement);
- exitButton - поле содержит элемент кнопки закрытия модального окна (тип поля - HTMLButtonElement);

### Интерфейс IForm
Описывает элемент формы, используемый в карточке оформления заказа. Интерфейс относится к слою представления.
Описывает модальное окно приложения. Интерфейс относится к слою представления.
**Поля интерфейса**
- hendlerFunction - поле содержит функцию, вызываемую при отправке данных формы (тип поля - Function);
- buttonText - поле содержит текст кнопки с типом submit (тип поля - строка);
- submit - поле содержит элемент кнопки с типом submit (тип поля - HTMLButtonElement);
**Методы интерфейса**
- setPlaceholder - метод устанавливает значение плейсхолдера для элемента, переданного в качестве аргумента. Входящие параметры: элемент, текст сообщения. Возвращаемого значения нет;
- setHendler - метод устанавливает обработчик события для переданного в качестве аргумента элемента формы. Входящие параметры: элемент, событие, функция. Возвращаемого значения нет;
- getValue - метод возвращает значение поля, переданного в качестве аргумента. Возвращаемого значения нет;
- clear - метод очищает все поля формы. Входящих параметров и возвращаемого значения нет;

### Интерфейс IBusketView



**Поля интерфейса**
goodCards:  Map<number, BusketItemView>;
summ: number;
buttonRegister: HTMLButtonElement;
registerFunction: Function;
**Методы интерфейса**
setElementHendler(element: HTMLElement, event:Event, registerFunction: Function) 

### Интерфейс IBusketModel