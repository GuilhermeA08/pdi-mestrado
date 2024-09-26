// Filtro de Média
async function applyMeanFilter(image, outputPath) {
  const kernel = [
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
  ];

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

    filteredImage.bitmap.data[idx] = Math.min(255, Math.max(0, red));
    filteredImage.bitmap.data[idx + 1] = Math.min(255, Math.max(0, green));
    filteredImage.bitmap.data[idx + 2] = Math.min(255, Math.max(0, blue));
  });

  await filteredImage.write(outputPath);
  console.log(`Imagem com filtro de média salva em: ${outputPath}`);
}

// Filtro de Média Ponderada
async function applyWeightedMeanFilter(image, outputPath) {
  const kernel = [1, 2, 1, 2, 4, 2, 1, 2, 1];

  const filteredImage = image.clone();
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const half = 1; // Para um kernel 3x3

  filteredImage.scan(0, 0, width, height, function (x, y, idx) {
    let red = 0,
      green = 0,
      blue = 0,
      sum = 0;

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
          sum += kernelValue;
        }
      }
    }

    filteredImage.bitmap.data[idx] = Math.min(255, Math.max(0, red / sum));
    filteredImage.bitmap.data[idx + 1] = Math.min(
      255,
      Math.max(0, green / sum)
    );
    filteredImage.bitmap.data[idx + 2] = Math.min(255, Math.max(0, blue / sum));
  });

  await filteredImage.write(outputPath);
  console.log(`Imagem com filtro de média ponderada salva em: ${outputPath}`);
}

// Filtro de Mediana
async function applyMedianFilter(image, outputPath) {
  const filteredImage = image.clone();
  const width = image.bitmap.width;
  const height = image.bitmap.height;
  const half = 1; // Para um kernel 3x3

  filteredImage.scan(0, 0, width, height, function (x, y, idx) {
    const redValues = [];
    const greenValues = [];
    const blueValues = [];

    for (let i = -half; i <= half; i++) {
      for (let j = -half; j <= half; j++) {
        const xi = x + j;
        const yi = y + i;

        if (xi >= 0 && xi < width && yi >= 0 && yi < height) {
          const pixelIdx = (yi * width + xi) * 4;
          redValues.push(image.bitmap.data[pixelIdx]);
          greenValues.push(image.bitmap.data[pixelIdx + 1]);
          blueValues.push(image.bitmap.data[pixelIdx + 2]);
        }
      }
    }

    redValues.sort((a, b) => a - b);
    greenValues.sort((a, b) => a - b);
    blueValues.sort((a, b) => a - b);

    const medianRed = redValues[Math.floor(redValues.length / 2)];
    const medianGreen = greenValues[Math.floor(greenValues.length / 2)];
    const medianBlue = blueValues[Math.floor(blueValues.length / 2)];

    filteredImage.bitmap.data[idx] = medianRed;
    filteredImage.bitmap.data[idx + 1] = medianGreen;
    filteredImage.bitmap.data[idx + 2] = medianBlue;
  });

  await filteredImage.write(outputPath);
  console.log(`Imagem com filtro de mediana salva em: ${outputPath}`);
}

module.exports = {
  applyMeanFilter,
  applyWeightedMeanFilter,
  applyMedianFilter,
};
