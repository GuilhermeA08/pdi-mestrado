async function logTransform(image) {
  try {
    // Encontrar o valor máximo de pixel na imagem
    const maxPixelValue = 255; // Para imagens de 8 bits, o valor máximo é 255

    // Calcular a constante de escala c
    const c = 255 / Math.log(1 + maxPixelValue);

    // Aplicar a transformação logarítmica em cada pixel
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // idx é o índice do pixel atual no buffer de dados da imagem

        // Para cada pixel, pegar os valores R, G e B (desconsiderando o canal alfa)
        const red = this.bitmap.data[idx]; // Canal R
        const green = this.bitmap.data[idx + 1]; // Canal G
        const blue = this.bitmap.data[idx + 2]; // Canal B

        // Aplicar a transformação logarítmica em cada canal de cor
        this.bitmap.data[idx] = Math.min(
          255,
          Math.floor(c * Math.log(1 + red))
        ); // Canal R
        this.bitmap.data[idx + 1] = Math.min(
          255,
          Math.floor(c * Math.log(1 + green))
        ); // Canal G
        this.bitmap.data[idx + 2] = Math.min(
          255,
          Math.floor(c * Math.log(1 + blue))
        ); // Canal B
      }
    );

    // Salvar a imagem resultante
    await image.write("./assets/img-log-transform.jpg");
    console.log("Imagem com transformação logarítmica criada com sucesso:");
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
  }
}

module.exports = logTransform;
