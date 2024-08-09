import { QuickMenu } from "./QuickMenu";
import { QuickMenuItem } from "./QuickMenuItem"
import { QuickMenuSection } from "./QuickMenuSection";

describe("QuickMenuItem", () => {

    test("Create QuickMenuItem with success", () => {

        const quickMenu = QuickMenu.getInstance();
        const quickMenuSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: "", classList: "a" });

        const quickMenuItem = new QuickMenuItem(quickMenuSection, "a", "b", "c", "d", "e");

        expect(quickMenuItem).toBeInstanceOf(QuickMenuItem);
    });
});