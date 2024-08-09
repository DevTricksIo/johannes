import { DOMUtils } from "./DOMUtils";

describe("Utils", () => {

    beforeEach(() => {
        document.body.innerHTML = "";
    });

    test("IsDescendant should be true", () => {
        document.body.innerHTML = "<div class='parent'><div class='child'>This is a child element</div></div>";

        const child = document.querySelector(".child");
        if (!child || !child.firstChild) {
            throw new Error("Child element or its text node is not found in the DOM setup");
        }

        const range = new Range();
        range.setStart(child.firstChild, 0);
        range.setEnd(child.firstChild, child.firstChild.textContent!.length);

        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);

        const result = DOMUtils.isSelectedTextDescendantOf(".parent");
        expect(result).toBe(true);
    });

    test("IsDescendant should be false when parent does not exist", () => {
        const childDiv = document.createElement("div");
        childDiv.classList.add("child");
        childDiv.textContent = "This is a child element";

        document.body.appendChild(childDiv);

        const range = new Range();
        range.setStart(childDiv.firstChild!, 0);
        range.setEnd(childDiv.firstChild!, childDiv.firstChild!.textContent!.length);

        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);

        const result = DOMUtils.isSelectedTextDescendantOf(".parent");
        expect(result).toBe(false);
    });

    test("IsDescendant should be false when parent parameter does not exist but child has a parent", () => {
        const parentDiv = document.createElement("div");
        parentDiv.classList.add("parent");

        const childDiv = document.createElement("div");
        childDiv.classList.add("child");
        childDiv.textContent = "This is a child element";

        parentDiv.appendChild(childDiv);
        document.body.appendChild(parentDiv);

        const range = new Range();
        range.setStart(childDiv.firstChild!, 0);
        range.setEnd(childDiv.firstChild!, childDiv.firstChild!.textContent!.length);

        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(range);

        const result = DOMUtils.isSelectedTextDescendantOf(".no-exist");
        expect(result).toBe(false);
    });

});
