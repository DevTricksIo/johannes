// import Editor from "./Editor";
// import ElementNotFoundError from "../../errors/ElementNotFoundError";

import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { Editor } from "./Editor";
import { BlockOperationsService } from "@/services/block-operations/BlockOperationsService";


describe("Editor", () => {
    test("getInstance with success", () => {

        const elementFactory = ElementFactoryService.getInstance();
        const blockOperationsService = BlockOperationsService.getInstance();

        const editor = Editor.getInstance(elementFactory, blockOperationsService);

        expect(editor).toBeInstanceOf(Editor);
    });
});


// describe('EditorInitializer', () => {

//     beforeEach(() => {

//         sut = new Editor("editor", { enableFloatingToolbar: true});
//         document.body.innerHTML = '';
//     });

//     test('throws ElementNotFoundError if #johannesEditor is not found', () => {

//         document.getElementById = jest.fn().mockReturnValue(null);

//         expect(JohannesEditor.initialize).toThrow(ElementNotFoundError);

//     });

//     test('throws ElementNotFoundError if #johannesEditor is not found', () => {

//         document.getElementById = jest.fn().mockReturnValue(null);

//         expect(JohannesEditor.initialize).toThrow(ElementNotFoundError);

//     });
// });