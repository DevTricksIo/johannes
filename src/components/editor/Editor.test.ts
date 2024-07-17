// import Editor from "./Editor";
// import ElementNotFoundError from "../../errors/ElementNotFoundError";

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