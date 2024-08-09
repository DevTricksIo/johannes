import { Content } from "@/components/content/Content";

export class ContentBuilder {
    static build(): Content {
        return Content.getInstance();
    }
}