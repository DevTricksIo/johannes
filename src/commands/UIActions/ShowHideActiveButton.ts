export class ShowHideActiveButton {

    classKey: "hiliteColor" | "foreColor" | "backgroundColor";
    value: string;
    intention: "show" | "hide";

    constructor(classKey: "hiliteColor" | "foreColor" | "backgroundColor", value: string, intention: "show" | "hide") {
        this.classKey = classKey;
        this.value = value;
        this.intention = intention;
    }
}