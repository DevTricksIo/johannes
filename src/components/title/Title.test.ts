import { Title } from "./Title";

describe("Title", () => {
    
    test("Create title", () => {

        const title = Title.create(undefined);
        expect(title).toBeInstanceOf(Title);
    });

    //TODO: Add test to check Enter
});