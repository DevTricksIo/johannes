import { Commands } from "@/commands/Commands";
import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { CustomEvents } from "@/common/CustomEvents";
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { IShortcutListeners } from "./IShortcutListeners";

export class ShortcutListeners implements IShortcutListeners {

    private static instance: ShortcutListeners | null = null;

    private constructor() {
        if (ShortcutListeners.instance) {
            throw new Error("Use ShortcutListeners.getInstance() to get instance.");
        }

        this.listen();
    }

    startListen(): void {
        console.log("listening keyboard shortcuts");
    }

    static getInstance(): ShortcutListeners {
        if (ShortcutListeners.instance) {
            return ShortcutListeners.instance;
        }

        return new ShortcutListeners();
    }

    private listen() {
        document.addEventListener("keydown", (event) => {

            const isNumPad = event.code.startsWith("Numpad");
            const numLockOn = event.getModifierState("NumLock");

            if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === "Enter")) {
                // Converts to paragraph when pressing Ctrl+Shift+Enter
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.PARAGRAPH
                    }
                }));

            } else if ((event.ctrlKey || event.metaKey) && !event.altKey && (event.code === "Digit1" || event.code === "Numpad1")) {
                // Converts to checklist when pressing  Ctrl+Shift+1
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.CHECK_LIST
                    }
                }));

            } else if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key === ".") {
                // Converts to bulleted list when pressing  Ctrl+Shift+.
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.BULLETED_LIST
                    }
                }));
            } else if ((event.ctrlKey || event.metaKey) && !event.shiftKey && (event.key === "/")) {
                // Converts to numbered list when pressing Ctrl+Shift+/
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.NUMBERED_LIST
                    }
                }));
            } else if ((event.ctrlKey && event.altKey && ((event.code === "Digit1") || (isNumPad && numLockOn && event.code === "Numpad1")))) {
                // Converts to h1 when pressing Ctrl+Alt+1
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.HEADER_1
                    }
                }));
            } else if ((event.ctrlKey && event.altKey && ((event.code === "Digit2") || (isNumPad && numLockOn && event.code === "Numpad2")))) {
                // Converts to h2 when pressing Ctrl+Alt+2
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.HEADER_2
                    }
                }));
            } else if ((event.ctrlKey && event.altKey && ((event.code === "Digit3") || (isNumPad && numLockOn && event.code === "Numpad3")))) {
                // Converts to h3 when pressing Ctrl+Alt+3
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.HEADER_3
                    }
                }));
            } else if ((event.ctrlKey && event.altKey && ((event.code === "Digit4") || (isNumPad && numLockOn && event.code === "Numpad4")))) {
                // Converts to h4 when pressing Ctrl+Alt+4
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.HEADER_4
                    }
                }));
            } else if ((event.ctrlKey && event.altKey && ((event.code === "Digit5") || (isNumPad && numLockOn && event.code === "Numpad5")))) {
                // Converts to h5 when pressing Ctrl+Alt+5
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.HEADER_5
                    }
                }));
            } else if ((event.ctrlKey && event.altKey && ((event.code === "Digit6") || (isNumPad && numLockOn && event.code === "Numpad6")))) {
                // Converts to h6 when pressing Ctrl+Alt+6
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.transformBlock,
                        targetBlockType: ElementFactoryService.ELEMENT_TYPES.HEADER_6
                    }
                }));
            } else if ((event.key === "D" || event.key === "d") && event.ctrlKey) {
                // Duplicate block when pressing Ctrl+D
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.duplicateBlock,
                    }
                }));
            } else if ((event.key === "Delete" || event.key === "Backspace") && event.shiftKey) {
                // Delete block when pressing Shift+Delete
                event.preventDefault();
                event.stopPropagation();

                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.deleteBlock,
                    }
                }));
            } else if (event.key === "\\" && (event.ctrlKey || event.metaKey)) {
                // Clear formatting when pressing Ctrl+\
                document.dispatchEvent(new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.removeFormat,
                    }
                }));
            } else if (event.ctrlKey && event.altKey && event.code === "Digit1") {
                // Prevent character insertion when using top row '1'
                event.preventDefault();
            }
        });
    }
}