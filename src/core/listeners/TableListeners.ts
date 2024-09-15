import { ICommandEventDetail } from "@/commands/ICommandEventDetail";
import { ITableListeners } from "./ITableListeners";
import { CustomEvents } from "@/common/CustomEvents";
import { Commands } from "@/commands/Commands";
import { IFocusStack } from "../IFocusStack";
import { DependencyContainer } from "../DependencyContainer";

export class TableListeners implements ITableListeners {

    private static instance: TableListeners | null = null;

    focusStack: IFocusStack;

    shownElements = new Map<HTMLTableCellElement, HTMLElement>();

    private constructor(
        focusStack: IFocusStack) {

        if (TableListeners.instance) {
            throw new Error("Use TableEventListeners.getInstance() to get instance.");
        }

        this.focusStack = focusStack;

        this.listen();
    }

    startListen(): void {
        console.log("listening table clicks");
    }

    static getInstance(): TableListeners {

        const focusStack = DependencyContainer.Instance.resolve<IFocusStack>("IFocusStack");
        if (TableListeners.instance) {
            return TableListeners.instance;
        }

        return new TableListeners(focusStack);
    }

    private listen() {

        document.addEventListener("click", (event) => {
            let parent: Element | null = null;

            if ((event.target as Node).nodeType == Node.TEXT_NODE) {
                parent = (event.target as Node).parentElement;
            } else {
                parent = (event.target as Element);
            }

            if (parent?.closest(".add-table-column")) {

                const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.insertTableColumnRight,
                        block: parent.closest(".block") as HTMLElement
                    }
                });

                document.dispatchEvent(customEvent);
            }

            if (parent?.closest(".add-table-row")) {
                const customEvent = new CustomEvent<ICommandEventDetail>(CustomEvents.emittedCommand, {
                    detail: {
                        command: Commands.insertTableRowBelow,
                        block: parent.closest(".block") as HTMLElement
                    }
                });

                document.dispatchEvent(customEvent);
            }
        });
    }
}