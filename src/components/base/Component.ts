export abstract class Component<T> {
  constructor(protected container: HTMLElement) {};
  // если мы делаем компонент по шаблону, то где его использовать??
  setVisible(element: HTMLElement) {};
  setDisable(element: HTMLElement) {};
  setTextContent(element: HTMLElement, value: string) {};
  setImage(element: HTMLElement, url: string, alt: string) {};
  cloneElement(elementID: string): HTMLElement {    
     const template = document.querySelector(elementID) as HTMLTemplateElement;
     const newElement =template.content.cloneNode(true) as HTMLElement;
    return newElement;
  };
  setHendler(element: HTMLElement, event:Event, hendlerFunction: Function) {};
  addClass(element: HTMLElement, className: string) {};
  hasClass(element: HTMLElement, className: string): boolean {return true};
  removeClass(element: HTMLElement, className: string) {};
  toggleClass(element: HTMLElement, className: string) {};
  render(data?: Partial<T>): HTMLElement {
    return this.container;
  };

  //Наверно, компонент и вью - это два отдельных класса? Почему и как делить?
}





