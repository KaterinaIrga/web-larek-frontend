export abstract class Component<T> {
	constructor(protected container: HTMLElement) {}
	setVisible(element: HTMLElement, isVisible = true) {
		if (isVisible) {
			element.style.visibility = 'visible';
		} else {
			element.style.visibility = 'hidden';
		}
	}
	setDisable(element: HTMLElement, isDisable = true) {
		if (element) {
			if (isDisable) {
				element.setAttribute('disabled', 'disabled');
			} else {
				element.removeAttribute('disabled');
			}
		}
	}
	setTextContent(element: HTMLElement, value: string) {
		if (element) {
			element.textContent = value;
		}
	}
	setImage(element: HTMLImageElement, src: string, alt?: string) {
		if (element) {
			element.src = src;
			if (alt) {
				element.alt = alt;
			}
		}
	}
	setClassName(element: HTMLElement, className: string) {
		if (element) {
			element.classList.add(className)
		}
	}
	removeClassName(element: HTMLElement, className: string) {
		if (element) {
			element.classList.remove(className)
		}
	}
	toggleClass(element: HTMLElement, className: string, force?: boolean) {
		element.classList.toggle(className, force);
	}
	hasClass(element: HTMLElement, className: string): boolean {
		return element.classList.contains(className);
	}
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}
