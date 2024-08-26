import { CommonClasses } from "@/common/CommonClasses";
import { ToolboxOptions } from "../components/block-toolbox/ToolboxOptions";

export class EmbedTool {

    static embedImage(urlObj: string, lastFocusedElement: HTMLElement) {

        if (!this.isValidImageURL(urlObj)) {
            throw new Error("invalid image")
        }

        const container = this.createEmbedContainer();

        const image = document.createElement('img');

        image.src = urlObj;
        image.alt = 'Embedded Image';
        image.style.maxWidth = '100%';
        image.style.width = 'auto';
        image.style.height = 'auto';

        container.appendChild(image);
        container.classList.add(ToolboxOptions.AlignToolClass);
        EmbedTool.finalizeEmbed(container, [ToolboxOptions.AlignToolClass, "fit-content", "x-resizable"], lastFocusedElement);
    }

    static isValidImageURL(url: string): boolean {
        const pattern = /\.(jpe?g|png|gif|bmp|tif?f|webp)$/i;
        return pattern.test(url);
    }

    static embedGoogleSheet(urlObj: URL, lastFocusedElement: HTMLElement): void {
        const sheetId = urlObj.pathname.split('/')[3];
        const container = EmbedTool.createEmbedContainer(["embed-container"]);
        const iframe = document.createElement('iframe');

        iframe.src = `https://docs.google.com/spreadsheets/d/e/${sheetId}/pubhtml?widget=true&amp;headers=false`;
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

            iframe.src = `https://www.youtube.com/embed/${videoId}`;
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

            iframe.src = `https://www.youtube.com/embed/${shortId}`;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;
            container.appendChild(iframe);
            EmbedTool.finalizeEmbed(container, ["x-resizable", ToolboxOptions.AlignToolClass], element);
        } else {
            console.error('Invalid YouTube Shorts URL');
        }
    }

    static isYouTubeDomain(domain: string, element: HTMLElement): boolean {
        return domain.endsWith("youtube.com") || domain.endsWith("youtu.be");
    }

    static embedYouTubePlaylistAsIframe(urlObj: URL, element: HTMLElement) {
        const listId = urlObj.searchParams.get('list');
        if (listId) {
            const container = EmbedTool.createEmbedContainer(["embed-container"]);

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/videoseries?list=${listId}`;
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
    
        const iframe = document.createElement('iframe');
        iframe.classList.add("spotify-embed");
        iframe.src = `https://open.spotify.com/embed/${type}/${contentId}`;
        iframe.frameBorder = "0";
        iframe.setAttribute("scrolling", "no");
    
        switch(type) {
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

    static embedTweet(urlObj: URL, element: HTMLElement) {
        const tweetId = urlObj.pathname.split('/').pop();
        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        const container = EmbedTool.createEmbedContainer();
        const blockquote = document.createElement('blockquote');
        blockquote.classList.add("twitter-tweet");
        blockquote.setAttribute('data-theme', 'light');
        blockquote.innerHTML = `<a href="${urlObj.toString()}">Loading tweet...</a>`;
        container.appendChild(blockquote);
        container.appendChild(script);
        EmbedTool.finalizeEmbed(container, [], element);
    }

    static embedGoogleMap(urlObj: URL, element: HTMLElement) {
        const queryString = urlObj.search.slice(1);
        const container = EmbedTool.createEmbedContainer();
        const iframe = document.createElement('iframe');
        iframe.src = `https://www.google.com/maps?${queryString}&output=embed`;
        iframe.style.maxWidth = "100%";
        iframe.style.height = "450px";
        container.appendChild(iframe);
        EmbedTool.finalizeEmbed(container, ["x-resizable"], element);
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
    
        const scriptSrc = `https://gist.github.com/${gistId}.js`;
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



    static async embedGistAsIframe(urlObj: URL, service: string, element: HTMLElement) {
        const gistId = urlObj.pathname.split('/').pop();
        const container = EmbedTool.createEmbedContainer(["embed-container"]);
        container.style.height = "inherit";
        container.classList.add("gist-embed");
        container.style.width = "100%";
        container.style.minHeight = "200px";

        if (!gistId) {
            console.error("Invalid Gist/Snippet ID");
            return;
        }

        let src;
        if (service === "github") {
            src = `https://gist.github.com/${gistId}.pibb`;
        } else if (service === "gitlab") {
            src = `https://gitlab.com/api/v4/snippets/${gistId}/raw`;
        } else {
            console.error("Unsupported service for embedding gists");
            return;
        }

        const iframe = document.createElement('iframe');
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "100%");
        iframe.style.border = "none";
        iframe.style.margin = "0";
        iframe.style.padding = "0";
        iframe.src = src;
        iframe.style.overflow = "auto";
        iframe.frameBorder = "0";

        container.appendChild(iframe);

        iframe.setAttribute('sandbox', ' allow-same-origin');
        iframe.setAttribute("allow", "cookie-store 'none'");


        EmbedTool.finalizeEmbed(container, ["y-resizable"], element);

        iframe.onload = () => {
            console.log("Gist/Snippet loaded");
        };

        iframe.onerror = () => {
            console.error("Failed to load the Gist/Snippet from " + service);
        };

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { height } = entry.contentRect;
                iframe.style.height = `${height}px`;
            }
        });

        const contentElement = container.closest(`${CommonClasses.ContentElement}`);
        if (contentElement) {
            contentElement.classList.add("overflow-hidden");
            resizeObserver.observe(contentElement);
        }
    }

    static embedCodepenAsIframe(urlObj: URL, element: HTMLElement) {
        const parts = urlObj.pathname.split('/');
        if (parts.length < 4 || parts[1] === '' || parts[3] === '') {
            console.error('Invalid URL: Expected format /user/{username}/pen/{penId}');
            return;
        }
        const user = parts[1];
        const pen = parts[3];


        const container = EmbedTool.createEmbedContainer(["embed-container"]);
        const iframe = document.createElement('iframe');
        iframe.src = `https://codepen.io/${user}/embed/${pen}?height=265&theme-id=light&default-tab=js,result`;
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
        const domain = urlObj.hostname;
        const path = urlObj.pathname;
    
        if (domain.includes("spotify.com")) {
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
        } else if (domain.includes("youtube.com") || domain.includes("youtu.be")) {
            if (path.includes("/watch")) {
                const params = urlObj.searchParams;
                if (params.has("list")) {
                    return EmbedTypes.YouTubePlaylist;
                }
                return EmbedTypes.YouTubeVideo;
            } else if (path.includes("/playlist")) {
                return EmbedTypes.YouTubePlaylist;
            } else if (path.includes("/shorts")) {
                return EmbedTypes.YouTubeShort;
            }
        } else if (domain.includes("vimeo.com")) {
            return EmbedTypes.VimeoVideo;
        } else if (domain.includes("docs.google.com") && path.includes("/spreadsheets")) {
            return EmbedTypes.GoogleSheet;
        } else if (domain.includes("twitter.com")) {
            return EmbedTypes.Tweet;
        } else if (domain.includes("google.com") && path.includes("/maps")) {
            return EmbedTypes.GoogleMap;
        } else if (domain.includes("gist.github.com")) {
            return EmbedTypes.GitHubGist;
        } else if (domain.includes("gitlab.com") && path.includes("/snippets")) {
            return EmbedTypes.GitLabSnippet;
        } else if (domain.includes("codepen.io")) {
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