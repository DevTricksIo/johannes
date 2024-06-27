import * as blockOperation from "./block-operation";
import * as blockOptionOperation from './block-options-operations';
import * as jWindow from './j-window';

export function createCommand(operationName, elements = null) {
    return new Command(operationName, elements);
}

class Command {

    constructor(operationName, elements) {
        this.elements = elements;
        this.operation = getBlockOperationFunction(operationName);
    }

    execute() {
        if (this.elements !== null) {
            this.operation(...this.elements);
        } else {
            this.operation();
        }
    }
}

export const OPERATIONS = {
    BLOCK: {
        CREATE_DEFAULT_BLOCK: 'create-default-block',
        CREATE_LIST_ELEMENT: 'create-list-element',
        CREATE_NEW_ELEMENT: 'create-new-element',
        DELETE_DRAGGABLE_BLOCK: 'delete-draggable-block',
        DELETE_AND_FOCUS_ON_NEXT: 'delete-and-focus-on-next',
        DELETE_AND_FOCUS_ON_PREVIOUS: 'delete-and-focus-on-previous',
        DUPLICATE_BLOCK: 'duplicate-block',
        TRANSFORM_BLOCK: 'transform-block',
        MOVE_UP_BLOCK: 'move-up-block',
        MOVE_DOWN_BLOCK: 'move-down-block',
        SHOW_TURN_INTO_BOX: 'show-turn-into-box',
        SHOW_COLOR_BOX: 'show-color-box',
        SHOW_MORE_OPTIONS_BOX: 'show-more-options-box'
    },
    BLOCK_OPTIONS: {
        SHOW_BLOCK_OPTIONS: 'show-block-options',
        HIDE_CLEAR_BLOCK_OPTIONS: 'hide-clear-block-options',
        MOVE_FAKE_FOCUS_TO_NEXT_OPTION: 'move-fake-focus-to-next-option',
        MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION: 'move-fake-focus-to-previous-option',
        APPLY_SELECTED_FAKE_FOCUS_TYPE: 'apply-selected-fake-focus-type',
        FILTER_CONCAT: 'filter-contact',
        FILTER_REMOVE_LAST: 'filter-remove-last',
    },
    FORMATTING_BAR: {
        SHOW_TEXT_FORMATTING_BAR: 'show-text-formatting-bar',
    },

};

export const operationMap = {
    [OPERATIONS.BLOCK.CREATE_DEFAULT_BLOCK]: blockOperation.createADefaultBlock,
    [OPERATIONS.BLOCK.CREATE_LIST_ELEMENT]: blockOperation.createListItem,
    [OPERATIONS.BLOCK.CREATE_NEW_ELEMENT]: blockOperation.createNewElement,
    [OPERATIONS.BLOCK.DELETE_DRAGGABLE_BLOCK]: blockOperation.deleteDraggableParentBlock,
    [OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_NEXT]: blockOperation.deleteAndFocusOnNext,
    [OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_PREVIOUS]: blockOperation.deleteAndFocusOnPrevious,
    [OPERATIONS.BLOCK.DUPLICATE_BLOCK]: blockOperation.duplicateBlock,
    [OPERATIONS.BLOCK.TRANSFORM_BLOCK]: blockOperation.transformBlock,
    [OPERATIONS.BLOCK.MOVE_UP_BLOCK]: blockOperation.moveUpBlock,
    [OPERATIONS.BLOCK.MOVE_DOWN_BLOCK]: blockOperation.moveDownBlock,
    [OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS]: blockOptionOperation.showBlockOptions,
    [OPERATIONS.BLOCK_OPTIONS.HIDE_CLEAR_BLOCK_OPTIONS]: blockOptionOperation.hideAndClearBlockOptions,
    [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION]: blockOptionOperation.moveTheFakeFocusToTheNextBlockOption,
    [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION]: blockOptionOperation.moveTheFakeFocusToPreviousBlockOption,
    [OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_FAKE_FOCUS_TYPE]: blockOptionOperation.applySelectedFakeFocusType,
    [OPERATIONS.BLOCK_OPTIONS.FILTER_CONCAT]: blockOptionOperation.filterContact,
    [OPERATIONS.BLOCK_OPTIONS.FILTER_REMOVE_LAST]: blockOptionOperation.filterRemoveLast,
    [OPERATIONS.SHOW_TEXT_FORMATTING_BAR]: blockOperation.transformBlock,
    [OPERATIONS.SHOW_TURN_INTO_BOX]: blockOperation.transformBlock,
    [OPERATIONS.SHOW_COLOR_BOX]: blockOperation.transformBlock,
    [OPERATIONS.SHOW_MORE_OPTIONS_BOX]: blockOperation.transformBlock
};

export function getBlockOperationFunction(blockOperation) {
    const operationFunction = operationMap[blockOperation];
    if (!operationFunction) {
        throw new Error('Operation Not Found Exception');
    }
    return operationFunction;
}