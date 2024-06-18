import { createNewLiElement } from './element-farm';
import { createNewDraggableParagraphElement } from './element-farm';
import { focusOnTheEndOfTheText } from './helper';
import "./list.css";


document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && e.target.isContentEditable && e.target.closest('li')) {

            e.preventDefault();

            let newContentElement;

            if (e.target.innerText !== '') {
                newContentElement = createNewLiElement();
                const currentItem = e.target.closest('li');

                if (currentItem) {
                    // Insere o novo elemento LI logo após o elemento LI atual
                    currentItem.insertAdjacentElement('afterend', newContentElement);
                }
            } else {
                let parent = e.target.closest('.draggable-block');

                let aaa = createNewDraggableParagraphElement();
                parent.insertAdjacentElement('afterend', aaa);

                newContentElement = aaa.querySelector('.johannes-content-element');
                e.target.remove();


            }



            // const list = e.target.closest('ol, ul');

            // if (list) {
            //     list.appendChild(newListItem);
            // }

            setTimeout(() => {
                focusOnTheEndOfTheText(newContentElement);

            }, 0);
        }
    });
});


document.addEventListener('DOMContentLoaded', (event) => {
    const content = document.querySelector('.johannes-editor > .content');
    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');

    content.addEventListener('keydown', function (event) {
        if (event.key === 'Backspace' && blockSelection.style.display == 'none' && event.target.closest('li')) {

            const activeElement = document.activeElement;

            if (activeElement.isContentEditable) {

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    event.preventDefault();

                    // let parent = activeElement.closest('ol, ul');

                    let previous = activeElement.previousElementSibling;

                    if (previous) {
                        activeElement.remove();
                        focusOnTheEndOfTheText(previous);
                    } else {
                        let list = activeElement.closest('ol, ul');
                        let parentBlock = list.closest('.draggable-block');


                        if (list.childNodes.length <= 1) {
                            list.remove();
                        } else {

                            let block = activeElement.closest('.draggable-block');
                            activeElement.remove();

                            blo

                            focusOnTheEndOfTheText(block);
                        }
                    }




                    // activeElement.remove();
                    // let lastChild = parent.lastChild;

                    // if (lastChild) {
                    //     // lastChild.focus();
                    //     focusOnTheEndOfTheText(lastChild);
                    // } else {

                    //     // let anotherParent = parent.closest();

                    //     // parent.remove();
                    // }


                    // let actualDraggableBlock = activeElement.closest('.draggable-block');

                    // let previousDraggableBlockSibling = actualDraggableBlock.previousElementSibling;

                    // actualDraggableBlock.remove();

                    // let previousSiblingContentElement = previousDraggableBlockSibling.querySelector('.johannes-content-element');

                    // previousSiblingContentElement.focus();

                    // let range = document.createRange();
                    // let selection = window.getSelection();
                    // range.selectNodeContents(previousSiblingContentElement);
                    // range.collapse(false);
                    // selection.removeAllRanges();
                    // selection.addRange(range);
                }
            }
        }
    });
});