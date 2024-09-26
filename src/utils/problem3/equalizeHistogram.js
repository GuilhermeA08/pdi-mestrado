function calculateHistogram(image) {
  const histogram = new Array(256).fill(0);

  image.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (x, y, idx) {
      const red = this.bitmap.data[idx];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      // Convertendo para escala de cinza
      const gray = Math.round((red + green + blue) / 3);

      histogram[gray]++;
    }
  );

  return histogram;
}

/**
 * Função para equalizar o histograma de uma imagem.
 * @param {Jimp} image - Imagem para equalizar o histograma.
 * @param {string} outputPath - Caminho de saída para salvar a imagem equalizada.
 */
async function equalizeHistogram(image, outputPath) {
  const histogram = calculateHistogram(image);

  const totalPixels = image.bitmap.width * image.bitmap.height;
  const cumulativeDistribution = new Array(256).fill(0);

  // Calcular a distribuição acumulada normalizada
  cumulativeDistribution[0] = histogram[0];
  for (let i = 1; i < 256; i++) {
    cumulativeDistribution[i] = cumulativeDistribution[i - 1] + histogram[i];
  }

  // Normalizar a distribuição
  const normalizedCDF = cumulativeDistribution.map((cdf) =>
    Math.floor((cdf / totalPixels) * 255)
  );

  // Atualizar os valores dos pixels com base na CDF normalizada
  image.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (x, y, idx) {
      const red = this.bitmap.data[idx];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];

      const gray = Math.round((red + green + blue) / 3);

      const newValue = normalizedCDF[gray];

      // Atualiza os três canais com o valor equalizado
      this.bitmap.data[idx] = newValue;
      this.bitmap.data[idx + 1] = newValue;
      this.bitmap.data[idx + 2] = newValue;
    }
  );

  // Salva a imagem equalizada
  await image.write(outputPath);
  console.log(`Imagem equalizada salva em: ${outputPath}`);
}

module.exports = equalizeHistogram;
