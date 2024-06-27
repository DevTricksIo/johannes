// The start point for click events

import { createCommand } from './command-factory';

// Block operations events
document.addEventListener('DOMContentLoaded', function () {
    if (johannesEditor) {
        document.querySelectorAll('.block-operation').forEach(option => {
            option.addEventListener('click', function () {

                const operation = this.getAttribute('data-block-operation');

                const command = createCommand(operation);

                command.execute();

            });
        });
    }
});


// Text operations events
//CODE...