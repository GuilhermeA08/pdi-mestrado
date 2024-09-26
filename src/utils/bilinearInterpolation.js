function bilinearInterpolation(image, width, height) {
  //Novo tamanho da imagem
  const newWidth = width;
  const newHeight = height;

  //Criação de um novo array de pixels
  let newImage = new Array(newWidth * newHeight * 4);

  //Cálculo da razão de largura e altura
  const ratioWidth = image.bitmap.width / newWidth;
  const ratioHeight = image.bitmap.height / newHeight;

  //Percorrer a nova imagem
  for (let i = 0; i < newHeight; i++) {
    for (let j = 0; j < newWidth; j++) {
      //Cálculo da posição do pixel na nova imagem
      const position = (i * newWidth + j) * 4;

      //Cálculo da posição do pixel na imagem original
      const x = j * ratioWidth;
      const y = i * ratioHeight;
      const x1 = Math.floor(x);
      const y1 = Math.floor(y);
      const x2 = Math.min(Math.ceil(x), image.bitmap.width - 1); // Evita overflow
      const y2 = Math.min(Math.ceil(y), image.bitmap.height - 1); // Evita overflow

      //Cálculo dos pesos
      const dx = x - x1;
      const dy = y - y1;

      //Interpolação para cada canal de cor (R, G, B)
      for (let k = 0; k < 3; k++) {
        const p1 = image.bitmap.data[(y1 * image.bitmap.width + x1) * 4 + k];
        const p2 = image.bitmap.data[(y1 * image.bitmap.width + x2) * 4 + k];
        const p3 = image.bitmap.data[(y2 * image.bitmap.width + x1) * 4 + k];
        const p4 = image.bitmap.data[(y2 * image.bitmap.width + x2) * 4 + k];

        // Cálculo da interpolação para o canal específico
        const p =
          p1 * (1 - dx) * (1 - dy) +
          p2 * dx * (1 - dy) +
          p3 * (1 - dx) * dy +
          p4 * dx * dy;

        // Atribuição do valor interpolado para o canal correto
        newImage[position + k] = p;
      }

      // O canal alfa (A) permanece constante
      newImage[position + 3] = 255; // Opacidade máxima
    }
  }

  //Criação de uma nova imagem com os pixels calculados
  image.bitmap.data = Buffer.from(newImage);
  image.bitmap.width = newWidth;
  image.bitmap.height = newHeight;

  // Salvar a nova imagem
  image.write("./assets/img-bilinear-interpolation.jpg");
}

module.exports = bilinearInterpolation;
