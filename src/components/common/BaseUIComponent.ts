abstract class BaseUIComponent<T extends HTMLElement = HTMLElement> {

    props: Record<string, any>;
    htmlElement: T;

    constructor(props: Record<string, any>) {

        this.props = props;

        this.htmlElement = this.init() as T;
    }

    abstract init(): HTMLElement;

    abstract display: string;

    documentAppendTo(parent: HTMLElement): void {
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

    focus() {
        this.htmlElement.focus();
    }
}

export default BaseUIComponent;