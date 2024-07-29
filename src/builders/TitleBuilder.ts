import { Title } from "@/components/title/Title";

export class TitleBuilder {
    static build(): Title {
        return Title.create(window.editorConfig?.title)
    }
}