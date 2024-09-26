async function applyConvolution(image, kernel, outputPath) {
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const kernelSize = Math.sqrt(kernel.length);
  const half = Math.floor(kernelSize / 2);

  const outputImage = image.clone();

  // Inverte o kernel (máscara) para aplicar convolução
  const invertedKernel = kernel.slice().reverse();

  image.scan(0, 0, width, height, function (x, y, idx) {
    let red = 0,
      green = 0,
      blue = 0;

    for (let i = -half; i <= half; i++) {
      for (let j = -half; j <= half; j++) {
        const xi = x + j;
        const yi = y + i;

        if (xi >= 0 && xi < width && yi >= 0 && yi < height) {
          const pixelIdx = (yi * width + xi) * 4;
          const kernelValue =
            invertedKernel[(i + half) * kernelSize + (j + half)];

          red += image.bitmap.data[pixelIdx] * kernelValue;
          green += image.bitmap.data[pixelIdx + 1] * kernelValue;
          blue += image.bitmap.data[pixelIdx + 2] * kernelValue;
        }
      }
    }

    // Limitar os valores para o intervalo [0, 255]
    outputImage.bitmap.data[idx] = Math.min(255, Math.max(0, red));
    outputImage.bitmap.data[idx + 1] = Math.min(255, Math.max(0, green));
    outputImage.bitmap.data[idx + 2] = Math.min(255, Math.max(0, blue));
  });

  await outputImage.write(outputPath);
  console.log(`Imagem com convolução salva em: ${outputPath}`);
}

module.exports = applyConvolution;
