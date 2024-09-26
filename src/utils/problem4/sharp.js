async function applySharpenMask(image, amount) {
  const kernel = [0, -1, 0, -1, 5 + amount, -1, 0, -1, 0];

  const sharpenedImage = image.clone();
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const half = 1;

  sharpenedImage.scan(0, 0, width, height, function (x, y, idx) {
    let red = 0,
      green = 0,
      blue = 0;

    for (let i = -half; i <= half; i++) {
      for (let j = -half; j <= half; j++) {
        const xi = x + j;
        const yi = y + i;

        if (xi >= 0 && xi < width && yi >= 0 && yi < height) {
          const pixelIdx = (yi * width + xi) * 4;
          const kernelValue = kernel[(i + half) * 3 + (j + half)];

          red += image.bitmap.data[pixelIdx] * kernelValue;
          green += image.bitmap.data[pixelIdx + 1] * kernelValue;
          blue += image.bitmap.data[pixelIdx + 2] * kernelValue;
        }
      }
    }

    // Ajuste para evitar valores negativos
    sharpenedImage.bitmap.data[idx] = Math.min(255, Math.max(0, red));
    sharpenedImage.bitmap.data[idx + 1] = Math.min(255, Math.max(0, green));
    sharpenedImage.bitmap.data[idx + 2] = Math.min(255, Math.max(0, blue));
    sharpenedImage.bitmap.data[idx + 3] = 255; // Alpha
  });

  sharpenedImage.write("./assets/sharpened.png");
  return sharpenedImage;
}

async function applyHighBoostFilter(image, boostFactor) {
  const sharpenedImage = await applySharpenMask(image, 0.5);

  const highBoostedImage = image.clone();

  highBoostedImage.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (x, y, idx) {
      highBoostedImage.bitmap.data[idx] = Math.min(
        255,
        Math.max(
          0,
          image.bitmap.data[idx] +
            (sharpenedImage.bitmap.data[idx] - image.bitmap.data[idx]) *
              boostFactor
        )
      );
      highBoostedImage.bitmap.data[idx + 1] = Math.min(
        255,
        Math.max(
          0,
          image.bitmap.data[idx + 1] +
            (sharpenedImage.bitmap.data[idx + 1] - image.bitmap.data[idx + 1]) *
              boostFactor
        )
      );
      highBoostedImage.bitmap.data[idx + 2] = Math.min(
        255,
        Math.max(
          0,
          image.bitmap.data[idx + 2] +
            (sharpenedImage.bitmap.data[idx + 2] - image.bitmap.data[idx + 2]) *
              boostFactor
        )
      );
      highBoostedImage.bitmap.data[idx + 3] = 255; // Alpha
    }
  );

  highBoostedImage.write("./assets/high-boost.png");
}

module.exports = {
  applySharpenMask,
  applyHighBoostFilter,
};
