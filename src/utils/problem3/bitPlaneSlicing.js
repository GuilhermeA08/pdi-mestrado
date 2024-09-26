async function bitPlaneSlicing(image, bitPosition, outputPath) {
  try {
    // Verifica se a posição do bit está entre 0 e 7
    if (bitPosition < 0 || bitPosition > 7) {
      throw new Error("A posição do bit deve estar entre 0 e 7.");
    }

    // Percorre cada pixel da imagem
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // Para cada pixel, obtenha os valores R, G e B
        const red = this.bitmap.data[idx]; // Canal R
        const green = this.bitmap.data[idx + 1]; // Canal G
        const blue = this.bitmap.data[idx + 2]; // Canal B

        // Extrai o bit específico para cada canal de cor
        const newRed = ((red >> bitPosition) & 1) * 255;
        const newGreen = ((green >> bitPosition) & 1) * 255;
        const newBlue = ((blue >> bitPosition) & 1) * 255;

        // Define o valor binário do bit para todos os canais (R, G, B)
        this.bitmap.data[idx] = newRed; // Canal R
        this.bitmap.data[idx + 1] = newGreen; // Canal G
        this.bitmap.data[idx + 2] = newBlue; // Canal B
      }
    );

    // Salva a imagem resultante
    await image.write(outputPath);
    console.log(
      `Imagem fatiada no nível de bit ${bitPosition} salva em: ${outputPath}`
    );
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
  }
}

module.exports = bitPlaneSlicing;
