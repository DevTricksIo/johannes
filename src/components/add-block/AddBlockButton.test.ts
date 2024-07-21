import { UIBuilder } from "../../builders/UIBuilder";
import { Editor } from "../editor/Editor";

describe("AddBlockButton", () => {

    beforeEach(() => {
        // Setup the editor in the document body
        document.body.innerHTML = `
            <div id="johannesEditor">
                <div class="content">
                    <p class="editable">Initial paragraph</p>
                </div>
            </div>
        `;
        const editor = UIBuilder.build().start();
        expect(editor).toBeInstanceOf(Editor);
    });

    test("Add functionality", () => {

        let paragraphs = document.querySelectorAll("#johannesEditor .content p");
        expect(paragraphs.length).toBe(1);

        const addBlockButton = document.querySelector(".add-block") as HTMLButtonElement;

        addBlockButton.click();

        paragraphs = document.querySelectorAll("#johannesEditor .content p");
        expect(paragraphs.length).toBe(2);
    });
});
