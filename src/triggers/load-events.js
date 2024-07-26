//TODO use commands
import { BlockOperationsService } from '../services/block-operations/BlockOperationsService';
import { ElementFactoryService } from '../services/element-factory/ElementFactoryService';
import { QuickMenuBuilder } from "../builders/QuickMenuBuilder";
import { FloatingToolbarBuilder } from "../builders/FloatingToolbarBuilder";
import { AddBlock } from "../components/add-block/AddBlock";
import iconsSVG from '../assets/img/icons.svg';

import { UIBuilder } from "../builders/UIBuilder";


//Focus on P when load
document.addEventListener('DOMContentLoaded', function () {
    const editor = document.querySelector('.johannes-editor');

    if (editor) {
        let blocks = editor.querySelectorAll('.block');

        if (blocks.length == 1) {

            const p = blocks[0].querySelector('.johannes-content-element');
            if (p.innerText == '') {
                p.focus();
            }
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    UIBuilder.build().start();
});


document.addEventListener('DOMContentLoaded', function () {
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = iconsSVG;

    svgContainer.className = 'svg-icons-container';

    document.body.appendChild(svgContainer);
});