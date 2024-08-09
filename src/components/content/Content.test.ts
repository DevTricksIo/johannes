
import { Content } from "./Content";

describe("Content", () => {
    test("Create element", () => {
        const content = Content.getInstance();

        expect(content).toBeInstanceOf(Content);
    });
});