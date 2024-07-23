// import BaseUIComponent from "./BaseUIComponent";

import { BaseUIComponent } from "./BaseUIComponent";

export class SVGIcon extends BaseUIComponent {

    useElement: SVGUseElement;

    constructor(hrefUseId: string, width = "16", height = "16") {

        super({
            hrefUseId: hrefUseId,
            width: width,
            height: height,

        })

        this.useElement = this.htmlElement.querySelector('use') as SVGUseElement;
    }

    init(): HTMLElement {

        const htmlElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

        let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${this.props.hrefUseId}`);

        htmlElement.appendChild(use);
        htmlElement.setAttribute('width', this.props.width);
        htmlElement.setAttribute('height', this.props.height);
        htmlElement.setAttribute('fill', 'currentColor');

        return htmlElement as unknown as HTMLElement;
    }

    clone(): SVGIcon {
        return new SVGIcon(this.props.hrefUseId, this.props.width, this.props.height);
    }
}