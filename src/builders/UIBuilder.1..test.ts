import { UIBuilder } from "./UIBuilder";

describe("UIBuilder with johannesEditor element", () => {

    const editor = createElement();
    document.body.appendChild(editor);

    const builder = UIBuilder.build();
    builder.start();

    test('floatingToolbar not start ', () => {

        const floatingToolbar = document.getElementById("floatingToolbar");

        expect(floatingToolbar).toBeTruthy();
    });

    test('Checking quickMenu', () => {

        const quickMenu = document.getElementById("quickMenu");
        expect(quickMenu).toBeTruthy();
    });
});


function createElement(): Node {

    const htmlElement = document.createElement("div");
    htmlElement.id = "johannesEditor";

    return htmlElement;
}