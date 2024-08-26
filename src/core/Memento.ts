import { CommonClasses } from "@/common/CommonClasses";
import { IMemento } from "./IMemento";
import { DOMUtils } from "@/utilities/DOMUtils";
import { DefaultJSEvents } from "@/common/DefaultJSEvents";
import { KeyboardKeys } from "@/common/KeyboardKeys";

export class Memento implements IMemento {

  private static query: string = "#johannesEditor .content-wrapper";
  private static instance: Memento;

  private undoStack: { html: string, caretPosition: { charIndex: number, horizontalPos: number, verticalPos: number } }[] = [];
  private redoStack: { html: string, caretPosition: { charIndex: number, horizontalPos: number, verticalPos: number } }[] = [];

  private get content(): HTMLElement {
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
      const clone = this.content.cloneNode(true) as HTMLElement;

      setTimeout(() => {
        const caretPosition = DOMUtils.saveCaretPosition3d(this.content);

        clone.querySelectorAll(`.${CommonClasses.EditorOnly}`).forEach(el => el.remove());

        this.undoStack.push({ html: clone.innerHTML, caretPosition });
        this.redoStack = [];
      }, 10);
    }
  }

  private undo() {
    if (this.undoStack.length > 1) {
      this.redoStack.push({ html: this.content.innerHTML, caretPosition: DOMUtils.saveCaretPosition3d(this.content) });

      const stateToRestore = this.undoStack.pop();
      if (stateToRestore) {
        this.content.innerHTML = stateToRestore.html;
        DOMUtils.restoreCaretPosition3d(this.content, stateToRestore.caretPosition);
      }
    }
  }

  private redo() {
    if (this.redoStack.length > 0) {
      this.undoStack.push({ html: this.content.innerHTML, caretPosition: DOMUtils.saveCaretPosition3d(this.content) });

      const stateToApply = this.redoStack.pop();
      if (stateToApply) {
        this.content.innerHTML = stateToApply.html;
        DOMUtils.restoreCaretPosition3d(this.content, stateToApply.caretPosition);
      }
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

    // document.addEventListener("input", (event: Event) => {
    //   const inputEvent = event as InputEvent;
    //   if (!inputEvent.isComposing && !inputEvent.inputType.startsWith("delete")) {
    //     window.clearTimeout(this.debounceTimer);
    //     this.debounceTimer = window.setTimeout(() => {
    //       this.saveState();
    //     }, this.debounceDelay);
    //   }
    // });


    document.addEventListener(DefaultJSEvents.Keyup, (event: KeyboardEvent) => {
      if (event.key == KeyboardKeys.Space) {
        this.saveState();
      }
    });

  }

  static getInstance(): Memento {
    if (!Memento.instance) {
      Memento.instance = new Memento();
    }

    return Memento.instance;
  }
}
