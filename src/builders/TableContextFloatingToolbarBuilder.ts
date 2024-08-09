import { Commands } from "@/commands/Commands";
import { Colors } from "@/common/Colors";
import { Sizes } from "@/common/Sizes";
import { SVGIcon } from "@/components/common/SVGIcon";
import { ColorIcon } from "@/components/floating-toolbar/dropdown-tool/ColorIcon";
import { DropdownMenu } from "@/components/floating-toolbar/dropdown-tool/DropdownMenu";
import { DropdownMenuButton } from "@/components/floating-toolbar/dropdown-tool/DropdownMenuButton";
import { DropdownMenuList } from "@/components/floating-toolbar/dropdown-tool/DropdownMenuList";
import { DropdownMenuListItem } from "@/components/floating-toolbar/dropdown-tool/DropdownMenuListItem";
import { DropdownMenuListItemTitle } from "@/components/floating-toolbar/dropdown-tool/DropdownMenuListItemTitle";
import { FloatingToolbarSeparator } from "@/components/floating-toolbar/separator/FloatingToolbarSeparator";
import { TableContextFloatingToolbar } from "@/components/floating-toolbar/TableContextFloatingToolbar";
import { DependencyContainer } from "@/core/DependencyContainer";
import { ElementFactoryService } from "@/services/element-factory/ElementFactoryService";
import { ITableOperationsService } from "@/services/table-operations/ITableOperationsService";
import { Icons } from "@/common/Icons";

export class TableContextFloatingToolbarBuilder {

    static build(): TableContextFloatingToolbar {

        const tableOperationService = DependencyContainer.Instance.resolve<ITableOperationsService>("ITableOperationsService");

        const tableToolbar = TableContextFloatingToolbar.getInstance();

        tableToolbar.appendDropdown(TableContextFloatingToolbarBuilder.tableOptions(tableOperationService));
        tableToolbar.appendSeparator(TableContextFloatingToolbarBuilder.separator("tableOperationsSeparator"));
        tableToolbar.appendDropdown(TableContextFloatingToolbarBuilder.tableColorDropdown());


        return tableToolbar;
    }

    static tableOptions(tableOperationsService: ITableOperationsService): DropdownMenu {

        const turnIntoBarList = new DropdownMenuList("tableOptionsSelect");
        const turnIntoBarButton = new DropdownMenuButton("tableOptions", "Options", turnIntoBarList);
        const turnIntoDropdown = new DropdownMenu("tableOptionsMenu", turnIntoBarButton, turnIntoBarList);

        turnIntoBarList.append(new DropdownMenuListItemTitle(turnIntoBarList, "Insert Column"));

        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionText", turnIntoBarList, Commands.insertTableColumnLeft, ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, SVGIcon.create(Icons.ColumnLeft, Sizes.medium).htmlElement, "Left"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionText", turnIntoBarList, Commands.insertTableColumnRight, ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, SVGIcon.create(Icons.ColumnRight, Sizes.medium).htmlElement, "Right"));

        turnIntoBarList.append(new DropdownMenuListItemTitle(turnIntoBarList, "Insert Row"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionTodoList", turnIntoBarList, Commands.insertTableRowAbove, ElementFactoryService.ELEMENT_TYPES.CHECK_LIST, SVGIcon.create(Icons.RowAbove, Sizes.medium).htmlElement, "Above"));
        turnIntoBarList.append(new DropdownMenuListItem("turnIntoOptionTodoList", turnIntoBarList, Commands.insertTableRowBelow, ElementFactoryService.ELEMENT_TYPES.CHECK_LIST, SVGIcon.create(Icons.RowBelow, Sizes.medium).htmlElement, "Below"));


        turnIntoBarList.append(new DropdownMenuListItemTitle(turnIntoBarList, "Remove"));

        const deleteColumnItem = new DropdownMenuListItem("turnIntoOptionText", turnIntoBarList, Commands.removeColumn, ElementFactoryService.ELEMENT_TYPES.PARAGRAPH, SVGIcon.create(Icons.deleteSweep, Sizes.medium).htmlElement, "Column");
        deleteColumnItem.addCssClass("danger-option");
        // deleteColumnItem.attachOnFocus(tableOperationsService.emitChangeTableBorderColorEvent, TableScopes.Column, Colors.Tomato);
        // deleteColumnItem.attachOnLoseFocus(tableOperationsService.emitChangeTableBorderColorEvent, TableScopes.Column, Colors.OriginalTableColor);

        turnIntoBarList.append(deleteColumnItem);
        
        
        const deleteRowItem = new DropdownMenuListItem("turnIntoOptionTodoList", turnIntoBarList, Commands.removeRow, ElementFactoryService.ELEMENT_TYPES.CHECK_LIST, SVGIcon.create(Icons.deleteSweep, Sizes.medium).htmlElement, "Row");
        deleteRowItem.addCssClass("danger-option");
        
        // deleteRowItem.attachOnFocus(tableOperationsService.emitChangeTableBorderColorEvent, TableScopes.Row, Colors.Tomato);
        // deleteRowItem.attachOnLoseFocus(tableOperationsService.emitChangeTableBorderColorEvent, TableScopes.Row, Colors.OriginalTableColor);

        turnIntoBarList.append(deleteRowItem);


        return turnIntoDropdown;
    }

    static tableColorDropdown(): DropdownMenu {

        const colorDropdownList = new DropdownMenuList("colorTableOptionSelect");
        const colorButton = new DropdownMenuButton("colorTableButton", new ColorIcon("#FAF4D1").htmlElement, colorDropdownList);
        const colorDropdown = new DropdownMenu("tableColorOptionsMenu", colorButton, colorDropdownList);

        colorDropdownList.append(new DropdownMenuListItemTitle(colorDropdownList, "Background"));


        const cellBackgroundColorRed = new DropdownMenuListItem("backgroundOptionRed", colorDropdownList, Commands.toggleCellHiliteColor, Colors.HiliteColorRed, new ColorIcon(Colors.HiliteColorRed).htmlElement, "Red");
        cellBackgroundColorRed.addClass("backgroundColor");
        
        const cellBackgroundColorGreen = new DropdownMenuListItem("backgroundOptionGreen", colorDropdownList, Commands.toggleCellHiliteColor, Colors.HiliteColorGreen, new ColorIcon(Colors.HiliteColorGreen).htmlElement, "Green");
        cellBackgroundColorGreen.addClass("backgroundColor");
        
        
        const cellBackgroundColorBlue = new DropdownMenuListItem("backgroundOptionBlue", colorDropdownList, Commands.toggleCellHiliteColor, Colors.HiliteColorBlue, new ColorIcon(Colors.HiliteColorBlue).htmlElement, "Blue");
        cellBackgroundColorBlue.addClass("backgroundColor");
        
        
        const cellBackgroundColorYellow = new DropdownMenuListItem("backgroundOptionYellow", colorDropdownList, Commands.toggleCellHiliteColor, Colors.HiliteColorYellow, new ColorIcon(Colors.HiliteColorYellow).htmlElement, "Yellow");
        cellBackgroundColorYellow.addClass("backgroundColor");
        
        
        const cellBackgroundColorGrey = new DropdownMenuListItem("backgroundOptionGrey", colorDropdownList, Commands.toggleCellHiliteColor, Colors.HiliteColorGrey, new ColorIcon(Colors.HiliteColorGrey).htmlElement, "Grey");
        cellBackgroundColorGrey.addClass("backgroundColor");
        
        
        const cellBackgroundColorNone = new DropdownMenuListItem("backgroundOptionNone", colorDropdownList, Commands.toggleCellHiliteColor, Colors.HiliteColorNone, new ColorIcon(Colors.HiliteColorNone).htmlElement, "None");
        cellBackgroundColorNone.addClass("backgroundColor");

        colorDropdownList.append(cellBackgroundColorRed);
        colorDropdownList.append(cellBackgroundColorGreen);
        colorDropdownList.append(cellBackgroundColorBlue);
        colorDropdownList.append(cellBackgroundColorYellow);
        colorDropdownList.append(cellBackgroundColorGrey);
        colorDropdownList.append(cellBackgroundColorNone);

        return colorDropdown;
    }

    static separator(id: string): FloatingToolbarSeparator {
        return new FloatingToolbarSeparator(id);
    }
}