export enum Commands {
    /** Text operations commands */
    toggleBold = "bold",
    toggleItalic = "italic",
    toggleHiliteColor = "hiliteColor",
    toggleForeColor = "foreColor",
    toggleInlineCode = "inlineCode",
    toggleLink = "createLink",
    toggleUnderline = "underline",
    toggleStrikeThrough = "strikeThrough",
    removeFormat = "removeFormat",

    /** Block operations commands */
    transformBlock = "transformBlock",
    duplicateBlock = "duplicateBlock",
    deleteBlock = "deleteBlock",
    createDefaultBlock = "createDefaultBlock",
    focusOnPreviousBlock = "focusOnPreviousBlock",
    
    /** wildcard command context based*/
    insertNew = "insertNew",

    /** table commands */
    insertTableRowAbove = "insertTableRowAbove",
    insertTableRowBelow = "insertTableRowBelow",
    insertTableColumnLeft = "insertTableColumnLeft",
    insertTableColumnRight = "insertTableColumnRight",
    showInsertTableColumnElement = "showInsertTableColumnElement",
    showInsertTableRowElement = "showInsertTableRowElement",
    hideInsertTableColumnElement = "hideInsertTableColumnElement",
    hideInsertTableRowElement = "hideInsertTableRowElement",
    toggleCellHiliteColor = "toggleCellHiliteColor",
    removeColumn = "removeColumn",
    removeRow = "removeRow",
    changeTableBorderColor = "changeTableBorderColor"
}