import {createNewDraggableParagraphElement} from './element-farm';

import './add-block.css';

document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.add-block').addEventListener('click', function () {
        const newElement = createNewDraggableParagraphElement();
        document.querySelector('.johannes-editor > .content').appendChild(newElement);

        const newContentElement = newElement.querySelector('.johannes-content-element');
        newContentElement.focus();
    });
});