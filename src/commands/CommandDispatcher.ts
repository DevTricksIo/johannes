import { CustomEvents } from "@/common/CustomEvents";
import { Commands } from "./Commands";
import { BlockOperationsService } from "@/services/block-operations/BlockOperationsService";
import { ICommandEventDetail } from "./ICommandEventDetail";
import { DependencyContainer } from "@/core/DependencyContainer";
import { IBlockOperationsService } from "@/services/block-operations/IBlockOperationsService";
import { ITableOperationsService } from "@/services/table-operations/ITableOperationsService";
import { ITextOperationsService } from "@/services/text-operations/ITextOperationsService";
import { TableScopes } from "@/services/table-operations/TableScopes";
import { Colors } from "@/common/Colors";

/**
 * Central command dispatcher class for handling various editor commands related to text and block manipulation.
 * This class encapsulates the logic needed to execute commands such as bold, italic, underline, color changes, and structural modifications to content blocks within an editor.
 *
 * @class
 * @singleton
 * Methods in this class are triggered by event listeners that listen for custom events which dictate the type of command to be executed.
 *
 * Example usage:
 * ```javascript
 * const commandDispatcher = CommandDispatcher.getInstance();
 * commandDispatcher.listen();  // Start listening for command and selection change events.
 * ```
 */
export class CommandDispatcher {

    private static instance: CommandDispatcher | null = null;

    private blockOperationsService: IBlockOperationsService;
    private tableOperationsService: ITableOperationsService;
    private textOperationsService: ITextOperationsService;

    /**
     * Private constructor to enforce singleton pattern.
     * Throws an error if attempted to be instantiated more than once.
     */
    private constructor(
        blockOperationsService: IBlockOperationsService,
        textOperationService: ITextOperationsService,
        tableOperationsService: ITableOperationsService) {

        if (CommandDispatcher.instance) {
            throw new Error("Attempt to instantiate singleton `CommandDispatcher` more than once.");
        }

        this.blockOperationsService = blockOperationsService;
        this.textOperationsService = textOperationService;
        this.tableOperationsService = tableOperationsService;
    }

    /**
     * Retrieves or creates an instance of CommandDispatcher.
     * @returns {CommandDispatcher} The singleton instance of the CommandDispatcher.
     */
    public static getInstance(): CommandDispatcher {

        const blockOperationsService = DependencyContainer.Instance.resolve<IBlockOperationsService>("IBlockOperationsService");
        const textOperationService = DependencyContainer.Instance.resolve<ITextOperationsService>("ITextOperationsService");
        const tableOperationsService = DependencyContainer.Instance.resolve<ITableOperationsService>("ITableOperationsService");

        if (!CommandDispatcher.instance) {
            CommandDispatcher.instance = new CommandDispatcher(blockOperationsService, textOperationService, tableOperationsService);
        }
        return CommandDispatcher.instance;
    }

    /**
     * Initializes listeners for various editor-related events such as command requests and selection changes.
     */
    public listen(): void {
        document.addEventListener(CustomEvents.emittedCommand, this.handleCommandEvent as EventListener);
        document.addEventListener(CustomEvents.focusOnFirstRequested, this.handleFocusOnFirstRequestedEvent);
    }

    /**
     * Handles command events dispatched from UI components or other parts of the application.
     * @param {CustomEvent<ICommandEventDetail>} event - The event object containing details about the command.
     */
    private handleCommandEvent = (event: CustomEvent<ICommandEventDetail>): void => {
        const { command, showUI, value, targetBlockType, block, scope } = event.detail;

        switch (command) {
            case Commands.toggleBold:
                this.textOperationsService.execBold();
                break;
            case Commands.toggleItalic:
                this.textOperationsService.execItalic();
                break;
            case Commands.toggleUnderline:
                this.textOperationsService.execUnderline();
                break;
            case Commands.toggleStrikeThrough:
                this.textOperationsService.execStrikeThrough();
                break;
            case Commands.toggleHiliteColor:
                if (!value) {
                    throw new Error(`${Commands.toggleHiliteColor} requires a color value`);
                }
                this.textOperationsService.execHiliteColor(value);
                break;
            case Commands.toggleForeColor:
                if (!value) {
                    throw new Error(`${Commands.toggleForeColor} requires a color value`);
                }
                this.textOperationsService.execForeColor(value);
                break;
            case Commands.transformBlock:
                if (!value) {
                    throw new Error(`${Commands.transformBlock} requires a value that represents the target element type.`);
                }
                this.execTransformBlock(value);
                break;
            case Commands.duplicateBlock:
                this.execDuplicateBlock();
                break;
            case Commands.deleteBlock:
                this.execDeleteBlock();
                break;
            case Commands.removeFormat:
                this.execRemoveFormat();
                break;
            case Commands.createDefaultBlock:
                this.execCreateDefaultBlock();
                break;
            case Commands.insertNew:
                this.execInsertNew();
                break;
            case Commands.focusOnPreviousBlock:
                this.execFocusOnPreviousBlock();
                break;
            case Commands.insertTableColumnLeft:
                this.tableOperationsService.insertColumnLeft();
                break;
            case Commands.insertTableColumnRight:
                this.tableOperationsService.insertColumnRight(block || null);
                break;
            case Commands.insertTableRowAbove:
                this.tableOperationsService.insertRowAbove();
                break;
            case Commands.insertTableRowBelow:
                this.tableOperationsService.insertRowBelow(block || null);
                break;
            case Commands.toggleCellHiliteColor:
                if (!value) {
                    throw new Error(`${Commands.toggleCellHiliteColor} requires a value that represents the cell background color.`);
                }
                this.tableOperationsService.execCellBackgroundColor(value);
                break;
            case Commands.removeColumn:
                this.tableOperationsService.removeColumn();
                break;
            case Commands.removeRow:
                this.tableOperationsService.removeRow();
                break;
            case Commands.removeRow:
                this.tableOperationsService.removeRow();
                break;
            case Commands.changeTableBorderColor:
                this.tableOperationsService.changeTableBorderColor(scope as TableScopes, value as Colors);
                break;
            // case Commands.showInsertTableColumnElement:
            //     if (!block) {
            //         throw new Error(`${Commands.insertTableColumn} requires a block with a target table inside.`);
            //     }
            //     this.tableOperationsService.showInsertColumnElement(block);
            //     break;
            // case Commands.showInsertTableRowElement:
            //     if (!block) {
            //         throw new Error(`${Commands.insertTableColumn} requires a block with a target table inside.`);
            //     }
            //     this.tableOperationsService.showInsertLineElement(block);
            //     break;
            // case Commands.hideInsertTableColumnElement:
            //     if (!block) {
            //         throw new Error(`${Commands.insertTableColumn} requires a block with a target table inside.`);
            //     }
            //     this.tableOperationsService.hideInsertColumnElement(block);
            //     break;
            // case Commands.hideInsertTableRowElement:
            //     if (!block) {
            //         throw new Error(`${Commands.insertTableColumn} requires a block with a target table inside.`);
            //     }
            //     this.tableOperationsService.hideInsertRowElement(block);
            //     break;
            default:
                console.error(`No action defined for command: ${command}`);
        }
    }

    private execTransformBlock(targetBlockType: string): boolean {
        this.blockOperationsService.transformBlock(targetBlockType);
        return true;
    }

    private execDuplicateBlock(): boolean {
        return this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DUPLICATE, false);
    }

    private execDeleteBlock(): boolean {
        return this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE, false);
    }

    private execRemoveFormat(): boolean {
        return this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.REMOVE_FORMAT, false);
    }

    private execCreateDefaultBlock(): boolean {
        return this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK, false);
    }

    private execInsertNew(): boolean {
        return this.blockOperationsService.createNewElementAndSplitContent();
    }

    private execFocusOnPreviousBlock(): boolean {
        return this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.DELETE_FOCUS_ON_PREVIOUS, false);
    }

    private handleFocusOnFirstRequestedEvent = (): void => {
        // alert("focus on first");
        this.blockOperationsService.execCommand(BlockOperationsService.BLOCK_OPERATIONS.FOCUS_ON_FIRST, false);
    }
}
