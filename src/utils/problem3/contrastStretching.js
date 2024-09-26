async function contrastStretching(image) {
  try {
    // Encontra os valores mínimo e máximo de pixel na imagem
    let minPixelValue = 255;
    let maxPixelValue = 0;

    // Passar pela imagem para encontrar os valores mínimo e máximo de pixel
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        const red = this.bitmap.data[idx]; // Canal R
        const green = this.bitmap.data[idx + 1]; // Canal G
        const blue = this.bitmap.data[idx + 2]; // Canal B

        // Para cada canal, encontrar o valor mínimo e máximo
        minPixelValue = Math.min(minPixelValue, red, green, blue);
        maxPixelValue = Math.max(maxPixelValue, red, green, blue);
      }
    );

    // Aplicar o alargamento de contraste para cada pixel
    const S_min = 0;
    const S_max = 255;

    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // Obter valores R, G, B do pixel original
        const red = this.bitmap.data[idx]; // Canal R
        const green = this.bitmap.data[idx + 1]; // Canal G
        const blue = this.bitmap.data[idx + 2]; // Canal B

        // Aplicar a fórmula de alargamento de contraste para cada canal
        const newRed = Math.floor(
          ((red - minPixelValue) * (S_max - S_min)) /
            (maxPixelValue - minPixelValue) +
            S_min
        );
        const newGreen = Math.floor(
          ((green - minPixelValue) * (S_max - S_min)) /
            (maxPixelValue - minPixelValue) +
            S_min
        );
        const newBlue = Math.floor(
          ((blue - minPixelValue) * (S_max - S_min)) /
            (maxPixelValue - minPixelValue) +
            S_min
        );

        // Definir os novos valores no pixel
        this.bitmap.data[idx] = Math.min(255, Math.max(0, newRed)); // Canal R
        this.bitmap.data[idx + 1] = Math.min(255, Math.max(0, newGreen)); // Canal G
        this.bitmap.data[idx + 2] = Math.min(255, Math.max(0, newBlue)); // Canal B
      }
    );

    // Salvar a imagem resultante
    await image.write("./assets/img-contrast-stretching.jpg");
    console.log("Imagem com alargamento de contraste criada com sucesso:");
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
  }
}

module.exports = contrastStretching;
