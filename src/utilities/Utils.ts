export class Utils {
    static generateUniqueId() {
        const timePart = Date.now().toString(36);
        const randomArray = new Uint32Array(1);
        window.crypto.getRandomValues(randomArray);
        const randomPart = randomArray[0].toString(36);
        return timePart + randomPart;
    }

    static rgbToHex(rgb: string): string {
        const rgbArray = rgb.match(/\d+/g)!.map(Number);
        return "#" + rgbArray.map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? "0" + hex : hex;
        }).join("");
    }
}