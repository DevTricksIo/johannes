import { createNewDraggableParagraphElement } from './element-farm';

import { createNewLiElement } from './element-farm';
import { focusOnTheEndOfTheText } from './helper';
import { focusOnPrevious } from './helper';
import { focusOnNext } from './helper';

import "./list.css";

document.addEventListener('DOMContentLoaded', function () {

    const editor = document.querySelector('.johannes-editor');
    const blockSelection = document.querySelector('.johannes-editor .block-options-wrapper');

    if (editor) {
        editor.addEventListener('keydown', function (e) {

            if (e.key === 'Enter' && e.target.isContentEditable && e.target.closest('li') && !e.shiftKey && !e.ctrlKey && !e.altKey) {

                e.preventDefault();

                let newContentElement;

                if (e.target.innerText !== '') {

                    newContentElement = createNewLiElement();
                    const currentItem = e.target.closest('li');

                    if (currentItem) {
                        currentItem.insertAdjacentElement('afterend', newContentElement);
                    }
                } else {
                    let parent = e.target.closest('.draggable-block');

                    let aaa = createNewDraggableParagraphElement();
                    parent.insertAdjacentElement('afterend', aaa);

                    newContentElement = aaa.querySelector('.johannes-content-element');

                    let listParent = e.target.closest('ol, ul');
                    
                    if(listParent.querySelectorAll('li').length > 1){
                        e.target.remove();
                    }else{
                        parent.remove();
                    }
                }

                setTimeout(() => {
                    focusOnTheEndOfTheText(newContentElement);

                }, 0);

            } else if (e.key === 'Backspace' && e.target.isContentEditable && blockSelection.style.display == 'none' && e.target.closest('li') && !e.shiftKey && !e.ctrlKey && !e.altKey) {

                const activeElement = document.activeElement;

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    e.preventDefault();

                    focusOnPrevious(activeElement);

                    let parent = activeElement.closest('ol, ul');

                    let numberOfLi = parent.querySelectorAll('li').length;

                    if (numberOfLi <= 1) {

                        let block = parent.closest('.draggable-block');
                        block.remove();
                    } else {
                        activeElement.remove();
                    }
                }

            } else if (e.key === 'Delete' && e.target.isContentEditable && blockSelection.style.display == 'none' && e.target.closest('li') && !e.shiftKey && !e.ctrlKey && !e.altKey) {

                const activeElement = document.activeElement;

                const textContent = activeElement.textContent.trim();

                if (textContent === '') {

                    e.preventDefault();

                    focusOnNext(activeElement);

                    let parent = activeElement.closest('ol, ul');

                    let numberOfLi = parent.querySelectorAll('li').length;

                    if (numberOfLi <= 1) {

                        let block = parent.closest('.draggable-block');
                        block.remove();
                    } else {
                        activeElement.remove();
                    }

                }

            }
        });
    }
});