import { ServiceProvider } from "../../services/service-provider/ServiceProvider";
import { QuickMenu } from "./QuickMenu";
import { QuickMenuItem } from "./QuickMenuItem"
import { QuickMenuSection } from "./QuickMenuSection";
import { TextOperationService } from "../../services/text-operations/TextOperationService";
import { ElementFactoryService } from "../../services/element-factory/ElementFactoryService";
import { BlockOperationsService } from "../../services/block-operations/BlockOperationsService";

describe("QuickMenuItem", () => {

    ServiceProvider.getInstance().registerService("ITextOperationService", TextOperationService.getInstance());
    ServiceProvider.getInstance().registerService("IBlockOperationsService", BlockOperationsService.getInstance());
    ServiceProvider.getInstance().registerService("IElementFactoryService", ElementFactoryService.getInstance());

    test("Create QuickMenuItem with success", () => {

        const quickMenu = QuickMenu.getInstance();
        const quickMenuSection = new QuickMenuSection({ quickMenuInstance: quickMenu, title: "", classList: "a" });

        const quickMenuItem = new QuickMenuItem(quickMenuSection, "a", "b", "c", "d", "e");

        expect(quickMenuItem).toBeInstanceOf(QuickMenuItem);
    });
});
