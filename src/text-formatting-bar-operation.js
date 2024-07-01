import * as jSelection from './j-selection';


import * as jAnchor from './j-anchor';
import { showDependentBlockOptions } from './block-options-operation';

import { getCurrentDraggableBlockFocused } from './j-selection';


let textFormattingBarVisible = false;
let textFormattingBarPreventHide = false;



export function isShowingTextFormattingSelectableDependentBox() {
    let isShowing = (
        turnIntoSelect.style.display !== 'none' ||
        moreTextOptionSelect.style.display !== 'none' ||
        colorTextOptionSelect.style.display !== 'none');
    return isShowing;
}

export function isOutOfTextFormattingBar(event) {

    if (!event.target.closest('#textFormattingBar') && !event.target.closest('#linkBox')) {
        return true;
    }

    return false;
}

export function canHideTextFormattingBar() {
    return !textFormattingBarPreventHide;
}

export function isShowingTextFormattingBar() {
    return textFormattingBar.style.display !== 'none';
}

export function showTextFormattingBar(event) {

    console.log('show text formatting bar');

    hideAllDependentBox();

    textFormattingBarVisible = true;
    textFormattingBarPreventHide = true;

    setTimeout(() => {
        textFormattingBarPreventHide = false;
    }, 300);

    jSelection.removeSavedSelection();
    jSelection.saveSelection();

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

export function hideTextFormattingBar() {

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


export function toggleEncloseSelectedTextTo(event) {
    const dataTag = event.target.closest('.entry').getAttribute('data-tag');
    const dataClass = event.target.closest('.entry').getAttribute('data-class');

    if (dataClass) {
        toggleSelectedTextTo(dataTag, dataClass);
    } else {
        toggleSelectedTextTo(dataTag);
    }

    hideAllDependentBox();
    hideTextFormattingBar();

    jSelection.restoreSelection();
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



export function inputLinkUrl() {
    const url = linkBoxInput.value.trim();
    if (!url) return;

    // Simples verificação de URL
    if (!url.match(/^https?:\/\/.+/)) {
        alert('Please enter a valid URL.');
        return;
    }

    jAnchor.setURL(url);

    //Move this to windows manager
    hideLinkBox();

    // jAnchor.clear();
    // jSelection.clearAllSelection();


    //Ops
    linkBoxInput.value = '';
}


function toggleSelectedTextTo(tagName, classList = '') {
    let newElement = null;

    const range = jSelection.getSavedRange();
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
    let block = getCurrentDraggableBlockFocused().querySelector('.johannes-content-element');

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
    let currentRange = jSelection.getSavedRange();

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


export function toggleMoreOptionsBox(event) {

    console.log('toggle more options');

    const isHidden = moreTextOptionSelect.style.display == 'none';

    if (isHidden) {
        moreTextOptionSelect.style.display = 'flex';
        showDependentBlockOptions(event.target);

        jSelection.temporarySelectContentFromCurrentSelection();

    } else {
        hideMoreOptionsBox();
    }

    hideChangeColorBox();
    hideTurnIntoBox();
    hideLinkBox();
}

export function toggleChangeColorBox(event) {

    console.log('toggle change color');

    const isHidden = colorTextOptionSelect.style.display == 'none';

    if (isHidden) {
        colorTextOptionSelect.style.display = 'flex';
        showDependentBlockOptions(event.target);

        removeAllSVGsFromColorsTextOptions();
        setColorCurrentSelectedIcon();

    } else {
        colorTextOptionSelect.style.display = 'none';
    }

    hideTurnIntoBox();
    hideMoreOptionsBox();
    hideLinkBox();
}

export function toggleTurnIntoBox(event) {

    console.log('toggle turn into box');

    const isHidden = turnIntoSelect.style.display == 'none';

    if (isHidden) {
        turnIntoSelect.style.display = 'flex';
        jSelection.temporarySelectContentFromCurrentSelection();

        showDependentBlockOptions(event.target);
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
export function toggleInputLinkBox() {


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

    const rect = jSelection.getSavedRange().getBoundingClientRect();

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
    jAnchor.setAnchor(a);
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
        jSelection.restoreSelection();
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
    jSelection.restoreSelection();
}

function hideTurnIntoBox() {

    if (turnIntoSelect.style.display == 'none') {
        return;
    }

    console.log('hide turn into box');
    turnIntoSelect.style.display = 'none';
    jSelection.restoreSelection();
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
    jAnchor.clear();
    jSelection.restoreSelection();
    linkBox.style.display = 'none';
}



export function hideAllDependentBox() {
    hideMoreOptionsBox();
    hideTurnIntoBox();
    hideChangeColorBox();
    hideLinkBox();
}
