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

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://johannes/./src/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ \"./src/style.css\");\n/* harmony import */ var _johannes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./johannes.js */ \"./src/johannes.js\");\n/* harmony import */ var _johannes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_johannes_js__WEBPACK_IMPORTED_MODULE_1__);\n// import './script1.js';\r\n// import './script2.js';\r\n// import './script3.js';\r\n\r\n\r\n\n\n//# sourceURL=webpack://johannes/./src/index.js?");

/***/ }),

/***/ "./src/johannes.js":
/*!*************************!*\
  !*** ./src/johannes.js ***!
  \*************************/
/***/ (() => {

eval("let uniqueIdCounter = 0;\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n\r\n    //Text selection\r\n\r\n    //end text selection\r\n    \r\n\r\n    // Drag element\r\n    const content = document.querySelector('.johannes-editor');\r\n    let draggedItem = null;\r\n    let dropLine = document.createElement('div');\r\n    dropLine.classList.add('drop-line');\r\n    dropLine.style.height = '2px';\r\n    dropLine.style.display = 'none';\r\n\r\n    content.addEventListener('dragstart', (e) => {\r\n        if (e.target.classList.contains('drag-handler')) {\r\n            draggedItem = e.target.closest('.draggable-block');\r\n            draggedItem.setAttribute('draggable', 'true');\r\n            setTimeout(() => {\r\n                draggedItem.style.opacity = '0.5';\r\n            }, 0);\r\n        }\r\n    });\r\n\r\n    content.addEventListener('dragend', () => {\r\n        setTimeout(() => {\r\n            if (draggedItem) {\r\n                draggedItem.style.opacity = '';\r\n                draggedItem.removeAttribute('draggable');\r\n                draggedItem = null;\r\n            }\r\n            dropLine.remove();\r\n        }, 0);\r\n    });\r\n\r\n    content.addEventListener('dragover', (e) => {\r\n        e.preventDefault();\r\n        let target = e.target.closest('.draggable-block');\r\n\r\n        if (target && target !== draggedItem) {\r\n            let bounding = target.getBoundingClientRect();\r\n            let offset = bounding.y + bounding.height / 2;\r\n\r\n            if (e.clientY > offset) {\r\n                if (target.nextElementSibling !== dropLine) {\r\n                    target.insertAdjacentElement('afterend', dropLine);\r\n                }\r\n            } else {\r\n                if (target.previousElementSibling !== dropLine) {\r\n                    target.insertAdjacentElement('beforebegin', dropLine);\r\n                }\r\n            }\r\n        }\r\n\r\n        dropLine.style.display = 'block';\r\n    });\r\n\r\n    content.addEventListener('drop', (e) => {\r\n        e.preventDefault();\r\n        if (dropLine.parentElement) {\r\n            dropLine.parentElement.insertBefore(draggedItem, dropLine);\r\n            dropLine.remove();\r\n        }\r\n    });\r\n    // End drag element\r\n\r\n\r\n    // Creates a new P when hit Enter\r\n    document.addEventListener('keydown', function (e) {\r\n        if (e.key === 'Enter' && e.target.isContentEditable) {\r\n            e.preventDefault();\r\n\r\n            const newP = createNewDraggableParagraphElement();\r\n\r\n            const draggableBlock = e.target.closest('.draggable-block');\r\n\r\n            if (draggableBlock) {\r\n                if (draggableBlock.nextSibling) {\r\n                    draggableBlock.parentNode.insertBefore(newP, draggableBlock.nextSibling);\r\n                } else {\r\n                    draggableBlock.parentNode.appendChild(newP);\r\n                }\r\n            }\r\n\r\n            setTimeout(() => {\r\n\r\n                let focusable = newP.querySelector('.johannes-content-element');\r\n\r\n                if (focusable) {\r\n                    focusable.focus();\r\n                }\r\n            }, 0);\r\n        }\r\n    });\r\n    // End create a new p when hit Enter\r\n\r\n\r\n\r\n\r\n\r\n    // Create a new block when clicked add\r\n    document.querySelector('.add-block').addEventListener('click', function () {\r\n        let newElement = createNewDraggableParagraphElement();\r\n        document.querySelector('.johannes-editor > .content').appendChild(newElement);\r\n    });\r\n    // End create a new block when clicked add\r\n\r\n\r\n\r\n\r\n});//End DomContentLoaded\r\n\r\n\r\n// New paragraph when find a \\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n    const content = document.querySelector('.content');\r\n\r\n    content.addEventListener('input', function (event) {\r\n        const target = event.target;\r\n        if (target.tagName === 'P' && target.isContentEditable) {\r\n            const lines = target.innerText.split('\\n');\r\n            if (lines.length > 1) {\r\n                event.preventDefault(); // Prevent insert directly\r\n                // Remove original text to avoid duplication\r\n                target.innerText = lines[0]; // Keep the first actual line paragraph \r\n\r\n                let currentTarget = target;\r\n                // Each new line, create a new P below the actual\r\n                for (let i = 1; i < lines.length; i++) {\r\n\r\n                    const newParagraph = createNewDraggableParagraphElement();\r\n\r\n                    //works?  I dont't know\r\n                    newParagraph.innerText = lines[i];\r\n                    currentTarget.insertAdjacentElement('afterend', newParagraph);\r\n                    currentTarget = newParagraph;\r\n                }\r\n\r\n                currentTarget.focus();\r\n            }\r\n        }\r\n    });\r\n});\r\n// End new paragraph when find a \\n\r\n\r\n\r\n// Remove the block when hit backspace\r\ndocument.addEventListener('DOMContentLoaded', (event) => {\r\n    const content = document.querySelector('.content');\r\n\r\n    content.addEventListener('keydown', function (event) {\r\n        if (event.key === 'Backspace') {\r\n            const activeElement = document.activeElement;\r\n            if (activeElement.tagName !== 'H1' && activeElement.isContentEditable) {\r\n                const placeholder = activeElement.getAttribute('data-placeholder');\r\n                const textContent = activeElement.textContent.trim();\r\n\r\n                if (textContent === '' || textContent === placeholder) {\r\n                    event.preventDefault();\r\n\r\n                    let sibling = activeElement.closest('.draggable-block').previousElementSibling;\r\n                    activeElement.remove();\r\n\r\n                    let focusableElement = sibling.querySelector('.johannes-content-element');\r\n\r\n                    focusableElement.focus();\r\n\r\n                    let range = document.createRange();\r\n                    let selection = window.getSelection();\r\n                    range.selectNodeContents(focusableElement);\r\n                    range.collapse(false);\r\n                    selection.removeAllRanges();\r\n                    selection.addRange(range);\r\n\r\n                }\r\n            }\r\n        }\r\n    });\r\n});\r\n// End remove the block when hit backspace\r\n\r\n\r\n// Remove pest text style\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n        \r\n    document.body.addEventListener('paste', function (e) {\r\n        if (e.target.getAttribute('contenteditable') === 'true') {\r\n            e.preventDefault();\r\n            const text = (e.clipboardData || window.clipboardData).getData('text/plain');\r\n            document.execCommand('insertText', false, text);  // Inset text without style\r\n        }\r\n    });\r\n});\r\n// End remove pest text style\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', (event) => {\r\n    const content = document.querySelector('.content');\r\n\r\n    content.addEventListener('keydown', function (event) {\r\n        if (event.key === 'Escape') {\r\n            document.querySelector('.block-options').style.display = 'none';\r\n        }\r\n    });\r\n});\r\n\r\n\r\n\r\ndocument.addEventListener('DOMContentLoaded', () => {\r\n\r\n    const editor = document.querySelector('.johannes-editor');\r\n    let currentBlock = null;\r\n\r\n    editor.addEventListener('keydown', function (event) {\r\n        if (event.key === '/') {\r\n\r\n            setTimeout(() => {\r\n                const range = window.getSelection().rangeCount > 0 ? window.getSelection().getRangeAt(0) : null;\r\n                if (!range) {\r\n\r\n                    alert('Erro fatal!!!');\r\n                }\r\n\r\n                const target = event.target;\r\n                if (target.closest('.draggable-block')) {\r\n                    event.preventDefault(); // Avoid / be inserted\r\n                    currentBlock = target.closest('.draggable-block');\r\n\r\n                    // Take the element cursor position\r\n                    const cursorPos = range.getBoundingClientRect();\r\n                    const blockOptions = document.querySelector('.block-options');\r\n\r\n                    // Set menu position and show the block selector\r\n                    blockOptions.style.left = `${cursorPos.left}px`;\r\n                    blockOptions.style.top = `${cursorPos.bottom + window.scrollY}px`; // The scroll\r\n                    blockOptions.style.display = 'block';\r\n                }\r\n\r\n\r\n            }, 0);\r\n        }\r\n    });\r\n\r\n\r\n    // Added listeners in options\r\n    document.querySelectorAll('.block-options .option').forEach(option => {\r\n        option.addEventListener('click', function () {\r\n            const type = this.getAttribute('data-type');\r\n            if (currentBlock) {\r\n                transformBlock(currentBlock, type);\r\n            }\r\n            document.querySelector('.block-options').style.display = 'none';\r\n        });\r\n    });\r\n});\r\n\r\n\r\nfunction transformBlock(blockElement, type) {\r\n\r\n    let contentElement = blockElement.querySelector('.johannes-content-element');\r\n    let content = contentElement.innerText;\r\n\r\n    if (content.endsWith('/')) {\r\n        content = content.slice(0, -1); // Remove the last '/'\r\n    }\r\n\r\n    let newBlock;\r\n\r\n    switch (type) {\r\n        case 'p':\r\n            newBlock = createNewParagraphElement();\r\n            newBlock.innerText = content;\r\n            break;\r\n        case 'h2':\r\n            newBlock = createNewH2Element();\r\n            newBlock.innerText = content;\r\n            break;\r\n        case 'code':\r\n            newBlock = document.createElement('pre');\r\n            const code = document.createElement('code');\r\n            code.innerText = content;\r\n            newBlock.appendChild(code);\r\n            break;\r\n        case 'image':\r\n            newBlock = document.createElement('img');\r\n            newBlock.src = content;\r\n            newBlock.alt = \"Descriptive text\";\r\n            break;\r\n        case 'quote':\r\n            newBlock = document.createElement('blockquote');\r\n            newBlock.innerText = content;\r\n            break;\r\n        case 'list':\r\n            newBlock = document.createElement('ul');\r\n            const items = content.split('\\n');\r\n            items.forEach(item => {\r\n                const listItem = document.createElement('li');\r\n                listItem.innerText = item;\r\n                newBlock.appendChild(listItem);\r\n            });\r\n            break;\r\n        default:\r\n            console.error('Unsupported type');\r\n            return;\r\n    }\r\n\r\n\r\n    blockElement.replaceChild(newBlock, contentElement);\r\n    newBlock.focus();\r\n}\r\n\r\nfunction createNewH2Element() {\r\n\r\n    let newElement = document.createElement('h2');\r\n    newElement.classList.add('johannes-content-element');\r\n\r\n    newElement.contentEditable = true;\r\n\r\n    newElement.setAttribute('data-placeholder', 'Heading 2');\r\n\r\n    return newElement;\r\n}\r\n\r\n\r\nfunction createNewParagraphElement() {\r\n\r\n    let newElement = document.createElement('p');\r\n    newElement.classList.add('johannes-content-element');\r\n\r\n    newElement.contentEditable = true;\r\n\r\n    newElement.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');\r\n\r\n    return newElement;\r\n}\r\n\r\nfunction createNewDraggableParagraphElement() {\r\n\r\n    let newDiv = document.createElement('div');\r\n    let newElement = createNewParagraphElement();\r\n\r\n    let newButton = document.createElement('button');\r\n    newButton.innerHTML = '<svg width=\"20\" height=\"20\" fill=\"currentColor\"><use href=\"#icon-material-drag\"></use></svg>';\r\n\r\n    newDiv.appendChild(newButton);\r\n    newDiv.appendChild(newElement);\r\n\r\n    newDiv.classList.add('draggable-block');\r\n    newButton.classList.add('drag-handler');\r\n    newButton.classList.add('button-reset');\r\n    newButton.draggable = true;\r\n\r\n    return newDiv;\r\n}\n\n//# sourceURL=webpack://johannes/./src/johannes.js?");

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