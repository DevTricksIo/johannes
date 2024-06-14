let uniqueIdCounter = 0;


document.addEventListener('DOMContentLoaded', function () {

    //Text selection

    //end text selection
    

    // Drag element
    const content = document.querySelector('.content');
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
                draggedItem.style.display = 'block';
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
    // End drag element


    // New paragraph when find a \n
    document.addEventListener('DOMContentLoaded', () => {

        const content = document.querySelector('.content');

        content.addEventListener('input', function (event) {
            const target = event.target;
            if (target.tagName === 'P' && target.isContentEditable) {
                const lines = target.innerText.split('\n');
                if (lines.length > 1) {
                    event.preventDefault(); // Prevent insert directly
                    // Remove original text to avoid duplication
                    target.innerText = lines[0]; // Keep the first actual line paragraph 

                    let currentTarget = target;
                    // Each new line, create a new P below the actual
                    for (let i = 1; i < lines.length; i++) {

                        const newParagraph = createNewDraggableParagraphElement();

                        //works?  I dont't know
                        newParagraph.innerText = lines[i];
                        currentTarget.insertAdjacentElement('afterend', newParagraph);
                        currentTarget = newParagraph;
                    }

                    currentTarget.focus();
                }
            }
        });
    });
    // End new paragraph when find a \n


    // Creates a new P when hit Enter
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.isContentEditable) {
            e.preventDefault();

            const newP = createNewDraggableParagraphElement();

            const draggableBlock = e.target.closest('.draggable-block');

            if (draggableBlock) {
                if (draggableBlock.nextSibling) {
                    draggableBlock.parentNode.insertBefore(newP, draggableBlock.nextSibling);
                } else {
                    draggableBlock.parentNode.appendChild(newP);
                }
            }

            setTimeout(() => {

                let focusable = newP.querySelector('.dt-content-element');

                if (focusable) {
                    focusable.focus();
                }
            }, 0);
        }
    });
    // End create a new p when hit Enter


    // Remove the block when hit backspace
    document.addEventListener('DOMContentLoaded', (event) => {
        const content = document.querySelector('.content');

        content.addEventListener('keydown', function (event) {
            if (event.key === 'Backspace') {
                const activeElement = document.activeElement;
                if (activeElement.tagName !== 'H1' && activeElement.isContentEditable) {
                    const placeholder = activeElement.getAttribute('data-placeholder');
                    const textContent = activeElement.textContent.trim();

                    if (textContent === '' || textContent === placeholder) {
                        event.preventDefault();

                        let sibling = activeElement.closest('.draggable-block').previousElementSibling;
                        activeElement.remove();

                        let focusableElement = sibling.querySelector('.dt-content-element');

                        focusableElement.focus();

                        let range = document.createRange();
                        let selection = window.getSelection();
                        range.selectNodeContents(focusableElement);
                        range.collapse(false);
                        selection.removeAllRanges();
                        selection.addRange(range);

                    }
                }
            }
        });
    });
    // End remove the block when hit backspace


    document.addEventListener('DOMContentLoaded', (event) => {
        const content = document.querySelector('.content');

        content.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                document.querySelector('.block-options').style.display = 'none';
            }
        });
    });


    // Remove pest text style
    document.addEventListener('DOMContentLoaded', function () {
        
        document.body.addEventListener('paste', function (e) {
            if (e.target.getAttribute('contenteditable') === 'true') {
                e.preventDefault();
                const text = (e.clipboardData || window.clipboardData).getData('text/plain');
                document.execCommand('insertText', false, text);  // Inset text without style
            }
        });
    });
    // End remove pest text style



    // Create a new block when clicked add
    document.querySelector('.add-block').addEventListener('click', function () {
        let newElement = createNewDraggableParagraphElement();
        document.querySelector('.johannes-editor > .content').appendChild(newElement);
    });
    // End create a new block when clicked add




    function createNewDraggableParagraphElement() {

        let newDiv = document.createElement('div');
        let newElement = createNewParagraphElement();

        let newButton = document.createElement('button');
        newButton.innerHTML = '☰';

        newDiv.appendChild(newButton);
        newDiv.appendChild(newElement);

        newDiv.classList.add('draggable-block');
        newButton.classList.add('drag-handler');
        newButton.classList.add('btn');
        newButton.draggable = true;

        return newDiv;
    }

    function createNewParagraphElement() {

        let newElement = document.createElement('p');
        newElement.classList.add('dt-content-element');

        newElement.contentEditable = true;

        newElement.setAttribute('data-placeholder', 'Write something or type / (slash) to choose a block...');

        return newElement;
    }

    function createNewH2Element() {

        let newElement = document.createElement('h2');
        newElement.classList.add('dt-content-element');

        newElement.contentEditable = true;

        newElement.setAttribute('data-placeholder', 'Heading 2');

        return newElement;
    }



    document.addEventListener('DOMContentLoaded', () => {
        const editor = document.querySelector('.editor');
        let currentBlock = null;

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
                        currentBlock = target.closest('.draggable-block');

                        // Take the element cursor position
                        const cursorPos = range.getBoundingClientRect();
                        const blockOptions = document.querySelector('.block-options');

                        // Set menu position and show the block selector
                        blockOptions.style.left = `${cursorPos.left}px`;
                        blockOptions.style.top = `${cursorPos.bottom + window.scrollY}px`; // The scroll
                        blockOptions.style.display = 'block';
                    }


                }, 0);
            }
        });


        // Added listeners in options
        document.querySelectorAll('.block-options .option').forEach(option => {
            option.addEventListener('click', function () {
                const type = this.getAttribute('data-type');
                if (currentBlock) {
                    transformBlock(currentBlock, type);
                }
                document.querySelector('.block-options').style.display = 'none';
            });
        });
    });


    function transformBlock(blockElement, type) {

        let contentElement = blockElement.querySelector('.dt-content-element');
        let content = contentElement.innerText;

        if (content.endsWith('/')) {
            content = content.slice(0, -1); // Remove the last '/'
        }

        let newBlock;

        switch (type) {
            case 'p':
                newBlock = createNewParagraphElement();
                newBlock.innerText = content;
                break;
            case 'h2':
                newBlock = createNewH2Element();
                newBlock.innerText = content;
                break;
            case 'code':
                newBlock = document.createElement('pre');
                const code = document.createElement('code');
                code.innerText = content;
                newBlock.appendChild(code);
                break;
            case 'image':
                newBlock = document.createElement('img');
                newBlock.src = content;
                newBlock.alt = "Descriptive text";
                break;
            case 'quote':
                newBlock = document.createElement('blockquote');
                newBlock.innerText = content;
                break;
            case 'list':
                newBlock = document.createElement('ul');
                const items = content.split('\n');
                items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.innerText = item;
                    newBlock.appendChild(listItem);
                });
                break;
            default:
                console.error('Unsupported type');
                return;
        }


        blockElement.replaceChild(newBlock, contentElement);
        newBlock.focus();
    }


});//End DomContentLoaded