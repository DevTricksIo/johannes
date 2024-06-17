import * as farm from './element-farm.js';
import './switch-block.css';
import { focusOnTheEndOfTheText } from './helper.js';


function showBlockOptions(x, y) {

    const blockOptionsWrapper = document.querySelector('.block-options-wrapper');

    blockOptionsWrapper.style.display = 'block';
    blockOptionsWrapper.style.left = `${x}px`;
    blockOptionsWrapper.style.top = `${y}px`;

    blockOptionsWrapper.focus();

    const firstOption = blockOptionsWrapper.querySelector('.option');
    if (firstOption) {
        firstOption.focus();
    }
}




//Show oo
document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.johannes-editor > .content');

    content.addEventListener('contextmenu', function (event) {
        if (event.target.classList.contains('drag-handler')) {
            event.preventDefault();

            showBlockOptions(event.pageX, event.pageY);

            return false;
        }
    });
});



//Close the options wrapper
document.addEventListener('DOMContentLoaded', (event) => {
    const editor = document.querySelector('.johannes-editor');

    editor.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            document.querySelector('.block-options-wrapper').style.display = 'none';
        }
    });

    // Adicionando o evento de mouse para fechar ao clicar fora
    document.addEventListener('mousedown', function (event) {
        const optionsWrapper = document.querySelector('.block-options-wrapper');

        if (optionsWrapper) {
            const isClickInsideOptions = optionsWrapper.contains(event.target);
            const mainMouseButton = event.button === 0;

            if (!isClickInsideOptions && mainMouseButton) {
                optionsWrapper.style.display = 'none';
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {

    const editor = document.querySelector('.johannes-editor');
    const blockOptions = document.querySelector('.johannes-editor > .block-options-wrapper');

    let triggerElement = null;
    let currentDraggableBlock = null;

    let currentFocusedOption = null;


    editor.addEventListener('keydown', function (event) {
        if (event.key === '/') {

            setTimeout(() => {

                const range = window.getSelection().rangeCount > 0 ? window.getSelection().getRangeAt(0) : null;

                if (!range) {

                    alert('Erro fatal!!!');
                }

                const target = event.target;
                if (target.closest('.draggable-block')) {
                    event.preventDefault(); // Avoid / be inserted
                    currentDraggableBlock = target.closest('.draggable-block');
                    triggerElement = target;

                    // Take the element cursor position
                    const cursorPos = range.getBoundingClientRect();

                    showBlockOptions(cursorPos.left, cursorPos.bottom + window.scrollY);

                    let firstOption = blockOptions.querySelector('.option');
                    currentFocusedOption = firstOption;

                    currentFocusedOption.focus();
                    currentFocusedOption.classList.add('block-options-focused');
                    triggerElement.focus();
                }


            }, 0);
        } else if (event.key === 'Escape'
            // && document.activeElement === blockOptions
        ) {
            event.preventDefault();
            if (triggerElement) {
                triggerElement.focus();

                currentFocusedOption.classList.remove('block-options-focused');
            }
        } else if (event.key === 'Enter' && blockOptions.style.display !== 'none') {

            event.preventDefault();

            // let option = document.activeElement.closest('.option');
            currentFocusedOption.classList.remove('block-options-focused');
            let option = currentFocusedOption;

            if (option) {
                const asasas = triggerElement.closest('.draggable-block');
                const blockType = option.getAttribute('data-type');
                transformBlock(asasas, blockType);

            }

        } else if (event.key === 'ArrowDown' && blockOptions.style.display !== 'none') {
            event.preventDefault();
            currentFocusedOption = moveToNextOption(currentFocusedOption, triggerElement);

        } else if (event.key === 'ArrowUp' && blockOptions.style.display !== 'none') {
            event.preventDefault();
            currentFocusedOption = moveToPreviousOption(currentFocusedOption, triggerElement);
        }
    });


    // Added listeners in options
    document.querySelectorAll('.block-options .option').forEach(option => {
        option.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            if (currentDraggableBlock) {
                transformBlock(currentDraggableBlock, type);
            }
        });
    });
});


function transformBlock(blockElement, type) {

    let contentElement = blockElement.querySelector('.johannes-content-element');
    let content = contentElement.innerText;

    if (content.endsWith('/')) {
        content = content.slice(0, -1); // Remove the last '/'
    }

    let newContentBlock;

    switch (type) {
        case 'p':
            newContentBlock = farm.createNewParagraphElement();
            newContentBlock.innerText = content;
            break;
        case 'h1':
            newContentBlock = farm.createNewHeadingElement(1);
            newContentBlock.innerText = content;
            break;
        case 'h2':
            newContentBlock = farm.createNewHeadingElement(2);
            newContentBlock.innerText = content;
            break;
        case 'h3':
            newContentBlock = farm.createNewHeadingElement(3);
            newContentBlock.innerText = content;
            break;
        case 'h4':
            newContentBlock = farm.createNewHeadingElement(4);
            newContentBlock.innerText = content;
            break;
        case 'h5':
            newContentBlock = farm.createNewHeadingElement(5);
            newContentBlock.innerText = content;
            break;
        case 'h6':
            newContentBlock = farm.createNewHeadingElement(6);
            newContentBlock.innerText = content;
            break;
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
            newContentBlock = document.createElement('blockquote');
            newContentBlock.innerText = content;
            break;
        case 'list':
            newContentBlock = document.createElement('ul');
            const items = content.split('\n');
            items.forEach(item => {
                const listItem = document.createElement('li');
                listItem.innerText = item;
                newContentBlock.appendChild(listItem);
            });
            break;
        default:
            console.error('Unsupported type');
            return;
    }

    blockElement.replaceChild(newContentBlock, contentElement);

    focusOnTheEndOfTheText(newContentBlock);

    document.querySelector('.block-options-wrapper').style.display = 'none';
}


function moveToNextOption(current, keepFocused) {

    let next = current.nextElementSibling;

    if (!(next && next.classList.contains('option'))) {

        let currentSection = current.closest('section');
        let siblingSection = currentSection.nextElementSibling;

        if (siblingSection) {
            next = siblingSection.querySelector('.option');
        } else {
            next = document.querySelector('.block-options-wrapper .option');
        }

    }

    next.focus();
    current.classList.remove('block-options-focused');
    next.classList.add('block-options-focused');

    keepFocused.focus();

    return next;
}

function moveToPreviousOption(current, keepFocused) {

    let previous = current.previousElementSibling;

    if (!(previous && previous.classList.contains('option'))) {

        let currentSection = current.closest('section');
        let siblingSection = currentSection.previousElementSibling;

        if (siblingSection) {
            let options = siblingSection.querySelectorAll('.option');
            previous = options[options.length - 1];
        } else {
            let options = document.querySelectorAll('.block-options-wrapper .option');
            previous = options[options.length - 1];
        }
    }

    previous.focus();
    current.classList.remove('block-options-focused');
    previous.classList.add('block-options-focused');

    keepFocused.focus();

    return previous;
}