let anchorElement = null;

export function save(a){
    anchorElement = a;
}

export function clear(){
    anchorElement = null;
}

export function any(){
    anchorElement == null;
}

export function setURL(url){
    anchorElement.href = url;
}