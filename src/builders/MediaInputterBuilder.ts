import { MediaInputter } from "@/components/media-inputter/MediaInputter";

export class MediaInputterBuilder {
    static build(): MediaInputter {

        const mediaInputter = new MediaInputter();

        return mediaInputter;
    }
}