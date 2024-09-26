async function createNegative(image) {
  try {
    // Percorrer todos os pixels da imagem
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // idx é o índice do pixel atual no buffer de dados da imagem

        // Para cada pixel, pegamos o valor R, G, B (e ignoramos A que é opacidade)
        const red = this.bitmap.data[idx]; // Canal R
        const green = this.bitmap.data[idx + 1]; // Canal G
        const blue = this.bitmap.data[idx + 2]; // Canal B

        // Inverter os valores para obter o negativo
        this.bitmap.data[idx] = 255 - red; // Canal R
        this.bitmap.data[idx + 1] = 255 - green; // Canal G
        this.bitmap.data[idx + 2] = 255 - blue; // Canal B
      }
    );

    // Salvar a imagem resultante
    await image.write("./assets/img-negative.jpg");
    console.log("Imagem negativa criada com sucesso:");
  } catch (error) {
    console.error("Erro ao processar a imagem:", error.message);
  }
}

module.exports = createNegative;
