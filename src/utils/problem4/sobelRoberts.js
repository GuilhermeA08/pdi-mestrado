const { Jimp } = require("jimp");

async function applySobelFilter(image) {
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];

  const sobelY = [1, 2, 1, 0, 0, 0, -1, -2, -1];

  const outputImage = new Jimp({
    width: width,
    height: height,
    color: 0x00000000,
  });

  outputImage.scan(1, 1, width - 2, height - 2, function (x, y, idx) {
    let redX = 0,
      greenX = 0,
      blueX = 0;
    let redY = 0,
      greenY = 0,
      blueY = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const pixelIdx = ((y + i) * width + (x + j)) * 4;
        const kernelValueX = sobelX[(i + 1) * 3 + (j + 1)];
        const kernelValueY = sobelY[(i + 1) * 3 + (j + 1)];

        redX += image.bitmap.data[pixelIdx] * kernelValueX;
        greenX += image.bitmap.data[pixelIdx + 1] * kernelValueX;
        blueX += image.bitmap.data[pixelIdx + 2] * kernelValueX;

        redY += image.bitmap.data[pixelIdx] * kernelValueY;
        greenY += image.bitmap.data[pixelIdx + 1] * kernelValueY;
        blueY += image.bitmap.data[pixelIdx + 2] * kernelValueY;
      }
    }

    const red = Math.min(
      255,
      Math.max(0, Math.sqrt(redX * redX + redY * redY))
    );
    const green = Math.min(
      255,
      Math.max(0, Math.sqrt(greenX * greenX + greenY * greenY))
    );
    const blue = Math.min(
      255,
      Math.max(0, Math.sqrt(blueX * blueX + blueY * blueY))
    );

    outputImage.bitmap.data[idx] = red;
    outputImage.bitmap.data[idx + 1] = green;
    outputImage.bitmap.data[idx + 2] = blue;
    outputImage.bitmap.data[idx + 3] = 255; // Alpha
  });

  outputImage.write("./assets/sobel.png");
}

async function applyRobertsFilter(image) {
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  const robertsX = [1, 0, 0, -1];

  const robertsY = [0, 1, -1, 0];

  const outputImage = new Jimp({
    width: width,
    height: height,
    color: 0x00000000,
  });

  outputImage.scan(0, 0, width - 1, height - 1, function (x, y, idx) {
    let redX = 0,
      greenX = 0,
      blueX = 0;
    let redY = 0,
      greenY = 0,
      blueY = 0;

    const pixelIdx1 = (y * width + x) * 4;
    const pixelIdx2 = ((y + 1) * width + (x + 1)) * 4;
    const pixelIdx3 = (y * width + (x + 1)) * 4;
    const pixelIdx4 = ((y + 1) * width + x) * 4;

    redX = image.bitmap.data[pixelIdx1] - image.bitmap.data[pixelIdx2];
    greenX =
      image.bitmap.data[pixelIdx1 + 1] - image.bitmap.data[pixelIdx2 + 1];
    blueX = image.bitmap.data[pixelIdx1 + 2] - image.bitmap.data[pixelIdx2 + 2];

    redY = image.bitmap.data[pixelIdx3] - image.bitmap.data[pixelIdx4];
    greenY =
      image.bitmap.data[pixelIdx3 + 1] - image.bitmap.data[pixelIdx4 + 1];
    blueY = image.bitmap.data[pixelIdx3 + 2] - image.bitmap.data[pixelIdx4 + 2];

    const red = Math.min(
      255,
      Math.max(0, Math.sqrt(redX * redX + redY * redY))
    );
    const green = Math.min(
      255,
      Math.max(0, Math.sqrt(greenX * greenX + greenY * greenY))
    );
    const blue = Math.min(
      255,
      Math.max(0, Math.sqrt(blueX * blueX + blueY * blueY))
    );

    outputImage.bitmap.data[idx] = red;
    outputImage.bitmap.data[idx + 1] = green;
    outputImage.bitmap.data[idx + 2] = blue;
    outputImage.bitmap.data[idx + 3] = 255; // Alpha
  });

  outputImage.write("./assets/roberts.png");
}

module.exports = {
  applySobelFilter,
  applyRobertsFilter,
};
