import { BaseUIComponent } from "../common/BaseUIComponent";

export class Thumbnail extends BaseUIComponent {

    constructor() {
        super({});
    }

    init() {
        const div = document.createElement("div");
        div.id = "setFeaturedImage";
        div.classList.add("upload-content", "content-data");

        div.style.marginLeft = "1.3rem";

        const label = document.createElement("label");
        label.classList.add("blue-button");
        label.innerText = "Set featured image";

        div.appendChild(label);

        label.addEventListener('click', () => {
            this.promptFileUpload();
        });

        return div;
    }

    promptFileUpload(): void {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        document.body.appendChild(fileInput);

        fileInput.addEventListener('change', async (event: Event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const imageUrl = await this.uploadImage(file);
                this.setFeaturedImage(imageUrl);
            }

            document.body.removeChild(fileInput);
        });

        fileInput.click();
    }

    async uploadImage(file: File): Promise<string> {
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('your-upload-url', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.imageUrl;
    }

    setFeaturedImage(imageUrl: string): void {
        const imageElement = document.createElement('img');
        imageElement.src = imageUrl;
        imageElement.style.width = '100%';

        const container = document.getElementById('setFeaturedImage');
        container?.appendChild(imageElement);
    }
}