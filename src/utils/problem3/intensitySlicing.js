async function intensitySlicing(
  image,
  lowerBound,
  upperBound,
  method,
  outputPath
) {
  try {
    // Percorre cada pixel da imagem
    image.scan(
      0,
      0,
      image.bitmap.width,
      image.bitmap.height,
      function (x, y, idx) {
        // Para cada pixel, obtenha os valores R, G, B
        const red = this.bitmap.data[idx];
        const green = this.bitmap.data[idx + 1];
        const blue = this.bitmap.data[idx + 2];

        // Converte para escala de cinza (média dos canais R, G, B)
        const gray = Math.round((red + green + blue) / 3);

        if (method === 0) {
          // Metodologia 0: Fatiamento binário (preto ou branco)
          if (gray >= lowerBound && gray <= upperBound) {
            // Se o valor estiver na faixa, defina como branco
            this.bitmap.data[idx] = 255;
            this.bitmap.data[idx + 1] = 255;
            this.bitmap.data[idx + 2] = 255;
          } else {
            // Caso contrário, defina como preto
            this.bitmap.data[idx] = 0;
            this.bitmap.data[idx + 1] = 0;
            this.bitmap.data[idx + 2] = 0;
          }
        } else if (method === 1) {
          // Metodologia 1: Clareia a faixa, mantém os outros níveis
          if (gray >= lowerBound && gray <= upperBound) {
            // Se o valor estiver na faixa, clareie (multiplicar por um fator)
            const brightenFactor = 1.5; // Fator para clarear
            this.bitmap.data[idx] = Math.min(
              255,
              Math.floor(red * brightenFactor)
            );
            this.bitmap.data[idx + 1] = Math.min(
              255,
              Math.floor(green * brightenFactor)
            );
            this.bitmap.data[idx + 2] = Math.min(
              255,
              Math.floor(blue * brightenFactor)
            );
          }
          // Caso contrário, não faz nada (mantém os valores originais)
        }
      }
    );

    // Salva a imagem resultante
    await image.write(outputPath);
    console.log(`Imagem fatiada salva em: ${outputPath}`);
  } catch (error) {
    console.error("Erro ao processar a imagem:", error);
  }
}

// Exporta a função para uso em outros arquivos
module.exports = intensitySlicing;
