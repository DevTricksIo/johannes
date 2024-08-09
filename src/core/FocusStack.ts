import { IFocusStack } from "./IFocusStack";

export class FocusStack implements IFocusStack {

    private static instance: FocusStack;
    private stack: HTMLElement[];
    private readonly capacity: number = 10;

    private constructor() {
        this.stack = [];
    }

    public static getInstance(): FocusStack {
        if (!FocusStack.instance) {
            FocusStack.instance = new FocusStack();
        }
        return FocusStack.instance;
    }

    public push(element: HTMLElement): void {
        if (this.stack.length >= this.capacity) {
            this.stack.shift();
        }
        this.stack.push(element);
    }

    public peek(): HTMLElement | undefined {
        return this.stack[this.stack.length - 1];
    }

    public clear(): void {
        this.stack = [];
    }
}