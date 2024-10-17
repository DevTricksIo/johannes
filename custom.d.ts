declare module '*.svg' {
    const content: string;
    export default content;
}
// declare var hljs: any;

declare module 'rangy' {
    var rangy: any;
    export = rangy;
}

declare module 'rangy/lib/rangy-classapplier' {
    export {};
}
