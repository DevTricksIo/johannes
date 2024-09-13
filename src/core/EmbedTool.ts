import { CommonClasses } from "@/common/CommonClasses";
import { ToolboxOptions } from "../components/block-toolbox/ToolboxOptions";

export class EmbedTool {

    static async embedImage(urlObj: string, lastFocusedElement: HTMLElement) {
        const url = new URL(urlObj);

        if (!await EmbedTool.validateImage(url.toString())) {
            throw new Error("invalid image")
        }

        const container = this.createEmbedContainer();

        // container.classList.add("x-resizable");
        container.style.maxWidth = "100%";
        container.style.width = 'fit-content';
        container.style.height = 'auto';
        container.style.display = "table-caption"

        const image = document.createElement('img');

        image.src = url.toString();
        image.alt = '';

        container.prepend(image);
        container.classList.add(ToolboxOptions.AlignToolClass);
        EmbedTool.finalizeEmbed(container, [ToolboxOptions.AlignToolClass, "fit-content"], lastFocusedElement);
    }

    static validateImage(urlToCheck: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => {
                resolve(true);
            };

            image.onerror = () => {
                resolve(false);
            };

            image.src = urlToCheck;
        });
    }

    static embedGoogleSheet(urlObj: URL, lastFocusedElement: HTMLElement): void {
        const sheetId = urlObj.pathname.split('/')[3];
        const container = EmbedTool.createEmbedContainer(["embed-container"]);
        const iframe = document.createElement('iframe');

        const safeSheetId = encodeURIComponent(sheetId);

        iframe.src = `https://docs.google.com/spreadsheets/d/e/${safeSheetId}/pubhtml?widget=true&amp;headers=false`;
        iframe.style.width = '100%';
        iframe.style.height = '450px';
        iframe.frameBorder = '0';
        iframe.allowFullscreen = true;

        container.appendChild(iframe);
        EmbedTool.finalizeEmbed(container, ["x-resizable"], lastFocusedElement);
    }

    static embedYouTubeVideoAsIframe(urlObj: URL, element: HTMLElement) {

        const videoId = urlObj.searchParams.get('v');
        if (videoId) {

            const container = this.createEmbedContainer(["embed-container"]);

            const iframe = document.createElement('iframe');

            const safeVideoId = encodeURIComponent(videoId);

            iframe.src = `https://www.youtube.com/embed/${safeVideoId}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            container.appendChild(iframe);
            container.classList.add(ToolboxOptions.AlignToolClass);
            this.finalizeEmbed(container, ["x-resizable", ToolboxOptions.AlignToolClass], element);
        } else {
            console.error('Invalid YouTube video URL');
        }
    }

    static embedYouTubeShortAsIframe(urlObj: URL, element: HTMLElement): void {
        const pathSegments = urlObj.pathname.split('/');
        const shortId = pathSegments[pathSegments.length - 1];

        if (shortId) {
            const container = EmbedTool.createEmbedContainer(["embed-container"]);

            const iframe = document.createElement('iframe');

            const safeShortIdId = encodeURIComponent(shortId);

            iframe.src = `https://www.youtube.com/embed/${safeShortIdId}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            container.appendChild(iframe);
            EmbedTool.finalizeEmbed(container, ["x-resizable", ToolboxOptions.AlignToolClass], element);
        } else {
            console.error('Invalid YouTube Shorts URL');
        }
    }

    static embedYouTubePlaylistAsIframe(urlObj: URL, element: HTMLElement) {
        const listId = urlObj.searchParams.get('list');
        if (listId) {
            const container = EmbedTool.createEmbedContainer(["embed-container"]);

            const safeListId = encodeURIComponent(listId);

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/videoseries?list=${safeListId}`;
            iframe.setAttribute("allowfullscreen", "true");
            container.appendChild(iframe);
            EmbedTool.finalizeEmbed(container, ["x-resizable", ToolboxOptions.AlignToolClass], element);
        } else {
            console.error('Invalid YouTube playlist URL');
        }
    }

    static embedSpotifyContent(urlObj: URL, element: HTMLElement, type: EmbedTypes) {
        const contentId = urlObj.pathname.split('/').pop();
        const container = this.createEmbedContainer(["embed-container"]);
        container.classList.add("spotify-embed", ToolboxOptions.AlignToolClass);


        if (!contentId) {
            console.error("contentId is empty");
            return;
        }

        const safeContentId = encodeURIComponent(contentId);


        const iframe = document.createElement('iframe');
        iframe.classList.add("spotify-embed");
        iframe.src = `https://open.spotify.com/embed/${type}/${safeContentId}`;
        iframe.frameBorder = "0";
        iframe.setAttribute("scrolling", "no");

        switch (type) {
            case EmbedTypes.SpotifyTrack:
                iframe.style.height = "80px";
                break;
            case EmbedTypes.SpotifyPlaylist:
            case EmbedTypes.SpotifyShow:
            case EmbedTypes.SpotifyEpisode:
            case EmbedTypes.SpotifyArtist:
                iframe.style.height = "380px";
                break;
            default:
                iframe.style.height = "300px";
        }

        container.appendChild(iframe);
        this.finalizeEmbed(container, ["x-resizable", ToolboxOptions.AlignToolClass], element);
    }

    static async embedGistAsScript(urlObj: URL, element: HTMLElement) {
        const gistId = urlObj.pathname.split('/').pop();
        if (!gistId) {
            console.error("Invalid Gist ID");
            return;
        }

        const shadowElement = document.createElement("div");
        shadowElement.classList.add("shadow-element");

        const container = EmbedTool.createEmbedContainer(["gist-embed-container", "figure-embed-container", "ignore-text-floating-toolbar"]);
        container.style.minHeight = "100px";
        container.style.width = "100%";
        element.appendChild(container);


        container.appendChild(shadowElement);

        const shadowRoot = shadowElement.attachShadow({ mode: 'open' });

        const safeGistId = encodeURIComponent(gistId);

        const scriptSrc = `https://gist.github.com/${safeGistId}.js`;
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = scriptSrc;
        script.async = true;

        const originalWrite = document.write;
        let scriptOutput = '';
        document.write = (content: string) => {
            scriptOutput += content;
        };

        script.onload = () => {
            document.write = originalWrite;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = scriptOutput;

            Array.from(tempDiv.childNodes).forEach(node => {
                shadowRoot.appendChild(node);
            });

            console.log("Gist loaded successfully");
        };

        script.onerror = () => {
            document.write = originalWrite;
            console.error("Failed to load the Gist");
        };

        shadowRoot.appendChild(script);

        EmbedTool.finalizeEmbed(container, [], element);
    }

    static embedCodepenAsIframe(urlObj: URL, element: HTMLElement) {
        const parts = urlObj.pathname.split('/');
        if (parts.length < 4 || parts[1] === '' || parts[3] === '') {
            console.error('Invalid URL: Expected format /user/{username}/pen/{penId}');
            return;
        }
        const user = parts[1];
        const pen = parts[3];

        const safeUser = encodeURIComponent(user);
        const safePen = encodeURIComponent(pen);

        const container = EmbedTool.createEmbedContainer(["embed-container"]);
        const iframe = document.createElement('iframe');
        iframe.src = `https://codepen.io/${safeUser}/embed/${safePen}?height=265&theme-id=light&default-tab=js,result`;
        iframe.style.border = "none";
        iframe.style.height = "100%";
        iframe.style.width = "100%";
        iframe.style.overflow = "visible";
        iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin',);

        container.appendChild(iframe);
        EmbedTool.finalizeEmbed(container, ["y-resizable"], element);

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                iframe.style.height = `${height}px`;
            }
        });

        const parent = container.closest(".johannes-content-element");
        if (parent) {
            parent.classList.add("overflow-hidden");
            resizeObserver.observe(parent);
        }
    }

    private static createEmbedContainer(classes: string[] = []): HTMLElement {
        const figure = document.createElement('figure');
        figure.classList.add(...classes);

        const figcaption = document.createElement('figcaption');
        figcaption.setAttribute("data-placeholder", "Type a caption for this image");
        figcaption.setAttribute("contenteditable", "true");
        figcaption.classList.add("editable", "hide-turninto", "hide-moreoptions", "hide-inlineCode");

        figure.appendChild(figcaption);

        return figure;
    }

    private static finalizeEmbed(container: HTMLElement, contentElementClasses: string[] = [], lastFocusedElement: HTMLElement): void {

        const content = lastFocusedElement.closest(`.${CommonClasses.ContentElement}`);
        if (content) {
            content.classList.add(...contentElementClasses);
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
            content.appendChild(container);

            const block = content.closest(".block");
            const toolbarWrapper = block?.querySelector(".block-toolbar-wrapper");
            toolbarWrapper?.remove();
        }
    }


    static determineEmbedType(url: string): EmbedTypes | null {
        const urlObj = new URL(url);
        const domain = urlObj.hostname.toLowerCase();
        const path = urlObj.pathname.toLowerCase();

        if (/^(?:.*\.)?spotify\.com$/.test(domain)) {
            if (path.includes("/track")) {
                return EmbedTypes.SpotifyTrack;
            } else if (path.includes("/playlist")) {
                return EmbedTypes.SpotifyPlaylist;
            } else if (path.includes("/artist")) {
                return EmbedTypes.SpotifyArtist;
            } else if (path.includes("/episode")) {
                return EmbedTypes.SpotifyEpisode;
            } else if (path.includes("/show")) {
                return EmbedTypes.SpotifyShow;
            }
        } else if (/^(?:.*\.)?(youtube\.com|youtu\.be)$/.test(domain)) {
            if (path.includes("/watch")) {
                if (urlObj.searchParams.has("list")) {
                    return EmbedTypes.YouTubePlaylist;
                }
                return EmbedTypes.YouTubeVideo;
            } else if (path.includes("/playlist")) {
                return EmbedTypes.YouTubePlaylist;
            } else if (path.includes("/shorts")) {
                return EmbedTypes.YouTubeShort;
            }
        } else if (domain === "vimeo.com") {
            return EmbedTypes.VimeoVideo;
        } else if (domain === "docs.google.com" && path.includes("/spreadsheets")) {
            return EmbedTypes.GoogleSheet;
        } else if (domain === "twitter.com") {
            return EmbedTypes.Tweet;
        } else if (domain === "google.com" && path.includes("/maps")) {
            return EmbedTypes.GoogleMap;
        } else if (domain === "gist.github.com") {
            return EmbedTypes.GitHubGist;
        } else if (domain === "gitlab.com" && path.includes("/snippets")) {
            return EmbedTypes.GitLabSnippet;
        } else if (domain === "codepen.io") {
            return EmbedTypes.CodePen;
        }

        return null;
    }

}



export enum EmbedTypes {
    SpotifyTrack = "track",
    SpotifyPlaylist = "playlist",
    SpotifyArtist = "artist",
    SpotifyEpisode = "episode",
    SpotifyShow = "show",
    YouTubeVideo = "video",
    YouTubePlaylist = "playlist",
    YouTubeShort = "short",
    VimeoVideo = "video",
    GoogleSheet = "sheet",
    Tweet = "tweet",
    GoogleMap = "map",
    GitHubGist = "gist",
    GitLabSnippet = "snippet",
    CodePen = "pen"
}