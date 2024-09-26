async function powerTransform(image, gamma) {
  try {
    // Encontrar o valor máximo de pixel (para normalizar) - em imagens de 8 bits, é 255
    const maxPixelValue = 255;

    // Constante de escala c (podemos definir como 1 para manter os valores na faixa de 0 a 255)
    const c = 1;

    // Aplicar a transformação de potência (gama) em cada pixel
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // idx é o índice do pixel atual no buffer de dados da imagem

        // Para cada pixel, pegar os valores R, G e B (desconsiderando o canal alfa)
        let red = this.bitmap.data[idx]; // Canal R
        let green = this.bitmap.data[idx + 1]; // Canal G
        let blue = this.bitmap.data[idx + 2]; // Canal B

        // Normalizar os valores (deixar entre 0 e 1)
        red /= maxPixelValue;
        green /= maxPixelValue;
        blue /= maxPixelValue;

        // Aplicar a transformação de potência para cada canal
        red = c * Math.pow(red, gamma) * maxPixelValue;
        green = c * Math.pow(green, gamma) * maxPixelValue;
        blue = c * Math.pow(blue, gamma) * maxPixelValue;

        // Garantir que os valores fiquem entre 0 e 255
        this.bitmap.data[idx] = Math.min(255, Math.max(0, Math.floor(red)));
        this.bitmap.data[idx + 1] = Math.min(
          255,
          Math.max(0, Math.floor(green))
        );
        this.bitmap.data[idx + 2] = Math.min(
          255,
          Math.max(0, Math.floor(blue))
        );
      }
    );

    // Salvar a imagem resultante
    await image.write("./assets/img-power-transform.jpg");
    console.log(
      "Imagem com transformação de potência (gama) criada com sucesso:"
    );
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
  }
}

module.exports = powerTransform;
