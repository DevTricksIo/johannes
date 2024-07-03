class SVGIcon {

    htmlElement: SVGSVGElement;

    constructor(hrefUseId: string, classList = "", width = "16", height = "16") {

        this.htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        if (classList && classList.trim() !== "") {
            const classes = classList.split(',');
            this.htmlElement.classList.add(...classes);
        }

        let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${hrefUseId}`);

        this.htmlElement.appendChild(use);
        this.htmlElement.setAttribute('width', width);
        this.htmlElement.setAttribute('height', height);
        this.htmlElement.setAttribute('fill', 'currentColor');
    }
}

export default SVGIcon;