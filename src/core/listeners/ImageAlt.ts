import { CommonClasses } from "@/common/CommonClasses";
import { IImageAlt } from "./IImageAlt";

export class ImageAlt implements IImageAlt {
  private static instance: ImageAlt | null = null;

  currentImage: HTMLImageElement | null = null;
  inputElement: HTMLInputElement | null = null;

  private constructor() {
    this.listen();
  }

  static getInstance(): ImageAlt {
    if (ImageAlt.instance) {
      return ImageAlt.instance;
    }

    return new ImageAlt();
  }

  startListen(): void {
    console.log("listening image clicks");
  }

  cleanup() {
    if (this.currentImage) {
      this.currentImage.style.boxShadow = "";
      this.currentImage = null;
    }
    if (this.inputElement) {
      this.inputElement.parentNode?.removeChild(this.inputElement);
      this.inputElement = null;
    }
  }

  listen() {
    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      if (target && target.tagName === "IMG") {
        const img = target as HTMLImageElement;

        this.cleanup();

        img.style.boxShadow = "0px 0px 0px 2px #007bff";

        this.inputElement = document.createElement("input");
        this.inputElement.classList.add(CommonClasses.EditorOnly, "soft-box-shadow", );
        this.inputElement.type = "text";
        this.inputElement.placeholder = "Alt text";
        this.inputElement.value = img.alt || "";

        this.inputElement.style.position = "absolute";
        this.inputElement.style.padding = "5px 15px";        

        this.inputElement.style.borderRadius = "4px";
        this.inputElement.style.backgroundColor = "white";
        this.inputElement.style.color = "#242424";
        this.inputElement.style.outline = "none";

        const rect = img.getBoundingClientRect();
        const scrollX = window.scrollX || window.pageXOffset;
        const scrollY = window.scrollY || window.pageYOffset;

        this.inputElement.style.left = `${rect.left + scrollX + 5}px`;
        this.inputElement.style.top = `${rect.top + scrollY - this.inputElement.offsetHeight + 5}px`;
        this.inputElement.style.zIndex = "1000";

        document.body.appendChild(this.inputElement);

        this.inputElement.focus();

        this.currentImage = img;
      } else if (this.inputElement && target === this.inputElement) {
      } else {
        if (this.currentImage && this.inputElement) {
          this.currentImage.alt = this.inputElement.value;
          this.cleanup();
        }
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (this.currentImage && this.inputElement) {
          this.currentImage.alt = this.inputElement.value;
          this.cleanup();
        }
      }
    });
  }
}