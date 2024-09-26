async function generateHistogram(image) {
  // Inicializa histogramas para os canais R, G, B e cinza (escala de cinza)
  let histogramRed = new Array(256).fill(0);
  let histogramGreen = new Array(256).fill(0);
  let histogramBlue = new Array(256).fill(0);
  let histogramGray = new Array(256).fill(0);

  // Percorre todos os pixels da imagem
  image.scan(
    0,
    0,
    image.bitmap.width,
    image.bitmap.height,
    function (x, y, idx) {
      const red = this.bitmap.data[idx]; // Canal R
      const green = this.bitmap.data[idx + 1]; // Canal G
      const blue = this.bitmap.data[idx + 2]; // Canal B

      // Calcula a escala de cinza pela média simples
      const gray = Math.round((red + green + blue) / 3);

      // Incrementa os valores no histograma
      histogramRed[red]++;
      histogramGreen[green]++;
      histogramBlue[blue]++;
      histogramGray[gray]++;
    }
  );

  return {
    red: histogramRed,
    green: histogramGreen,
    blue: histogramBlue,
    gray: histogramGray,
  };
}

module.exports = generateHistogram;
