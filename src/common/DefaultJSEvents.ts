/**
 * Enum representing the default JavaScript events for mouse, keyboard, and focus actions.
 * This enumeration provides standardized strings for attaching event listeners to DOM elements.
 * Use these enum values to ensure consistency and avoid typos in event names throughout your application.
 */
export enum DefaultJSEvents {
    Load =  "load",
    Mouseenter = "mouseenter",
    Mouseleave = "mouseleave",
    /** Event fired when the mouse button is pressed down. */
    Mousedown = "mousedown",
    /** Event fired when the mouse is moved over an element. */
    Mousemove = "mousemove",
    /** Event fired when the mouse button is released. */
    Mouseup = "mouseup",
    Mouseover = "mouseover",
    /** Event fired when a key is released on the keyboard. */
    Keyup = "keyup",
    /** Event fired when a key is pressed down on the keyboard. */
    Keydown = "keydown",
    /** Event fired when an element loses focus. */
    Blur = "blur",
    SelectStart = "selectstart",
    SelectionChange = "selectionchange",
    Click = "click",
    Focusin = "focusin",
    Focusout = "focusout",
    DOMContentLoaded = "DOMContentLoaded",
    Input = "input",
    BblClick = "dblclick"
}