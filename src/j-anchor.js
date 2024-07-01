let anchorElement = null;

export function setAnchor(a) {
    anchorElement = a;
}

export function clear() {

    if (anchorElement && (anchorElement.href == '' || anchorElement.href == null)) {
        const parent = anchorElement.parentNode;
        while (anchorElement.firstChild) {
            parent.insertBefore(anchorElement.firstChild, anchorElement);
        }

        if (parent) {
            parent.removeChild(anchorElement);
            parent.normalize();
        }
    }

    anchorElement = null;
}

export function any() {
    anchorElement == null;
}

export function setURL(url) {
    anchorElement.href = url;
}