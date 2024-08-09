import { QuickMenu } from "./QuickMenu";
import { QuickMenuSection } from "./QuickMenuSection"

describe("QuickMenuSection", () => {

    test("Create instance with success", () => {

        const quickMenu = QuickMenu.getInstance();

        const quickMenuSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: "a", classList: "a" });

        expect(quickMenuSection).toBeInstanceOf(QuickMenuSection);
    });
});