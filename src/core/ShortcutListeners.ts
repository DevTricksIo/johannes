import { Commands } from "@/commands/Commands";
import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { CustomEvents } from "@/common/CustomEvents";
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { IShortcutListeners } from "./IShortcutListeners";

/**
 * Manages keyboard shortcut listening for a web application. This class is implemented as a singleton to ensure
 * that keyboard event handling is centralized and that multiple instances do not duplicate event listeners.
 * It intercepts keydown events and dispatches commands based on specific key combinations, enhancing text editing
 * capabilities within the application.
 * 
 * The class initializes itself the first time `getInstance` is called and subsequently manages all keyboard shortcuts
 * through a single instance.
 * 
 * Usage of this class outside of its singleton pattern is restricted to prevent multiple instances, which is enforced
 * by throwing an error if the constructor is called directly after initialization.
 */
export class ShortcutListeners implements IShortcutListeners {

    /**
     * Holds the single instance of ShortcutListeners, ensuring the singleton pattern.
     * @type {ShortcutListeners | null}
     * @private
     */
    private static instance: ShortcutListeners | null = null;

    /**
     * Private constructor to prevent instantiation outside of the singleton context. Initializes the
     * shortcut listener setup by calling the `listen` method, ensuring it is called only once.
     * @throws {Error} If an attempt is made to directly instantiate this class.
     */
    private constructor() {
        if (ShortcutListeners.instance) {
            throw new Error("Use ShortcutListeners.getInstance() to get instance.");
        }

        this.listen();
    }

    startListen(): void {
        console.log("listening keyboard shortcuts");
    }

    /**
     * Provides access to the singleton instance of the ShortcutListeners class. If the instance does not
     * exist, it creates and returns it, ensuring there is only one instance throughout the application.
     *
     * @returns {ShortcutListeners} The single shared instance of the ShortcutListeners class.
     */
    static getInstance(): ShortcutListeners {
        if (ShortcutListeners.instance) {
            return ShortcutListeners.instance;
        }

        return new ShortcutListeners();
    }

    /**
    * Attaches a global event listener to the document to intercept keydown events and perform specific text transformation
    * commands based on the combination of keys pressed. This function is designed to enhance text editing capabilities
    * within a web application by providing keyboard shortcuts for various text formatting and editing actions.
    *
    * The function uses a combination of Ctrl, Alt (or AltGraph), Shift, and specific keys to determine the action to be
    * taken. It handles transformation into different block types like paragraphs, checklists, numbered lists, headers, etc.,
    * as well as block duplication and deletion.
    *
    * PreventDefault and stopPropagation are called to prevent the default key actions and bubbling of events, ensuring that
    * only the intended actions are executed.
    *
    * Supported Shortcuts:
    * - Ctrl+Shift+Enter: Transforms the current block into a paragraph.
    * - Ctrl+Shift+1 or Ctrl+Shift+Numpad1 (NumLock on): Transforms the current block into a checklist.
    * - Ctrl+Shift+. : Transforms the current block into a bulleted list.
    * - Ctrl+Shift+/ : Transforms the current block into a numbered list.
    * - Ctrl+Alt+1 through Ctrl+Alt+6: Transforms the current block into headers (H1 through H6).
    * - Ctrl+D: Duplicates the current block.
    * - Shift+Delete or Shift+Backspace: Deletes the current block.
    * - Ctrl+\ : Clears formatting of the current block.
    * - Ctrl+Alt+Digit1: Prevents character insertion when using the top row '1', specific to layout configurations.
    *
    * Each action dispatches a custom event with details about the command to be executed, which should be handled by
    * CommandDispatcher.
    *
    * @example
    * // Initialize and activate the shortcuts across the document.
    * const shortcutListener = ShortcutListeners.getInstance();
    */
    private listen() {
        document.addEventListener("keydown", (event) => {

            console.log(`Key: ${event.key}, Code: ${event.code}, Ctrl: ${event.ctrlKey}, Alt: ${event.altKey}, AltGr: ${event.key === 'AltGraph'}, NumLock: ${event.getModifierState('NumLock')}`);

            const isNumPad = event.code.startsWith("Numpad");
            const numLockOn = event.getModifierState("NumLock");

            if ((event.ctrlKey || event.metaKey) && event.shiftKey && (event.key === "Enter")) {
                // Converts to paragraph when pressing Ctrl+Shift+Enter
                event.preventDefault();
                event.stopPropagation();

                alert("converto para paragrafo");
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