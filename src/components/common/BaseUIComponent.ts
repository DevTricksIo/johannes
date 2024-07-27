export abstract class BaseUIComponent<T extends HTMLElement = HTMLElement> {

    private _canHide: boolean;

    props: Record<string, any>;
    htmlElement: T;

    constructor(props: Record<string, any>) {

        this.props = props;

        this.htmlElement = this.init() as T;
        this._canHide = true;
    }

    abstract init(): HTMLElement;

    get display(): string {
        return 'block';
    }

    documentAppendTo(parent: HTMLElement): void {
        parent.appendChild(this.htmlElement);
    }

    get isVisible() {
        let element: HTMLElement = this.htmlElement;

        if (element.style.display === 'none' || element.style.visibility === 'hidden' || !document.contains(element)) {
            return false;
        }

        while (element) {
            const style = window.getComputedStyle(element);

            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }

            if (element.parentElement) {
                element = element.parentElement;
            } else {
                break;
            }
        }

        return true;
    }

    show() {
        this._canHide = false;
        this.htmlElement.style.display = this.display;

        setTimeout(() => {
            this._canHide = true;
        }, 100);
    }

    hide() {
        if (!this._canHide) {

            console.warn("Attempted to hide the element before 100 milliseconds have passed since the last display.");
            // return;
            // throw new Error("Attempted to hide the element before 100 milliseconds have passed since the last display.");
        }

        this.htmlElement.style.display = 'none';
    }

    get canHide(): boolean {
        return this._canHide && this.isVisible;
    }

    set canHide(value: boolean) {
        this._canHide = value;
    }

    focus() {
        this.htmlElement.focus();
    }

    changeVisibilityToVisible(): void {
        this.htmlElement.style.visibility = "visible";
    }

    changeVisibilityToHidden(): void {
        this.htmlElement.style.visibility = "hidden";
    }

    get doesElementOverflowScreen(): boolean {

        const originalDisplay = this.htmlElement.style.display;
        const originalVisibility = this.htmlElement.style.visibility;
        const originalPosition = this.htmlElement.style.position;

        if (originalDisplay === 'none') {
            this.htmlElement.style.display = 'block';
            this.htmlElement.style.visibility = 'hidden';
            this.htmlElement.style.position = 'absolute';
        }

        const elementRect = this.htmlElement.getBoundingClientRect();
        const screenWidth = window.innerWidth;

        if (originalDisplay === 'none') {
            this.htmlElement.style.display = originalDisplay;
            this.htmlElement.style.visibility = originalVisibility;
            this.htmlElement.style.position = originalPosition;
        }

        const elementRightEdge = elementRect.right;

        if (elementRightEdge > screenWidth) {
            return true;
        }

        if (elementRect.left < 0) {
            return true; 
        }

        return false;
    }
}