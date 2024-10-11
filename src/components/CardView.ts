import { Component} from './base/Component';
import { ICardView } from '../types/index';


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

