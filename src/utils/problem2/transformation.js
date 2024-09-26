function stepFunction(r) {
  return r < 128 ? 0 : 255; // Valores abaixo de 128 se tornam 0, acima se tornam 255
}

function rampFunction(r) {
  return r; // A função rampa é linear
}

function sinusoidalFunction(r) {
  return Math.floor(127.5 * (1 + Math.sin((Math.PI * r) / 255))); // Senoidal
}

function gaussianFunction(r) {
  const mean = 128;
  const stdDev = 50;
  const expPart = Math.exp(-((r - mean) ** 2) / (2 * stdDev ** 2));
  return Math.floor(255 * expPart); // Normaliza para 0-255
}

function sigmoidFunction(r) {
  const gain = 0.1; // Controle do ganho
  return Math.floor(255 / (1 + Math.exp(-gain * (r - 128)))); // Função sigmoide
}

async function applyTransformation(image, transformFunction) {
  const width = image.bitmap.width;
  const height = image.bitmap.height;

  return new Promise((resolve) => {
    image.scan(0, 0, width, height, function (x, y, idx) {
      // Acessa os canais de cor
      const red = image.bitmap.data[idx];
      const green = image.bitmap.data[idx + 1];
      const blue = image.bitmap.data[idx + 2];

      // Aplica a transformação a cada canal
      image.bitmap.data[idx] = transformFunction(red);
      image.bitmap.data[idx + 1] = transformFunction(green);
      image.bitmap.data[idx + 2] = transformFunction(blue);
      image.bitmap.data[idx + 3] = 255; // Alpha
    });

    resolve(image);
  });
}

module.exports = {
  applyTransformation,
  stepFunction,
  rampFunction,
  sinusoidalFunction,
  gaussianFunction,
  sigmoidFunction,
};
