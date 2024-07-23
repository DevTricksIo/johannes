import { Editor } from "../components/editor/Editor";
import { UIBuilder } from "./UIBuilder";

describe('UIBuilder empty page', () => {

    let builder: UIBuilder;

    beforeEach(() => {
        builder = UIBuilder.build();
    });

    test('Instantiate a Builder', () => {

        let result = UIBuilder.build();

        expect(result).toBeInstanceOf(UIBuilder);
    });

    test('Start the Editor UI in an empty page does not throw any error', () => {

        expect(() => builder.start()).not.toThrow();
    });

    test('Start the Editor UI in an empty page', () => {

        const builder = UIBuilder.build();

        let result = builder.start();

        expect(result).toBeInstanceOf(Editor);
    });

    test('floatingToolbar not start ', () => {

        const builder = UIBuilder.build();

        let result = builder.start();

        expect(result).toBeInstanceOf(Editor);

        const floatingToolbar = document.getElementById("floatingToolbar");

        expect(floatingToolbar).toBeFalsy();
    });


    test('Checking quickMenu', () => {

        const builder = UIBuilder.build();

        let result = builder.start();

        expect(result).toBeInstanceOf(Editor);

        const quickMenu = document.getElementById("quickMenu");

        expect(quickMenu).toBeFalsy();
    });
});