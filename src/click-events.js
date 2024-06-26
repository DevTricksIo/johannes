// The start point for click events

import { executeCommand } from './command-factory';

// Block operations events
document.addEventListener('DOMContentLoaded', function () {
    if (johannesEditor) {
        document.querySelectorAll('.block-operation').forEach(option => {
            option.addEventListener('click', function () {
                const operation = this.getAttribute('data-block-operation');
                executeCommand(this, operation);
            });
        });
    }
});


// Text operations events
//CODE...