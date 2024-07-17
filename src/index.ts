// listen events in keyboard, mouse and document load
import './triggers/load-events.js';
import './triggers/keypress-events.js';
import './triggers/click-events.js';

import './block-operation.js';
import './drag-and-drop.js';
import './switch-block.js';
import './keyboard-navigation.js';
import './text-blocks-from-newlines.js';
import './memento.js';
import './images/icons.svg'

import Editor from './Editor';

export default Editor;

// default style
import './css/main.css';