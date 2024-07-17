/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/style.css":
/*!*****************************!*\
  !*** ./src/style/style.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/Editor.ts":
/*!***********************!*\
  !*** ./src/Editor.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _errors_ElementNotFoundError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors/ElementNotFoundError */ "./src/errors/ElementNotFoundError.ts");
/* harmony import */ var _builders_FloatingToolbarBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./builders/FloatingToolbarBuilder */ "./src/builders/FloatingToolbarBuilder.ts");
/* harmony import */ var _builders_QuickMenuBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./builders/QuickMenuBuilder */ "./src/builders/QuickMenuBuilder.ts");
/* harmony import */ var _components_add_block_AddBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/add-block/AddBlock */ "./src/components/add-block/AddBlock.ts");
/* harmony import */ var _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/block-operations/BlockOperationsService */ "./src/services/block-operations/BlockOperationsService.ts");
/* harmony import */ var _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/element-factory/ElementFactoryService */ "./src/services/element-factory/ElementFactoryService.ts");






class Editor {
    editorId = "#johannesEditor";
    constructor(configuration = {}) {
        const defaults = {
            enableFloatingToolbar: false,
            enableQuickMenu: false,
            enableAddBlock: false,
            includeHeader: false,
            includeFirstParagraph: false
        };
        const config = { ...defaults, ...configuration };
        const editor = document.getElementById(this.editorId);
        if (!editor) {
            throw new _errors_ElementNotFoundError__WEBPACK_IMPORTED_MODULE_0__["default"](this.editorId);
        }
        editor.innerHTML = '';
        /* Dependencies */
        const elementFactoryService = new _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_5__["default"]();
        const blockOperationsService = _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_4__["default"].getInstance(elementFactoryService);
        /* Main components */
        const quickMenu = _builders_QuickMenuBuilder__WEBPACK_IMPORTED_MODULE_2__["default"].build(blockOperationsService);
        const floatingToolbar = _builders_FloatingToolbarBuilder__WEBPACK_IMPORTED_MODULE_1__["default"].build();
        if (config.enableAddBlock) {
            const addBlock = new _components_add_block_AddBlock__WEBPACK_IMPORTED_MODULE_3__["default"]();
            editor.appendChild(addBlock.htmlElement);
        }
        if (config.enableQuickMenu) {
            editor.appendChild(quickMenu.htmlElement);
        }
        if (config.enableFloatingToolbar) {
            editor.appendChild(floatingToolbar.htmlElement);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Editor);


/***/ }),

/***/ "./src/builders/FloatingToolbarBuilder.ts":
/*!************************************************!*\
  !*** ./src/builders/FloatingToolbarBuilder.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_floating_toolbar_dropdown_tool_DropdownMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/floating-toolbar/dropdown-tool/DropdownMenu */ "./src/components/floating-toolbar/dropdown-tool/DropdownMenu.ts");
/* harmony import */ var _components_floating_toolbar_FloatingToolbar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/floating-toolbar/FloatingToolbar */ "./src/components/floating-toolbar/FloatingToolbar.ts");
/* harmony import */ var _components_floating_toolbar_dropdown_tool_DropdownMenuList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/floating-toolbar/dropdown-tool/DropdownMenuList */ "./src/components/floating-toolbar/dropdown-tool/DropdownMenuList.ts");
/* harmony import */ var _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/floating-toolbar/dropdown-tool/DropdownMenuListItem */ "./src/components/floating-toolbar/dropdown-tool/DropdownMenuListItem.ts");
/* harmony import */ var _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/common/SVGIcon */ "./src/components/common/SVGIcon.ts");
/* harmony import */ var _components_floating_toolbar_separator_FloatingToolbarSeparator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/floating-toolbar/separator/FloatingToolbarSeparator */ "./src/components/floating-toolbar/separator/FloatingToolbarSeparator.ts");
/* harmony import */ var _components_floating_toolbar_group_button_GroupButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/floating-toolbar/group-button/GroupButton */ "./src/components/floating-toolbar/group-button/GroupButton.ts");
/* harmony import */ var _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/floating-toolbar/group-button/GroupedButton */ "./src/components/floating-toolbar/group-button/GroupedButton.ts");
/* harmony import */ var _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/floating-toolbar/dropdown-tool/ColorIcon */ "./src/components/floating-toolbar/dropdown-tool/ColorIcon.ts");
/* harmony import */ var _services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/text-operations/TextOperationService */ "./src/services/text-operations/TextOperationService.ts");
/* harmony import */ var _components_floating_toolbar_dropdown_tool_DropdownMenuButton__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/floating-toolbar/dropdown-tool/DropdownMenuButton */ "./src/components/floating-toolbar/dropdown-tool/DropdownMenuButton.ts");
/* harmony import */ var _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../services/block-operations/BlockOperationsService */ "./src/services/block-operations/BlockOperationsService.ts");












class FloatingToolbarBuilder {
    static build() {
        const floatingBar = new _components_floating_toolbar_FloatingToolbar__WEBPACK_IMPORTED_MODULE_1__["default"]();
        floatingBar.appendDropdown(FloatingToolbarBuilder.turnIntoDropdown());
        floatingBar.appendSeparator(FloatingToolbarBuilder.separator());
        floatingBar.appendSeparator(FloatingToolbarBuilder.groupButton());
        floatingBar.appendDropdown(FloatingToolbarBuilder.colorDropdown());
        floatingBar.appendSeparator(FloatingToolbarBuilder.separator());
        floatingBar.appendDropdown(FloatingToolbarBuilder.moreOptionsDropdown());
        return floatingBar;
    }
    static turnIntoDropdown() {
        const turnIntoBarList = new _components_floating_toolbar_dropdown_tool_DropdownMenuList__WEBPACK_IMPORTED_MODULE_2__["default"]("turnIntoSelect", "Turn into");
        const turnIntoBarButton = new _components_floating_toolbar_dropdown_tool_DropdownMenuButton__WEBPACK_IMPORTED_MODULE_10__["default"]("turnIntoButton", "Text", turnIntoBarList);
        const turnIntoDropdown = new _components_floating_toolbar_dropdown_tool_DropdownMenu__WEBPACK_IMPORTED_MODULE_0__["default"](turnIntoBarButton, turnIntoBarList);
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "p", null, SVGIcons.paragraph.htmlElement, "Text"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "bulleted-list", null, SVGIcons.b_list.htmlElement, "Bulleted list"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "numbered-list", null, SVGIcons.n_list.htmlElement, "Numbered list"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "code", null, SVGIcons.code.htmlElement, "Code"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "quote", null, SVGIcons.quote.htmlElement, "Quote"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "h1", null, SVGIcons.head1.htmlElement, "Heading 1"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "h2", null, SVGIcons.head2.htmlElement, "Heading 2"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "h3", null, SVGIcons.head3.htmlElement, "Heading 3"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "h4", null, SVGIcons.head4.htmlElement, "Heading 4"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "h5", null, SVGIcons.head5.htmlElement, "Heading 5"));
        turnIntoBarList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](turnIntoBarList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "h6", null, SVGIcons.head6.htmlElement, "Heading 6"));
        return turnIntoDropdown;
    }
    static separator() {
        return new _components_floating_toolbar_separator_FloatingToolbarSeparator__WEBPACK_IMPORTED_MODULE_5__["default"]();
    }
    static groupButton() {
        const groupButton = new _components_floating_toolbar_group_button_GroupButton__WEBPACK_IMPORTED_MODULE_6__["default"]();
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "link", "Link", "icon-material-link").documentAppendTo(groupButton.htmlElement);
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "bold", "Bold", "icon-wordpress-bold").documentAppendTo(groupButton.htmlElement);
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "italic", "Italic", "icon-material-italic").documentAppendTo(groupButton.htmlElement);
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "underline", "Underline", "icon-material-underline").documentAppendTo(groupButton.htmlElement);
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "copy", "Code", "icon-wordpress-code-mark").documentAppendTo(groupButton.htmlElement);
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "strikeThrough", "Strike-through", "icon-wordpress-strike-through").documentAppendTo(groupButton.htmlElement);
        new _components_floating_toolbar_group_button_GroupedButton__WEBPACK_IMPORTED_MODULE_7__["default"](_services_text_operations_TextOperationService__WEBPACK_IMPORTED_MODULE_9__["default"].getInstance(), "copy", "Equation", "icon-wordpress-equation-mark").documentAppendTo(groupButton.htmlElement);
        return groupButton;
    }
    static colorDropdown() {
        const colorDropdownList = new _components_floating_toolbar_dropdown_tool_DropdownMenuList__WEBPACK_IMPORTED_MODULE_2__["default"]("colorTextOptionSelect", "Background");
        const colorButton = new _components_floating_toolbar_dropdown_tool_DropdownMenuButton__WEBPACK_IMPORTED_MODULE_10__["default"]("colorTextButton", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("#FAF4D1").htmlElement, colorDropdownList);
        const colorDropdown = new _components_floating_toolbar_dropdown_tool_DropdownMenu__WEBPACK_IMPORTED_MODULE_0__["default"](colorButton, colorDropdownList);
        colorDropdownList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](colorDropdownList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "hiliteColor", "#FDDEDE", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("#FDDEDE").htmlElement, "Red"));
        colorDropdownList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](colorDropdownList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "hiliteColor", "#D7F7DC", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("#D7F7DC").htmlElement, "Green"));
        colorDropdownList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](colorDropdownList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "hiliteColor", "#D9EDF6", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("#D9EDF6").htmlElement, "Blue"));
        colorDropdownList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](colorDropdownList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "hiliteColor", "#FAF4D1", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("#FAF4D1").htmlElement, "Yellow"));
        colorDropdownList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](colorDropdownList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "hiliteColor", "#E1E0E0", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("#E1E0E0").htmlElement, "Grey"));
        colorDropdownList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](colorDropdownList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "hiliteColor", "transparent", new _components_floating_toolbar_dropdown_tool_ColorIcon__WEBPACK_IMPORTED_MODULE_8__["default"]("transparent").htmlElement, "None"));
        return colorDropdown;
    }
    static moreOptionsDropdown() {
        const icon = new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-material-more", "24", "24");
        const moreOptionsList = new _components_floating_toolbar_dropdown_tool_DropdownMenuList__WEBPACK_IMPORTED_MODULE_2__["default"]("moreTextOptionSelect", "More options");
        const moreOptionsButton = new _components_floating_toolbar_dropdown_tool_DropdownMenuButton__WEBPACK_IMPORTED_MODULE_10__["default"]("moreTextOptionButton", icon.htmlElement, moreOptionsList, false);
        const moreOptionsDropdown = new _components_floating_toolbar_dropdown_tool_DropdownMenu__WEBPACK_IMPORTED_MODULE_0__["default"](moreOptionsButton, moreOptionsList);
        moreOptionsList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](moreOptionsList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "duplicate", null, SVGIcons.duplicate.htmlElement, "Duplicate"));
        moreOptionsList.append(new _components_floating_toolbar_dropdown_tool_DropdownMenuListItem__WEBPACK_IMPORTED_MODULE_3__["default"](moreOptionsList, _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_11__["default"].getInstance(), "delete", null, SVGIcons.delete.htmlElement, "Delete"));
        return moreOptionsDropdown;
    }
}
const SVGIcons = {
    paragraph: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-wordpress-paragraph", "22", "22"),
    b_list: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-wordpress-bulleted-list", "22", "22"),
    n_list: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-wordpress-numbered-list", "22", "22"),
    code: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-wordpress-numbered-list", "22", "22"),
    quote: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-wordpress-quote", "22", "22"),
    head1: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-julia-head-1", "22", "22"),
    head2: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-julia-head-2", "22", "22"),
    head3: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-julia-head-3", "22", "22"),
    head4: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-julia-head-4", "22", "22"),
    head5: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-julia-head-5", "22", "22"),
    head6: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-julia-head-6", "22", "22"),
    duplicate: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-material-duplicate", "22", "22"),
    delete: new _components_common_SVGIcon__WEBPACK_IMPORTED_MODULE_4__["default"]("icon-material-trash", "22", "22"),
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingToolbarBuilder);


/***/ }),

/***/ "./src/builders/QuickMenuBuilder.ts":
/*!******************************************!*\
  !*** ./src/builders/QuickMenuBuilder.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_quick_menu_QuickMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/quick-menu/QuickMenu */ "./src/components/quick-menu/QuickMenu.ts");
/* harmony import */ var _components_quick_menu_QuickMenuSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/quick-menu/QuickMenuSection */ "./src/components/quick-menu/QuickMenuSection.ts");
/* harmony import */ var _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/quick-menu/QuickMenuItem */ "./src/components/quick-menu/QuickMenuItem.ts");
/* harmony import */ var _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/element-factory/ElementFactoryService */ "./src/services/element-factory/ElementFactoryService.ts");




class QuickMenuBuilder {
    static build(blockOperationsService) {
        const quickMenu = new _components_quick_menu_QuickMenu__WEBPACK_IMPORTED_MODULE_0__["default"](blockOperationsService);
        const basicBlocksSection = new _components_quick_menu_QuickMenuSection__WEBPACK_IMPORTED_MODULE_1__["default"](quickMenu, 'Basic blocks', 'basic-section');
        basicBlocksSection.appendQuickMenuItems([
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Paragraph', 'Just start writing with plain text.', 'icon-wordpress-paragraph', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.PARAGRAPH, "paragraph text p"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Image', 'Just start writing with plain text.', 'icon-wordpress-paragraph', 'image', "image figure photo illustration picture "),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list', "bulleted list unordered list ul"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list', "numbered list number list sequential list ol enumerated list ordered list"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Code', 'Insert code snippets with syntax highlighting.', 'icon-wordpress-code-mark', 'code', "code script source markup"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Quote', 'Highlight text as a significant quote.', 'icon-wordpress-quote', 'quote', "quote blockquote citation quotation"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_2, "header 2 heading 2 h2"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-2', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_3, "header 3 heading 3 h3"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](basicBlocksSection, 'Separator', 'Visually divide blocks.', 'icon-wordpress-separator', 'separator', "separator divider rule line")
        ]);
        quickMenu.append(basicBlocksSection);
        const headingBlocksSection = new _components_quick_menu_QuickMenuSection__WEBPACK_IMPORTED_MODULE_1__["default"](quickMenu, 'Heading', 'heading-section');
        headingBlocksSection.appendQuickMenuItems([
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](headingBlocksSection, 'Heading 1', 'Large header to organize content.', 'icon-julia-head-1', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.BLOCK_HEADER_1, "header 1 heading 1 h1"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](headingBlocksSection, 'Heading 2', 'Medium header for subsections.', 'icon-julia-head-2', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_2, "header 2 heading 2 h2"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](headingBlocksSection, 'Heading 3', 'Small header for detailed sections.', 'icon-julia-head-3', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_3, "header 3 heading 3 h3"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](headingBlocksSection, 'Heading 4', 'Small header for detailed sections.', 'icon-julia-head-4', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_4, "header 4 heading 4 h4"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](headingBlocksSection, 'Heading 5', 'Small header for detailed sections.', 'icon-julia-head-5', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_5, "header 5 heading 5 h5"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](headingBlocksSection, 'Heading 6', 'Small header for detailed sections.', 'icon-julia-head-6', _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_3__.ELEMENT_TYPES.HEADER_6, "header 6 heading 6 h6"),
        ]);
        quickMenu.append(headingBlocksSection);
        const listBlocksSection = new _components_quick_menu_QuickMenuSection__WEBPACK_IMPORTED_MODULE_1__["default"](quickMenu, 'List', 'list-section');
        listBlocksSection.appendQuickMenuItems([
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](listBlocksSection, 'Todo list', 'Organize items with bullet points.', 'icon-material-check-list', 'todo-list', "todo list task list checklist"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](listBlocksSection, 'Bulleted list', 'Organize items with bullet points.', 'icon-wordpress-bulleted-list', 'bulleted-list', "bulleted list unordered list ul"),
            new _components_quick_menu_QuickMenuItem__WEBPACK_IMPORTED_MODULE_2__["default"](listBlocksSection, 'Numbered list', 'List items in a numbered format.', 'icon-wordpress-numbered-list', 'numbered-list', "numbered list number list sequential list ol enumerated list ordered list")
        ]);
        quickMenu.append(listBlocksSection);
        return quickMenu;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickMenuBuilder);


/***/ }),

/***/ "./src/common/BaseDoublyLinkedList.ts":
/*!********************************************!*\
  !*** ./src/common/BaseDoublyLinkedList.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class BaseDoublyLinkedList {
    head = null;
    tail = null;
    length = 0;
    getFirst() {
        return this.head;
    }
    getLast() {
        return this.tail;
    }
    *[Symbol.iterator]() {
        let current = this.head;
        if (!current)
            return;
        do {
            yield current;
            current = current.nextNode;
        } while (current && current !== this.head);
    }
    forEach(callback) {
        let index = 0;
        for (let node of this) {
            callback(node.value, index, this);
            index++;
        }
    }
    any(predicate) {
        let current = this.head;
        while (current) {
            if (predicate(current.value)) {
                return true;
            }
            current = current.nextNode;
            if (current === this.head)
                break;
        }
        return false;
    }
    findFirst(predicate) {
        if (!this.head)
            return null;
        let current = this.head;
        do {
            if (predicate(current.value)) {
                return current;
            }
            current = current.nextNode;
        } while (current && current !== this.head);
        return null;
    }
    findLast(predicate) {
        if (!this.tail)
            return null;
        let current = this.tail;
        do {
            if (predicate(current.value)) {
                return current;
            }
            current = current.previousNode;
        } while (current && current !== this.tail);
        return null;
    }
    find(element) {
        let current = this.head;
        while (current) {
            if (current.value == element) {
                return current;
            }
            current = current.nextNode;
            if (current === this.head)
                break;
        }
        return null;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseDoublyLinkedList);


/***/ }),

/***/ "./src/common/CircularDoublyLinkedList.ts":
/*!************************************************!*\
  !*** ./src/common/CircularDoublyLinkedList.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseDoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseDoublyLinkedList */ "./src/common/BaseDoublyLinkedList.ts");
/* harmony import */ var _JNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JNode */ "./src/common/JNode.ts");


class CircularDoublyLinkedList extends _BaseDoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
    }
    append(element) {
        const node = new _JNode__WEBPACK_IMPORTED_MODULE_1__["default"](element, this);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.head.setNext(this.tail);
            this.head.setPrevious(this.tail);
        }
        else {
            node.setPrevious(this.tail);
            node.setNext(this.head);
            this.tail.setNext(node);
            this.head.setPrevious(node);
            this.tail = node;
        }
        this.length++;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CircularDoublyLinkedList);


/***/ }),

/***/ "./src/common/DoublyLinkedList.ts":
/*!****************************************!*\
  !*** ./src/common/DoublyLinkedList.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseDoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseDoublyLinkedList */ "./src/common/BaseDoublyLinkedList.ts");
/* harmony import */ var _JNode__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./JNode */ "./src/common/JNode.ts");


class DoublyLinkedList extends _BaseDoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor() {
        super();
    }
    append(element) {
        const node = new _JNode__WEBPACK_IMPORTED_MODULE_1__["default"](element, this);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
        }
        else {
            this.tail.setNext(node);
            node.setPrevious(this.tail);
            this.tail = node;
        }
        this.length++;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DoublyLinkedList);


/***/ }),

/***/ "./src/common/JNode.ts":
/*!*****************************!*\
  !*** ./src/common/JNode.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class JNode {
    parentList;
    previousNode;
    nextNode;
    value;
    constructor(value, parentList) {
        this.previousNode = null;
        this.nextNode = null;
        this.value = value;
        this.parentList = parentList;
    }
    setNext(node) {
        this.nextNode = node;
    }
    setPrevious(node) {
        this.previousNode = node;
    }
    getNextSatisfying(predicate) {
        let current = this.nextNode;
        const startNode = this;
        while (current) {
            if (predicate(current.value)) {
                return current;
            }
            current = current.nextNode;
            if (current === startNode) {
                break;
            }
        }
        return null;
    }
    getPreviousSatisfying(predicate) {
        let current = this.previousNode;
        const startNode = this;
        while (current && current !== startNode) {
            if (predicate(current.value)) {
                return current;
            }
            current = current.previousNode;
            if (current === this) {
                break;
            }
        }
        return null;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (JNode);


/***/ }),

/***/ "./src/components/add-block/AddBlock.ts":
/*!**********************************************!*\
  !*** ./src/components/add-block/AddBlock.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");
/* harmony import */ var _AddBlockButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./AddBlockButton */ "./src/components/add-block/AddBlockButton.ts");


class AddBlock extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    constructor() {
        super({});
        this.display = "block";
    }
    init() {
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("add-block-wrapper");
        const button = new _AddBlockButton__WEBPACK_IMPORTED_MODULE_1__["default"]();
        htmlElement.appendChild(button.htmlElement);
        return htmlElement;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddBlock);


/***/ }),

/***/ "./src/components/add-block/AddBlockButton.ts":
/*!****************************************************!*\
  !*** ./src/components/add-block/AddBlockButton.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");
/* harmony import */ var _common_SVGIcon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/SVGIcon */ "./src/components/common/SVGIcon.ts");
/* harmony import */ var _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/block-operations/BlockOperationsService */ "./src/services/block-operations/BlockOperationsService.ts");



class AddBlockButton extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    _commandService;
    constructor() {
        super({});
        this.display = "block";
        this._commandService = _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_2__["default"].getInstance();
        this.attachEvents();
    }
    init() {
        const htmlElement = document.createElement("button");
        htmlElement.classList.add("add-block", "block-operation");
        const svg = new _common_SVGIcon__WEBPACK_IMPORTED_MODULE_1__["default"]("icon-add-block", "24", "24");
        htmlElement.appendChild(svg.htmlElement);
        return htmlElement;
    }
    attachEvents() {
        this.htmlElement.addEventListener("click", () => {
            this._commandService.execCommand(_services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_2__.BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK, "");
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AddBlockButton);


/***/ }),

/***/ "./src/components/common/BaseUIComponent.ts":
/*!**************************************************!*\
  !*** ./src/components/common/BaseUIComponent.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class BaseUIComponent {
    _canHide;
    props;
    htmlElement;
    constructor(props) {
        this.props = props;
        this.htmlElement = this.init();
        this._canHide = true;
    }
    documentAppendTo(parent) {
        parent.appendChild(this.htmlElement);
    }
    get isVisible() {
        let element = this.htmlElement;
        if (element.style.display === 'none' || element.style.visibility === 'hidden' || !document.contains(element)) {
            return false;
        }
        while (element) {
            const style = window.getComputedStyle(element);
            if (style.display === 'none' || style.visibility === 'hidden') {
                return false;
            }
            if (element.parentElement) {
                element = element.parentElement;
            }
            else {
                break;
            }
        }
        return true;
    }
    show() {
        this._canHide = false;
        this.htmlElement.style.display = this.display;
        setTimeout(() => {
            this._canHide = true;
        }, 100);
    }
    hide() {
        if (!this._canHide) {
            console.warn("Attempted to hide the element before 100 milliseconds have passed since the last display.");
            // return;
            // throw new Error("Attempted to hide the element before 100 milliseconds have passed since the last display.");
        }
        this.htmlElement.style.display = 'none';
    }
    get canHide() {
        return this._canHide && this.isVisible;
    }
    focus() {
        this.htmlElement.focus();
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BaseUIComponent);


/***/ }),

/***/ "./src/components/common/SVGIcon.ts":
/*!******************************************!*\
  !*** ./src/components/common/SVGIcon.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");
// import BaseUIComponent from "./BaseUIComponent";

class SVGIcon extends _BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    useElement;
    constructor(hrefUseId, width = "16", height = "16") {
        super({
            hrefUseId: hrefUseId,
            width: width,
            height: height,
        });
        this.display = "block";
        this.useElement = this.htmlElement.querySelector('use');
    }
    init() {
        const htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${this.props.hrefUseId}`);
        htmlElement.appendChild(use);
        htmlElement.setAttribute('width', this.props.width);
        htmlElement.setAttribute('height', this.props.height);
        htmlElement.setAttribute('fill', 'currentColor');
        return htmlElement;
    }
    clone() {
        return new SVGIcon(this.props.hrefUseId, this.props.width, this.props.height);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SVGIcon);


/***/ }),

/***/ "./src/components/floating-toolbar/FloatingToolbar.ts":
/*!************************************************************!*\
  !*** ./src/components/floating-toolbar/FloatingToolbar.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

class FloatingToolbar extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    dropdowns;
    currentSelectionRange;
    constructor() {
        super({});
        this.display = 'flex';
        this.attachEvents();
        this.dropdowns = [];
        this.currentSelectionRange = null;
    }
    init() {
        const htmlElement = document.createElement('div');
        htmlElement.id = 'textFormattingBar';
        htmlElement.style.display = 'none';
        htmlElement.classList.add('soft-box-shadow');
        const selectWrapper = document.createElement('div');
        selectWrapper.classList.add('select-wrapper');
        htmlElement.appendChild(selectWrapper);
        return htmlElement;
    }
    show() {
        setTimeout(() => {
            const selection = window.getSelection();
            if (!selection) {
                throw new Error();
            }
            this.currentSelectionRange = selection.getRangeAt(0);
            let range = selection.getRangeAt(0);
            let rect = range.getBoundingClientRect();
            this.htmlElement.style.display = 'flex';
            this.htmlElement.style.left = `${rect.left + window.scrollX - 50}px`;
            this.htmlElement.style.top = `${rect.top + window.scrollY - this.htmlElement.offsetHeight - 10}px`;
            super.show();
        }, 10);
    }
    hide() {
        this.currentSelectionRange = null;
        super.hide();
    }
    appendDropdown(dropdown) {
        this.dropdowns.push(dropdown);
        this.htmlElement.appendChild(dropdown.htmlElement);
    }
    appendSeparator(separator) {
        this.htmlElement.appendChild(separator.htmlElement);
    }
    appendTextToolbar(toolbar) {
        this.htmlElement.appendChild(toolbar.htmlElement);
    }
    anyDropdownVisible() {
        for (const dropdown of this.dropdowns) {
            if (dropdown.dropdownList.isVisible) {
                return true;
            }
        }
        return false;
    }
    attachEvents() {
        // document.addEventListener('selectionChangeAfterExecCommand', (event) => {
        //     this.currentSelectionRange = getSelection()?.getRangeAt(0) || null;
        // });
        document.addEventListener('keydown', (event) => {
            if ((event.key === 'Escape' || event.key === 'Delete') && this.isVisible) {
                this.hide();
            }
        });
        document.addEventListener('keyup', (event) => {
            if (event.key === "Shift" || event.key === "Control") {
                setTimeout(() => {
                    if (window.getSelection().toString().trim() !== '') {
                        event.preventDefault();
                        event.stopPropagation();
                        this.show();
                    }
                }, 10);
            }
        });
        document.addEventListener('click', (event) => {
            if (this.isVisible && !event.target.closest(`#${this.htmlElement.id}`) && !this.anyDropdownVisible()) {
                this.hide();
            }
            else if (this.isVisible && !event.target.closest(`#${this.htmlElement.id}`)) {
                document.getSelection()?.removeAllRanges();
                document.getSelection()?.addRange(this.currentSelectionRange);
            }
        });
        document.addEventListener('mouseup', (event) => {
            if (!this.isVisible) {
                setTimeout(() => {
                    if (window.getSelection().toString().trim() !== '') {
                        event.preventDefault();
                        event.stopPropagation();
                        this.show();
                    }
                }, 10);
            }
        });
        document.addEventListener('blockFormatted', () => {
            if (this.canHide) {
                this.hide();
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingToolbar);


/***/ }),

/***/ "./src/components/floating-toolbar/dropdown-tool/ColorIcon.ts":
/*!********************************************************************!*\
  !*** ./src/components/floating-toolbar/dropdown-tool/ColorIcon.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

;
class ColorIcon extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    constructor(color) {
        super({
            color: color
        });
        this.display = "block";
    }
    init() {
        const htmlElement = document.createElement("div");
        htmlElement.style.width = "20px";
        htmlElement.style.height = "20px";
        htmlElement.style.borderRadius = "50%";
        htmlElement.style.backgroundColor = this.props.color;
        htmlElement.style.border = "1px solid #d0d0d0";
        return htmlElement;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorIcon);


/***/ }),

/***/ "./src/components/floating-toolbar/dropdown-tool/DropdownMenu.ts":
/*!***********************************************************************!*\
  !*** ./src/components/floating-toolbar/dropdown-tool/DropdownMenu.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

class DropdownMenu extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    dropdownButton;
    dropdownList;
    constructor(button, dropdownList) {
        super({});
        this.display = 'block';
        //add validation that verify if the arial target from button equals to id dropdown list
        this.dropdownButton = button;
        this.dropdownList = dropdownList;
        button.documentAppendTo(this.htmlElement);
        dropdownList.documentAppendTo(this.htmlElement);
    }
    init() {
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("select-wrapper");
        return htmlElement;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenu);


/***/ }),

/***/ "./src/components/floating-toolbar/dropdown-tool/DropdownMenuButton.ts":
/*!*****************************************************************************!*\
  !*** ./src/components/floating-toolbar/dropdown-tool/DropdownMenuButton.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_SVGIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/SVGIcon */ "./src/components/common/SVGIcon.ts");
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");


class DropdownMenuButton extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__["default"] {
    display;
    dropdownList;
    constructor(id, title, dropdownList, includeChevronIcon = true) {
        super({
            id: id,
            title: title,
            dropdownList: dropdownList,
            includeChevronIcon: includeChevronIcon
        });
        this.display = "block";
        this.dropdownList = dropdownList;
        this.attachEvents();
    }
    init() {
        const htmlElement = document.createElement('button');
        htmlElement.id = this.props.id;
        // htmlElement.title = this.props.title
        htmlElement.role = "button";
        htmlElement.classList.add("button-reset", "text-formatting-select-button", "text-formatting-operation", "option-hover");
        htmlElement.tabIndex = 1;
        htmlElement.setAttribute("aria-controls", this.props.dropdownList.htmlElement.id);
        if (typeof this.props.title === "string") {
            const span = document.createElement('span');
            span.textContent = this.props.title;
            htmlElement.appendChild(span);
        }
        else {
            htmlElement.appendChild(this.props.title);
        }
        if (this.props.includeChevronIcon) {
            const svg = new _common_SVGIcon__WEBPACK_IMPORTED_MODULE_0__["default"]("icon-wordpress-chevron-down");
            htmlElement.appendChild(svg.htmlElement);
        }
        return htmlElement;
    }
    attachEvents() {
        this.htmlElement.addEventListener("click", () => {
            if (!this.dropdownList.isVisible) {
                this.dropdownList.show();
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenuButton);


/***/ }),

/***/ "./src/components/floating-toolbar/dropdown-tool/DropdownMenuList.ts":
/*!***************************************************************************!*\
  !*** ./src/components/floating-toolbar/dropdown-tool/DropdownMenuList.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");
/* harmony import */ var _common_CircularDoublyLinkedList__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../common/CircularDoublyLinkedList */ "./src/common/CircularDoublyLinkedList.ts");


class DropdownMenuList extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    dropdownItems;
    constructor(id, title) {
        super({
            id: id,
            title: title
        });
        this.display = 'flex';
        this.dropdownItems = new _common_CircularDoublyLinkedList__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.attachEvents();
    }
    init() {
        const htmlElement = document.createElement('ul');
        htmlElement.id = this.props.id;
        htmlElement.setAttribute('name', 'block-type');
        htmlElement.style.display = 'none';
        htmlElement.classList.add('soft-box-shadow', 'dependent-box', 'checkable-items');
        const title = document.createElement('h3');
        title.innerText = this.props.title;
        title.style.marginLeft = '5px';
        htmlElement.appendChild(title);
        return htmlElement;
    }
    append(dropdownItem) {
        this.dropdownItems.append(dropdownItem);
        this.htmlElement.appendChild(dropdownItem.htmlElement);
    }
    attachEvents() {
        document.addEventListener('click', (event) => {
            if (this.canHide && !event.target.closest(`#${this.htmlElement.id}`)) {
                this.hide();
            }
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenuList);


/***/ }),

/***/ "./src/components/floating-toolbar/dropdown-tool/DropdownMenuListItem.ts":
/*!*******************************************************************************!*\
  !*** ./src/components/floating-toolbar/dropdown-tool/DropdownMenuListItem.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

class DropdownMenuListItem extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    _commandService;
    _command;
    _value;
    parentDropdownMenuList;
    display;
    constructor(parentDropdownMenuList, commandService, command, value, leftIcon, title) {
        super({
            leftIcon: leftIcon,
            title: title
        });
        this.display = 'block';
        this._command = command;
        this._value = value;
        this._commandService = commandService;
        this.parentDropdownMenuList = parentDropdownMenuList;
        this.attachEvent();
    }
    init() {
        const htmlElement = document.createElement('li');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');
        // htmlElement.setAttribute('data-type', this.props.dataType);
        htmlElement.tabIndex = 2;
        const textOption = document.createElement('div');
        textOption.classList.add('text-option');
        textOption.appendChild(this.props.leftIcon);
        const span = document.createElement('span');
        span.innerText = this.props.title;
        textOption.appendChild(span);
        htmlElement.appendChild(textOption);
        return htmlElement;
    }
    attachEvent() {
        this.htmlElement.addEventListener("click", () => {
            setTimeout(() => {
                this._commandService.execCommand(this._command, this._value);
                // const selectionEvent = new CustomEvent('selectionChangeAfterExecCommand', {
                //     detail: { message: 'selectionChangeAfterExecCommand' },
                //     bubbles: true,
                //     cancelable: true
                // });
                // document.dispatchEvent(selectionEvent);
                this.parentDropdownMenuList.hide();
            }, 10);
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenuListItem);


/***/ }),

/***/ "./src/components/floating-toolbar/group-button/GroupButton.ts":
/*!*********************************************************************!*\
  !*** ./src/components/floating-toolbar/group-button/GroupButton.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

class GroupButton extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    constructor() {
        super({});
        this.display = "block";
        // this.attachEvents();
    }
    init() {
        const htmlElement = document.createElement("div");
        htmlElement.classList.add("item");
        htmlElement.style.marginLeft = "10px";
        htmlElement.style.marginRight = "10px";
        return htmlElement;
    }
    append(toolButton) {
        //create a data structure to store the dom node element
        this.htmlElement.appendChild(toolButton.htmlElement);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupButton);


/***/ }),

/***/ "./src/components/floating-toolbar/group-button/GroupedButton.ts":
/*!***********************************************************************!*\
  !*** ./src/components/floating-toolbar/group-button/GroupedButton.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_SVGIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/SVGIcon */ "./src/components/common/SVGIcon.ts");
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");


class GroupedButton extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__["default"] {
    _commandService;
    _command;
    display;
    constructor(commandService, command, title, svgUseHref) {
        super({
            title: title,
            svgUseHref: svgUseHref
        });
        this.display = "block";
        this._commandService = commandService;
        this._command = command;
        this.attachEvents();
    }
    init() {
        const htmlElement = document.createElement("button");
        htmlElement.role = "button";
        htmlElement.classList.add("entry", "button-reset", "text-formatting-operation", "option-hover");
        htmlElement.title = this.props.title;
        htmlElement.tabIndex = 1;
        new _common_SVGIcon__WEBPACK_IMPORTED_MODULE_0__["default"](this.props.svgUseHref, "22", "22").documentAppendTo(htmlElement);
        return htmlElement;
    }
    attachEvents() {
        this.htmlElement.addEventListener("click", (event) => {
            const editableElement = this.getParentEditable();
            this._commandService.execCommand(this._command);
            setTimeout(() => {
                editableElement?.normalize();
            }, 10);
        });
        document.addEventListener('selectionchange', (event) => {
            setTimeout(() => {
                const selection = window.getSelection();
                if (!selection?.isCollapsed) {
                    if (this._commandService.queryCommandState(this._command)) {
                        this.htmlElement.style.color = "#2382e2";
                    }
                    else {
                        this.htmlElement.style.color = "";
                    }
                }
            }, 10);
        });
    }
    getParentEditable() {
        let currentBlockRange = window.getSelection().getRangeAt(0);
        let commonAncestor = currentBlockRange.commonAncestorContainer;
        if (commonAncestor.nodeType === 3) {
            commonAncestor = commonAncestor.parentNode;
        }
        const currentBlock = commonAncestor.closest('.editable');
        return currentBlock;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GroupedButton);


/***/ }),

/***/ "./src/components/floating-toolbar/separator/FloatingToolbarSeparator.ts":
/*!*******************************************************************************!*\
  !*** ./src/components/floating-toolbar/separator/FloatingToolbarSeparator.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

class FloatingToolbarSeparator extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    constructor() {
        super({});
        this.display = "block";
    }
    init() {
        const htmlElement = document.createElement("div");
        htmlElement.style.height = "24px";
        htmlElement.style.width = "1px";
        htmlElement.style.borderRight = "1px solid #d0d0d0";
        htmlElement.style.margin = "auto 6px";
        return htmlElement;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FloatingToolbarSeparator);


/***/ }),

/***/ "./src/components/quick-menu/QuickMenu.ts":
/*!************************************************!*\
  !*** ./src/components/quick-menu/QuickMenu.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _QuickMenuEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./QuickMenuEmpty */ "./src/components/quick-menu/QuickMenuEmpty.ts");
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");
/* harmony import */ var _common_CircularDoublyLinkedList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../common/CircularDoublyLinkedList */ "./src/common/CircularDoublyLinkedList.ts");



class QuickMenu extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__["default"] {
    display;
    _blockOperationsService;
    _currentFocusedMenuItem;
    _htmlFocusedElementBeforeOpenQuickMenu;
    _menuSections;
    _quickMenuEmpty;
    _filterInput;
    static _instance;
    constructor(blockOperationsService) {
        super({});
        this.display = 'block';
        this._blockOperationsService = blockOperationsService;
        this._currentFocusedMenuItem = null;
        this._htmlFocusedElementBeforeOpenQuickMenu = null;
        this._menuSections = new _common_CircularDoublyLinkedList__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this._quickMenuEmpty = new _QuickMenuEmpty__WEBPACK_IMPORTED_MODULE_0__["default"]();
        let blockOptions = this.htmlElement.querySelector('.block-options');
        this._quickMenuEmpty.documentAppendTo(blockOptions);
        this.attachEvents();
        this._filterInput = "";
    }
    init() {
        const htmlElement = document.createElement('div');
        htmlElement.id = 'blockOptionsWrapper';
        htmlElement.classList.add('block-options-wrapper', 'soft-box-shadow');
        htmlElement.style.display = 'none';
        const blockOptions = document.createElement('div');
        blockOptions.classList.add('block-options');
        blockOptions.style.position = 'relative';
        htmlElement.appendChild(blockOptions);
        return htmlElement;
    }
    append(menuItem) {
        this._menuSections.append(menuItem);
        this.htmlElement.querySelector('.block-options').appendChild(menuItem.htmlElement);
    }
    static getInstance(blockOperations) {
        if (!QuickMenu._instance) {
            QuickMenu._instance = new QuickMenu(blockOperations);
        }
        return QuickMenu._instance;
    }
    switchVisualFocus(item) {
        if (this._currentFocusedMenuItem == item) {
            return;
        }
        if (this._currentFocusedMenuItem) {
            this._currentFocusedMenuItem.value.removeFocus();
        }
        this._currentFocusedMenuItem = item;
        this._currentFocusedMenuItem.value.focus();
        this._htmlFocusedElementBeforeOpenQuickMenu?.focus();
    }
    focusOnTheFirstVisibleItem() {
        const firstSectionNode = this._menuSections.getFirst();
        let currentSectionNode = firstSectionNode;
        while (currentSectionNode) {
            const itemNode = currentSectionNode.value.menuItems.findFirst(item => item.isVisible);
            if (itemNode) {
                this.switchVisualFocus(itemNode);
                return;
            }
            currentSectionNode = currentSectionNode.nextNode;
            if (currentSectionNode == firstSectionNode) {
                return;
            }
        }
    }
    focusPreviousVisibleItem() {
        let previousVisibleItem;
        if (this._currentFocusedMenuItem) {
            previousVisibleItem = this._currentFocusedMenuItem.getPreviousSatisfying(item => item.isVisible);
            if (!previousVisibleItem) {
                let previousVisibleSectionNode = this._menuSections.find(this._currentFocusedMenuItem.value.quickMenuSectionInstance).getPreviousSatisfying(section => section.isVisible);
                if (!previousVisibleSectionNode) {
                    return;
                }
                previousVisibleItem = previousVisibleSectionNode.value.menuItems.findLast(item => item.isVisible);
            }
        }
        else {
            let lastVisibleSectionNode = this._menuSections.findLast(section => section.isVisible);
            if (!lastVisibleSectionNode) {
                return;
            }
            previousVisibleItem = lastVisibleSectionNode.value.menuItems.findLast(item => item.isVisible);
        }
        this.switchVisualFocus(previousVisibleItem);
    }
    focusNextVisibleItem() {
        let nextVisibleItem;
        if (this._currentFocusedMenuItem) {
            nextVisibleItem = this._currentFocusedMenuItem.getNextSatisfying(item => item.isVisible);
            if (!nextVisibleItem) {
                let nextVisibleSectionNode = this._menuSections.find(this._currentFocusedMenuItem.value.quickMenuSectionInstance).getPreviousSatisfying(section => section.isVisible);
                if (!nextVisibleSectionNode) {
                    return;
                }
                nextVisibleItem = nextVisibleSectionNode.value.menuItems.findFirst(item => item.isVisible);
            }
        }
        else {
            let firstVisibleSectionNode = this._menuSections.findFirst(section => section.isVisible);
            if (!firstVisibleSectionNode) {
                return;
            }
            nextVisibleItem = firstVisibleSectionNode.value.menuItems.findFirst(item => item.isVisible);
        }
        this.switchVisualFocus(nextVisibleItem);
    }
    filterItems() {
        this._menuSections.forEach(section => {
            section.filterSection(this._filterInput);
        });
        if (!this._menuSections.any(section => section.isVisible)) {
            this._quickMenuEmpty.show();
        }
        else {
            this._quickMenuEmpty.hide();
        }
        this.focusOnTheFirstVisibleItem();
    }
    show() {
        setTimeout(() => {
            this._htmlFocusedElementBeforeOpenQuickMenu = document.activeElement;
            if (!this._htmlFocusedElementBeforeOpenQuickMenu) {
                throw new Error("Failed to capture the focused element before displaying the QuickMenu. Ensure an element is focused.");
            }
            const range = document.getSelection().getRangeAt(0);
            const cursorPos = range.getBoundingClientRect();
            const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const menuWidth = 19 * remSize;
            let xPosition = cursorPos.right;
            let yPosition = cursorPos.bottom + window.scrollY;
            const margin = remSize * 1.25;
            let blockWidth = this.htmlElement.offsetWidth;
            if (xPosition + blockWidth + margin > window.innerWidth) {
                xPosition = cursorPos.left - menuWidth;
                if (xPosition < 0)
                    xPosition = 0;
            }
            this.htmlElement.style.left = `${xPosition}px`;
            this.htmlElement.style.top = `${yPosition}px`;
            super.show();
            this.focusOnTheFirstVisibleItem();
            this._htmlFocusedElementBeforeOpenQuickMenu.focus();
        }, 10);
    }
    restore() {
        this._filterInput = "";
        this._menuSections.forEach(section => {
            section.restore();
        });
    }
    hide() {
        this.restore();
        this._htmlFocusedElementBeforeOpenQuickMenu?.focus();
        super.hide();
    }
    attachEvents() {
        document.addEventListener('keydown', (event) => {
            if (!this.isVisible && event.key === '/' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.show();
            }
            else if (this.isVisible && event.key === 'ArrowLeft' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (this.isVisible && event.key === 'ArrowRight' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (this.isVisible && event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                this.focusNextVisibleItem();
            }
            else if (this.isVisible && event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                this.focusPreviousVisibleItem();
            }
            else if (this.isVisible && /^[a-z0-9 ]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.concatFilterInput(event.key);
                this.filterItems();
            }
            else if (this.isVisible && event.key === 'Backspace') {
                if (this._filterInput == "") {
                    this.hide();
                }
                else {
                    this.removeLastFilterInputCharacter();
                    this.filterItems();
                }
            }
            else if (this.isVisible && event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                this.hide();
            }
            else if (event.key === 'Enter' && this.isVisible && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                event.preventDefault();
                event.stopPropagation();
                let dataType = this._currentFocusedMenuItem.value.htmlElement.getAttribute('data-type');
                if (dataType) {
                    this.transformHtmlFocusedElementBeforeOpenQuickMenu(dataType);
                }
            }
        });
        document.addEventListener('click', (event) => {
            if (this.isVisible && !event.target.closest(`#${this.htmlElement.id}`)) {
                this.hide();
            }
        });
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && this.isVisible) {
                const blockType = this._currentFocusedMenuItem?.value.blockType;
                if (blockType) {
                    this.transformHtmlFocusedElementBeforeOpenQuickMenu(blockType);
                }
            }
        });
    }
    transformHtmlFocusedElementBeforeOpenQuickMenu(blockType) {
        let element = this._htmlFocusedElementBeforeOpenQuickMenu?.closest('.draggable-block');
        if (element && blockType) {
            this._blockOperationsService.formatBlock(element, blockType);
        }
        this.hide();
    }
    concatFilterInput(stg) {
        this._filterInput += stg.toLowerCase();
    }
    removeLastFilterInputCharacter() {
        if (this._filterInput.length > 0) {
            this._filterInput = this._filterInput.slice(0, -1);
        }
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickMenu);


/***/ }),

/***/ "./src/components/quick-menu/QuickMenuEmpty.ts":
/*!*****************************************************!*\
  !*** ./src/components/quick-menu/QuickMenuEmpty.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");

class QuickMenuEmpty extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_0__["default"] {
    display;
    constructor() {
        super({});
        this.display = 'block';
    }
    init() {
        const htmlEmptyIndicator = document.createElement('span');
        htmlEmptyIndicator.innerText = 'No results';
        htmlEmptyIndicator.classList.add('empty-block-options');
        htmlEmptyIndicator.style.padding = '10px';
        htmlEmptyIndicator.style.color = 'rgba(55, 53, 47, 0.65)';
        htmlEmptyIndicator.style.display = 'none';
        return htmlEmptyIndicator;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickMenuEmpty);


/***/ }),

/***/ "./src/components/quick-menu/QuickMenuItem.ts":
/*!****************************************************!*\
  !*** ./src/components/quick-menu/QuickMenuItem.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_SVGIcon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/SVGIcon */ "./src/components/common/SVGIcon.ts");
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");


class QuickMenuItem extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__["default"] {
    display;
    blockType;
    title;
    filterValue;
    description;
    quickMenuSectionInstance;
    constructor(quickMenuSectionInstance, title, description, SVGHrefUseId, blockType, filterValue) {
        super({
            title: title,
            description: description,
            SVGHrefUseId: SVGHrefUseId
        });
        this.display = 'flex';
        this.blockType = blockType;
        this.title = title;
        this.description = description;
        this.filterValue = filterValue;
        this.quickMenuSectionInstance = quickMenuSectionInstance;
        this.blockType = blockType;
        this.attachEvents();
    }
    init() {
        const htmlElement = document.createElement('div');
        htmlElement.classList.add('option', 'option-hover', 'block-operation');
        htmlElement.setAttribute('data-block-operation', 'apply-selected-block-type');
        htmlElement.setAttribute('tabindex', '0');
        htmlElement.setAttribute('role', 'option');
        const optionImage = document.createElement('div');
        optionImage.classList.add('option-image');
        const svg = new _common_SVGIcon__WEBPACK_IMPORTED_MODULE_0__["default"](this.props.SVGHrefUseId, '100%', '100%');
        optionImage.appendChild(svg.htmlElement);
        htmlElement.appendChild(optionImage);
        const optionText = document.createElement('div');
        optionText.classList.add('option-text');
        const blockTitle = document.createElement('p');
        blockTitle.classList.add('block-title');
        blockTitle.innerText = this.props.title;
        optionText.appendChild(blockTitle);
        const blockDescription = document.createElement('p');
        blockDescription.classList.add('block-description');
        blockDescription.innerText = this.props.description;
        optionText.appendChild(blockDescription);
        htmlElement.appendChild(optionText);
        return htmlElement;
    }
    focus() {
        this.htmlElement.classList.add('block-options-focused');
        this.htmlElement.focus();
    }
    removeFocus() {
        this.htmlElement.classList.remove('block-options-focused');
    }
    attachEvents() {
        this.htmlElement.addEventListener('mousemove', () => {
            const node = this.quickMenuSectionInstance.menuItems.find(this);
            this.quickMenuSectionInstance.quickMenuInstance.switchVisualFocus(node);
        });
        this.htmlElement.addEventListener('click', () => {
            this.quickMenuSectionInstance.quickMenuInstance.transformHtmlFocusedElementBeforeOpenQuickMenu(this.blockType);
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickMenuItem);


/***/ }),

/***/ "./src/components/quick-menu/QuickMenuSection.ts":
/*!*******************************************************!*\
  !*** ./src/components/quick-menu/QuickMenuSection.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _common_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/DoublyLinkedList */ "./src/common/DoublyLinkedList.ts");
/* harmony import */ var _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/BaseUIComponent */ "./src/components/common/BaseUIComponent.ts");


class QuickMenuSection extends _common_BaseUIComponent__WEBPACK_IMPORTED_MODULE_1__["default"] {
    display;
    quickMenuInstance;
    menuItems = new _common_DoublyLinkedList__WEBPACK_IMPORTED_MODULE_0__["default"]();
    constructor(quickMenuInstance, title, classList) {
        super({
            title: title,
            classList: classList
        });
        this.quickMenuInstance = quickMenuInstance;
        this.display = 'block';
    }
    init() {
        const htmlElement = document.createElement('section');
        htmlElement.classList.add(this.props.classList);
        const heading = document.createElement('h2');
        heading.textContent = this.props.title;
        htmlElement.appendChild(heading);
        return htmlElement;
    }
    appendQuickMenuItems(menuItems) {
        menuItems.forEach(item => {
            this.appendQuickMenuItem(item);
        });
    }
    appendQuickMenuItem(menuItem) {
        this.menuItems.append(menuItem);
        this.htmlElement.appendChild(menuItem.htmlElement);
    }
    filterSection(text) {
        this.restore();
        if (text !== "") {
            this.menuItems.forEach(menuItem => {
                if (!(menuItem.filterValue.toLocaleLowerCase().includes(text))) {
                    menuItem.hide();
                }
            });
            let atLeadOneItem = this.menuItems.any(item => item.filterValue.toLocaleLowerCase().includes(text));
            if (!atLeadOneItem) {
                this.hide();
            }
        }
    }
    restore() {
        this.show();
        this.menuItems.forEach(menuItem => {
            menuItem.show();
        });
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickMenuSection);


/***/ }),

/***/ "./src/errors/ElementNotFoundError.ts":
/*!********************************************!*\
  !*** ./src/errors/ElementNotFoundError.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ElementNotFoundError extends Error {
    elementId;
    constructor(elementId) {
        super(`Failed to initialize because the required DOM element '${elementId}' was not found.`);
        this.name = "ElementNotFoundError";
        this.elementId = elementId;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ElementNotFoundError);


/***/ }),

/***/ "./src/services/block-operations/BlockOperationsService.ts":
/*!*****************************************************************!*\
  !*** ./src/services/block-operations/BlockOperationsService.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BLOCK_OPERATIONS: () => (/* binding */ BLOCK_OPERATIONS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../element-factory/ElementFactoryService */ "./src/services/element-factory/ElementFactoryService.ts");

class BlockOperationsService {
    _elementFactoryService;
    static _instance;
    execCommand(command, value = null) {
        if (command == BLOCK_OPERATIONS.CREATE_DEFAULT_BLOCK) {
            this.createDefaultBlock(null);
        }
        if (command == BLOCK_OPERATIONS.TURN_INTO) {
            if (!value) {
                throw new Error();
            }
            const element = BlockOperationsService.getDraggableElementFromSelection();
            this.formatBlock(element, value);
        }
        const selectionEvent = new CustomEvent('blockFormatted', {
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(selectionEvent);
        return true;
    }
    queryCommandState() {
        throw new Error("Method not implemented.");
    }
    constructor(elementFactoryService) {
        if (BlockOperationsService._instance) {
            throw new Error("Use BlockOperationsService.getInstance() para obter a instância.");
        }
        this._elementFactoryService = elementFactoryService;
        BlockOperationsService._instance = this;
    }
    static getInstance(elementFactoryService = null) {
        if (!this._instance) {
            this._instance = new BlockOperationsService(elementFactoryService || new _element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_0__["default"]());
        }
        return this._instance;
    }
    formatBlock(element, contentType) {
        let contentElement = element.querySelector('.swittable');
        let content = contentElement.innerText;
        let newContentBlock = this._elementFactoryService.create(contentType, content);
        element.replaceChild(newContentBlock, contentElement);
        const focusable = newContentBlock.closest('.focusable') || element.querySelector('.focusable');
        // focusOnTheEndOfTheText(focusable);
    }
    static getDraggableElementFromSelection() {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let element = range.commonAncestorContainer;
            if (element.nodeType === Node.TEXT_NODE) {
                element = element.parentNode;
            }
            while (element && !(element instanceof HTMLElement)) {
                element = element.parentNode;
            }
            if (element) {
                const draggable = element.closest('.draggable-block');
                return draggable;
            }
        }
        // Retornar null se nenhuma seleção válida for encontrada ou nenhum elemento correspondente
        throw new Error();
    }
    // static getTagNameByCommandName(commandName: string) {
    //     switch (commandName) {
    //         case "turnIntoParagraph":
    //             return "p";
    //         case "turnIntoH1":
    //             return "h1";
    //         case "turnIntoH2":
    //             return "h2";
    //         case "turnIntoH3":
    //             return "h3";
    //         case "turnIntoH4":
    //             return "h4";
    //         case "turnIntoH5":
    //             return "h5";
    //         case "turnIntoH6":
    //             return "h6";
    //         default:
    //             throw Error("Error");
    //     }
    // }
    // applySelectedBlockType(draggableBlock: HTMLElement, newBlockType: string) {
    //     // const draggableBlock = realFocusedElement.closest('.draggable-block');
    //     // const newBlockType = event.target.closest('.option') ?
    //     //     event.target.closest('.option').getAttribute('data-type') :
    //     //     currentFakeFocusedOption.getAttribute('data-type');
    //     const lastSlashIndex = realFocusedElement.innerText.lastIndexOf('/');
    //     realFocusedElement.innerText = lastSlashIndex !== -1 ? realFocusedElement.innerText.slice(0, lastSlashIndex) : realFocusedElement.innerText;
    //     transformBlock(draggableBlock, newBlockType);
    //     hideAndClearBlockOptions();
    //     hideAllDependentBox();
    //     hideTextFormattingBar();
    // }
    createNewElement(event) {
        const element = event.target;
        const contentElement = element.closest('.johannes-content-element');
        if (contentElement && contentElement.classList.contains('list')) {
            this.createListItem(contentElement);
        }
        else {
            this.createDefaultBlock(contentElement);
        }
    }
    createListItem(element) {
        let newContentElement = null;
        let activeElement = document.activeElement;
        let contentElement = element.closest('.johannes-content-element');
        if (contentElement.classList.contains('checkbox-list')) {
            newContentElement = this._elementFactoryService.create("checkboxItem", "");
        }
        else if (contentElement.classList.contains('list')) {
            newContentElement = this._elementFactoryService.create("listItem", "");
        }
        else {
            // newContentElement = createNewDraggableParagraphElement();
        }
        // let parentBlock = null;
        // if (contentElement.classList.contains('list')) {
        //     parentBlock = contentElement;
        //     const textContent = activeElement.textContent.trim();
        //     if (textContent === '') {
        //         parentBlock = element.closest('.draggable-block');
        //         element.closest('.deletable').remove();
        //         newContentElement = createNewDraggableParagraphElement();
        //         parentBlock.insertAdjacentElement('afterend', newContentElement);
        //     } else {
        //         const activeElement = document.activeElement.closest('.list-item');
        //         activeElement.insertAdjacentElement('afterend', newContentElement);
        //     }
        // } else {
        //     parentBlock = element.closest('.draggable-block');
        //     if (parentBlock) {
        //         if (parentBlock.nextSibling) {
        //             parentBlock.parentNode.insertBefore(newContentElement, parentBlock.nextSibling);
        //         } else {
        //             parentBlock.parentNode.appendChild(newContentElement);
        //         }
        //     }
        // }
        // focusOnTheEndOfTheText(newContentElement);
    }
    createDefaultBlock(eventParagraph) {
        const newBlock = this._elementFactoryService.create(_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_0__.ELEMENT_TYPES.BLOCK_PARAGRAPH, "");
        if (eventParagraph && eventParagraph.closest('.draggable-block')) {
            const sibling = eventParagraph.closest('.draggable-block');
            sibling.insertAdjacentElement('afterend', newBlock);
        }
        else {
            document.querySelector("#johannesEditor .content").appendChild(newBlock);
        }
        const focusable = newBlock.querySelector('.johannes-content-element');
        // focusable.focus();
        // focusOnTheEndOfTheText(focusable);
    }
}
const BLOCK_OPERATIONS = {
    TURN_INTO: "turnInto",
    CREATE_DEFAULT_BLOCK: "CreateDefaultBlock"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BlockOperationsService);


/***/ }),

/***/ "./src/services/element-factory/ElementFactoryService.ts":
/*!***************************************************************!*\
  !*** ./src/services/element-factory/ElementFactoryService.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ELEMENT_TYPES: () => (/* binding */ ELEMENT_TYPES),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ElementFactoryService {
    creators;
    constructor() {
        this.creators = {};
        this.register(ELEMENT_TYPES.BLOCK_PARAGRAPH, ElementFactoryService.blockParagraphCreator());
        this.register(ELEMENT_TYPES.PARAGRAPH, ElementFactoryService.paragraphCreator());
        this.register(ELEMENT_TYPES.CHECKBOX_ITEM, ElementFactoryService.checkboxItemCreator());
        this.register(ELEMENT_TYPES.LIST_ITEM, ElementFactoryService.listItemCreator());
        this.register(ELEMENT_TYPES.BLOCK_HEADER_1, ElementFactoryService.headingCreator(1));
        this.register(ELEMENT_TYPES.HEADER_2, ElementFactoryService.headingCreator(2));
        this.register(ELEMENT_TYPES.HEADER_3, ElementFactoryService.headingCreator(3));
        this.register(ELEMENT_TYPES.HEADER_4, ElementFactoryService.headingCreator(4));
        this.register(ELEMENT_TYPES.HEADER_5, ElementFactoryService.headingCreator(5));
        this.register(ELEMENT_TYPES.HEADER_6, ElementFactoryService.headingCreator(6));
    }
    register(type, creator) {
        this.creators[type] = creator;
    }
    create(type, content) {
        const creator = this.creators[type];
        if (!creator) {
            throw new TypeError(`No creator registered for type: ${type}`);
        }
        return creator(content);
    }
    static blockParagraphCreator() {
        return content => {
            return ElementFactoryService.blockParagraph(content);
        };
    }
    static paragraphCreator() {
        return content => {
            return ElementFactoryService.paragraph(content);
        };
    }
    static headingCreator(level) {
        return content => {
            return ElementFactoryService.heading(level, content);
        };
    }
    static checkboxItemCreator() {
        return content => {
            return ElementFactoryService.checkBoxItem(content);
        };
    }
    static listItemCreator() {
        return content => {
            return ElementFactoryService.checkboxItem(content);
        };
    }
    static paragraph(content = null) {
        const p = document.createElement('p');
        p.innerText = content || "";
        p.contentEditable = "true";
        p.setAttribute('data-type', 'p');
        p.classList.add('johannes-content-element');
        p.classList.add('swittable');
        p.classList.add('focusable');
        p.classList.add('key-trigger');
        p.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');
        return p;
    }
    static heading(level, content = null) {
        const h = document.createElement(`h${level}`);
        h.innerText = content || "";
        h.contentEditable = "true";
        h.setAttribute('data-type', `h${level}`);
        h.classList.add('johannes-content-element');
        h.classList.add('swittable');
        h.classList.add('focusable');
        h.classList.add('focus');
        h.classList.add('key-trigger');
        return h;
    }
    static checkBoxItem(content = null) {
        let li = document.createElement('li');
        li.classList.add('deletable');
        li.classList.add('list-item');
        // initialItem.classList.add('key-trigger');
        let checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        let span = document.createElement('span');
        span.textContent = content || "";
        span.setAttribute('data-placeholder', 'To-do');
        // span.contentEditable = true;
        span.setAttribute("contentEditable", "true");
        span.classList.add('focusable');
        span.classList.add('editable');
        span.classList.add('focus');
        li.appendChild(checkbox);
        li.appendChild(span);
        return li;
    }
    static checkboxItem(content = null) {
        let initialItem = document.createElement('li');
        initialItem.classList.add('focusable');
        initialItem.classList.add('deletable');
        initialItem.classList.add('editable');
        initialItem.classList.add('focus');
        initialItem.classList.add('key-trigger');
        initialItem.classList.add('list-item');
        initialItem.innerText = content || "";
        // initialItem.contentEditable = true;
        initialItem.setAttribute("contentEditable", "true");
        initialItem.setAttribute('data-placeholder', 'Item');
        return initialItem;
    }
    static blockParagraph(content = null) {
        let newDiv = document.createElement('div');
        let newElement = ElementFactoryService.paragraph(content);
        let newButton = document.createElement('button');
        newButton.innerHTML = '<svg width="20" height="20" fill="currentColor"><use href="#icon-material-drag"></use></svg>';
        newDiv.appendChild(newButton);
        newDiv.appendChild(newElement);
        newDiv.classList.add('draggable-block');
        newDiv.classList.add('deletable');
        newButton.classList.add('drag-handler');
        newButton.classList.add('button-reset');
        newButton.draggable = true;
        return newDiv;
    }
}
const ELEMENT_TYPES = {
    BLOCK_PARAGRAPH: "block-p",
    PARAGRAPH: "p",
    CHECKBOX_ITEM: "checkboxItem",
    LIST_ITEM: "listItem",
    BLOCK_HEADER_1: "h1",
    HEADER_2: "h2",
    HEADER_3: "h3",
    HEADER_4: "h4",
    HEADER_5: "h5",
    HEADER_6: "h6",
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ElementFactoryService);


/***/ }),

/***/ "./src/services/text-operations/TextOperationService.ts":
/*!**************************************************************!*\
  !*** ./src/services/text-operations/TextOperationService.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TextOperationService {
    // selectedNodes: Node[] | null; //muito provavlemente eu vou ter que quebrar em n arrays um para cada no de bloco 
    // target: TargetNode | null;    //muito provavelmente eu vou ter um target para cada nó de bloco
    // intention: string | null;     //e um intention para cada nó de bloco.
    // command: string;
    // value: string | undefined;
    static _instance;
    constructor() {
        // this.selectedNodes = null;
        // this.target = null;
        // this.intention = null;
        // this.command = command;
        // this.value = value;
        if (TextOperationService._instance) {
            throw new Error();
        }
    }
    static getInstance() {
        if (!this._instance) {
            this._instance = new TextOperationService();
        }
        return this._instance;
    }
    execCommand(command, value) {
        let v = value || undefined;
        if (command == "link") {
            alert("delete");
            return true;
        }
        if (command == "delete") {
            throw new Error("move to Block operations exception");
            alert("delete");
            return true;
        }
        if (command == "duplicate") {
            throw new Error("move to Block operations exception");
            alert("duplicate");
            return true;
        }
        return document.execCommand(command, false, v);
    }
    // execCommand2(): boolean {
    //     if (this.command == "link") {
    //         alert("delete");
    //         return true;
    //     }
    //     if (this.command == "delete") {
    //         alert("delete");
    //         return true;
    //     }
    //     if (this.command == "duplicate") {
    //         alert("duplicate");
    //         return true;
    //     }
    //     return document.execCommand(this.command, false, this.value);
    // }
    queryCommandState(command, value) {
        return document.queryCommandState(command);
    }
    // queryCommandState(): boolean {
    //     const value = document.queryCommandState(this.command);
    //     return value;
    // }
    // queryCommandState2(): boolean {
    //     let aa = document.queryCommandState(this.command);
    //     return aa;
    // }
    // execCommand(): boolean {
    //     if (this.command == "link") {
    //         alert("delete");
    //         return true;
    //     }
    //     if (this.command == "delete") {
    //         alert("delete");
    //         return true;
    //     }
    //     if (this.command == "duplicate") {
    //         alert("duplicate");
    //         return true;
    //     }
    //     return document.execCommand(this.command, false, this.value);
    // }
    // execCommand2(): boolean {
    //     if (this.command == "link") {
    //         alert("delete");
    //         return true;
    //     }
    //     if (this.command == "delete") {
    //         alert("delete");
    //         return true;
    //     }
    //     if (this.command == "duplicate") {
    //         alert("duplicate");
    //         return true;
    //     }
    //     return document.execCommand(this.command, false, this.value);
    // }
    // execCommand(command: string, showUI?: boolean, value?: any): boolean {
    //     this.selectedNodes = this.getSelectedTextNodes();
    //     this.target = { nodeType: command, classes: value };
    //     this.setIntention(this.selectedNodes[0], this.target);
    //     this.selectedNodes.forEach(node => {
    //         if (node.nodeType !== Node.TEXT_NODE) {
    //             throw new Error("Invalid node typed");
    //         }
    //         if (this.intention == "add") {
    //             let alreadyAppliedStyle = this.findClosestMatchingParent(node, this.target!);
    //             if (!alreadyAppliedStyle) {
    //                 this.insertNewContent(node);
    //             } else {
    //                 // não faça nada por enquanto
    //             }
    //         }
    //     });
    //     return true;
    // }
    // insertNewContent(node: Node): void {
    //     if (node.nodeType !== Node.TEXT_NODE) {
    //         throw new Error("Node must be a text node.");
    //     }
    //     // Get the current selection
    //     const selection = window.getSelection()!;
    //     // Check if the selection is within the node
    //     if (!selection.containsNode(node, true)) {
    //         console.log("No text selected or selection does not intersect with the given node.");
    //         return;
    //     }
    //     // Get the range of the selection
    //     const range = selection.getRangeAt(0);
    //     // Check if the selected range is within the text node
    //     if (range.commonAncestorContainer !== node) {
    //         console.log("Selection does not fully encompass the text node.");
    //         return;
    //     }
    //     // Extract parts of the text node based on the selection
    //     const startOffset = range.startOffset;
    //     const endOffset = range.endOffset;
    //     const beforeText = node.textContent.substring(0, startOffset);
    //     const selectedText = range.toString();
    //     const afterText = node.textContent.substring(endOffset);
    //     // Create the wrapper element for the selected text
    //     const wrapperElement = this.createWrapperElement();
    //     wrapperElement.textContent = selectedText;
    //     // Create document fragment to hold the new structure
    //     let fragment = document.createDocumentFragment();
    //     if (beforeText) {
    //         fragment.appendChild(document.createTextNode(beforeText));
    //     }
    //     fragment.appendChild(wrapperElement);
    //     if (afterText) {
    //         fragment.appendChild(document.createTextNode(afterText));
    //     }
    //     // Replace the original node with the fragment
    //     if (node.parentNode) {
    //         node.parentNode.replaceChild(fragment, node);
    //     }
    // }
    // createWrapperElement(textNode: Node): HTMLElement {
    //     const element = document.createElement(this.target!.nodeType);
    //     element.classList.add(...this.target!.classes!);
    //     element.textContent = this.extractSelectedText(textNode);
    //     return element;
    // }
    // setIntention(firstNode: Node, targetNode: TargetNode): string {
    //     let hasTarget = this.findClosestMatchingParent(firstNode, targetNode);
    //     if (!hasTarget) {
    //         return this.intention = "add";
    //     }
    //     return "remove";
    // }
    getTargetElementMap(command) {
        switch (command) {
            case "strong":
            case "bold":
            case "b":
                return 'strong';
            case "italic":
            case "i":
            case "em":
                return "em";
            case "underline":
            case "u":
                return "u";
            case "strikethrough":
            case "s":
                return 's';
            case "background":
                return "span";
            case "color":
                return "span";
            default:
                throw new Error();
        }
    }
    getSelectedTextNodes() {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return [];
        }
        const textNodes = [];
        for (let i = 0; i < selection.rangeCount; ++i) {
            const range = selection.getRangeAt(i);
            const nodeIterator = document.createNodeIterator(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
                acceptNode(node) {
                    if (range.intersectsNode(node)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            });
            let node;
            while ((node = nodeIterator.nextNode())) {
                if (node.nodeType === Node.TEXT_NODE) {
                    const nodeRange = document.createRange();
                    nodeRange.selectNodeContents(node);
                    if (range.compareBoundaryPoints(Range.END_TO_START, nodeRange) === -1 &&
                        range.compareBoundaryPoints(Range.START_TO_END, nodeRange) === 1) {
                        textNodes.push(node);
                    }
                }
            }
        }
        return textNodes;
    }
    findClosestMatchingParent(element, target) {
        if (element && element.nodeType === Node.TEXT_NODE) {
            element = element.parentElement;
        }
        while (element && element !== document.body) {
            if (element.nodeType === Node.ELEMENT_NODE) {
                const elem = element;
                if (elem.tagName.toLowerCase() === target.nodeType.toLowerCase()) {
                    if (!target.classes || target.classes.every(cls => elem.classList.contains(cls))) {
                        return elem;
                    }
                }
            }
            element = element.parentElement;
        }
        return null;
    }
    extractSelectedText(textNode) {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
            return "";
        }
        const range = selection.getRangeAt(0);
        if (textNode.nodeType !== Node.TEXT_NODE) {
            return "";
        }
        const textContent = textNode.textContent || "";
        let start = 0;
        let end = textContent.length;
        if (!range.intersectsNode(textNode)) {
            return "";
        }
        if (range.startContainer === textNode) {
            start = range.startOffset;
        }
        else if (range.startContainer.contains(textNode)) {
            start = 0;
        }
        if (range.endContainer === textNode) {
            end = range.endOffset;
        }
        else if (range.endContainer.contains(textNode)) {
            end = textContent.length;
        }
        if (start < end) {
            return textContent.substring(start, end);
        }
        return "";
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextOperationService);


/***/ }),

/***/ "./src/block-operation.js":
/*!********************************!*\
  !*** ./src/block-operation.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createListItem: () => (/* binding */ createListItem),
/* harmony export */   createNewElement: () => (/* binding */ createNewElement),
/* harmony export */   deleteAndFocusOnNext: () => (/* binding */ deleteAndFocusOnNext),
/* harmony export */   deleteAndFocusOnPrevious: () => (/* binding */ deleteAndFocusOnPrevious),
/* harmony export */   deleteDraggableParentBlock: () => (/* binding */ deleteDraggableParentBlock),
/* harmony export */   duplicateSelectedBlock: () => (/* binding */ duplicateSelectedBlock),
/* harmony export */   moveDownBlock: () => (/* binding */ moveDownBlock),
/* harmony export */   moveUpBlock: () => (/* binding */ moveUpBlock),
/* harmony export */   transformBlock: () => (/* binding */ transformBlock)
/* harmony export */ });
/* harmony import */ var _element_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-factory */ "./src/element-factory.js");
/* harmony import */ var _j_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./j-selection */ "./src/j-selection.js");
/* harmony import */ var _j_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./j-window */ "./src/j-window.js");
/* harmony import */ var _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/floating-toolbar/text-formatting-bar */ "./src/components/floating-toolbar/text-formatting-bar.js");














//** Create a default block or a element list */
function createNewElement(event) {

    const element = event.target;

    const contentElement = element.closest('.johannes-content-element');

    if (contentElement && contentElement.classList.contains('list')) {
        createListItem(contentElement);
    } else {
        createADefaultBlock(contentElement);
    }
}

//** Just create a new paragraph draggable block and insert in the DOM */
function createADefaultBlock(eventParagraph) {

    const newBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement();

    if (eventParagraph && eventParagraph.closest('.draggable-block')) {
        const sibling = eventParagraph.closest('.draggable-block');
        sibling.insertAdjacentElement('afterend', newBlock);
    } else {
        document.querySelector('.johannes-editor > .content').appendChild(newBlock);
    }

    const focusable = newBlock.querySelector('.johannes-content-element');
    // focusable.focus();

    (0,_j_window__WEBPACK_IMPORTED_MODULE_2__.focusOnTheEndOfTheText)(focusable);
}

function createListItem(element) {

    let newContentElement = null;

    let activeElement = document.activeElement;
    let contentElement = element.closest('.johannes-content-element');

    if (contentElement.classList.contains('checkbox-list')) {
        newContentElement = (0,_element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewCheckboxLiElement)();
    } else if (contentElement.classList.contains('list')) {
        newContentElement = (0,_element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewLiElement)();
    } else {
        newContentElement = (0,_element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();
    }

    let parentBlock = null;

    if (contentElement.classList.contains('list')) {

        parentBlock = contentElement;

        const textContent = activeElement.textContent.trim();

        if (textContent === '') {

            parentBlock = element.closest('.draggable-block');

            element.closest('.deletable').remove();

            newContentElement = (0,_element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();
            parentBlock.insertAdjacentElement('afterend', newContentElement);

        } else {
            const activeElement = document.activeElement.closest('.list-item');
            activeElement.insertAdjacentElement('afterend', newContentElement);
        }

    } else {
        parentBlock = element.closest('.draggable-block');

        if (parentBlock) {
            if (parentBlock.nextSibling) {
                parentBlock.parentNode.insertBefore(newContentElement, parentBlock.nextSibling);
            } else {
                parentBlock.parentNode.appendChild(newContentElement);
            }
        }
    }

    (0,_j_window__WEBPACK_IMPORTED_MODULE_2__.focusOnTheEndOfTheText)(newContentElement);
}

//** Delete the closest draggable-block parent of a child. Take the current selection if a child is not passed. */
function deleteDraggableParentBlock(child) {

    let draggableBlockToRemove = null;

    if (child && child instanceof HTMLElement && child.closest('.draggable-block')) {
        draggableBlockToRemove = child.closest('.draggable-block');
    } else {
        draggableBlockToRemove = _j_selection__WEBPACK_IMPORTED_MODULE_1__.getCurrentDraggableBlockFocused();
    }

    if (draggableBlockToRemove) {
        draggableBlockToRemove.remove();
    } else {
        throw new Error('Focusable Element Not Found Exception');
    }

    clearAllAfterDelete();
}

function deleteAndFocusOnPrevious() {

    const currentActiveElement = document.activeElement;

    (0,_j_window__WEBPACK_IMPORTED_MODULE_2__.focusOnPrevious)(currentActiveElement);
    deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
}

function deleteAndFocusOnNext() {

    const currentActiveElement = document.activeElement;

    (0,_j_window__WEBPACK_IMPORTED_MODULE_2__.focusOnNext)(currentActiveElement);
    deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentActiveElement);
}


//** Delete the current element and the draggable-block parent if empty. A block is empty if has no editable element inside. */
function deleteTheCurrentElementAndTheDraggableBlockIfEmpty(currentElement) {

    const parentBlock = currentElement.closest('.draggable-block');
    const actual = currentElement.closest('.deletable');

    actual.remove();

    if (parentBlock && parentBlock.querySelectorAll('.editable').length == 0) {
        parentBlock.remove();
    }
}

/** Transform a block type into another */
function transformBlock(blockElement, type) {

    //blockElement, type


    let contentElement = blockElement.querySelector('.swittable');
    let content = contentElement.innerText;

    // if (content.endsWith('/')) {
    //     content = content.slice(0, -1); // Remove the last '/'
    // }

    let newContentBlock;

    switch (type) {
        case 'p':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewParagraphElement();
                newContentBlock.innerText = content;
                break;
            }
        case 'h1':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(1);
                newContentBlock.innerText = content;
                break;
            }
        case 'h2':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(2);
                newContentBlock.innerText = content;
                break;
            }
        case 'h3':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(3);
                newContentBlock.innerText = content;
                break;
            }
        case 'h4':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(4);
                newContentBlock.innerText = content;
                break;
            }
        case 'h5':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(5);
                newContentBlock.innerText = content;
                break;
            }
        case 'h6':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(6);
                newContentBlock.innerText = content;
                break;
            }
        case 'code':
            newContentBlock = document.createElement('pre');
            const code = document.createElement('code');
            code.innerText = content;
            newContentBlock.appendChild(code);
            break;
        case 'image':
            newContentBlock = document.createElement('img');
            newContentBlock.src = content;
            newContentBlock.alt = "Descriptive text";
            break;
        case 'quote':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewQuoteElement(content);

                break;
            }
        case 'bulleted-list':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewListElement(content);

                break;
            }

        case 'numbered-list':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewListElement(content, 'ol');

                break;
            }
        case 'todo-list':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewTodoListElement(content, 'ul');

                break;
            }

        case 'separator':
            {
                newContentBlock = _element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewSeparatorElement();
                break;
            }

        default:
            console.error('Unsupported type');
            return;
    }

    blockElement.replaceChild(newContentBlock, contentElement);

    const focusable = newContentBlock.closest('.focusable') || blockElement.querySelector('.focusable');

    (0,_j_window__WEBPACK_IMPORTED_MODULE_2__.focusOnTheEndOfTheText)(focusable);
}


function moveDownBlock() {

}

function moveUpBlock() {

}

function duplicateSelectedBlock() {

    let element = _j_selection__WEBPACK_IMPORTED_MODULE_1__.getCurrentDraggableBlockFocused();

    if (!element || !element.parentNode) {
        console.error('O elemento fornecido é inválido ou não está no DOM.');
        return;
    }

    const clone = element.cloneNode(true);

    // Obtem o próximo elemento irmão
    const nextElement = element.nextSibling;

    // Insere o clone antes do próximo elemento irmão no pai
    // Se o próximo elemento irmão não existir, 'insertBefore' funcionará como 'appendChild'
    element.parentNode.insertBefore(clone, nextElement);


    (0,_components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_3__.hideAllDependentBox)();
    (0,_components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_3__.hideTextFormattingBar)();

    (0,_j_window__WEBPACK_IMPORTED_MODULE_2__.focusOnTheEndOfTheText)(clone);
}

function clearAllAfterDelete() {
    _j_selection__WEBPACK_IMPORTED_MODULE_1__.clearAllSelection();

    (0,_components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_3__.hideAllDependentBox)();
    (0,_components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_3__.hideTextFormattingBar)();
}

/***/ }),

/***/ "./src/commands/command-factory.js":
/*!*****************************************!*\
  !*** ./src/commands/command-factory.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OPERATIONS: () => (/* binding */ OPERATIONS),
/* harmony export */   createCommand: () => (/* binding */ createCommand),
/* harmony export */   getBlockOperationFunction: () => (/* binding */ getBlockOperationFunction),
/* harmony export */   operationMap: () => (/* binding */ operationMap)
/* harmony export */ });
/* harmony import */ var _block_operation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../block-operation */ "./src/block-operation.js");
/* harmony import */ var _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/quick-menu/quick-insert-menu */ "./src/components/quick-menu/quick-insert-menu.js");
/* harmony import */ var _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _j_window__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../j-window */ "./src/j-window.js");
/* harmony import */ var _components_quick_menu_QuickMenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/quick-menu/QuickMenu */ "./src/components/quick-menu/QuickMenu.ts");
/* harmony import */ var _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/floating-toolbar/text-formatting-bar */ "./src/components/floating-toolbar/text-formatting-bar.js");








function createCommand(operationName, elements = null) {
    return new Command(operationName, elements);
}

class Command {

    constructor(operationName, elements) {
        this.elements = elements;
        this.operation = getBlockOperationFunction(operationName);
    }

    execute() {

        setTimeout(() => {
            if (this.elements !== null) {
                this.operation(...this.elements);
            } else {
                this.operation();
            }
        }, 0);

    }
}

const OPERATIONS = {
    BLOCK: {
        CREATE_LIST_ELEMENT: 'create-list-element',
        CREATE_NEW_ELEMENT: 'create-new-element',
        DELETE_DRAGGABLE_BLOCK: 'delete-draggable-block',
        DELETE_AND_FOCUS_ON_NEXT: 'delete-and-focus-on-next',
        DELETE_AND_FOCUS_ON_PREVIOUS: 'delete-and-focus-on-previous',
        DUPLICATE_SELECTED_BLOCK: 'duplicate-selected-block',
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
        APPLY_SELECTED_BLOCK_TYPE: 'apply-selected-block-type',
        FILTER_CONCAT: 'filter-contact',
        FILTER_REMOVE_LAST: 'filter-remove-last',
    },
    FORMATTING_BAR: {
        SHOW_TEXT_FORMATTING_BAR: 'show-text-formatting-bar',
        HIDE_TEXT_FORMATTING_BAR: 'hide-text-formatting-bar',
        TOGGLE_MORE_OPTIONS_BOX: 'toggle-more-options-box',
        TOGGLE_CHANGE_COLOR_BOX: 'toggle-change-color-box',
        TOGGLE_TURN_INTO_BOX: 'toggle-turn-into-box',
        TOGGLE_INPUT_LINK_BOX: 'toggle-input-link-box',
        INPUT_LINK_URL: 'input-link-url',
        TOGGLE_ENCLOSE_SELECTED_TEXT_TO: 'toggle-enclose-selected-text-to',
    },

};

const operationMap = {
    [OPERATIONS.BLOCK.CREATE_LIST_ELEMENT]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.createListItem,
    [OPERATIONS.BLOCK.CREATE_NEW_ELEMENT]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.createNewElement,
    [OPERATIONS.BLOCK.DELETE_DRAGGABLE_BLOCK]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.deleteDraggableParentBlock,
    [OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_NEXT]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.deleteAndFocusOnNext,
    [OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_PREVIOUS]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.deleteAndFocusOnPrevious,
    [OPERATIONS.BLOCK.DUPLICATE_SELECTED_BLOCK]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.duplicateSelectedBlock,
    [OPERATIONS.BLOCK.TRANSFORM_BLOCK]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.transformBlock,
    [OPERATIONS.BLOCK.MOVE_UP_BLOCK]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.moveUpBlock,
    [OPERATIONS.BLOCK.MOVE_DOWN_BLOCK]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.moveDownBlock,
    [OPERATIONS.BLOCK_OPTIONS.SHOW_BLOCK_OPTIONS]: _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__.showMainBlockOptions,
    [OPERATIONS.BLOCK_OPTIONS.HIDE_CLEAR_BLOCK_OPTIONS]: _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__.hideAndClearBlockOptions,
    [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION]: _components_quick_menu_QuickMenu__WEBPACK_IMPORTED_MODULE_3__["default"].moveTheFakeFocusToTheNextMenuItem,   // blockOptionOperation.moveTheFakeFocusToTheNextBlockOption,
    [OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION]: _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__.moveTheFakeFocusToPreviousBlockOption,
    [OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_BLOCK_TYPE]: _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__.applySelectedBlockType,
    [OPERATIONS.BLOCK_OPTIONS.FILTER_CONCAT]: _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__.filterContact,
    [OPERATIONS.BLOCK_OPTIONS.FILTER_REMOVE_LAST]: _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__.filterRemoveLast,
    [OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.showTextFormattingBar,
    [OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.hideTextFormattingBar,
    [OPERATIONS.FORMATTING_BAR.TOGGLE_MORE_OPTIONS_BOX]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.toggleMoreOptionsBox,
    [OPERATIONS.FORMATTING_BAR.TOGGLE_CHANGE_COLOR_BOX]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.toggleChangeColorBox,
    [OPERATIONS.FORMATTING_BAR.TOGGLE_TURN_INTO_BOX]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.toggleTurnIntoBox,
    [OPERATIONS.FORMATTING_BAR.TOGGLE_INPUT_LINK_BOX]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.toggleInputLinkBox,
    [OPERATIONS.FORMATTING_BAR.INPUT_LINK_URL]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.inputLinkUrl,
    [OPERATIONS.FORMATTING_BAR.TOGGLE_ENCLOSE_SELECTED_TEXT_TO]: _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_4__.toggleEncloseSelectedTextTo,
    [OPERATIONS.SHOW_TURN_INTO_BOX]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.transformBlock,
    [OPERATIONS.SHOW_COLOR_BOX]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.transformBlock,
    [OPERATIONS.SHOW_MORE_OPTIONS_BOX]: _block_operation__WEBPACK_IMPORTED_MODULE_0__.transformBlock
};

function getBlockOperationFunction(blockOperation) {
    const operationFunction = operationMap[blockOperation];
    if (!operationFunction) {
        throw new Error('Operation Not Found Exception');
    }
    return operationFunction;
}

/***/ }),

/***/ "./src/components/floating-toolbar/text-formatting-bar.js":
/*!****************************************************************!*\
  !*** ./src/components/floating-toolbar/text-formatting-bar.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   canHideTextFormattingBar: () => (/* binding */ canHideTextFormattingBar),
/* harmony export */   hideAllDependentBox: () => (/* binding */ hideAllDependentBox),
/* harmony export */   hideTextFormattingBar: () => (/* binding */ hideTextFormattingBar),
/* harmony export */   inputLinkUrl: () => (/* binding */ inputLinkUrl),
/* harmony export */   isOutOfTextFormattingBar: () => (/* binding */ isOutOfTextFormattingBar),
/* harmony export */   isShowingTextFormattingBar: () => (/* binding */ isShowingTextFormattingBar),
/* harmony export */   isShowingTextFormattingSelectableDependentBox: () => (/* binding */ isShowingTextFormattingSelectableDependentBox),
/* harmony export */   showTextFormattingBar: () => (/* binding */ showTextFormattingBar),
/* harmony export */   toggleChangeColorBox: () => (/* binding */ toggleChangeColorBox),
/* harmony export */   toggleEncloseSelectedTextTo: () => (/* binding */ toggleEncloseSelectedTextTo),
/* harmony export */   toggleInputLinkBox: () => (/* binding */ toggleInputLinkBox),
/* harmony export */   toggleMoreOptionsBox: () => (/* binding */ toggleMoreOptionsBox),
/* harmony export */   toggleTurnIntoBox: () => (/* binding */ toggleTurnIntoBox)
/* harmony export */ });
/* harmony import */ var _j_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../j-selection */ "./src/j-selection.js");
/* harmony import */ var _j_anchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../j-anchor */ "./src/j-anchor.js");
/* harmony import */ var _quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../quick-menu/quick-insert-menu */ "./src/components/quick-menu/quick-insert-menu.js");
/* harmony import */ var _quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_2__);









let textFormattingBarVisible = false;
let textFormattingBarPreventHide = false;



function isShowingTextFormattingSelectableDependentBox() {
    let isShowing = (
        turnIntoSelect.style.display !== 'none' ||
        moreTextOptionSelect.style.display !== 'none' ||
        colorTextOptionSelect.style.display !== 'none');
    return isShowing;
}

function isOutOfTextFormattingBar(event) {

    if (!event.target.closest('#textFormattingBar') && !event.target.closest('#linkBox')) {
        return true;
    }

    return false;
}

function canHideTextFormattingBar() {
    return !textFormattingBarPreventHide;
}

function isShowingTextFormattingBar() {
    return textFormattingBar.style.display !== 'none';
}

function showTextFormattingBar(event) {

    console.log('show text formatting bar');

    hideAllDependentBox();

    textFormattingBarVisible = true;
    textFormattingBarPreventHide = true;

    setTimeout(() => {
        textFormattingBarPreventHide = false;
    }, 300);

    _j_selection__WEBPACK_IMPORTED_MODULE_0__.removeSavedSelection();
    _j_selection__WEBPACK_IMPORTED_MODULE_0__.saveSelection();

    clearTextFormattingButtonActive();
    updateTextFormattingActiveButtons();

    changeTurnIntoButtonText();

    const selection = window.getSelection();

    if (selection.rangeCount > 0 && document.querySelector('.johannes-editor').contains(selection.anchorNode) && selection.toString().trim() !== '') {
        event.preventDefault();
        event.stopPropagation();

        let range = selection.getRangeAt(0);
        let rect = range.getBoundingClientRect();

        textFormattingBar.style.display = 'flex';
        textFormattingBar.style.left = `${rect.left + window.scrollX - 50}px`;
        textFormattingBar.style.top = `${rect.top + window.scrollY - textFormattingBar.offsetHeight - 10}px`;
    }
}

function hideTextFormattingBar() {

    console.log('hide text formatting bar ');

    // textFormattingBar.style.display = 'none';

    tryHideTextFormattingBar();
}


function clearTextFormattingButtonActive() {
    linkTextButton.classList.remove('text-formatting-button-active');
    boldTextButton.classList.remove('text-formatting-button-active');
    italicTextButton.classList.remove('text-formatting-button-active');
    underlineTextButton.classList.remove('text-formatting-button-active');
    codeTextButton.classList.remove('text-formatting-button-active');
    strikeThroughTextButton.classList.remove('text-formatting-button-active');
    mathTextButton.classList.remove('text-formatting-button-active');
    colorCircle.classList.remove('text-formatting-circle-active');
}

function updateTextFormattingActiveButtons() {

    const selectedTags = getSelectedTags();

    selectedTags.forEach(tag => {

        if (tag == "a") {
            linkTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "strong") {
            boldTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "em") {
            italicTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "u") {
            underlineTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "s") {
            strikeThroughTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "code") {
            codeTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "math") {
            mathTextButton.classList.add('text-formatting-button-active');
        }

        if (tag == "mark") {
            colorCircle.classList.add('text-formatting-circle-active');
        }
    });
}

function getSelectedTags() {
    const selection = window.getSelection();
    const tags = [];

    const tagNames = ["STRONG", "S", "EM", "U", "CODE", "MATH", "A", "MARK"];

    if (selection.rangeCount) {
        const range = selection.getRangeAt(0);
        const startContainer = range.startContainer;
        const endContainer = range.endContainer;

        if (startContainer !== endContainer) {
            const commonAncestor = range.commonAncestorContainer;
            const elements = commonAncestor.nodeType === 1 ? commonAncestor.querySelectorAll("*") : [];

            elements.forEach(el => {
                if (tagNames.includes(el.tagName) && selection.containsNode(el, true)) {
                    tags.push(el.tagName.toLowerCase());
                }
            });
        } else {
            let node = startContainer.nodeType === 1 ? startContainer : startContainer.parentNode;
            while (node && node !== document) {
                if (tagNames.includes(node.tagName)) {
                    tags.push(node.tagName.toLowerCase());
                }
                node = node.parentNode;
            }
        }
    }

    return [...new Set(tags)];
}


function toggleEncloseSelectedTextTo(event) {
    const dataTag = event.target.closest('.entry').getAttribute('data-tag');
    const dataClass = event.target.closest('.entry').getAttribute('data-class');

    if (dataClass) {
        toggleSelectedTextTo(dataTag, dataClass);
    } else {
        toggleSelectedTextTo(dataTag);
    }

    hideAllDependentBox();
    hideTextFormattingBar();

    _j_selection__WEBPACK_IMPORTED_MODULE_0__.restoreSelection();
}

// document.addEventListener('DOMContentLoaded', function () {

//     boldTextButton.addEventListener('click', function (event) {
//         toggleSelectedTextTo('strong');
//         clearSelection();
//         tryHideTextFormattingBar();
//     });

//     italicTextButton.addEventListener('click', function () {
//         toggleSelectedTextTo('em');
//         clearSelection();
//         tryHideTextFormattingBar();
//     });

//     underlineTextButton.addEventListener('click', function () {
//         toggleSelectedTextTo('u');
//         clearSelection();
//         tryHideTextFormattingBar();
//     });

//     codeTextButton.addEventListener('click', function () {
//         toggleSelectedTextTo('code');
//         clearSelection();
//         tryHideTextFormattingBar();
//     });

//     strikeThroughTextButton.addEventListener('click', function () {
//         toggleSelectedTextTo('s');
//         clearSelection();
//         tryHideTextFormattingBar();
//     });

//     mathTextButton.addEventListener('click', function () {
//         toggleSelectedTextTo('math');
//         clearSelection();
//         tryHideTextFormattingBar();
//     });

//     linkTextButton.addEventListener('click', function () {
//         jAnchor.save(toggleSelectedTextTo('a'));

//         if (jAnchor.any()) {
//             showInputLinkBox();
//         }
//     });

//     linkBoxInput.addEventListener('keypress', function (event) {
//         if (event.key === 'Enter') {
//             urlInsert();
//             clearSelection();
//             tryHideTextFormattingBar();
//         }
//     });
// });



function inputLinkUrl() {
    const url = linkBoxInput.value.trim();
    if (!url) return;

    // Simples verificação de URL
    if (!url.match(/^https?:\/\/.+/)) {
        alert('Please enter a valid URL.');
        return;
    }

    _j_anchor__WEBPACK_IMPORTED_MODULE_1__.setURL(url);

    //Move this to windows manager
    hideLinkBox();

    // jAnchor.clear();
    // jSelection.clearAllSelection();


    //Ops
    linkBoxInput.value = '';
}


function toggleSelectedTextTo(tagName, classList = '') {
    let newElement = null;

    const range = _j_selection__WEBPACK_IMPORTED_MODULE_0__.getSavedRange();
    const selectedText = range.toString().trim();
    if (!selectedText) return;

    const container = range.commonAncestorContainer;

    // Encontrar o elemento formatado mais próximo
    let formattedElement = null;
    if (container.nodeType === 3) { // Nó de texto
        formattedElement = container.parentNode.tagName.toLowerCase() === tagName.toLowerCase() ? container.parentNode : null;
    } else {
        formattedElement = container.tagName.toLowerCase() === tagName.toLowerCase() ? container : container.querySelector(tagName);
    }

    if (formattedElement) {
        // Remover todos os irmãos dentro da seleção que correspondem ao tagName
        const siblings = Array.from(formattedElement.parentNode.childNodes).filter(child =>
            child.nodeType === 1 && // Element node
            child.tagName.toLowerCase() === tagName.toLowerCase() &&
            range.intersectsNode(child) // Verifica se o nó está dentro da seleção
        );

        const parent = formattedElement.parentNode;
        siblings.forEach(sibling => {
            while (sibling.firstChild) {
                parent.insertBefore(sibling.firstChild, sibling);
            }
            parent.removeChild(sibling);
        });

        parent.normalize();

        // Atualizar a seleção para refletir as mudanças
        range.setStart(parent, 0);
        range.setEnd(parent, parent.childNodes.length);
    } else {
        // A seleção não está na formatação especificada, então adicionar
        newElement = document.createElement(tagName);
        if (tagName === 'mark') {
            let classes = classList.split(',').filter(e => e.length > 0);
            classes.forEach(className => {
                newElement.classList.add(className);
            });
        }

        try {
            range.surroundContents(newElement);
        } catch (e) {
            console.error("Erro ao aplicar a tag:", e);
            return;
        }

        range.selectNodeContents(newElement);
    }

    // Restaurar a seleção
    // selection.removeAllRanges();
    // selection.addRange(range);

    return newElement;
}

//original funcional
// function toggleSelectedTextTo(tagName, classList = '') {

//     let newElement = null;



//     const range = jSelection.getSavedRange();
//     const selectedText = range.toString().trim();
//     if (!selectedText) return;

//     const container = range.commonAncestorContainer;

//     // Verificar se a seleção atual está dentro de uma tag específica
//     let formattedElement = null;

//     if (container.nodeType === 3) { // Nó de texto
//         formattedElement = container.parentNode.tagName.toLowerCase() === tagName.toLowerCase() ? container.parentNode : null;
//     } else {
//         formattedElement = container.tagName.toLowerCase() === tagName.toLowerCase() ? container : container.querySelector(tagName);
//     }

//     if (formattedElement) {
//         // A seleção está dentro da formatação especificada, então devemos remover
//         const parent = formattedElement.parentNode;
//         while (formattedElement.firstChild) {
//             parent.insertBefore(formattedElement.firstChild, formattedElement);
//         }
//         parent.removeChild(formattedElement);

//         // Mesclar nós de texto adjacentes
//         parent.normalize();

//         // Atualizar a seleção para refletir as mudanças
//         range.setStart(parent, 0);
//         range.setEnd(parent, parent.childNodes.length);
//     } else {
//         // A seleção não está na formatação especificada, então adicionar
//         newElement = document.createElement(tagName);

//         if (tagName == 'mark') {
//             let classes = classList.split(',').filter(e => e.length > 0);

//             for (let className of classes) {
//                 newElement.classList.add(className);
//             }
//         }

//         try {
//             range.surroundContents(newElement);
//         } catch (e) {
//             console.error("Erro ao aplicar a tag:", e);
//             return;
//         }

//         // Atualizar a seleção para refletir as mudanças
//         range.selectNodeContents(newElement);
//     }

//     // Restaurar a seleção
//     // selection.removeAllRanges();
//     // selection.addRange(range);

//     return newElement;
// }


// function clearSelection() {
//     const selection = window.getSelection();
//     selection.removeAllRanges();
// }


// document.addEventListener('DOMContentLoaded', function () {

//     //MOUSE-UP
//     document.addEventListener('mouseup', function (event) {
//         if (window.getSelection().toString().trim() !== '') {

//             clearTextFormattingButtonActive();
//             showTextFormattingBar(event);
//             updateTextFormattingActiveButtons();

//         } else if (!event.target.closest('#linkBox') && !event.target.closest('#link-text-button')) {

//             console.log('MOUSEUP ocultar tool text-formatting-bar e link-box');

//             tryHideTextFormattingBar();
//         }
//     });

//     //KEY
//     document.addEventListener('keyup', function (event) {
//         if (event.key === 'Shift' && window.getSelection().toString().trim() !== '') {
//             // text selected

//             showTextFormattingBar(event);

//         } else if (event.key === 'Escape') {
//             // scape hide the link-box and text-formatting-bar
//             console.log('ESC ocultar tool text-formatting-bar e link-box');

//             tryHideTextFormattingBar();
//         }
//     });

// });




// function adjustWidth() {
//     const selectedOption = turnIntoSelect.options[turnIntoSelect.selectedIndex];
//     const tempSpan = document.createElement("span");
//     tempSpan.style.visibility = "hidden";
//     tempSpan.style.position = "fixed";
//     tempSpan.style.whiteSpace = "nowrap";
//     tempSpan.innerText = selectedOption.text;
//     document.body.appendChild(tempSpan);
//     turnIntoSelect.style.width = tempSpan.offsetWidth + 24 + "px"; // +20 para incluir o padding e o botão de dropdown
//     document.body.removeChild(tempSpan);
// }




// document.addEventListener('DOMContentLoaded', function () {
//     turnIntoButton.addEventListener('click', function () {

//         if (turnIntoSelect.style.display == 'none') {
//             closeAllDependentBox();
//             turnIntoSelect.style.display = 'flex';
//         } else {
//             turnIntoSelect.style.display = 'none';
//         }
//     });
// });


function changeTurnIntoButtonText() {

    let text = getBlockTypeText();

    turnIntoButton.querySelector('span').innerText = text;
}

function getBlockTypeText() {
    let currentBlockRange = window.getSelection().getRangeAt(0);

    let commonAncestor = currentBlockRange.commonAncestorContainer;

    if (commonAncestor.nodeType === 3) { //* text node */
        commonAncestor = commonAncestor.parentNode;
    }

    const currentBlock = commonAncestor.closest('.johannes-content-element');

    if (currentBlock.tagName === 'H1') {
        return 'Heading 1';
    } else if (currentBlock.tagName === 'H2') {
        return 'Heading 2';
    } else if (currentBlock.tagName === 'H3') {
        return 'Heading 3';
    } else if (currentBlock.tagName === 'H4') {
        return 'Heading 4';
    } else if (currentBlock.tagName === 'H5') {
        return 'Heading 5';
    } else if (currentBlock.tagName === 'H6') {
        return 'Heading 6';
    } else if (currentBlock.tagName === 'P') {
        return 'Text';
    } else if (currentBlock.tagName === 'UL' && currentBlock.classList.contains('checkbox-list')) {
        return 'Todo list';
    } else if (currentBlock.tagName === 'UL') {
        return 'Bulleted list';
    } else if (currentBlock.tagName === 'OL') {
        return 'Numbered list';
    } else if (currentBlock.tagName === 'BLOCKQUOTE') {
        return 'Quote';
    } else if (currentBlock.tagName === 'PRE') {
        return 'Code';
    } else {
        return '';
    }

}

function setTurnIntoCurrentSelectedBlockOptionIcon() {
    let block = (0,_j_selection__WEBPACK_IMPORTED_MODULE_0__.getCurrentDraggableBlockFocused)().querySelector('.johannes-content-element');

    if (block) {
        let type = block.getAttribute('data-type');
        let option = turnIntoSelect.querySelector(`[data-type="${type}"]`);

        if (option) {
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.classList.add('checked-svg');
            let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
            use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#icon-material-small-check");


            svg.appendChild(use);
            svg.setAttribute('width', '16');
            svg.setAttribute('height', '16');
            svg.setAttribute('fill', 'currentColor');

            // let textOption = option.querySelector('.text-option');
            option.appendChild(svg);
        }
    }
}

function extractMarkClasses(element) {
    const marks = element.querySelectorAll('mark');
    const classes = [];

    marks.forEach(mark => {
        mark.classList.forEach(cls => {
            if (!classes.includes(cls)) {
                classes.push(cls);
            }
        });
    });

    return classes;
}

function setColorCurrentSelectedIcon() {
    let currentRange = _j_selection__WEBPACK_IMPORTED_MODULE_0__.getSavedRange();

    if (currentRange) {
        let fragment = currentRange.cloneContents();

        let tempDiv = document.createElement("div");
        tempDiv.appendChild(fragment);

        let marks = extractMarkClasses(tempDiv);

        marks.forEach(markClass => {
            let option = colorTextOptionSelect.querySelector(`[data-class="${markClass}"]`);

            if (option && !option.querySelector('.checked-svg')) {
                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.classList.add('checked-svg');
                let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
                use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#icon-material-small-check");

                svg.appendChild(use);
                svg.setAttribute('width', '16');
                svg.setAttribute('height', '16');
                svg.setAttribute('fill', 'currentColor');

                option.appendChild(svg);
            }
        });

        if (marks.length > 0) {
            let options = colorTextOptionSelect.querySelectorAll('.option');

            options.forEach(option => {
                option.setAttribute('disabled', 'true');
                option.style.cursor = "not-allowed";
            });

            clearColorBackgroundOption.removeAttribute('disabled');
            clearColorBackgroundOption.style.display = 'flex';
            clearColorBackgroundOption.style.cursor = "auto";

        } else {
            clearColorBackgroundOption.style.display = 'none';
        }


    }
}

function removeAllSVGsFromTurnIntoTextOptions() {
    const textOptions = turnIntoSelect.querySelectorAll('.option');

    textOptions.forEach(textOption => {
        const svgs = textOption.querySelectorAll('.checked-svg');

        svgs.forEach(svg => {
            svg.parentNode.removeChild(svg);
        });
    });
}

function removeAllSVGsFromColorsTextOptions() {
    const textOptions = colorTextOptionSelect.querySelectorAll('.option');

    textOptions.forEach(textOption => {
        const svgs = textOption.querySelectorAll('.checked-svg');

        svgs.forEach(svg => {
            svg.parentNode.removeChild(svg);
        });
    });

    let options = colorTextOptionSelect.querySelectorAll('.option');

    options.forEach(option => {
        option.removeAttribute('disabled');
        option.style.cursor = "auto";
    });

    clearColorBackgroundOption.style.display = 'none';
    clearColorBackgroundOption.style.cursor = "auto";
}


function toggleMoreOptionsBox(event) {

    console.log('toggle more options');

    const isHidden = moreTextOptionSelect.style.display == 'none';

    if (isHidden) {
        moreTextOptionSelect.style.display = 'flex';
        (0,_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_2__.showDependentBlockOptions)(event.target);

        _j_selection__WEBPACK_IMPORTED_MODULE_0__.temporarySelectContentFromCurrentSelection();

    } else {
        hideMoreOptionsBox();
    }

    hideChangeColorBox();
    hideTurnIntoBox();
    hideLinkBox();
}

function toggleChangeColorBox(event) {

    console.log('toggle change color');

    const isHidden = colorTextOptionSelect.style.display == 'none';

    if (isHidden) {
        colorTextOptionSelect.style.display = 'flex';
        (0,_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_2__.showDependentBlockOptions)(event.target);

        removeAllSVGsFromColorsTextOptions();
        setColorCurrentSelectedIcon();

    } else {
        colorTextOptionSelect.style.display = 'none';
    }

    hideTurnIntoBox();
    hideMoreOptionsBox();
    hideLinkBox();
}

function toggleTurnIntoBox(event) {

    console.log('toggle turn into box');

    const isHidden = turnIntoSelect.style.display == 'none';

    if (isHidden) {
        turnIntoSelect.style.display = 'flex';
        _j_selection__WEBPACK_IMPORTED_MODULE_0__.temporarySelectContentFromCurrentSelection();

        (0,_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_2__.showDependentBlockOptions)(event.target);
        removeAllSVGsFromTurnIntoTextOptions();
        setTurnIntoCurrentSelectedBlockOptionIcon();
    } else {
        hideTurnIntoBox();
    }

    hideChangeColorBox();
    hideMoreOptionsBox();
    hideLinkBox();
}

//**Show */
function toggleInputLinkBox() {


    console.log('toggle input link box');

    const isHidden = linkBox.style.display == 'none';

    if (isHidden) {
        // turnIntoSelect.style.display = 'flex';

        showInputLinkBox();

    } else {
        turnIntoSelect.style.display = 'none';
    }

    hideChangeColorBox();
    hideMoreOptionsBox();
    hideTurnIntoBox();
}



function showInputLinkBox() {

    const rect = _j_selection__WEBPACK_IMPORTED_MODULE_0__.getSavedRange().getBoundingClientRect();

    const containerWidth = textFormattingBar.offsetWidth;
    const linkInputDivWidth = linkBox.offsetWidth;
    const containerCenter = (textFormattingBar.getBoundingClientRect().left + containerWidth) / 2;
    const linkInputDivCenter = (linkBox.getBoundingClientRect().left + linkInputDivWidth) / 2;

    linkBox.style.position = 'absolute';
    linkBox.style.left = `${containerCenter - linkInputDivCenter + window.scrollX}px`;
    linkBox.style.top = `${rect.bottom + window.scrollY + 5}px`;
    linkBox.style.display = 'block';

    // linkBoxInput.focus();

    highlightTheSelectionText();

}

//The highlight is added using a anchor. It's ok? I swap to span
function highlightTheSelectionText() {
    const a = toggleSelectedTextTo('a');
    _j_anchor__WEBPACK_IMPORTED_MODULE_1__.setAnchor(a);
}




// toggle-change-color-formatting-bar

//Show color options
// document.addEventListener('DOMContentLoaded', function () {
//     colorTextButton.addEventListener('click', function () {
//         if (colorTextOptionSelect.style.display == 'none') {
//             showColorOptions();
//         } else {
//             hideColorOptions();
//         }
//     });
// });






function showColorOptions() {
    hideAllDependentBox();
    colorTextOptionSelect.style.display = 'flex';
}



// document.addEventListener('DOMContentLoaded', function () {
//     colorTextOptionSelect.querySelectorAll('.option').forEach(option => {
//         option.addEventListener('click', function (event) {
//             let background = event.target.closest('.option').getAttribute('data-color');
//             toggleSelectedTextTo('mark', background);
//             clearSelection();
//             tryHideTextFormattingBar();
//         });
//     });
// });






function tryHideTextFormattingBar() {

    // check before if a dependent box is opened, then close the dependent box

    //1. try  close text-formatting-bar before linkBox (the actual only one dependency box)
    if (isShowingTextFormattingBar() && !anyDependentBoxVisible()) {
        // only hide if the dependency box is closed
        textFormattingBar.style.display = 'none';
        // restoreSelection();
    }

    // 2. close the dependency box (linkBox)
    if (anyDependentBoxVisible()) {

        // Remove a if has no href attribute or if href is empty
        //Move this to a logic inside the linking box
        // if (anchorElement && (anchorElement.href == '' || anchorElement.href == null)) {
        //     const parent = anchorElement.parentNode;
        //     while (anchorElement.firstChild) {
        //         parent.insertBefore(anchorElement.firstChild, anchorElement);
        //     }

        //     if (parent) {
        //         parent.removeChild(anchorElement);
        //         parent.normalize(); // Mesclar nós de texto adjacentes, se necessário
        //     }
        // }

        // linkBox.style.display = 'none';
        hideAllDependentBox();
        _j_selection__WEBPACK_IMPORTED_MODULE_0__.restoreSelection();
    }
}

function anyDependentBoxVisible() {
    const dependentBoxes = document.querySelectorAll('.dependent-box');

    for (const box of dependentBoxes) {
        if (box.style.display !== 'none') {
            return true;
        }
    }

    return false;
}






function hideMoreOptionsBox() {

    if (moreTextOptionSelect.style.display == 'none') {
        return;
    }

    console.log('hide more options');

    moreTextOptionSelect.style.display = 'none';
    _j_selection__WEBPACK_IMPORTED_MODULE_0__.restoreSelection();
}

function hideTurnIntoBox() {

    if (turnIntoSelect.style.display == 'none') {
        return;
    }

    console.log('hide turn into box');
    turnIntoSelect.style.display = 'none';
    _j_selection__WEBPACK_IMPORTED_MODULE_0__.restoreSelection();
    //jSelection.restoreSelection(); //TODO. Do I need this?
    //jSelection.removeSavedSelection();
}

function hideChangeColorBox() {

    if (colorTextOptionSelect.style.display == 'none') {
        return;
    }

    console.log('hide change color box');
    colorTextOptionSelect.style.display = 'none';
}

function hideLinkBox() {

    if (linkBox.style.display == 'none') {
        return;
    }

    console.log('hide link box');

    // if(linkBox.style.display != 'none'){

    // }
    _j_anchor__WEBPACK_IMPORTED_MODULE_1__.clear();
    _j_selection__WEBPACK_IMPORTED_MODULE_0__.restoreSelection();
    linkBox.style.display = 'none';
}



function hideAllDependentBox() {
    hideMoreOptionsBox();
    hideTurnIntoBox();
    hideChangeColorBox();
    hideLinkBox();
}


/***/ }),

/***/ "./src/components/quick-menu/quick-insert-menu.js":
/*!********************************************************!*\
  !*** ./src/components/quick-menu/quick-insert-menu.js ***!
  \********************************************************/
/***/ (() => {

// import { transformBlock } from "../../block-operation";
// import { getCurrentDraggableBlockFocused } from '../../j-selection';
// import { hideAllDependentBox } from '../text-formatting-bar/text-formatting-bar';
// import { hideTextFormattingBar } from '../text-formatting-bar/text-formatting-bar';

// let currentDraggableBlock = null; //This element represents the block where block-options will be displayed close to
// let currentFakeFocusedOption = null; //Fake focus is where the visual focus in on
// let realFocusedElement = null;   // This element is where the real/actual focus is on / TODO: change the name
// let filterText = '';

// export function isShowingBlockOptions() {
//     return blockOptionsWrapper.style.display !== 'none'
// }

// export function setCurrentDraggableBlock(element) {
//     if (!element.classList.contains('draggable-block')) {
//         throw new Error('The Element is Not a Draggable Block');
//     }

//     currentDraggableBlock = element;
// }

// export function setRealFocusedElement(element) {
//     realFocusedElement = element;
// }

// export function setCurrentFakeFocusElement(element) {
//     currentFakeFocusedOption = element;
// }

// export function filterContact(event) {

//     filterText += event.key.toLowerCase();

//     updateBlockVisibility(filterText);

//     const firstVisibleOption = getTheFirstVisibleBlockOption();
//     removeAllVisualFakeFocus();

//     setCurrentFakeFocusElement(firstVisibleOption);
//     applyVisualFakeFocus(realFocusedElement, firstVisibleOption);
// }

// export function filterRemoveLast() {

//     if (filterText.length > 0) {

//         filterText = filterText.slice(0, -1);

//         updateBlockVisibility(filterText);

//         const firstVisibleOption = getTheFirstVisibleBlockOption();
//         removeAllVisualFakeFocus();

//         setCurrentFakeFocusElement(firstVisibleOption);
//         applyVisualFakeFocus(realFocusedElement, firstVisibleOption);

//     } else {
//         hideAndClearBlockOptions();
//     }
// }

// export function clear() {
//     throw new Error('Not Implement Exception')
// }

// export function showDependentBlockOptions(element) {
//     // The timeout in necessary to wait the browser process the selection before show the Block Options
//     setTimeout(() => {

//         removeAllVisualFakeFocus();

//         let draggableBlock = getCurrentDraggableBlockFocused();

//         const realFocusedElement = draggableBlock.querySelector('.focusable');
//         const currentDraggableBlock = draggableBlock;
//         const firstBlockOption = getTheFirstVisibleBlockOptionV2(element);

//         setRealFocusedElement(realFocusedElement);
//         setCurrentDraggableBlock(currentDraggableBlock);
//         setCurrentFakeFocusElement(null);

//         applyVisualFakeFocus(realFocusedElement, null);

//     }, 10);
// }

// export function showMainBlockOptions() {

//     // The timeout in necessary to wait the browser process the selection before show the Block Options
//     setTimeout(() => {

//         const realFocusedElement = document.activeElement;
//         const currentDraggableBlock = realFocusedElement.closest('.draggable-block');
//         const firstBlockOption = getTheFirstVisibleBlockOption();

//         setRealFocusedElement(realFocusedElement);
//         setCurrentDraggableBlock(currentDraggableBlock);
//         setCurrentFakeFocusElement(firstBlockOption);

//         applyVisualFakeFocus(realFocusedElement, firstBlockOption);


//         //TODO: create a clear filter
//         // removeDisplayNoneFromAllBlockOptions();

//         const range = document.getSelection().getRangeAt(0);
//         const cursorPos = range.getBoundingClientRect();

//         const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
//         const menuWidth = 19 * remSize;

//         let xPosition = cursorPos.right;
//         let yPosition = cursorPos.bottom + window.scrollY;

//         const margin = remSize * 1.25;

//         blockOptionsWrapper.style.display = 'block';

//         let blockWidth = blockOptionsWrapper.offsetWidth;


//         if (xPosition + blockWidth + margin > window.innerWidth) {
//             xPosition = cursorPos.left - menuWidth;
//             if (xPosition < 0) xPosition = 0;
//         }

//         blockOptionsWrapper.style.left = `${xPosition}px`;
//         blockOptionsWrapper.style.top = `${yPosition}px`;


//     }, 10);
// }

// export function hideAndClearBlockOptions(elementToFocus) {

//     if (elementToFocus) {
//         elementToFocus.focus();
//     }

//     blockOptionsWrapper.style.display = 'none';
//     clearFilter();

//     //TODO: rename this
//     removeDisplayNoneFromAllBlockOptions();
// }



// TODO:Rename this function
// export function removeDisplayNoneFromAllBlockOptions() {
//     let sections = document.querySelectorAll('.johannes-editor .block-options-wrapper section');

//     sections.forEach(section => {
//         let options = section.querySelectorAll('.option');

//         options.forEach(option => {
//             option.style.display = '';
//         });

//         section.style.display = '';
//     });
// }

// export function moveTheFakeFocusToPreviousBlockOption() {

//     if (!currentFakeFocusedOption) {
//         let options = document.getElementById(getVisibleSelectionId()).querySelectorAll('.option');
//         currentFakeFocusedOption = options[options.length - 1];

//         applyVisualFakeFocus(realFocusedElement, currentFakeFocusedOption);

//         return;
//     }

//     let previous = currentFakeFocusedOption.previousElementSibling;

//     while (previous && (!previous.classList.contains('option') || !isElementVisible(previous))) {
//         previous = previous.previousElementSibling;
//     }

//     if (!previous) {
//         let currentSection = currentFakeFocusedOption.closest('section');
//         let siblingSection;

//         if (currentSection) {
//             siblingSection = currentSection.previousElementSibling;
//         } else {
//             siblingSection = currentFakeFocusedOption.closest('ul');
//         }

//         while (siblingSection) {
//             let options = siblingSection.querySelectorAll('.option');
//             for (let i = options.length - 1; i >= 0; i--) {
//                 if (isElementVisible(options[i])) {
//                     previous = options[i];
//                     break;
//                 }
//             }
//             if (previous) break;
//             siblingSection = siblingSection.previousElementSibling;
//         }

//         if (!previous) {
//             let options = document.querySelectorAll('.block-options-wrapper .option');
//             for (let i = options.length - 1; i >= 0; i--) {
//                 if (isElementVisible(options[i])) {
//                     previous = options[i];
//                     break;
//                 }
//             }
//         }
//     }

//     removeAllVisualFakeFocus();
//     setCurrentFakeFocusElement(previous);
//     applyVisualFakeFocus(realFocusedElement, previous);
// }


// function getVisibleSelectionId() {
//     if (turnIntoSelect.style.display !== 'none') {
//         return 'turnIntoSelect';
//     }

//     if (colorTextOptionSelect.style.display !== 'none') {
//         return 'colorTextOptionSelect';
//     }

//     if (moreTextOptionSelect.style.display !== 'none') {
//         return 'moreTextOptionSelect';
//     }
// }

// export function moveTheFakeFocusToTheNextBlockOption() {

//     if (!currentFakeFocusedOption) {
//         currentFakeFocusedOption = document.getElementById(getVisibleSelectionId()).querySelectorAll('.option')[0];

//         applyVisualFakeFocus(realFocusedElement, currentFakeFocusedOption);

//         return;
//     }

//     let next = currentFakeFocusedOption.nextElementSibling;

//     while (next && (!next.classList.contains('option') || !isElementVisible(next))) {
//         next = next.nextElementSibling;
//     }

//     if (!next) {
//         let currentSection = currentFakeFocusedOption.closest('section');
//         let siblingSection;

//         if (currentSection) {
//             siblingSection = currentSection.nextElementSibling;
//         } else {
//             siblingSection = currentFakeFocusedOption.closest('ul');
//         }

//         while (siblingSection) {
//             next = siblingSection.querySelector('.option');
//             if (next && isElementVisible(next)) {
//                 break;
//             }
//             siblingSection = siblingSection.nextElementSibling;
//         }

//         if (!next) {
//             next = document.querySelector('.block-options-wrapper .option');
//             while (next && !isElementVisible(next)) {
//                 next = next.nextElementSibling;
//             }
//         }
//     }

//     removeAllVisualFakeFocus();
//     setCurrentFakeFocusElement(next);
//     applyVisualFakeFocus(realFocusedElement, next);
// }


// export function applySelectedBlockType(event) {

//     const draggableBlock = realFocusedElement.closest('.draggable-block');
//     const newBlockType = event.target.closest('.option') ?
//         event.target.closest('.option').getAttribute('data-type') :
//         currentFakeFocusedOption.getAttribute('data-type');

//     const lastSlashIndex = realFocusedElement.innerText.lastIndexOf('/');
//     realFocusedElement.innerText = lastSlashIndex !== -1 ? realFocusedElement.innerText.slice(0, lastSlashIndex) : realFocusedElement.innerText;


//     transformBlock(draggableBlock, newBlockType);

//     hideAndClearBlockOptions();
//     hideAllDependentBox();
//     hideTextFormattingBar();
// }

// function clearFilter() {
//     filterText = '';
// }

// function isElementVisible(element) {
//     return element && element.style.display !== 'none' && element.style.visibility !== 'hidden' && element.offsetParent !== null;
// }

// function getTheFirstVisibleBlockOptionV2(element) {

//     let button = element.closest('button');
//     let listId = button.getAttribute('aria-controls');
//     let list = document.querySelector(`#${listId}`);

//     let options = list.querySelectorAll('.option');

//     // for (let option of options) {
//     //     if (option.style.display !== 'none') {
//     //         return option;
//     //     }
//     // }

//     return options[0];

// }

// function getTheFirstVisibleBlockOption() {

//     let options = blockOptionsWrapper.querySelectorAll('.option');

//     for (let option of options) {
//         if (option.style.display !== 'none') {
//             return option;
//         }
//     }

//     return null;
// }

// function applyVisualFakeFocus(realFocusedElement, elementToApplyFakeFocus) {

//     if (elementToApplyFakeFocus) {
//         elementToApplyFakeFocus.focus();
//         elementToApplyFakeFocus.classList.add('block-options-focused');
//     }

//     realFocusedElement.focus();
// }

// function applyVisualFakeAndRealFocus(elementToApplyFakeFocus) {

//     if (elementToApplyFakeFocus) {
//         elementToApplyFakeFocus.focus();
//         elementToApplyFakeFocus.classList.add('block-options-focused');
//     }
// }

// function removeAllVisualFakeFocus() {
//     let focusedElements = document.querySelectorAll('.block-options-focused');

//     focusedElements.forEach(element => {
//         element.classList.remove('block-options-focused');
//     });
// }

// function updateBlockVisibility(filter) {

//     let sections = blockOptionsWrapper.querySelectorAll('section');

//     sections.forEach(section => {
//         let options = section.querySelectorAll('.option');
//         let allHidden = true;

//         options.forEach(option => {
//             const type = option.getAttribute('data-type');
//             const title = option.querySelector('.block-title').textContent.toLowerCase();

//             if (type.includes(filter) || title.includes(filter.toLowerCase())) {
//                 option.style.display = '';
//                 allHidden = false;
//             } else {
//                 option.style.display = 'none';
//             }
//         });

//         section.style.display = allHidden ? 'none' : '';
//     });

//     let emptyListIndicator = document.querySelector('.empty-block-options');

//     let allOptions = blockOptionsWrapper.querySelectorAll('.option');

//     let hasVisibleOption = Array.from(allOptions).some(option => {
//         let style = window.getComputedStyle(option);
//         return style.display !== 'none';
//     });

//     if (hasVisibleOption) {
//         emptyListIndicator.style.display = 'none';

//     } else {
//         emptyListIndicator.style.display = 'block';
//     }
// }

/***/ }),

/***/ "./src/drag-and-drop.js":
/*!******************************!*\
  !*** ./src/drag-and-drop.js ***!
  \******************************/
/***/ (() => {

document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.johannes-editor');

    let draggedItem = null;

    let dropLine = document.createElement('div');
    dropLine.classList.add('drop-line');
    dropLine.style.height = '2px';
    dropLine.style.display = 'none';

    content.addEventListener('dragstart', (e) => {
        if (e.target.classList.contains('drag-handler')) {
            draggedItem = e.target.closest('.draggable-block');
            draggedItem.setAttribute('draggable', 'true');
            setTimeout(() => {
                draggedItem.style.opacity = '0.5';
            }, 0);
        }
    });

    content.addEventListener('dragend', () => {
        setTimeout(() => {
            if (draggedItem) {
                draggedItem.style.opacity = '';
                draggedItem.removeAttribute('draggable');
                draggedItem = null;
            }
            dropLine.remove();
        }, 0);
    });

    content.addEventListener('dragover', (e) => {
        e.preventDefault();
        let target = e.target.closest('.draggable-block');

        if (target && target !== draggedItem) {
            let bounding = target.getBoundingClientRect();
            let offset = bounding.y + bounding.height / 2;

            if (e.clientY > offset) {
                if (target.nextElementSibling !== dropLine) {
                    target.insertAdjacentElement('afterend', dropLine);
                }
            } else {
                if (target.previousElementSibling !== dropLine) {
                    target.insertAdjacentElement('beforebegin', dropLine);
                }
            }
        }

        dropLine.style.display = 'block';
    });

    content.addEventListener('drop', (e) => {
        e.preventDefault();
        if (dropLine.parentElement) {
            dropLine.parentElement.insertBefore(draggedItem, dropLine);
            dropLine.remove();
        }
    });
});

/***/ }),

/***/ "./src/element-factory.js":
/*!********************************!*\
  !*** ./src/element-factory.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createCheckedSVG: () => (/* binding */ createCheckedSVG),
/* harmony export */   createNewCheckboxLiElement: () => (/* binding */ createNewCheckboxLiElement),
/* harmony export */   createNewDraggableParagraphElement: () => (/* binding */ createNewDraggableParagraphElement),
/* harmony export */   createNewHeadingElement: () => (/* binding */ createNewHeadingElement),
/* harmony export */   createNewLiElement: () => (/* binding */ createNewLiElement),
/* harmony export */   createNewListElement: () => (/* binding */ createNewListElement),
/* harmony export */   createNewParagraphElement: () => (/* binding */ createNewParagraphElement),
/* harmony export */   createNewQuoteElement: () => (/* binding */ createNewQuoteElement),
/* harmony export */   createNewSeparatorElement: () => (/* binding */ createNewSeparatorElement),
/* harmony export */   createNewTodoListElement: () => (/* binding */ createNewTodoListElement)
/* harmony export */ });
function createNewHeadingElement(number = 2) {

    let newElement = document.createElement(`h${number}`);
    newElement.setAttribute('data-type', `h${number}`);
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('swittable');
    newElement.classList.add('focusable');
    newElement.classList.add('focus');
    newElement.classList.add('key-trigger');

    newElement.contentEditable = true;

    newElement.setAttribute('data-placeholder', `Heading ${number}`);

    return newElement;
}

function createNewParagraphElement(text) {

    let newElement = document.createElement('p');
    newElement.setAttribute('data-type', 'p');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('swittable');
    newElement.classList.add('focusable');
    newElement.classList.add('key-trigger');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

    newElement.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');

    return newElement;
}

function createNewDraggableParagraphElement() {

    let newDiv = document.createElement('div');
    let newElement = createNewParagraphElement();

    let newButton = document.createElement('button');
    newButton.innerHTML = '<svg width="20" height="20" fill="currentColor"><use href="#icon-material-drag"></use></svg>';

    newDiv.appendChild(newButton);
    newDiv.appendChild(newElement);

    newDiv.classList.add('draggable-block');
    newDiv.classList.add('deletable');
    newButton.classList.add('drag-handler');
    newButton.classList.add('button-reset');
    newButton.draggable = true;

    return newDiv;
}

function createNewListElement(text, type = 'ul') {
    const newList = document.createElement(type);
    newList.classList.add('johannes-content-element');
    newList.classList.add('swittable');
    newList.classList.add('list');

    if (type == 'ul') {
        newList.setAttribute('data-type', 'bulleted-list');
    } else {
        newList.setAttribute('data-type', 'numbered-list');
    }

    const initialItem = createNewLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}

function createNewTodoListElement(text, type = 'ul') {
    const newList = document.createElement(type);
    newList.classList.add('johannes-content-element');
    newList.classList.add('checkbox-list');
    newList.classList.add('list');
    newList.setAttribute('data-type', 'todo-list');

    const initialItem = createNewCheckboxLiElement(text);

    newList.appendChild(initialItem);

    return newList;
}


function createNewLiElement(text = '') {

    let initialItem = document.createElement('li');

    initialItem.classList.add('focusable');
    initialItem.classList.add('deletable');
    initialItem.classList.add('editable');
    initialItem.classList.add('focus');
    initialItem.classList.add('key-trigger');
    initialItem.classList.add('list-item');

    initialItem.innerText = text;

    initialItem.contentEditable = true;
    initialItem.setAttribute('data-placeholder', 'Item');

    return initialItem;

}

function createNewCheckboxLiElement(text = '') {

    let li = document.createElement('li');
    li.classList.add('deletable');
    li.classList.add('list-item');

    initialItem.classList.add('key-trigger');

    let checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');

    let span = document.createElement('span');
    span.textContent = text || "";
    span.setAttribute('data-placeholder', 'To-do');
    span.contentEditable = true;

    span.classList.add('focusable');
    span.classList.add('editable');
    span.classList.add('focus');

    li.appendChild(checkbox);
    li.appendChild(span);

    return li;
}

function createNewSeparatorElement() {
    let newElement = document.createElement('hr');
    return newElement;
}


function createNewQuoteElement(text) {

    const quote = document.createElement('blockquote');
    quote.classList.add('swittable');
    quote.classList.add('johannes-content-element');
    quote.setAttribute('data-type', 'quote');

    const p = createNewNoSwittableParagraphElement(text);
    const cite = createNewNoSwittableCiteElement();

    quote.appendChild(p);
    quote.appendChild(cite);

    return quote;
}

function createNewNoSwittableParagraphElement(text) {

    let newElement = document.createElement('p');
    newElement.classList.add('focus');
    newElement.classList.add('focusable');
    newElement.classList.add('editable');
    newElement.classList.add('key-trigger');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

    newElement.setAttribute('data-placeholder', '”To be, or not to be, that is the question”');

    return newElement;
}

function createNewNoSwittableCiteElement(text) {

    let newElement = document.createElement('cite');
    newElement.classList.add('johannes-content-element');
    newElement.classList.add('focusable');
    newElement.classList.add('deletable');
    newElement.classList.add('editable');

    newElement.contentEditable = true;

    newElement.innerText = text || "";

    newElement.setAttribute('data-placeholder', '— Socrates');

    return newElement;
}


function createCheckedSVG() {
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add('checked-svg');
    let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#icon-material-small-check");

    svg.appendChild(use);
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'currentColor');

    return svg;
}

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isTriggable: () => (/* binding */ isTriggable)
/* harmony export */ });


function isTriggable(event) {
    // Verifica se o target ou qualquer ancestral tem a classe 'key-trigger'
    return event.target.closest('.key-trigger') !== null;
}

/***/ }),

/***/ "./src/j-anchor.js":
/*!*************************!*\
  !*** ./src/j-anchor.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   any: () => (/* binding */ any),
/* harmony export */   clear: () => (/* binding */ clear),
/* harmony export */   setAnchor: () => (/* binding */ setAnchor),
/* harmony export */   setURL: () => (/* binding */ setURL)
/* harmony export */ });
let anchorElement = null;

function setAnchor(a) {
    anchorElement = a;
}

function clear() {

    if (anchorElement && (anchorElement.href == '' || anchorElement.href == null)) {
        const parent = anchorElement.parentNode;
        while (anchorElement.firstChild) {
            parent.insertBefore(anchorElement.firstChild, anchorElement);
        }

        if (parent) {
            parent.removeChild(anchorElement);
            parent.normalize();
        }
    }

    anchorElement = null;
}

function any() {
    anchorElement == null;
}

function setURL(url) {
    anchorElement.href = url;
}

/***/ }),

/***/ "./src/j-selection.js":
/*!****************************!*\
  !*** ./src/j-selection.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearAllSelection: () => (/* binding */ clearAllSelection),
/* harmony export */   getClosestContentEditable: () => (/* binding */ getClosestContentEditable),
/* harmony export */   getCurrentDraggableBlockFocused: () => (/* binding */ getCurrentDraggableBlockFocused),
/* harmony export */   getSavedRange: () => (/* binding */ getSavedRange),
/* harmony export */   getSelectedClosestElementAcceptingClosest: () => (/* binding */ getSelectedClosestElementAcceptingClosest),
/* harmony export */   hasSelection: () => (/* binding */ hasSelection),
/* harmony export */   isRangeCoveringElement: () => (/* binding */ isRangeCoveringElement),
/* harmony export */   removeSavedSelection: () => (/* binding */ removeSavedSelection),
/* harmony export */   restoreSelection: () => (/* binding */ restoreSelection),
/* harmony export */   saveSelection: () => (/* binding */ saveSelection),
/* harmony export */   savedRange: () => (/* binding */ savedRange),
/* harmony export */   temporarySelectContentFromCurrentSelection: () => (/* binding */ temporarySelectContentFromCurrentSelection)
/* harmony export */ });
let savedRange = null;

function saveSelection() {
    if (window.getSelection) {
        const sel = window.getSelection();
        if (sel.rangeCount > 0) {
            savedRange = sel.getRangeAt(0).cloneRange();
        }
    }
}

function temporarySelectContentFromCurrentSelection() {

    setTimeout(() => {
        console.log('select all content temporarrly')
        if (window.getSelection) {
            const selection = window.getSelection();

            if (selection.rangeCount > 0) {
                const range = savedRange || selection.getRangeAt(0);
                let container = range.commonAncestorContainer;

                if (container.nodeType !== 1) {
                    container = container.parentNode;
                }

                const contentElement = container.closest('.johannes-content-element');

                if (contentElement) {
                    selection.removeAllRanges();

                    const newRange = document.createRange();
                    newRange.selectNodeContents(contentElement);

                    selection.addRange(newRange);
                } else {
                    console.log("Nenhum elemento '.content' envolvendo a seleção atual foi encontrado.");
                }
            }
        }
    }, 11);
}

function restoreSelection() {

    setTimeout(() => {
        console.log('restore selection');

        const selection = window.getSelection();
        if (savedRange) {
            selection.removeAllRanges();
            selection.addRange(savedRange);
        }
    }, 10);
}

function getSavedRange() {
    return savedRange;
}

function clearAllSelection() {
    savedRange = null;
    window.getSelection().removeAllRanges();
}

function removeSavedSelection() {
    savedRange = null;
}

function getCurrentDraggableBlockFocused() {

    let currentBlockRange = window.getSelection().getRangeAt(0);

    let commonAncestor = currentBlockRange.commonAncestorContainer;

    if (commonAncestor.nodeType === 3) { //* text node */
        commonAncestor = commonAncestor.parentNode;
    }

    const currentBlock = commonAncestor.closest('.draggable-block');

    return currentBlock;
}


function hasSelection() {
    savedRange != null;
}

function isRangeCoveringElement(element, range) {
    const textNodes = getTextNodes(element);

    if (textNodes.length === 0) {
        return false;
    }

    const firstNode = textNodes[0];
    if (range.startContainer !== firstNode || range.startOffset !== 0) {
        return false;
    }

    const lastNode = textNodes[textNodes.length - 1];
    if (range.endContainer !== lastNode || range.endOffset !== lastNode.length) {
        return false;
    }

    return true;
}

function getTextNodes(node) {
    let textNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
    } else {
        node.childNodes.forEach(child => {
            textNodes = textNodes.concat(getTextNodes(child));
        });
    }
    return textNodes;
}

function getSelectedClosestElementAcceptingClosest() {
    let currentRange = window.getSelection().getRangeAt(0);
    if (!currentRange || currentRange.collapsed) {
        console.error('No valid selection found.');
        return null;
    }

    let commonAncestor = currentRange.commonAncestorContainer;

    while (commonAncestor.nodeType !== 1) {
        commonAncestor = commonAncestor.parentNode;
    }

    return commonAncestor;
}

function getClosestContentEditable() {
    return getSelectedClosestElementAcceptingClosest().closest('.editable');
}

/***/ }),

/***/ "./src/j-window.js":
/*!*************************!*\
  !*** ./src/j-window.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   closeBlockOptions: () => (/* binding */ closeBlockOptions),
/* harmony export */   closeTextFormattingBar: () => (/* binding */ closeTextFormattingBar),
/* harmony export */   focusOnNext: () => (/* binding */ focusOnNext),
/* harmony export */   focusOnPrevious: () => (/* binding */ focusOnPrevious),
/* harmony export */   focusOnTheEndOfTheText: () => (/* binding */ focusOnTheEndOfTheText),
/* harmony export */   focusOnTheStartOfTheText: () => (/* binding */ focusOnTheStartOfTheText)
/* harmony export */ });

function closeBlockOptions() {

}

function closeTextFormattingBar() {
    textFormattingBar.style.display = 'none';
}


function focusOnTheEndOfTheText(contentBlock) {
    setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(contentBlock);

        let lastChild = contentBlock;
        while (lastChild.lastChild && lastChild.lastChild.nodeType === Node.ELEMENT_NODE) {
            lastChild = lastChild.lastChild;
        }
        if (lastChild.lastChild) {
            lastChild = lastChild.lastChild;
        }

        range.setEnd(lastChild, lastChild.textContent.length);
        range.collapse(false);

        selection.removeAllRanges();
        selection.addRange(range);

        contentBlock.focus();
    }, 10);
}

function focusOnTheStartOfTheText(contentBlock) {

    setTimeout(() => {
        const range = document.createRange();
        const selection = window.getSelection();

        range.selectNodeContents(contentBlock);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        contentBlock.focus();
    }, 10);
}

function focusOnNext(actualElement, position) {
    let tag = actualElement.tagName.toUpperCase();
    let focusedElement = null;

    if (tag === 'LI') {
        let nextElement = actualElement.nextElementSibling;

        if (nextElement && nextElement.classList.contains('focusable')) {
            focusedElement = nextElement;
            if (position) {
                applyCursorXStartPosition(focusedElement, position);
            } else {
                focusOnTheStartOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    if (actualElement.parentNode.tagName.toUpperCase() === 'LI' /* focusable SPAN inside LI*/) {
        let nextElement = actualElement.closest('li').nextElementSibling?.querySelector('.focusable');

        if (nextElement && nextElement.classList.contains('focusable')) {
            focusedElement = nextElement;
            if (position) {
                applyCursorXStartPosition(focusedElement, position);
            } else {
                focusOnTheStartOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    let parent = actualElement.closest('.draggable-block');
    let sibling = parent.nextElementSibling;

    while (sibling) {
        let focusableCandidates = sibling.querySelectorAll('.focusable');
        if (focusableCandidates.length > 0) {
            focusedElement = focusableCandidates[0];
            if (position) {
                applyCursorXStartPosition(focusedElement, position);
            } else {
                focusOnTheStartOfTheText(focusedElement);
            }
            return focusedElement;
        }

        sibling = sibling.nextElementSibling;
    }

    return focusedElement;
}


function focusOnPrevious(actualElement, position) {
    let tag = actualElement.tagName.toUpperCase();
    let focusedElement = null;

    if (tag === 'LI') {
        let previousElement = actualElement.previousElementSibling;

        if (previousElement && previousElement.classList.contains('focusable')) {
            focusedElement = previousElement;
            if (position) {
                applyCursorXEndPosition(focusedElement, position);
            } else {
                focusOnTheEndOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    if (actualElement.parentNode.tagName.toUpperCase() === 'LI' /* focusable SPAN inside LI*/) {
        let previousElement = actualElement.closest('li').previousElementSibling?.querySelector('.focusable');

        if (previousElement && previousElement.classList.contains('focusable')) {
            focusedElement = previousElement;
            if (position) {
                applyCursorXEndPosition(focusedElement, position);
            } else {
                focusOnTheEndOfTheText(focusedElement);
            }
            return focusedElement;
        }
    }

    let parent = actualElement.closest('.draggable-block');
    let sibling = parent.previousElementSibling;

    while (sibling) {
        let focusableCandidates = sibling.querySelectorAll('.focusable');
        if (focusableCandidates.length > 0) {
            focusedElement = focusableCandidates[focusableCandidates.length - 1];
            if (position) {
                applyCursorXEndPosition(focusedElement, position);
            } else {
                focusOnTheEndOfTheText(focusedElement);
            }
            return focusedElement;
        }

        sibling = sibling.previousElementSibling;
    }

    return focusedElement;
}


function adjustCursorOffset(node, xPosition) {
    let range = document.createRange();
    let closestNode = node;
    let closestOffset = 0;
    let closestDiff = Infinity;

    for (let i = 0; i < node.textContent.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        const leftDiff = Math.abs(rect.left - xPosition);
        const rightDiff = Math.abs(rect.right - xPosition);

        if (leftDiff < closestDiff || rightDiff < closestDiff) {
            closestDiff = Math.min(leftDiff, rightDiff);
            closestOffset = i + (rightDiff < leftDiff ? 1 : 0);
        }
    }

    if (xPosition > range.getBoundingClientRect().right) {
        closestOffset = node.textContent.length;
    }

    return { closestNode, closestOffset };
}

function applyCursorXStartPosition(element, xPosition) {
    const selection = window.getSelection();
    const range = document.createRange();

    let currentNode = element.firstChild;
    let result = null;

    while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            result = adjustCursorOffset(currentNode, xPosition);
            break;
        }
        currentNode = currentNode.nextSibling;
    }

    if (result && result.closestNode) {
        range.setStart(result.closestNode, result.closestOffset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    } else {
        range.selectNodeContents(element);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    }
}

function applyCursorXEndPosition(element, xPosition) {
    const selection = window.getSelection();
    const range = document.createRange();

    let currentNode = element.lastChild;
    let result = null;

    while (currentNode) {
        if (currentNode.nodeType === Node.TEXT_NODE) {
            result = adjustCursorOffset(currentNode, xPosition);
            break;
        } else if (currentNode.nodeName.toUpperCase() === 'BR') {
            currentNode = currentNode.previousSibling;
            continue;
        }
        currentNode = currentNode.previousSibling;
    }

    if (result && result.closestNode) {
        range.setStart(result.closestNode, result.closestOffset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    } else {
        range.selectNodeContents(element);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        element.focus();
    }
}

/***/ }),

/***/ "./src/keyboard-navigation.js":
/*!************************************!*\
  !*** ./src/keyboard-navigation.js ***!
  \************************************/
/***/ (() => {

// import { focusOnPrevious } from './j-window';
// import { focusOnNext } from './j-window';


// document.addEventListener('DOMContentLoaded', (event) => {
    
//     const content = document.querySelector('.johannes-editor > .content');
//     const blockSelection = document.querySelector('.block-options-wrapper');


//     content.addEventListener('keydown', function (event) {
//         const target = event.target;
//         if (blockSelection.style.display === 'none') {
//             if (event.key === 'ArrowRight' && isCursorAtEnd(target)) {
//                 event.preventDefault();

//                 focusOnNext(target);

//             } else if (event.key === 'ArrowLeft' && isCursorAtStart(target)) {
//                 event.preventDefault();

//                 focusOnPrevious(target);

//             } else if (event.key === 'ArrowDown' && isAtLastVisibleLine(target)) {
//                 event.preventDefault();

//                 let position = getCursorXPosition();
//                 focusOnNext(target, position);


//             } else if (event.key === 'ArrowUp' && isAtFirstVisibleLine(target)) {
//                 event.preventDefault();

//                 let position = getCursorXPosition();
//                 focusOnPrevious(target, position);
//             }
//         }
//     });
// });


// function getCursorXPosition() {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) {
//         return 0;
//     }

//     const range = selection.getRangeAt(0).cloneRange();
//     const rect = range.getBoundingClientRect();
//     return rect.left;
// }

// function isCursorAtEnd(target) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return false;

//     const range = selection.getRangeAt(0);
//     if (!range.collapsed) return false;

//     let node = range.endContainer;
//     while (node != target && node.nextSibling == null) {
//         node = node.parentNode;
//     }
//     return node == target && range.endOffset == range.endContainer.textContent.length;
// }

// function isCursorAtStart(target) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return false;

//     const range = selection.getRangeAt(0);
//     if (!range.collapsed) return false;

//     let node = range.startContainer;
//     while (node != target && node.previousSibling == null) {
//         node = node.parentNode;
//     }
//     return node == target && range.startOffset == 0;
// }

// function isAtFirstVisibleLine(target) {
//     const selection = window.getSelection();

//     if (!selection.rangeCount || selection.anchorNode.parentNode !== target) {
//         return target.childNodes.length === 0;
//     }

//     const range = selection.getRangeAt(0);
//     const rect = range.getBoundingClientRect();
//     const contentRect = target.getBoundingClientRect();

//     return rect.top === contentRect.top;
// }

// function isAtLastVisibleLine(target) {
//     const selection = window.getSelection();
//     if (!selection.rangeCount) {
//         return target.textContent.length === 0;
//     }

//     const originalRange = selection.getRangeAt(0).cloneRange();
//     const originalRect = originalRange.getBoundingClientRect();

//     selection.modify('move', 'forward', 'line');
//     const newRect = selection.getRangeAt(0).getBoundingClientRect();

//     const isLastLine = originalRect.top === newRect.top;

//     selection.removeAllRanges();
//     selection.addRange(originalRange);

//     return isLastLine;
// }

/***/ }),

/***/ "./src/memento.js":
/*!************************!*\
  !*** ./src/memento.js ***!
  \************************/
/***/ (() => {

// Pilhas para undo e redo
let undoStack = [];
let redoStack = [];



document.addEventListener('DOMContentLoaded', function () {
    // Elemento do editor
    const editor = document.querySelector('.content');

    if (editor) {
        // Evento para detectar mudanças e salvar o estado antes de mudar
        editor.addEventListener('input', () => {
            saveState();
        });

        // Função para salvar o estado atual do editor
        function saveState() {
            // Clone do conteúdo atual do editor
            const currentState = editor.innerHTML;
            undoStack.push(currentState);
        }
        
        // Função para desfazer
        function undo() {
            if (undoStack.length > 0) {
                const stateToRestore = undoStack.pop();
                redoStack.push(editor.innerHTML);
                editor.innerHTML = stateToRestore;
            }
        }

        // Função para refazer
        function redo() {
            if (redoStack.length > 0) {
                const stateToApply = redoStack.pop();
                undoStack.push(editor.innerHTML);
                editor.innerHTML = stateToApply;
            }
        }

        // Adicionando eventos de teclado para undo e redo
        document.addEventListener('keydown', (event) => {
            if (event.ctrlKey && event.key === 'z') {
                undo();
                event.preventDefault();
            } else if (event.ctrlKey && event.key === 'y') {
                redo();
                event.preventDefault();
            }
        });

        // Inicializar o estado do editor
        saveState();
    }
});








/***/ }),

/***/ "./src/switch-block.js":
/*!*****************************!*\
  !*** ./src/switch-block.js ***!
  \*****************************/
/***/ (() => {

// //Close the options wrapper when click out
// document.addEventListener('DOMContentLoaded', (event) => {
//     const editor = document.querySelector('.johannes-editor');

//     if (editor) {
//         document.addEventListener('mousedown', function (event) {
//             const optionsWrapper = document.querySelector('.block-options-wrapper');

//             if (optionsWrapper) {
//                 const isClickInsideOptions = optionsWrapper.contains(event.target);
//                 const mainMouseButton = event.button === 0;

//                 if (!isClickInsideOptions && mainMouseButton) {
//                     optionsWrapper.style.display = 'none';
//                 }
//             }
//         });
//     }
// });









// //Added event to listen turnIntoSelect options
// document.addEventListener('DOMContentLoaded', function () {
//     turnIntoSelect.querySelectorAll('.option').forEach(option => {
//         option.addEventListener('click', function (event) {

//             let type = this.getAttribute('data-type');
//             let selection = window.getSelection();

//             if (!selection.rangeCount) return;
//             let selectedNode = selection.getRangeAt(0).startContainer;

//             let currentDraggableBlock = selectedNode.nodeType === 3 ?
//                 selectedNode.parentNode.closest('.draggable-block') :
//                 selectedNode.closest('.draggable-block');
//             if (currentDraggableBlock) {
//                 transformBlock(currentDraggableBlock, type);
//             }

//             closeAllDependentBox();
//             tryHideTextFormattingBar();

//             // turnIntoSelect.style.display = 'none';
//             // blockOptionsWrapper.style.display = 'none';
//         });
//     });
// });

/***/ }),

/***/ "./src/text-blocks-from-newlines.js":
/*!******************************************!*\
  !*** ./src/text-blocks-from-newlines.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _element_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-factory */ "./src/element-factory.js");
/* harmony import */ var _j_window__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./j-window */ "./src/j-window.js");



document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.johannes-editor > .content');

    content.addEventListener('paste', function (event) {

        if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA') {
            return;
        }

        event.preventDefault();

        const target = event.target;

        if (target.tagName === 'P' && target.isContentEditable) {
            const clipboardData = event.clipboardData || window.clipboardData;
            const pastedText = clipboardData.getData('text');

            const blocks = pastedText.split('\n').filter(block => block.trim() !== '');

            target.innerText = blocks[0];

            let currentTarget = target.closest('.draggable-block');

            for (let i = 1; i < blocks.length; i++) {
                const newParagraph = (0,_element_factory__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();
                const lastContentBlock = newParagraph.querySelector('.johannes-content-element');
                lastContentBlock.innerText = blocks[i];
                currentTarget.insertAdjacentElement('afterend', newParagraph);
                currentTarget = newParagraph;
            }

            (0,_j_window__WEBPACK_IMPORTED_MODULE_1__.focusOnTheEndOfTheText)(currentTarget.querySelector('.johannes-content-element'));
        }
    });
});

/***/ }),

/***/ "./src/triggers/click-events.js":
/*!**************************************!*\
  !*** ./src/triggers/click-events.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commands_command_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/command-factory */ "./src/commands/command-factory.js");
/* harmony import */ var _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/floating-toolbar/text-formatting-bar */ "./src/components/floating-toolbar/text-formatting-bar.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper */ "./src/helper.js");
// The start point for click events








let lastClickTime = 0;
let isMousedownKeyTrigger = false;
const doubleClickThreshold = 300;

// Block operations events
// document.addEventListener('DOMContentLoaded', function () {
//     if (johannesEditor) {
//         document.querySelectorAll('.block-operation').forEach(option => {
//             option.addEventListener('click', function (event) {

//                 const operation = this.getAttribute('data-block-operation');

//                 const command = commandFactory.createCommand(operation, [event]);

//                 command.execute();
//             });
//         });
//     }
// });


// Text operations events
//CODE...

// document.addEventListener('DOMContentLoaded', function () {
//     if (johannesEditor) {
//         document.querySelectorAll('.text-formatting-operation').forEach(option => {
//             option.addEventListener('click', function (event) {

//                 const operation = this.getAttribute('data-text-formatting-operation');

//                 const command = commandFactory.createCommand(operation, [event]);

//                 command.execute();

//             });
//         });
//     }
// });




// document.addEventListener('mousedown', function (event) {
//     if (isTriggable(event)) {
//         isMousedownKeyTrigger = true;
//     }
// });

//Mouse up + selection event
// document.addEventListener('mouseup', function (event) {
//     const currentTime = Date.now();
//     const timeSinceLastClick = currentTime - lastClickTime;
//     lastClickTime = currentTime;

//     if (timeSinceLastClick < doubleClickThreshold) {
//         return;
//     }

//     if (window.getSelection().toString().trim() !== '' && isMousedownKeyTrigger && !isShowingTextFormattingBar()) {

//         setTimeout(() => {
//             if (window.getSelection().toString().trim() !== '') {
//                 event.preventDefault();
//                 event.stopPropagation();

//                 const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
//                 command.execute();
//             }
//         }, 10);

//         // clearTextFormattingButtonActive();
//         // showTextFormattingBar(event);
//         // updateTextFormattingActiveButtons();

//     }
// });

// document.addEventListener('dblclick', function (event) {
//     if (!isShowingTextFormattingBar()) {
//         setTimeout(() => {
//             if (window.getSelection().toString().trim() !== '') {
//                 event.preventDefault();
//                 event.stopPropagation();

//                 const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
//                 command.execute();
//             }
//         }, 15);
//     }
// });


//
// document.addEventListener('mouseup', function (event) {
//     if (isShowingTextFormattingBar() && canHideTextFormattingBar() && isOutOfTextFormattingBar(event)) {

//         const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
//         command.execute();
//     }
// });

/***/ }),

/***/ "./src/triggers/keypress-events.js":
/*!*****************************************!*\
  !*** ./src/triggers/keypress-events.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _commands_command_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../commands/command-factory */ "./src/commands/command-factory.js");
/* harmony import */ var _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/quick-menu/quick-insert-menu */ "./src/components/quick-menu/quick-insert-menu.js");
/* harmony import */ var _components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_quick_menu_quick_insert_menu__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helper */ "./src/helper.js");
/* harmony import */ var _components_floating_toolbar_text_formatting_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/floating-toolbar/text-formatting-bar */ "./src/components/floating-toolbar/text-formatting-bar.js");
//The start point for key press events







// Block operations is operations related to the block it self. Create a block, delete a block, change the block type, etc...
document.addEventListener('DOMContentLoaded', function () {


    // document.addEventListener('keydown', function (event) {

    //     if (isTriggable(event) && !isShowingBlockOptions()) {

    //         if (event.key === 'Enter' && !isShowingTextFormattingSelectableDependentBox() && !isShowingTextFormattingBar() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

    //             event.preventDefault();
    //             event.stopPropagation();

    //             //TODO: pass the event not event.target/it`s more simple to deal with event when create a click eventListener
    //             const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.CREATE_NEW_ELEMENT, [event]);
    //             command.execute();

    //         } else if (event.key === 'Backspace' && isActiveContentBlank(event) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

    //             event.preventDefault();

    //             const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_PREVIOUS);
    //             command.execute();

    //         } else if (event.key === 'Delete' && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

    //             event.preventDefault();

    //             const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK.DELETE_AND_FOCUS_ON_NEXT);
    //             command.execute();

    //         }
    //     }
    // });

    // document.addEventListener('keyup', function (event) {

    //     if (isTriggable(event) && !isShowingBlockOptions()) {
    //         if (event.key === 'Escape' && isActiveContentBlank() && !event.ctrlKey && !event.shiftKey && !event.altKey) {

    //             //TODO: write the code to select the all text

    //         }
    //     }
    // });
});

// Block options operations is operations related to the Block Options. Show the block options, hide the block options, filter, ...
document.addEventListener('DOMContentLoaded', function () {

    document.addEventListener('keydown', function (event) {

        // if (isShowingBlockOptions()) {

            // if (event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

            //     event.preventDefault();

            //     const elementToFocusAfterHide = event.target;

            //     //TODO: pass the event not event.target/it`s more simple to deal with event when create a click eventListener
            //     const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.HIDE_CLEAR_BLOCK_OPTIONS, [elementToFocusAfterHide]);
            //     command.execute();

            // }

            // else if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

            //     event.preventDefault();
            //     event.stopPropagation();

            //     const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_BLOCK_TYPE, [event]);
            //     command.execute();

            // } else if (/^[a-z0-9]$/i.test(event.key) && !event.ctrlKey && !event.shiftKey && !event.altKey) {

            //     const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.FILTER_CONCAT, [event]);
            //     command.execute();

            // } else if (event.key === 'Backspace') {

            //     const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.FILTER_REMOVE_LAST);
            //     command.execute();
            // }
        // }


        // if (isShowingTextFormattingSelectableDependentBox()) {

        //     if (event.key === 'Escape' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

        //         event.preventDefault();

        //         const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.HIDE_TEXT_FORMATTING_BAR, [event]);
        //         command.execute();

        //     } else if (event.key === 'ArrowDown' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

        //         event.preventDefault();

        //         const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_NEXT_OPTION);
        //         command.execute();

        //     } else if (event.key === 'ArrowUp' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

        //         event.preventDefault();

        //         const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.MOVE_FAKE_FOCUS_TO_PREVIOUS_OPTION);
        //         command.execute();

        //     } else if (event.key === 'Enter' && !event.ctrlKey && !event.shiftKey && !event.altKey) {

        //         event.preventDefault();
        //         event.stopPropagation();

        //         const command = commandFactory.createCommand(commandFactory.OPERATIONS.BLOCK_OPTIONS.APPLY_SELECTED_BLOCK_TYPE, [event]);
        //         command.execute();

        //     }
        // }
    });
});


// Text formatting bar operations is operations related to text presentation, color, show or hide text formatting dependent boxes,...
document.addEventListener('keyup', function (event) {
    // if (event.key === 'Shift' && isTriggable(event)) {

    //     setTimeout(() => {
    //         if (window.getSelection().toString().trim() !== '') {
    //             const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
    //             command.execute();
    //         }
    //     }, 10);

    // }
});

// document.addEventListener('keydown', function (event) {
//     if (event.ctrlKey && event.key.toLowerCase() === 'a' && isTriggable(event)) {

//         setTimeout(() => {
//             if (window.getSelection().toString().trim() !== '') {
//                 const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.SHOW_TEXT_FORMATTING_BAR, [event]);
//                 command.execute();
//             }
//         }, 10);

//     } else if (event.key === 'Escape' && canHideTextFormattingBar() && isShowingTextFormattingBar()) {

//         const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
//         command.execute();
//     }
// });



function isActiveContentBlank() {
    return document.activeElement.textContent.trim() === '';
}


// Listen a input link
// document.addEventListener('DOMContentLoaded', function () {
//     linkBoxInput.addEventListener('keydown', function (event) {
//         if (event.key === 'Enter') {

//             event.preventDefault();
//             event.stopPropagation();

//             const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.INPUT_LINK_URL);
//             command.execute();
//         }
//     });
// });


// Lock left and right key when is showing the dependent box
// document.addEventListener('keydown', function (event) {
//     if (isShowingTextFormattingSelectableDependentBox() &&
//         (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {

//         event.preventDefault();
//         event.stopPropagation();
//     }
// });


// document.addEventListener('keyup', function (event) {
//     if (isShowingTextFormattingBar() && canHideTextFormattingBar() && !isShowingTextFormattingSelectableDependentBox() &&
//         (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'ArrowUp' || event.key === 'ArrowDown')) {

//         setTimeout(() => {
//             if (window.getSelection().toString().trim() == '') {
//                 const command = commandFactory.createCommand(commandFactory.OPERATIONS.FORMATTING_BAR.HIDE_TEXT_FORMATTING_BAR, [event]);
//                 command.execute();
//             }
//         }, 10);
//     }
// });

/***/ }),

/***/ "./src/triggers/load-events.js":
/*!*************************************!*\
  !*** ./src/triggers/load-events.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_block_operations_BlockOperationsService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/block-operations/BlockOperationsService */ "./src/services/block-operations/BlockOperationsService.ts");
/* harmony import */ var _services_element_factory_ElementFactoryService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/element-factory/ElementFactoryService */ "./src/services/element-factory/ElementFactoryService.ts");
/* harmony import */ var _builders_QuickMenuBuilder__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../builders/QuickMenuBuilder */ "./src/builders/QuickMenuBuilder.ts");
/* harmony import */ var _builders_FloatingToolbarBuilder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../builders/FloatingToolbarBuilder */ "./src/builders/FloatingToolbarBuilder.ts");
/* harmony import */ var _components_add_block_AddBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/add-block/AddBlock */ "./src/components/add-block/AddBlock.ts");
//TODO use commands






//Focus on P when load
document.addEventListener('DOMContentLoaded', function () {
    const editor = document.querySelector('.johannes-editor');

    if (editor) {
        let blocks = editor.querySelectorAll('.draggable-block');

        if (blocks.length == 1) {

            const p = blocks[0].querySelector('.johannes-content-element');
            if (p.innerText == '') {
                p.focus();
            }
        }
    }
});

// Clear text when paste
document.addEventListener('DOMContentLoaded', function () {

    const editor = document.querySelector('.johannes-editor');

    if (editor) {
        document.addEventListener('paste', function (e) {
            if (e.target.getAttribute('contenteditable') === 'true') {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text/plain');
                insertTextAtCursor(text);
            }
        }, true);

        function insertTextAtCursor(text) {
            const sel = window.getSelection();
            if (sel.rangeCount > 0) {
                const range = sel.getRangeAt(0);
                range.deleteContents();

                const textNode = document.createTextNode(text);
                range.insertNode(textNode);

                range.setStartAfter(textNode);
                range.setEndAfter(textNode);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }
});


//TODO: use a DI Container
// document.addEventListener('DOMContentLoaded', function () {

//     let elementFactoryService = new ElementFactoryService();
//     let blockOperationsService = new BlockOperationsService(elementFactoryService);

//     let addBlock = new AddBlock();

//     johannesEditor.appendChild(addBlock.htmlElement);

//     let quickMenu = QuickMenuBuilder.build(blockOperationsService);

//     johannesEditor.appendChild(quickMenu.htmlElement);

//     let floatingToolbar = FloatingToolbarBuilder.build();


//     johannesEditor.appendChild(floatingToolbar.htmlElement);

// });

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _triggers_load_events_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./triggers/load-events.js */ "./src/triggers/load-events.js");
/* harmony import */ var _triggers_keypress_events_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./triggers/keypress-events.js */ "./src/triggers/keypress-events.js");
/* harmony import */ var _triggers_click_events_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./triggers/click-events.js */ "./src/triggers/click-events.js");
/* harmony import */ var _block_operation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block-operation.js */ "./src/block-operation.js");
/* harmony import */ var _drag_and_drop_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./drag-and-drop.js */ "./src/drag-and-drop.js");
/* harmony import */ var _drag_and_drop_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_drag_and_drop_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _switch_block_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./switch-block.js */ "./src/switch-block.js");
/* harmony import */ var _switch_block_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_switch_block_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _keyboard_navigation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyboard-navigation.js */ "./src/keyboard-navigation.js");
/* harmony import */ var _keyboard_navigation_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_keyboard_navigation_js__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _text_blocks_from_newlines_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text-blocks-from-newlines.js */ "./src/text-blocks-from-newlines.js");
/* harmony import */ var _memento_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./memento.js */ "./src/memento.js");
/* harmony import */ var _memento_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_memento_js__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _Editor__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Editor */ "./src/Editor.ts");
/* harmony import */ var _style_style_css__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style/style.css */ "./src/style/style.css");
// listen events in keyboard, mouse and document load










/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_Editor__WEBPACK_IMPORTED_MODULE_9__["default"]);
// default style


})();

window.Editor = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=bundle.js.map