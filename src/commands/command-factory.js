// import * as blockOperation from "../block-operation";
// import * as blockOptionOperation from '../components/quick-menu/quick-insert-menu';
// import * as jWindow from '../j-window';

// import instance from "../components/quick-menu/QuickMenu";

// import * as textFormattingBarOperation from '../components/floating-toolbar/text-formatting-bar';

// export function createCommand(operationName, elements = null) {
//     return new Command(operationName, elements);
// }

// class Command {

//     constructor(operationName, elements) {
//         this.elements = elements;
//         this.operation = getBlockOperationFunction(operationName);
//     }

//     execute() {

//         setTimeout(() => {
//             if (this.elements !== null) {
//                 this.operation(...this.elements);
//             } else {
//                 this.operation();
//             }
//         }, 0);

//     }
// }

// export const OPERATIONS = {
//     BLOCK: {
//         CREATE_LIST_ELEMENT: 'create-list-element',
//         CREATE_NEW_ELEMENT: 'create-new-element',
//         DELETE_DRAGGABLE_BLOCK: 'delete-block',
//         DELETE_AND_FOCUS_ON_NEXT: 'delete-and-focus-on-next',
//         DELETE_AND_FOCUS_ON_PREVIOUS: 'delete-and-focus-on-previous',
//         DUPLICATE_SELECTED_BLOCK: 'duplicate-selected-block',
//         TRANSFORM_BLOCK: 'transform-block',
//         MOVE_UP_BLOCK: 'move-up-block',
//         MOVE_DOWN_BLOCK: 'move-down-block',
//         SHOW_TURN_INTO_BOX: 'show-turn-into-box',
//         SHOW_COLOR_BOX: 'show-color-box',
//         SHOW_MORE_OPTIONS_BOX: 'show-more-options-box'
//     },
//     BLOCK_OPTIONS: {
//         SHOW_BLOCK_OPTIONS: 'show-block-options',
//         HIDE_CLEAR_BLOCK_OPTIONS: 'hide-clear-block-options',
//         MOVE_FAKE_FOCUS_TO_NEXT_OPTION: 'move-fake-focus-to-next-option',
//         MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION: 'move-fake-focus-to-previous-option',
//         APPLY_SELECTED_BLOCK_TYPE: 'apply-selected-block-type',
//         FILTER_CONCAT: 'filter-contact',
//         FILTER_REMOVE_LAST: 'filter-remove-last',
//     },
//     FORMATTING_BAR: {
//         SHOW_TEXT_FORMATTING_BAR: 'show-text-formatting-bar',
//         HIDE_TEXT_FORMATTING_BAR: 'hide-text-formatting-bar',
//         TOGGLE_MORE_OPTIONS_BOX: 'toggle-more-options-box',
//         TOGGLE_CHANGE_COLOR_BOX: 'toggle-change-color-box',
//         TOGGLE_TURN_INTO_BOX: 'toggle-turn-into-box',
//         TOGGLE_INPUT_LINK_BOX: 'toggle-input-link-box',
//         INPUT_LINK_URL: 'input-link-url',
//         TOGGLE_ENCLOSE_SELECTED_TEXT_TO: 'toggle-enclose-selected-text-to',
//     },

// };

// export const operationMap = {
//     [OPERATIONS.BLOCK.CREATE_LIST_ELEMENT]: blockOperation.createListItem,
//     [OPERATIONS.BLOCK.CREATE_NEW_ELEMENT]: blockOperation.createNewElement,
//     [OPERATIONS.BLOCK.DELETE_DRAGGABLE_BLOCK]: blockOperation.deleteDraggableParentBlock,
//     [OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_NEXT]: blockOperation.deleteAndFocusOnNext,
//     [OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_PREVIOUS]: blockOperation.deleteAndFocusOnPrevious,
//     [OPERATIONS.BLOCK.DUPLICATE_SELECTED_BLOCK]: blockOperation.duplicateSelectedBlock,
//     [OPERATIONS.BLOCK.TRANSFORM_BLOCK]: blockOperation.transformBlock,
//     [OPERATIONS.BLOCK.MOVE_UP_BLOCK]: blockOperation.moveUpBlock,
//     [OPERATIONS.BLOCK.MOVE_DOWN_BLOCK]: blockOperation.moveDownBlock,
//     [OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS]: blockOptionOperation.showMainBlockOptions,
//     [OPERATIONS.BLOCK_OPTIONS.HIDE_CLEAR_BLOCK_OPTIONS]: blockOptionOperation.hideAndClearBlockOptions,
//     [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION]: instance.moveTheFakeFocusToTheNextMenuItem,   // blockOptionOperation.moveTheFakeFocusToTheNextBlockOption,
//     [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION]: blockOptionOperation.moveTheFakeFocusToPreviousBlockOption,
//     [OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_BLOCK_TYPE]: blockOptionOperation.applySelectedBlockType,
//     [OPERATIONS.BLOCK_OPTIONS.FILTER_CONCAT]: blockOptionOperation.filterContact,
//     [OPERATIONS.BLOCK_OPTIONS.FILTER_REMOVE_LAST]: blockOptionOperation.filterRemoveLast,
//     [OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR]: textFormattingBarOperation.showTextFormattingBar,
//     [OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR]: textFormattingBarOperation.hideTextFormattingBar,
//     [OPERATIONS.FORMATTING_BAR.TOGGLE_MORE_OPTIONS_BOX]: textFormattingBarOperation.toggleMoreOptionsBox,
//     [OPERATIONS.FORMATTING_BAR.TOGGLE_CHANGE_COLOR_BOX]: textFormattingBarOperation.toggleChangeColorBox,
//     [OPERATIONS.FORMATTING_BAR.TOGGLE_TURN_INTO_BOX]: textFormattingBarOperation.toggleTurnIntoBox,
//     [OPERATIONS.FORMATTING_BAR.TOGGLE_INPUT_LINK_BOX]: textFormattingBarOperation.toggleInputLinkBox,
//     [OPERATIONS.FORMATTING_BAR.INPUT_LINK_URL]: textFormattingBarOperation.inputLinkUrl,
//     [OPERATIONS.FORMATTING_BAR.TOGGLE_ENCLOSE_SELECTED_TEXT_TO]: textFormattingBarOperation.toggleEncloseSelectedTextTo,
//     [OPERATIONS.SHOW_TURN_INTO_BOX]: blockOperation.transformBlock,
//     [OPERATIONS.SHOW_COLOR_BOX]: blockOperation.transformBlock,
//     [OPERATIONS.SHOW_MORE_OPTIONS_BOX]: blockOperation.transformBlock
// };

// export function getBlockOperationFunction(blockOperation) {
//     const operationFunction = operationMap[blockOperation];
//     if (!operationFunction) {
//         throw new Error('Operation Not Found Exception');
//     }
//     return operationFunction;
// }