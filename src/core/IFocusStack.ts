export interface IFocusStack {
    push(element: HTMLElement): void;
    peek(): HTMLElement | undefined;
    clear(): void;
}