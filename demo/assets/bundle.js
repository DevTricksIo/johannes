/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/add-block.css":
/*!***************************!*\
  !*** ./src/add-block.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://johannes/./src/add-block.css?");

/***/ }),

/***/ "./src/list.css":
/*!**********************!*\
  !*** ./src/list.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://johannes/./src/list.css?");

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://johannes/./src/style.css?");

/***/ }),

/***/ "./src/switch-block.css":
/*!******************************!*\
  !*** ./src/switch-block.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://johannes/./src/switch-block.css?");

/***/ }),

/***/ "./src/add-block.js":
/*!**************************!*\
  !*** ./src/add-block.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_farm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-farm */ \"./src/element-farm.js\");\n/* harmony import */ var _add_block_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-block.css */ \"./src/add-block.css\");\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n    document.querySelector('.add-block').addEventListener('click', function () {\r\n        const newElement = (0,_element_farm__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();\r\n        document.querySelector('.johannes-editor > .content').appendChild(newElement);\r\n\r\n        const newContentElement = newElement.querySelector('.johannes-content-element');\r\n        newContentElement.focus();\r\n    });\r\n});\n\n//# sourceURL=webpack://johannes/./src/add-block.js?");

/***/ }),

/***/ "./src/create-block-hit-enter.js":
/*!***************************************!*\
  !*** ./src/create-block-hit-enter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_farm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-farm */ \"./src/element-farm.js\");\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n    document.addEventListener('keydown', function (e) {\r\n        if (e.key === 'Enter' && e.target.isContentEditable && !e.target.closest('li')) {\r\n            e.preventDefault();\r\n\r\n            const newP = (0,_element_farm__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();\r\n\r\n            const draggableBlock = e.target.closest('.draggable-block');\r\n\r\n            if (draggableBlock) {\r\n                if (draggableBlock.nextSibling) {\r\n                    draggableBlock.parentNode.insertBefore(newP, draggableBlock.nextSibling);\r\n                } else {\r\n                    draggableBlock.parentNode.appendChild(newP);\r\n                }\r\n            }\r\n\r\n            setTimeout(() => {\r\n                let focusable = newP.querySelector('.johannes-content-element');\r\n\r\n                if (focusable) {\r\n                    focusable.focus();\r\n                }\r\n            }, 0);\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://johannes/./src/create-block-hit-enter.js?");

/***/ }),

/***/ "./src/delete-block-hit-backspace.js":
/*!*******************************************!*\
  !*** ./src/delete-block-hit-backspace.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', (event) => {\r\n    const content = document.querySelector('.johannes-editor > .content');\r\n    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');\r\n\r\n    content.addEventListener('keydown', function (event) {\r\n        if (event.key === 'Backspace' && blockSelection.style.display == 'none' && !event.target.closest('li')) {\r\n            const activeElement = document.activeElement;\r\n            if (activeElement.isContentEditable) {\r\n\r\n                const textContent = activeElement.textContent.trim();\r\n\r\n                if (textContent === '') {\r\n\r\n                    event.preventDefault();\r\n\r\n                    (0,_helper__WEBPACK_IMPORTED_MODULE_0__.focusOnPrevious)(activeElement);\r\n\r\n                    let actualDraggableBlock = activeElement.closest('.draggable-block')\r\n                    actualDraggableBlock.remove();\r\n\r\n\r\n                }\r\n            }\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://johannes/./src/delete-block-hit-backspace.js?");

/***/ }),

/***/ "./src/drag-and-drop.js":
/*!******************************!*\
  !*** ./src/drag-and-drop.js ***!
  \******************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function () {\r\n    const content = document.querySelector('.johannes-editor');\r\n\r\n    let draggedItem = null;\r\n\r\n    let dropLine = document.createElement('div');\r\n    dropLine.classList.add('drop-line');\r\n    dropLine.style.height = '2px';\r\n    dropLine.style.display = 'none';\r\n\r\n    content.addEventListener('dragstart', (e) => {\r\n        if (e.target.classList.contains('drag-handler')) {\r\n            draggedItem = e.target.closest('.draggable-block');\r\n            draggedItem.setAttribute('draggable', 'true');\r\n            setTimeout(() => {\r\n                draggedItem.style.opacity = '0.5';\r\n            }, 0);\r\n        }\r\n    });\r\n\r\n    content.addEventListener('dragend', () => {\r\n        setTimeout(() => {\r\n            if (draggedItem) {\r\n                draggedItem.style.opacity = '';\r\n                draggedItem.removeAttribute('draggable');\r\n                draggedItem = null;\r\n            }\r\n            dropLine.remove();\r\n        }, 0);\r\n    });\r\n\r\n    content.addEventListener('dragover', (e) => {\r\n        e.preventDefault();\r\n        let target = e.target.closest('.draggable-block');\r\n\r\n        if (target && target !== draggedItem) {\r\n            let bounding = target.getBoundingClientRect();\r\n            let offset = bounding.y + bounding.height / 2;\r\n\r\n            if (e.clientY > offset) {\r\n                if (target.nextElementSibling !== dropLine) {\r\n                    target.insertAdjacentElement('afterend', dropLine);\r\n                }\r\n            } else {\r\n                if (target.previousElementSibling !== dropLine) {\r\n                    target.insertAdjacentElement('beforebegin', dropLine);\r\n                }\r\n            }\r\n        }\r\n\r\n        dropLine.style.display = 'block';\r\n    });\r\n\r\n    content.addEventListener('drop', (e) => {\r\n        e.preventDefault();\r\n        if (dropLine.parentElement) {\r\n            dropLine.parentElement.insertBefore(draggedItem, dropLine);\r\n            dropLine.remove();\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://johannes/./src/drag-and-drop.js?");

/***/ }),

/***/ "./src/element-farm.js":
/*!*****************************!*\
  !*** ./src/element-farm.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createNewDraggableParagraphElement: () => (/* binding */ createNewDraggableParagraphElement),\n/* harmony export */   createNewH2Element: () => (/* binding */ createNewH2Element),\n/* harmony export */   createNewHeadingElement: () => (/* binding */ createNewHeadingElement),\n/* harmony export */   createNewLiElement: () => (/* binding */ createNewLiElement),\n/* harmony export */   createNewListElement: () => (/* binding */ createNewListElement),\n/* harmony export */   createNewParagraphElement: () => (/* binding */ createNewParagraphElement)\n/* harmony export */ });\nfunction createNewH2Element() {\r\n\r\n    let newElement = document.createElement('h2');\r\n    newElement.classList.add('johannes-content-element');\r\n\r\n    newElement.contentEditable = true;\r\n\r\n    newElement.setAttribute('data-placeholder', 'Heading 2');\r\n\r\n    return newElement;\r\n}\r\n\r\nfunction createNewHeadingElement(number = 2) {\r\n\r\n    if (number < 1 || number > 6) {\r\n        throw new Error(\"Invalid heading number\");\r\n    }\r\n\r\n    let newElement = document.createElement(`h${number}`);\r\n    newElement.classList.add('johannes-content-element');\r\n    newElement.classList.add('focusable');\r\n\r\n    newElement.contentEditable = true;\r\n\r\n    newElement.setAttribute('data-placeholder', `Heading ${number}`);\r\n\r\n    return newElement;\r\n}\r\n\r\n\r\nfunction createNewParagraphElement() {\r\n\r\n    let newElement = document.createElement('p');\r\n    newElement.classList.add('johannes-content-element');\r\n    newElement.classList.add('focusable');\r\n\r\n    newElement.contentEditable = true;\r\n\r\n    newElement.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');\r\n\r\n    return newElement;\r\n}\r\n\r\nfunction createNewDraggableParagraphElement() {\r\n\r\n    let newDiv = document.createElement('div');\r\n    let newElement = createNewParagraphElement();\r\n\r\n    let newButton = document.createElement('button');\r\n    newButton.innerHTML = '<svg width=\"20\" height=\"20\" fill=\"currentColor\"><use href=\"#icon-material-drag\"></use></svg>';\r\n\r\n    newDiv.appendChild(newButton);\r\n    newDiv.appendChild(newElement);\r\n\r\n    newDiv.classList.add('draggable-block');\r\n    newButton.classList.add('drag-handler');\r\n    newButton.classList.add('button-reset');\r\n    newButton.draggable = true;\r\n\r\n    return newDiv;\r\n}\r\n\r\nfunction createNewListElement(text) {\r\n    const newList = document.createElement('ul');\r\n    newList.classList.add('johannes-content-element');\r\n\r\n    const initialItem = createNewLiElement(text);\r\n\r\n    newList.appendChild(initialItem);\r\n\r\n    return newList;\r\n}\r\n\r\n\r\nfunction createNewLiElement(text = '') {\r\n\r\n    // let newButton = document.createElement('button');\r\n    // let p = document.createElement('p');\r\n\r\n\r\n    // newButton.classList.add('button-reset');\r\n    // newButton.classList.add('drag-handler');\r\n\r\n    // newButton.innerHTML = '<svg width=\"20\" height=\"20\" fill=\"currentColor\"><use href=\"#icon-material-drag\"></use></svg>';\r\n\r\n    let initialItem = document.createElement('li');\r\n    initialItem.classList.add('focusable');\r\n\r\n    // initialItem.classList.add('draggable-block');\r\n    \r\n\r\n\r\n    // p.innerText = text;\r\n    initialItem.innerText = text;\r\n\r\n    // initialItem.appendChild(p);\r\n    // initialItem.appendChild(newButton);\r\n\r\n    // initialItem.innerHTML = initialItem.innerText + newButton.innerHTML;\r\n\r\n    initialItem.contentEditable = true;\r\n    initialItem.setAttribute('data-placeholder', 'Item');\r\n\r\n    // initialItem.innerHTML = initialItem.innerHTML + '';\r\n\r\n    return initialItem;\r\n\r\n}\r\n\r\n\r\n\n\n//# sourceURL=webpack://johannes/./src/element-farm.js?");

/***/ }),

/***/ "./src/focus-on-p.js":
/*!***************************!*\
  !*** ./src/focus-on-p.js ***!
  \***************************/
/***/ (() => {

eval("document.addEventListener('DOMContentLoaded', function(){\r\n    const editor = document.querySelector('.johannes-editor');\r\n\r\n    if(editor){\r\n        let blocks = editor.querySelectorAll('.draggable-block');\r\n\r\n        if(blocks.length == 1){\r\n\r\n            const p = blocks[0].querySelector('.johannes-content-element'); \r\n            if(p.innerText == ''){\r\n                p.focus();\r\n            }\r\n        }\r\n    }\r\n});\n\n//# sourceURL=webpack://johannes/./src/focus-on-p.js?");

/***/ }),

/***/ "./src/helper.js":
/*!***********************!*\
  !*** ./src/helper.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   changeVirtualFocus: () => (/* binding */ changeVirtualFocus),\n/* harmony export */   focusOnPrevious: () => (/* binding */ focusOnPrevious),\n/* harmony export */   focusOnTheEndOfTheText: () => (/* binding */ focusOnTheEndOfTheText),\n/* harmony export */   showBlockOptions: () => (/* binding */ showBlockOptions)\n/* harmony export */ });\nfunction focusOnTheEndOfTheText(contentBlock) {\r\n    const range = document.createRange();\r\n    const selection = window.getSelection();\r\n\r\n    range.selectNodeContents(contentBlock);\r\n    range.collapse(false);\r\n    selection.removeAllRanges();\r\n    selection.addRange(range);\r\n}\r\n\r\nfunction focusOnPrevious(actualElement) {\r\n\r\n    let actualDraggableBlock = actualElement.closest('.draggable-block');\r\n    let sibling = actualDraggableBlock.previousElementSibling;\r\n    let focusableElement = null;\r\n\r\n    while (sibling && !focusableElement) {\r\n        let focusableCandidates = sibling.querySelectorAll('.focusable');\r\n        if (focusableCandidates.length > 0) {\r\n            focusableElement = focusableCandidates[focusableCandidates.length - 1];\r\n        }\r\n\r\n        // Se não encontrar dentro deste sibling, move para o próximo irmão anterior\r\n        if (!focusableElement) {\r\n            sibling = sibling.previousElementSibling;\r\n        }\r\n    }\r\n\r\n    // Se um elemento focusable foi encontrado, dá foco a ele\r\n    if (focusableElement) {\r\n        focusOnTheEndOfTheText(focusableElement);\r\n    } else {\r\n        console.log('No focusable element found');\r\n    }\r\n}\r\n\r\n\r\nfunction changeVirtualFocus(focusedElement, elementToApplyVisibleFocus) {\r\n\r\n    if (elementToApplyVisibleFocus) {\r\n        elementToApplyVisibleFocus.focus();\r\n        elementToApplyVisibleFocus.classList.add('block-options-focused');\r\n    }\r\n\r\n    focusedElement.focus();\r\n\r\n    return elementToApplyVisibleFocus;\r\n}\r\n\r\n\r\nfunction showBlockOptions() {\r\n    const range = document.getSelection().getRangeAt(0);\r\n    const cursorPos = range.getBoundingClientRect();\r\n\r\n    const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize);\r\n    const menuWidth = 19 * remSize;\r\n\r\n    let xPosition = cursorPos.right;\r\n    let yPosition = cursorPos.bottom + window.scrollY;\r\n\r\n    const blockOptionsWrapper = document.querySelector('.block-options-wrapper');\r\n\r\n    const margin = remSize * 1.25;    \r\n\r\n    blockOptionsWrapper.style.display = 'block';\r\n    \r\n    let blockWidth = blockOptionsWrapper.offsetWidth;\r\n\r\n\r\n    if (xPosition + blockWidth + margin > window.innerWidth) {\r\n        xPosition = cursorPos.left - menuWidth;\r\n        if (xPosition < 0) xPosition = 0;\r\n    }\r\n\r\n    blockOptionsWrapper.style.left = `${xPosition}px`;\r\n    blockOptionsWrapper.style.top = `${yPosition}px`;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://johannes/./src/helper.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _add_block_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./add-block.js */ \"./src/add-block.js\");\n/* harmony import */ var _drag_and_drop_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./drag-and-drop.js */ \"./src/drag-and-drop.js\");\n/* harmony import */ var _drag_and_drop_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_drag_and_drop_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _switch_block_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./switch-block.js */ \"./src/switch-block.js\");\n/* harmony import */ var _create_block_hit_enter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./create-block-hit-enter.js */ \"./src/create-block-hit-enter.js\");\n/* harmony import */ var _delete_block_hit_backspace_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./delete-block-hit-backspace.js */ \"./src/delete-block-hit-backspace.js\");\n/* harmony import */ var _keyboard_navigation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./keyboard-navigation.js */ \"./src/keyboard-navigation.js\");\n/* harmony import */ var _keyboard_navigation_js__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_keyboard_navigation_js__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _text_blocks_from_newlines_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./text-blocks-from-newlines.js */ \"./src/text-blocks-from-newlines.js\");\n/* harmony import */ var _focus_on_p_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./focus-on-p.js */ \"./src/focus-on-p.js\");\n/* harmony import */ var _focus_on_p_js__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_focus_on_p_js__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _list_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./list.js */ \"./src/list.js\");\n/* harmony import */ var _johannes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./johannes.js */ \"./src/johannes.js\");\n/* harmony import */ var _johannes_js__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_johannes_js__WEBPACK_IMPORTED_MODULE_10__);\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://johannes/./src/index.js?");

/***/ }),

/***/ "./src/johannes.js":
/*!*************************!*\
  !*** ./src/johannes.js ***!
  \*************************/
/***/ (() => {

eval("// Remove pest text style\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n        \r\n    document.body.addEventListener('paste', function (e) {\r\n        if (e.target.getAttribute('contenteditable') === 'true') {\r\n            e.preventDefault();\r\n            const text = (e.clipboardData || window.clipboardData).getData('text/plain');\r\n            document.execCommand('insertText', false, text);  // Inset text without style\r\n        }\r\n    });\r\n});\r\n// End remove pest text style\n\n//# sourceURL=webpack://johannes/./src/johannes.js?");

/***/ }),

/***/ "./src/keyboard-navigation.js":
/*!************************************!*\
  !*** ./src/keyboard-navigation.js ***!
  \************************************/
/***/ (() => {

eval("// document.addEventListener('DOMContentLoaded', function (event) {\r\n//     const blockWrapper = document.querySelector('.block-options-wrapper');\r\n\r\n//     if (blockWrapper) {\r\n\r\n//         const first = this.querySelector('.option');\r\n//         let current = null;\r\n\r\n//         blockWrapper.addEventListener('keydown', function (event) {\r\n\r\n//             current = current || first;\r\n\r\n//             if (event.key === 'ArrowDown') {\r\n//                 event.preventDefault();\r\n//                 current = moveToNextOption(current);\r\n//             } else if (event.key === 'ArrowUp') {\r\n//                 event.preventDefault();\r\n//                 current = moveToPreviousOption(current);\r\n//             }\r\n//         });\r\n//     }\r\n// });\r\n\r\n\r\n// function moveToNextOption(current) {\r\n\r\n//     let next = current.nextElementSibling;\r\n\r\n//     if (!(next && next.classList.contains('option'))) {\r\n\r\n//         let currentSection = current.closest('section');\r\n//         let siblingSection = currentSection.nextElementSibling;\r\n\r\n//         if (siblingSection) {\r\n//             next = siblingSection.querySelector('.option');\r\n//         } else {\r\n//             next = document.querySelector('.block-options-wrapper .option');\r\n//         }\r\n\r\n//     }\r\n\r\n//     next.focus();\r\n\r\n//     return next;\r\n// }\r\n\r\n// function moveToPreviousOption(current) {\r\n\r\n//     let previous = current.previousElementSibling;\r\n\r\n//     if (!(previous && previous.classList.contains('option'))) {\r\n\r\n//         let currentSection = current.closest('section');\r\n//         let siblingSection = currentSection.previousElementSibling;\r\n\r\n//         if (siblingSection) {\r\n//             let options = siblingSection.querySelectorAll('.option');\r\n//             previous = options[options.length - 1];\r\n//         } else {\r\n//             let options = document.querySelectorAll('.block-options-wrapper .option');\r\n//             previous = options[options.length - 1];\r\n//         }\r\n//     }\r\n\r\n//     previous.focus();\r\n\r\n//     return previous;\r\n// }\n\n//# sourceURL=webpack://johannes/./src/keyboard-navigation.js?");

/***/ }),

/***/ "./src/list.js":
/*!*********************!*\
  !*** ./src/list.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_farm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-farm */ \"./src/element-farm.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n/* harmony import */ var _list_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list.css */ \"./src/list.css\");\n\r\n\r\n\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n    document.addEventListener('keydown', function (e) {\r\n        if (e.key === 'Enter' && e.target.isContentEditable && e.target.closest('li')) {\r\n\r\n            e.preventDefault();\r\n\r\n            let newContentElement;\r\n\r\n            if (e.target.innerText !== '') {\r\n                newContentElement = (0,_element_farm__WEBPACK_IMPORTED_MODULE_0__.createNewLiElement)();\r\n                const currentItem = e.target.closest('li');\r\n\r\n                if (currentItem) {\r\n                    // Insere o novo elemento LI logo após o elemento LI atual\r\n                    currentItem.insertAdjacentElement('afterend', newContentElement);\r\n                }\r\n            } else {\r\n                let parent = e.target.closest('.draggable-block');\r\n\r\n                let aaa = (0,_element_farm__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();\r\n                parent.insertAdjacentElement('afterend', aaa);\r\n\r\n                newContentElement = aaa.querySelector('.johannes-content-element');\r\n                e.target.remove();\r\n\r\n\r\n            }\r\n\r\n\r\n\r\n            // const list = e.target.closest('ol, ul');\r\n\r\n            // if (list) {\r\n            //     list.appendChild(newListItem);\r\n            // }\r\n\r\n            setTimeout(() => {\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_1__.focusOnTheEndOfTheText)(newContentElement);\r\n\r\n            }, 0);\r\n        }\r\n    });\r\n});\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', (event) => {\r\n    const content = document.querySelector('.johannes-editor > .content');\r\n    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');\r\n\r\n    content.addEventListener('keydown', function (event) {\r\n        if (event.key === 'Backspace' && blockSelection.style.display == 'none' && event.target.closest('li')) {\r\n\r\n            const activeElement = document.activeElement;\r\n\r\n            if (activeElement.isContentEditable) {\r\n\r\n                const textContent = activeElement.textContent.trim();\r\n\r\n                if (textContent === '') {\r\n\r\n                    event.preventDefault();\r\n\r\n                    // let parent = activeElement.closest('ol, ul');\r\n\r\n                    let previous = activeElement.previousElementSibling;\r\n\r\n                    if (previous) {\r\n                        activeElement.remove();\r\n                        (0,_helper__WEBPACK_IMPORTED_MODULE_1__.focusOnTheEndOfTheText)(previous);\r\n                    } else {\r\n                        let list = activeElement.closest('ol, ul');\r\n                        let parentBlock = list.closest('.draggable-block');\r\n\r\n\r\n                        if (list.childNodes.length <= 1) {\r\n                            list.remove();\r\n                        } else {\r\n\r\n                            let block = activeElement.closest('.draggable-block');\r\n                            activeElement.remove();\r\n\r\n                            blo\r\n\r\n                            ;(0,_helper__WEBPACK_IMPORTED_MODULE_1__.focusOnTheEndOfTheText)(block);\r\n                        }\r\n                    }\r\n\r\n\r\n\r\n\r\n                    // activeElement.remove();\r\n                    // let lastChild = parent.lastChild;\r\n\r\n                    // if (lastChild) {\r\n                    //     // lastChild.focus();\r\n                    //     focusOnTheEndOfTheText(lastChild);\r\n                    // } else {\r\n\r\n                    //     // let anotherParent = parent.closest();\r\n\r\n                    //     // parent.remove();\r\n                    // }\r\n\r\n\r\n                    // let actualDraggableBlock = activeElement.closest('.draggable-block');\r\n\r\n                    // let previousDraggableBlockSibling = actualDraggableBlock.previousElementSibling;\r\n\r\n                    // actualDraggableBlock.remove();\r\n\r\n                    // let previousSiblingContentElement = previousDraggableBlockSibling.querySelector('.johannes-content-element');\r\n\r\n                    // previousSiblingContentElement.focus();\r\n\r\n                    // let range = document.createRange();\r\n                    // let selection = window.getSelection();\r\n                    // range.selectNodeContents(previousSiblingContentElement);\r\n                    // range.collapse(false);\r\n                    // selection.removeAllRanges();\r\n                    // selection.addRange(range);\r\n                }\r\n            }\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://johannes/./src/list.js?");

/***/ }),

/***/ "./src/switch-block.js":
/*!*****************************!*\
  !*** ./src/switch-block.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_farm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-farm.js */ \"./src/element-farm.js\");\n/* harmony import */ var _switch_block_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./switch-block.css */ \"./src/switch-block.css\");\n/* harmony import */ var _helper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper.js */ \"./src/helper.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n//Close the options wrapper\r\ndocument.addEventListener('DOMContentLoaded', (event) => {\r\n    const editor = document.querySelector('.johannes-editor');\r\n\r\n    // editor.addEventListener('keydown', function (event) {\r\n    //     if (event.key === 'Escape') {\r\n    //         document.querySelector('.block-options-wrapper').style.display = 'none';\r\n    //     }\r\n    // });\r\n\r\n    // Adicionando o evento de mouse para fechar ao clicar fora\r\n    document.addEventListener('mousedown', function (event) {\r\n        const optionsWrapper = document.querySelector('.block-options-wrapper');\r\n\r\n        if (optionsWrapper) {\r\n            const isClickInsideOptions = optionsWrapper.contains(event.target);\r\n            const mainMouseButton = event.button === 0;\r\n\r\n            if (!isClickInsideOptions && mainMouseButton) {\r\n                optionsWrapper.style.display = 'none';\r\n            }\r\n        }\r\n    });\r\n});\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n    const editor = document.querySelector('.johannes-editor');\r\n    const blockOptions = document.querySelector('.johannes-editor > .block-options-wrapper');\r\n\r\n    let triggerElement = null;\r\n    let currentDraggableBlock = null;\r\n\r\n    let currentFocusedOption = null;\r\n\r\n    let filterText = '';\r\n\r\n\r\n    editor.addEventListener('keydown', function (event) {\r\n\r\n        if (event.key === '/') {\r\n\r\n            setTimeout(() => {\r\n\r\n                const target = event.target;\r\n\r\n                if (target.closest('.draggable-block')) {\r\n                    event.preventDefault(); // Avoid / be inserted\r\n                    currentDraggableBlock = target.closest('.draggable-block');\r\n                    triggerElement = target;\r\n\r\n\r\n                    removeDisplayNoneFromAllBlockOptions();\r\n\r\n                    filterText = '';\r\n\r\n                    (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.showBlockOptions)();\r\n\r\n                    let firstOption = blockOptions.querySelector('.option');                    \r\n\r\n                    removeAllVirtualFocus();\r\n\r\n                    currentFocusedOption = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.changeVirtualFocus)(triggerElement, firstOption);\r\n                }\r\n\r\n\r\n            }, 0);\r\n        } else if (event.key === 'Escape' && blockOptions.style.display !== 'none') {\r\n            event.preventDefault();\r\n            if (triggerElement) {\r\n                triggerElement.focus();\r\n\r\n                currentFocusedOption.classList.remove('block-options-focused');\r\n            }\r\n\r\n            document.querySelector('.block-options-wrapper').style.display = 'none';\r\n            filterText = '';\r\n            removeDisplayNoneFromAllBlockOptions();\r\n\r\n        } else if (event.key === 'Enter' && blockOptions.style.display !== 'none') {\r\n\r\n            event.preventDefault();\r\n\r\n            // let option = document.activeElement.closest('.option');\r\n            currentFocusedOption.classList.remove('block-options-focused');\r\n\r\n            let option = currentFocusedOption;\r\n\r\n            if (option) {\r\n\r\n                const asasas = triggerElement.closest('.draggable-block');\r\n                const blockType = option.getAttribute('data-type');\r\n\r\n\r\n\r\n                const lastSlashIndex = triggerElement.innerText.lastIndexOf('/');\r\n                triggerElement.innerText = lastSlashIndex !== -1 ? triggerElement.innerText.slice(0, lastSlashIndex) : triggerElement.innerText;\r\n\r\n                transformBlock(asasas, blockType);\r\n\r\n            }\r\n\r\n        } else if (event.key === 'ArrowDown' && blockOptions.style.display !== 'none') {\r\n            event.preventDefault();\r\n\r\n            currentFocusedOption = moveToNextOption(currentFocusedOption, triggerElement);\r\n\r\n        } else if (event.key === 'ArrowUp' && blockOptions.style.display !== 'none') {\r\n            event.preventDefault();\r\n\r\n            currentFocusedOption = moveToPreviousOption(currentFocusedOption, triggerElement);\r\n\r\n        } else if (event.key === 'Backspace' && blockOptions.style.display !== 'none') {\r\n\r\n            if (filterText.length > 0) {\r\n\r\n                filterText = filterText.slice(0, -1);\r\n\r\n                updateBlockVisibility(filterText);\r\n\r\n                let firstVisibleOption = findFirstVisibleOption();\r\n\r\n                removeAllVirtualFocus();\r\n\r\n                currentFocusedOption = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.changeVirtualFocus)(triggerElement, firstVisibleOption);\r\n\r\n            } else {\r\n                blockOptions.style.display = 'none';\r\n            }\r\n\r\n\r\n        } else if (/^[a-z0-9]$/i.test(event.key) && blockOptions.style.display !== 'none') {\r\n\r\n            // event.preventDefault();\r\n            filterText += event.key.toLowerCase();\r\n            updateBlockVisibility(filterText);\r\n\r\n            let firstVisibleOption = findFirstVisibleOption();\r\n            removeAllVirtualFocus();\r\n            currentFocusedOption = (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.changeVirtualFocus)(triggerElement, firstVisibleOption);\r\n\r\n            console.log(JSON.stringify(currentFocusedOption));\r\n        }\r\n\r\n    });\r\n\r\n\r\n    // Added listeners in options\r\n    document.querySelectorAll('.block-options .option').forEach(option => {\r\n        option.addEventListener('click', function () {\r\n            const type = this.getAttribute('data-type');\r\n            if (currentDraggableBlock) {\r\n                transformBlock(currentDraggableBlock, type);\r\n            }\r\n        });\r\n    });\r\n\r\n\r\n\r\n\r\n});\r\n\r\n\r\nfunction transformBlock(blockElement, type) {\r\n\r\n    let contentElement = blockElement.querySelector('.johannes-content-element');\r\n    let content = contentElement.innerText;\r\n\r\n    if (content.endsWith('/')) {\r\n        content = content.slice(0, -1); // Remove the last '/'\r\n    }\r\n\r\n    let newContentBlock;\r\n\r\n    switch (type) {\r\n        case 'p':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewParagraphElement();\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'h1':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(1);\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'h2':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(2);\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'h3':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(3);\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'h4':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(4);\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'h5':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(5);\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'h6':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewHeadingElement(6);\r\n                newContentBlock.innerText = content;\r\n                break;\r\n            }\r\n        case 'code':\r\n            newContentBlock = document.createElement('pre');\r\n            const code = document.createElement('code');\r\n            code.innerText = content;\r\n            newContentBlock.appendChild(code);\r\n            break;\r\n        case 'image':\r\n            newContentBlock = document.createElement('img');\r\n            newContentBlock.src = content;\r\n            newContentBlock.alt = \"Descriptive text\";\r\n            break;\r\n        case 'quote':\r\n            newContentBlock = document.createElement('blockquote');\r\n            newContentBlock.innerText = content;\r\n            break;\r\n        case 'bulleted-list':\r\n            {\r\n                newContentBlock = _element_farm_js__WEBPACK_IMPORTED_MODULE_0__.createNewListElement(content);\r\n\r\n                let li = newContentBlock.querySelector('li');\r\n\r\n                setTimeout(() => {\r\n                    (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.focusOnTheEndOfTheText)(li);\r\n                }, 0);\r\n                break;\r\n            }\r\n\r\n        case 'numbered-list':\r\n            {\r\n                newContentBlock = document.createElement('ol');\r\n                const items = content.split('\\n');\r\n                items.forEach(item => {\r\n                    const listItem = document.createElement('li');\r\n                    listItem.innerText = item;\r\n                    newContentBlock.appendChild(listItem);\r\n                });\r\n                break;\r\n            }\r\n\r\n        default:\r\n            console.error('Unsupported type');\r\n            return;\r\n    }\r\n\r\n    removeDisplayNoneFromAllBlockOptions();\r\n    blockElement.replaceChild(newContentBlock, contentElement);\r\n\r\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.focusOnTheEndOfTheText)(newContentBlock);\r\n\r\n    document.querySelector('.block-options-wrapper').style.display = 'none';\r\n}\r\n\r\n\r\nfunction moveToNextOption(current, keepFocused) {\r\n    let next = current.nextElementSibling;\r\n\r\n    // Busca pelo próximo elemento 'option' visível no mesmo 'section'\r\n    while (next && (!next.classList.contains('option') || !isElementVisible(next))) {\r\n        next = next.nextElementSibling;\r\n    }\r\n\r\n    // Se não encontrou um próximo 'option' visível, busca na próxima 'section'\r\n    if (!next) {\r\n        let currentSection = current.closest('section');\r\n        let siblingSection = currentSection.nextElementSibling;\r\n\r\n        while (siblingSection) {\r\n            next = siblingSection.querySelector('.option');\r\n            if (next && isElementVisible(next)) {\r\n                break;\r\n            }\r\n            siblingSection = siblingSection.nextElementSibling;\r\n        }\r\n\r\n        // Se todas as 'sections' foram verificadas e nenhum 'option' visível foi encontrado, recomeça do início\r\n        if (!next) {\r\n            next = document.querySelector('.block-options-wrapper .option');\r\n            while (next && !isElementVisible(next)) {\r\n                next = next.nextElementSibling;\r\n            }\r\n        }\r\n    }\r\n\r\n    // Muda o foco e atualiza as classes para indicar o elemento focado\r\n\r\n    removeAllVirtualFocus();\r\n\r\n    // if (next) {\r\n    //     current.classList.remove('block-options-focused');\r\n    //     next.classList.add('block-options-focused');\r\n    //     next.focus();\r\n    // }\r\n\r\n    // if (keepFocused) {\r\n    //     keepFocused.focus();  // Mantém o foco original onde necessário\r\n    // }\r\n\r\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.changeVirtualFocus)(keepFocused, next);\r\n\r\n    return next;\r\n}\r\n\r\nfunction moveToPreviousOption(current, keepFocused) {\r\n    let previous = current.previousElementSibling;\r\n\r\n    // Busca pelo elemento 'option' visível anterior no mesmo 'section'\r\n    while (previous && (!previous.classList.contains('option') || !isElementVisible(previous))) {\r\n        previous = previous.previousElementSibling;\r\n    }\r\n\r\n    // Se não encontrou um 'option' visível, busca na 'section' anterior\r\n    if (!previous) {\r\n        let currentSection = current.closest('section');\r\n        let siblingSection = currentSection.previousElementSibling;\r\n\r\n        // Busca pelo último 'option' visível na 'section' anterior\r\n        while (siblingSection) {\r\n            let options = siblingSection.querySelectorAll('.option');\r\n            for (let i = options.length - 1; i >= 0; i--) {\r\n                if (isElementVisible(options[i])) {\r\n                    previous = options[i];\r\n                    break;\r\n                }\r\n            }\r\n            if (previous) break;\r\n            siblingSection = siblingSection.previousElementSibling;\r\n        }\r\n\r\n        // Se todas as 'sections' foram verificadas e nenhum 'option' visível foi encontrado, começa do final\r\n        if (!previous) {\r\n            let options = document.querySelectorAll('.block-options-wrapper .option');\r\n            for (let i = options.length - 1; i >= 0; i--) {\r\n                if (isElementVisible(options[i])) {\r\n                    previous = options[i];\r\n                    break;\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    removeAllVirtualFocus();\r\n\r\n    // if (previous) {\r\n    //     current.classList.remove('block-options-focused');\r\n    //     previous.classList.add('block-options-focused');\r\n    //     previous.focus();\r\n    // }\r\n\r\n    // if (keepFocused) {\r\n    //     keepFocused.focus();\r\n    // }\r\n\r\n    (0,_helper_js__WEBPACK_IMPORTED_MODULE_2__.changeVirtualFocus)(keepFocused, previous);\r\n\r\n    return previous;\r\n}\r\n\r\n\r\n\r\nfunction updateBlockVisibility(filter) {\r\n    let sections = document.querySelectorAll('.johannes-editor .block-options-wrapper section');\r\n\r\n    sections.forEach(section => {\r\n        let options = section.querySelectorAll('.option');\r\n        let allHidden = true;\r\n\r\n        options.forEach(option => {\r\n            const type = option.getAttribute('data-type');\r\n            const title = option.querySelector('.block-title').textContent.toLowerCase();\r\n\r\n            // Verifica se o tipo de dado ou o título do bloco contém o filtro\r\n            if (type.includes(filter) || title.includes(filter.toLowerCase())) {\r\n                option.style.display = '';  // Exibe a opção\r\n                allHidden = false;\r\n            } else {\r\n                option.style.display = 'none';  // Oculta a opção\r\n            }\r\n        });\r\n\r\n        section.style.display = allHidden ? 'none' : '';  // Controla a visibilidade da seção\r\n    });\r\n}\r\n\r\nfunction removeDisplayNoneFromAllBlockOptions() {\r\n    let sections = document.querySelectorAll('.johannes-editor .block-options-wrapper section');\r\n\r\n    sections.forEach(section => {\r\n        let options = section.querySelectorAll('.option');\r\n\r\n        options.forEach(option => {\r\n            option.style.display = '';\r\n        });\r\n\r\n        section.style.display = '';\r\n    });\r\n}\r\n\r\n\r\nfunction findFirstVisibleOption() {\r\n\r\n    let options = document.querySelectorAll('.johannes-editor .block-options-wrapper section .option');\r\n\r\n    for (let option of options) {\r\n        if (option.style.display !== 'none' && option.offsetParent !== null) {\r\n            return option;\r\n        }\r\n    }\r\n\r\n    return null;\r\n}\r\n\r\n\r\n\r\n\r\n\r\nfunction isElementVisible(element) {\r\n    return element && element.style.display !== 'none' && element.style.visibility !== 'hidden' && element.offsetParent !== null;\r\n}\r\n\r\nfunction removeAllVirtualFocus() {\r\n    let focusedElements = document.querySelectorAll('.johannes-editor .block-options-wrapper .block-options-focused');\r\n\r\n    focusedElements.forEach(element => {\r\n        element.classList.remove('block-options-focused');\r\n    });\r\n}\n\n//# sourceURL=webpack://johannes/./src/switch-block.js?");

/***/ }),

/***/ "./src/text-blocks-from-newlines.js":
/*!******************************************!*\
  !*** ./src/text-blocks-from-newlines.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _element_farm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-farm */ \"./src/element-farm.js\");\n/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helper */ \"./src/helper.js\");\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n    const content = document.querySelector('.johannes-editor > .content');\r\n\r\n    content.addEventListener('input', function (event) {\r\n\r\n        const target = event.target;\r\n\r\n        if (target.tagName === 'P' && target.isContentEditable) {\r\n\r\n            const blocks = target.innerText.split('\\n');\r\n\r\n            if (blocks.length > 1) {\r\n\r\n                event.preventDefault();\r\n\r\n                // Remove original text to avoid duplication\r\n                target.innerText = blocks[0]; // Keep the first actual line paragraph \r\n\r\n                let currentTarget = target.closest('.draggable-block');\r\n                let lastContentBlock = null;\r\n\r\n                // Each new line, create a new P below the actual\r\n                for (let i = 1; i < blocks.length; i++) {\r\n\r\n                    const newParagraph = (0,_element_farm__WEBPACK_IMPORTED_MODULE_0__.createNewDraggableParagraphElement)();\r\n\r\n                    //works?  I dont't know\r\n                    lastContentBlock = newParagraph.querySelector('.johannes-content-element');\r\n\r\n                    lastContentBlock.innerText = blocks[i];\r\n                    currentTarget.insertAdjacentElement('afterend', newParagraph);\r\n                    currentTarget = newParagraph;\r\n                }\r\n\r\n                (0,_helper__WEBPACK_IMPORTED_MODULE_1__.focusOnTheEndOfTheText)(lastContentBlock);\r\n            }\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://johannes/./src/text-blocks-from-newlines.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;