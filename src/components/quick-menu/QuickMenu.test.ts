import { QuickMenu } from "./QuickMenu"

describe("QuickMenu", () => {

    test("Create a new QuickMenu with success", () => {
        const quickMenu = QuickMenu.getInstance();

        expect(quickMenu).toBeInstanceOf(QuickMenu);
    });
});