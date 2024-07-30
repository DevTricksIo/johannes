import './assets/css/main.css';
import { UIBuilder } from './builders/UIBuilder';
import { CommandDispatcher } from './commands/CommandDispatcher';


/**
 * This script initializes the editor and sets up event listeners once the DOM content has fully loaded.
 * It is responsible for building the user interface and starting the event listening process to handle commands.
 *
 * The `DOMContentLoaded` event ensures that all the DOM content has been fully parsed and loaded before the initialization begins.
 * `UIBuilder.build().start();` is used to construct and activate the user interface.
 * `CommandDispatcher.getInstance().listen();` retrieves an instance of the CommandDispatcher and starts listening for events.
 */
document.addEventListener('DOMContentLoaded', function () {
    UIBuilder.build().start();
    CommandDispatcher.getInstance().listen();
});