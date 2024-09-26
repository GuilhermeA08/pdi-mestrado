// Função auxiliar para o cálculo do peso bicúbico
function cubicWeight(t) {
  const a = -0.5;
  const absT = Math.abs(t);
  if (absT <= 1) {
    return (a + 2) * Math.pow(absT, 3) - (a + 3) * Math.pow(absT, 2) + 1;
  } else if (absT <= 2) {
    return (
      a * Math.pow(absT, 3) - 5 * a * Math.pow(absT, 2) + 8 * a * absT - 4 * a
    );
  }
  return 0;
}

// Função principal para interpolação bicúbica
function bicubicInterpolation(image, width, height) {
  const newWidth = width;
  const newHeight = height;

  const ratioWidth = image.bitmap.width / newWidth;
  const ratioHeight = image.bitmap.height / newHeight;

  let newImage = new Array(newWidth * newHeight * 4);

  // Função auxiliar para ler o valor de um pixel com segurança (evitar ultrapassar os limites)
  function getPixelValue(x, y, channel) {
    x = Math.max(0, Math.min(image.bitmap.width - 1, x));
    y = Math.max(0, Math.min(image.bitmap.height - 1, y));
    return image.bitmap.data[(y * image.bitmap.width + x) * 4 + channel];
  }

  // Percorre os pixels da nova imagem
  for (let i = 0; i < newHeight; i++) {
    for (let j = 0; j < newWidth; j++) {
      const x = j * ratioWidth;
      const y = i * ratioHeight;
      const x1 = Math.floor(x);
      const y1 = Math.floor(y);

      const dx = x - x1;
      const dy = y - y1;

      // Itera por cada canal (R, G, B)
      for (let c = 0; c < 3; c++) {
        let result = 0;

        // Bicubic: 4x4 matriz de vizinhos
        for (let m = -1; m <= 2; m++) {
          for (let n = -1; n <= 2; n++) {
            const pixelValue = getPixelValue(x1 + m, y1 + n, c);
            const weightX = cubicWeight(m - dx);
            const weightY = cubicWeight(n - dy);
            result += pixelValue * weightX * weightY;
          }
        }

        const position = (i * newWidth + j) * 4;
        newImage[position + c] = Math.min(Math.max(result, 0), 255); // Limita entre 0 e 255
      }

      // Mantém o valor do canal alfa (opacidade)
      newImage[(i * newWidth + j) * 4 + 3] = 255; // Opacidade máxima
    }
  }

  // Atualiza a imagem com os novos pixels
  image.bitmap.data = Buffer.from(newImage);
  image.bitmap.width = newWidth;
  image.bitmap.height = newHeight;

  // Salva a imagem interpolada
  image.write("./assets/img-bicubic-interpolation.jpg");
}

module.exports = bicubicInterpolation;
