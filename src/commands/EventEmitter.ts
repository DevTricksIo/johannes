import { Colors } from "@/common/Colors";
import { TableScopes } from "@/services/table-operations/TableScopes";
import { ICommandEventDetail } from "./ICommandEventDetail";
import { CustomEvents } from "@/common/CustomEvents";
import { Commands } from "./Commands";
import { IUIEventDetail } from "./IUIEventDetail";
import { ChangeColor } from "./UIActions/ChangeColor";
import { CustomUIEvents } from "@/common/CustomUIEvents";
import { ShowHideActiveButton } from "./UIActions/ShowHideActiveButton";
import { ResetActiveButtons } from "./UIActions/ResetActiveButtons";
import { CloseElement } from "./UIActions/CloseElement";

export class EventEmitter {


    static emitCloseElementEvent(targetId: string) {

        const customEvent = new CustomEvent<IUIEventDetail>(CustomUIEvents.CloseElement, {
            detail: {
                targetId: targetId,
                action: new CloseElement
            }
        });

        document.dispatchEvent(customEvent);
    }

    static emitChangeComponentColorEvent(targetId: string, color: Colors) {

        const customEvent = new CustomEvent<IUIEventDetail>(CustomUIEvents.ColorChangeRequest, {
            detail: {
                targetId: targetId,
                action: new ChangeColor(color)
            }
        });

        document.dispatchEvent(customEvent);
    }

    static emitShowHideActiveElementEvent(targetClass: "hiliteColor" | "foreColor" | "backgroundColor", value: string, intension: "show" | "hide") {

        if (targetClass == "hiliteColor" && value == Colors.HiliteColorNone) {
            intension = "hide";
        }

        if (targetClass == "foreColor" && value == Colors.ForeColorInitial) {
            intension = "hide";
        }

        if (targetClass == "backgroundColor" && value == Colors.BackgroundColorNone) {
            intension = "hide";
        }

        const customEvent = new CustomEvent<IUIEventDetail>(CustomUIEvents.ShowHideActiveButton, {

            detail: {
                targetClass: targetClass,
                action: new ShowHideActiveButton(targetClass, value, intension)
            }
        });

        document.dispatchEvent(customEvent);
    }

    static emitResetActiveButtonsElementEvent(targetClass: "hiliteColor" | "foreColor" | "backgroundColor") {

        const customEvent = new CustomEvent<IUIEventDetail>(CustomUIEvents.ResetActiveButtons, {

            detail: {
                targetClass: targetClass,
                action: new ResetActiveButtons(targetClass)
            }
        });

        document.dispatchEvent(customEvent);
    }

    //TODO: rewrite this doc
    /**
    * Emits a custom event with the current formatting states if there is an active text selection.
    * This function is crucial in a text editing environment where multiple components might need to
    * update their state based on changes in text formatting. The emitted event (`CustomEvents.textFormatChanged`)
    * carries formatting state data, which components can use to synchronize their UI elements with the
    * current text formatting (e.g., updating button states, displaying active formatting options).
    *
    * This function first checks for an active and non-empty text selection.
    * If the selection is empty, the function exits early to avoid processing unnecessary events,
    * especially to mitigate issues in browsers like Firefox where `selectionchange` might fire during typing
    * without an actual change in selection.
    *
    * @private
    * @returns {void} No return value as this function is meant to emit events based on the formatting state.
    *
    * @example
    * // To invoke this function within a class that handles text formatting:
    * this.emitFormatChangeEvents();
    *
    * @description
    * Here's how the function works:
    * 1. Checks for an active and non-empty text selection. If empty, returns early.
    * 2. Gathers current state of text formatting commands such as 'bold', 'italic', 'underline', and 'strikeThrough',
    *    and dynamically collects the state of various highlight colors using a service.
    * 3. Dispatches a custom event (`CustomEvents.textFormatChanged`) with these formatting states.
    *    Components throughout the application listen to this event and update their states accordingly,
    *    ensuring that UI controls like toolbar buttons reflect the current formatting of the selected text.
    */
    // static emitFormatChangeEvent = (

    //     bold: boolean,
    //     italic: boolean,
    //     underline: boolean,
    //     strikeThrough: boolean,
    //     hiliteColor: { [key: string] : boolean }, 
    //     foreColor: { [key: string] : boolean}): void => {

    //     // This block checks for an active selection and whether it contains any content.
    //     // In Firefox, the `selectionchange` event may be fired even while typing,
    //     // which is not the intended trigger since we only want to react to actual changes in selection.
    //     // If the selection is empty or null, the function returns early, effectively ignoring
    //     // these unwanted `selectionchange` events during typing.
    //     const selection = document.getSelection();
    //     if (!selection || selection?.toString().trim() === '') {
    //         return;
    //     }

    //     const commandStates: IFormatCommand = {
    //         bold: bold,
    //         italic: italic,
    //         underline: underline,
    //         strikeThrough: strikeThrough,
    //         hiliteColor: hiliteColor,
    //         foreColor: foreColor,
    //         cellHiliteColor: {}
    //     };

    //     const customEvent = new CustomEvent<IFormatCommand>(CustomEvents.textFormatChanged, {
    //         detail: commandStates
    //     });

    //     document.dispatchEvent(customEvent);
    // }

    static emitChangeTableBorderColorEvent(scope: TableScopes, color: Colors): void {

        const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
            detail: {
                command: Commands.changeTableBorderColor,
                value: color,
                scope: scope
            }
        });

        document.dispatchEvent(customEvent);
    }


    // static emitCellChangeEvent = (cell: HTMLTableCellElement): void => {

    //     const cellHiliteColor: { [key: string]: boolean } = {};

    //     cellHiliteColor[Colors.HiliteColorRed] = TableUtils.isCellBackgroundColor(cell, Colors.HiliteColorRed);
    //     cellHiliteColor[Colors.HiliteColorGreen] = TableUtils.isCellBackgroundColor(cell, Colors.HiliteColorGreen);
    //     cellHiliteColor[Colors.HiliteColorBlue] = TableUtils.isCellBackgroundColor(cell, Colors.HiliteColorBlue);
    //     cellHiliteColor[Colors.HiliteColorYellow] = TableUtils.isCellBackgroundColor(cell, Colors.HiliteColorYellow);
    //     cellHiliteColor[Colors.HiliteColorGrey] = TableUtils.isCellBackgroundColor(cell, Colors.HiliteColorGrey);

    //     const commandStates: IFormatCommand = {
    //         bold: false,
    //         italic: false,
    //         underline: false,
    //         strikeThrough: false,
    //         hiliteColor: {},
    //         foreColor: {},
    //         cellHiliteColor: cellHiliteColor
    //     };

    //     const customEvent = new CustomEvent<IFormatCommand>(CustomEvents.textFormatChanged, {
    //         detail: commandStates
    //     });

    //     document.dispatchEvent(customEvent);
    // }

}