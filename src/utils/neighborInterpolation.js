function neighborInterpolation(image, width, height) {
  // Interpolação dos vizinhos mais próximos

  // Defina a largura e a altura da nova imagem
  const newWidth = width;
  const newHeight = height;

  // Crie um novo array de pixels

  let newImage = new Array(newWidth * newHeight * 4);

  // Calcule a razão de largura e altura

  const ratioWidth = image.bitmap.width / newWidth;

  const ratioHeight = image.bitmap.height / newHeight;

  // Percorra a nova imagem

  for (let i = 0; i < newHeight; i++) {
    for (let j = 0; j < newWidth; j++) {
      // Calcule a posição do pixel na nova imagem

      const position = (i * newWidth + j) * 4;

      // Calcule a posição do pixel na imagem original

      const x = Math.floor(j * ratioWidth);

      const y = Math.floor(i * ratioHeight);

      const originalPosition = (y * image.bitmap.width + x) * 4;

      // Copie os valores dos pixels

      newImage[position] = image.bitmap.data[originalPosition];

      newImage[position + 1] = image.bitmap.data[originalPosition + 1];

      newImage[position + 2] = image.bitmap.data[originalPosition + 2];

      newImage[position + 3] = image.bitmap.data[originalPosition + 3];
    }
  }

  // Crie uma nova imagem com os pixels calculados

  image.bitmap.data = Buffer.from(newImage);
  image.bitmap.width = newWidth;
  image.bitmap.height = newHeight;

  image.write("./assets/img-neighbor-interpolation.jpg");
}

module.exports = neighborInterpolation;
