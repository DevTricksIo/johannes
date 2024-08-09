import { IMemento } from "./IMemento";

export class Memento implements IMemento {

  private static query: string = "#johannesEditor .content";
  private static instance: Memento;

  private undoStack: string[] = [];
  private redoStack: string[] = [];

  private get content() : HTMLElement{
    return document.querySelector(Memento.query)!;
  }

  private constructor() {

    if (Memento.instance) {
      throw new Error("Use Memento.getInstance() to get instance.");
    }

    this.attachEvents();
    this.saveState();
  }

  saveState() {
    if (this.content) {
      this.undoStack.push(this.content.innerHTML);
      this.redoStack = [];
    }
  }

  private undo() {
    if (this.undoStack.length > 1 && this.content) {
      this.redoStack.push(this.content.innerHTML);
      const stateToRestore = this.undoStack.pop();
      this.content.innerHTML = stateToRestore!;
    }
  }

  private redo() {
    if (this.redoStack.length > 0 && this.content) {
      this.undoStack.push(this.content.innerHTML);
      const stateToApply = this.redoStack.pop();
      this.content.innerHTML = stateToApply!;
    }
  }


  attachEvents() {
    document.addEventListener("keydown", (event) => {
      if (event.ctrlKey && event.key === 'z') {
        this.undo();
        event.preventDefault();
      } else if (event.ctrlKey && event.key === 'y') {
        this.redo();
        event.preventDefault();
      }
    });
  }

  // private handleKeyDown(event: KeyboardEvent) {
  //   if (event.ctrlKey && event.key === 'z') {
  //     this.undo();
  //     event.preventDefault();
  //   } else if (event.ctrlKey && event.key === 'y') {
  //     this.redo();
  //     event.preventDefault();
  //   }
  // }

  static getInstance(): Memento {
    if (!Memento.instance) {
      Memento.instance = new Memento();
    }

    return Memento.instance;
  }
}