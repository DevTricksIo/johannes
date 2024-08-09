import { Editor } from "../components/editor/Editor";
import icons from "../assets/img/icons.svg";
import { EditorBuilder } from "./EditorBuilder";

/**
 * Singleton class responsible for building and managing the user interface of the editor.
 * Ensures that only one instance of UIBuilder can exist, managing the creation and configuration of the editor.
 */
export class UIBuilder {

    private static instance: UIBuilder;

    private editor: Editor;

    /**
     * Private constructor for UIBuilder to enforce singleton pattern.
     * Initializes the UIBuilder instance with a given editor.
     * @param {Editor} editor The editor instance to be managed by UIBuilder.
     * @throws {Error} Throws an error if an instance of UIBuilder already exists.
     */
    private constructor(editor: Editor) {

        if (UIBuilder.instance) {
            throw new Error();
        }

        this.editor = editor;

        UIBuilder.instance = this;
    }

    /**
     * Static method to get or create an instance of UIBuilder.
     * This method implements the singleton pattern and ensures that UIBuilder is only instantiated once.
     * @returns {UIBuilder} Returns the existing or new UIBuilder instance.
     */
    static build(): UIBuilder {

        if (UIBuilder.instance) {
            return UIBuilder.instance;
        }

        const builder = new UIBuilder(EditorBuilder.build());

        return builder;
    }

    /**
     * Initializes the editor by inserting necessary icons and returning the editor instance.
     * This method should be called to start the editor and prepare all UI components.
     * @returns {Editor} The initialized editor instance.
     */
    start(): Editor {

        this.insertIcons();

        return this.editor;
    }

    /**
    * Inserts a container with SVG icons into the document body. This method ensures that
    * the icons are only inserted once to prevent duplicate entries.
    */
    insertIcons(): void {
        if (!document.querySelector('.svg-icons-container')) {
            const svgContainer = document.createElement('div');

            svgContainer.innerHTML = icons;
            svgContainer.className = 'svg-icons-container';

            document.body.appendChild(svgContainer);
        }
    }
}