import { Injectable } from "@nestjs/common";
import { createCanvas } from "canvas";

@Injectable()
export class ImageService {
  generateAvatar({ blocks = 6, width = 100 }) {
    const colors = [
      "#956362",
      "#FCF9E8",
      "#E94635",
      "#EF9935",
      "#7E2625",
      "#F4C127",
      "#EDA92C",
    ];

    const blockSize = width / blocks;
    const canvas = createCanvas(width, width);
    const canvasContext = canvas.getContext("2d");

    const pixels = Array.from({ length: (blocks * blocks) / 2 }, () => {
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
    });

    let pixelCursor = 0;
    for (let i = 0; i < blocks / 2; i++) {
      for (let j = 0; j < blocks; j++) {
        canvasContext.fillStyle = pixels[pixelCursor];
        canvasContext.fillRect(
          blockSize * i,
          blockSize * j,
          blockSize,
          blockSize,
        );
        pixelCursor++;
      }
    }

    pixelCursor = 0;
    for (let i = blocks - 1; i > blocks / 2 - 1; i--) {
      for (let j = 0; j < blocks; j++) {
        canvasContext.fillStyle = pixels[pixelCursor];
        canvasContext.fillRect(
          blockSize * i,
          blockSize * j,
          blockSize,
          blockSize,
        );
        pixelCursor++;
      }
    }

    return canvas.toBuffer();
  }
}
