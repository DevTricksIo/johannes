export function createSVG(hrefUseId, classList = "", width = 16, height = 16) {

    if (!hrefUseId) {
        throw new Error('Invalid Argument Exception');
    }

    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    if (classList && classList.trim() !== "") {
        const classes = classList.split(',');
        svg.classList.add(...classes);
    }

    let use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${hrefUseId}`);

    svg.appendChild(use);
    svg.setAttribute('width', width);
    svg.setAttribute('height', height);
    svg.setAttribute('fill', 'currentColor');

    return svg;
}