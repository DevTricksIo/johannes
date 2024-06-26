import * as block from "./block-operation";
import { createListItem } from "./create-list-item";
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
        DELETE_DRAGGABLE_BLOCK: 'delete-draggable-block',
        DELETE_CURRENT_ELEMENT_AND_PARENT_BLOCK_IF_EMPTY: 'delete-current-element-and-parent-block-if-empty',
        DUPLICATE_BLOCK: 'duplicate-block',
        TRANSFORM_BLOCK: 'transform-block',
        MOVE_UP_BLOCK: 'move-up-block',
        MOVE_DOWN_BLOCK: 'move-down-block',
        
        
        SHOW_TURN_INTO_BOX: 'show-turn-into-box',
        SHOW_COLOR_BOX: 'show-color-box',
        SHOW_MORE_OPTIONS_BOX: 'show-more-options-box'
    },
    BLOCK_OPTIONS:{
        SHOW_BLOCK_OPTIONS: 'show-block-options',
        HIDE_BLOCK_OPTIONS: 'hide-block-options',
        MOVE_FAKE_FOCUS_TO_NEXT_OPTION: 'move-fake-focus-to-next-option',
        MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION: 'move-fake-focus-to-previous-option',
        APPLY_SELECTED_FAKE_FOCUS_TYPE: 'apply-selected-fake-focus-type',
    },
    FORMATTING_BAR:{
        SHOW_TEXT_FORMATTING_BAR: 'show-text-formatting-bar',
    },

};

export const operationMap = {
    [OPERATIONS.BLOCK.CREATE_DEFAULT_BLOCK]: block.createADefaultBlock,
    [OPERATIONS.BLOCK.CREATE_LIST_ELEMENT]: createListItem,
    [OPERATIONS.BLOCK.DELETE_DRAGGABLE_BLOCK]: block.deleteDraggableParentBlock,
    [OPERATIONS.BLOCK.DELETE_CURRENT_ELEMENT_AND_PARENT_BLOCK_IF_EMPTY]: block.deleteTheCurrentElementAndTheDraggableBlockIfEmpty,
    [OPERATIONS.BLOCK.DUPLICATE_BLOCK]: block.duplicateBlock,
    [OPERATIONS.BLOCK.TRANSFORM_BLOCK]: block.transformBlock,
    [OPERATIONS.BLOCK.MOVE_UP_BLOCK]: block.moveUpBlock,
    [OPERATIONS.BLOCK.MOVE_DOWN_BLOCK]: block.moveDownBlock,
    [OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS]: jWindow.blockOptionsManager.showBlockOptions,
    [OPERATIONS.BLOCK_OPTIONS.HIDE_BLOCK_OPTIONS]: jWindow.blockOptionsManager.hideBlockOptions,
    [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION]: jWindow.blockOptionsManager.moveTheFakeFocusToTheNextBlockOption,
    [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION]: jWindow.blockOptionsManager.moveTheFakeFocusToPreviousBlockOption,
    [OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_FAKE_FOCUS_TYPE]: jWindow.blockOptionsManager.applySelectedFakeFocusType,
    [OPERATIONS.SHOW_TEXT_FORMATTING_BAR]: block.transformBlock,
    [OPERATIONS.SHOW_TURN_INTO_BOX]: block.transformBlock,
    [OPERATIONS.SHOW_COLOR_BOX]: block.transformBlock,
    [OPERATIONS.SHOW_MORE_OPTIONS_BOX]: block.transformBlock
};

export function getBlockOperationFunction(blockOperation) {
    const operationFunction = operationMap[blockOperation];
    if (!operationFunction) {
        throw new Error('Operation Not Found Exception');
    }
    return operationFunction;
}