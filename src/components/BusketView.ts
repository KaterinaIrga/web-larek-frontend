import { Component } from './base/Component';
import { IBusketView, IBusketItemView } from '../../src/types/index';
import { CardView } from './CardView'

export class BusketView extends Component<IBusketView> {
  //Не совсем понимаю, что должно быть в этом классе. 
  //Поля из интерфейса, а дальше - не понятно. Где-то каша.
} 

class BusketItemView extends CardView implements IBusketItemView {
deleteItem(elem: HTMLElement) {};
showGoodCard(elem: HTMLElement): HTMLElement {};
}