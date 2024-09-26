async function applyLaplacianFilter(image, outputPath) {
  const kernel = [0, -1, 0, -1, 4, -1, 0, -1, 0];

  const filteredImage = image.clone();
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const half = 1; // Para um kernel 3x3

  filteredImage.scan(0, 0, width, height, function (x, y, idx) {
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

    // Limitar os valores para o intervalo [0, 255]
    filteredImage.bitmap.data[idx] = Math.min(255, Math.max(0, red));
    filteredImage.bitmap.data[idx + 1] = Math.min(255, Math.max(0, green));
    filteredImage.bitmap.data[idx + 2] = Math.min(255, Math.max(0, blue));
  });

  await filteredImage.write(outputPath);
  console.log(`Imagem com filtro Laplaciano salva em: ${outputPath}`);
}

module.exports = applyLaplacianFilter;
