import { closeAllDependentBox } from './j-window';
import { tryHideTextFormattingBar } from './j-window';
import { saveSelection } from './j-selection';


import * as jAnchor from './j-anchor';

function showTextFormattingBar(event) {

    saveSelection();

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



function clearTextFormattingButtonActive() {
    linkTextButton.classList.remove('text-formatting-button-active');
    boldTextButton.classList.remove('text-formatting-button-active');
    italicTextButton.classList.remove('text-formatting-button-active');
    underlineTextButton.classList.remove('text-formatting-button-active');
    codeTextButton.classList.remove('text-formatting-button-active');
    strikeThroughTextButton.classList.remove('text-formatting-button-active');
    mathTextButton.classList.remove('text-formatting-button-active');
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
    });
}

function getSelectedTags() {
    const selection = window.getSelection();
    const tags = [];

    const tagNames = ["STRONG", "S", "EM", "U", "CODE", "MATH", "A"];

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

document.addEventListener('DOMContentLoaded', function () {

    boldTextButton.addEventListener('click', function (event) {
        toggleSelectedTextTo('strong');
        clearSelection();
        tryHideTextFormattingBar();
    });

    italicTextButton.addEventListener('click', function () {
        toggleSelectedTextTo('em');
        clearSelection();
        tryHideTextFormattingBar();
    });

    underlineTextButton.addEventListener('click', function () {
        toggleSelectedTextTo('u');
        clearSelection();
        tryHideTextFormattingBar();
    });

    codeTextButton.addEventListener('click', function () {
        toggleSelectedTextTo('code');
        clearSelection();
        tryHideTextFormattingBar();
    });

    strikeThroughTextButton.addEventListener('click', function () {
        toggleSelectedTextTo('s');
        clearSelection();
        tryHideTextFormattingBar();
    });

    mathTextButton.addEventListener('click', function () {
        toggleSelectedTextTo('math');
        clearSelection();
        tryHideTextFormattingBar();
    });

    linkTextButton.addEventListener('click', function () {
        jAnchor.save(toggleSelectedTextTo('a'));

        if (jAnchor.any()) {
            showInputLinkBox();
        }
    });

    linkBoxInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            urlInsert();
            clearSelection();
            tryHideTextFormattingBar();
        }
    });
});



function urlInsert() {
    const url = linkBoxInput.value.trim();
    if (!url) return;

    // Simples verificação de URL
    if (!url.match(/^https?:\/\/.+/)) {
        alert('Please enter a valid URL.');
        return;
    }

    jAnchor.setURL(url);

    //Move this to windows manager
    linkBox.style.display = 'none';

    jAnchor.clear();


    //Ops
    linkBoxInput.value = '';
}


function toggleSelectedTextTo(tagName, classList = '') {
    let newElement = null;
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    if (!selectedText) return;

    const container = range.commonAncestorContainer;

    // Verificar se a seleção atual está dentro de uma tag específica
    let formattedElement = null;

    if (container.nodeType === 3) { // Nó de texto
        formattedElement = container.parentNode.tagName.toLowerCase() === tagName.toLowerCase() ? container.parentNode : null;
    } else {
        formattedElement = container.tagName.toLowerCase() === tagName.toLowerCase() ? container : container.querySelector(tagName);
    }

    if (formattedElement) {
        // A seleção está dentro da formatação especificada, então devemos remover
        const parent = formattedElement.parentNode;
        while (formattedElement.firstChild) {
            parent.insertBefore(formattedElement.firstChild, formattedElement);
        }
        parent.removeChild(formattedElement);

        // Mesclar nós de texto adjacentes
        parent.normalize();

        // Atualizar a seleção para refletir as mudanças
        range.setStart(parent, 0);
        range.setEnd(parent, parent.childNodes.length);
    } else {
        // A seleção não está na formatação especificada, então adicionar
        newElement = document.createElement(tagName);

        if (tagName == 'mark') {
            let classes = classList.split(',').filter(e => e.length > 0);

            for (let className of classes) {
                newElement.classList.add(className);
            }
        }

        try {
            range.surroundContents(newElement);
        } catch (e) {
            console.error("Erro ao aplicar a tag:", e);
            return;
        }

        // Atualizar a seleção para refletir as mudanças
        range.selectNodeContents(newElement);
    }

    // Restaurar a seleção
    selection.removeAllRanges();
    selection.addRange(range);

    return newElement;
}


function clearSelection() {
    const selection = window.getSelection();
    selection.removeAllRanges();
}


document.addEventListener('DOMContentLoaded', function () {

    //MOUSE-UP
    document.addEventListener('mouseup', function (event) {
        if (window.getSelection().toString().trim() !== '') {

            clearTextFormattingButtonActive();
            showTextFormattingBar(event);
            updateTextFormattingActiveButtons();

        } else if (!event.target.closest('#linkBox') && !event.target.closest('#link-text-button')) {

            console.log('MOUSEUP ocultar tool text-formatting-bar e link-box');

            tryHideTextFormattingBar();
        }
    });

    //KEY
    document.addEventListener('keyup', function (event) {
        if (event.key === 'Shift' && window.getSelection().toString().trim() !== '') {
            // text selected

            showTextFormattingBar(event);

        } else if (event.key === 'Escape') {
            // scape hide the link-box and text-formatting-bar
            console.log('ESC ocultar tool text-formatting-bar e link-box');

            tryHideTextFormattingBar();
        }
    });

});




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




document.addEventListener('DOMContentLoaded', function () {
    turnIntoButton.addEventListener('click', function () {

        if (turnIntoSelect.style.display == 'none') {
            closeAllDependentBox();
            turnIntoSelect.style.display = 'flex';
        } else {
            turnIntoSelect.style.display = 'none';
        }
    });
});


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


//Show more options
document.addEventListener('DOMContentLoaded', function () {
    moreTextOptionButton.addEventListener('click', function () {
        if (moreTextOptionSelect.style.display == 'none') {
            showMoreOptions();
        } else {
            hideMoreOptions();
        }
    });
});



function showMoreOptions() {
    closeAllDependentBox();
    moreTextOptionSelect.style.display = 'flex';
}

function hideMoreOptions() {
    moreTextOptionSelect.style.display = 'none';

}

//Show color options
document.addEventListener('DOMContentLoaded', function () {
    colorTextButton.addEventListener('click', function () {
        if (colorTextOptionSelect.style.display == 'none') {
            showColorOptions();
        } else {
            hideColorOptions();
        }
    });
});



function showColorOptions() {
    closeAllDependentBox();
    colorTextOptionSelect.style.display = 'flex';
}

function hideColorOptions() {
    colorTextOptionSelect.style.display = 'none';

}


document.addEventListener('DOMContentLoaded', function () {
    colorTextOptionSelect.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function (event) {
            let background = event.target.closest('.option').getAttribute('data-color');
            toggleSelectedTextTo('mark', background);
            clearSelection();
            tryHideTextFormattingBar();
        });
    });
});