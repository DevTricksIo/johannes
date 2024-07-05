abstract class BaseUIComponent<T extends HTMLElement = HTMLElement> {

    htmlElement: T;

    constructor() {
        this.htmlElement = this.init() as T;
    }

    appendTo(parent: HTMLElement): void {
        parent.appendChild(this.htmlElement);
    }

    isVisible() {
        return this.htmlElement.style.display !== 'none' &&
            this.htmlElement.style.visibility !== 'hidden' &&
            document.contains(this.htmlElement);
    }

    show() {
        this.htmlElement.style.display = this.display;
    }

    hide() {
        this.htmlElement.style.display = 'none';
    }

    abstract init(): HTMLElement;
    abstract display: string;
}

export default BaseUIComponent;