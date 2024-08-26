import { Editor } from "@/components/editor/Editor";
import { AddBlockBuilder } from "./AddBlockBuilder";
import { TextContextFloatingToolbarBuilder } from "./TextContextFloatingToolbarBuilder";
import { QuickMenuBuilder } from "./QuickMenuBuilder";
import { TitleBuilder } from "./TitleBuilder";
import { ContentBuilder } from "./ContentBuilder";
import { TableContextFloatingToolbarBuilder } from "./TableContextFloatingToolbarBuilder";
import { MediaInputterBuilder } from "./MediaInputterBuilder";

export class EditorBuilder {

    static build(): Editor {

        const editor = Editor.getInstance(
            TitleBuilder.build(),
            ContentBuilder.build(),
            AddBlockBuilder.build(),
            TextContextFloatingToolbarBuilder.build(),
            QuickMenuBuilder.build(),
            TableContextFloatingToolbarBuilder.build(),
            MediaInputterBuilder.build()
        );

        return editor;
    }
}