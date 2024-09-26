const { Jimp } = require("jimp");

async function readImg(url) {
  try {
    // Use await para esperar o carregamento da imagem
    const image = await Jimp.read(url);
    return image; // Retorne a imagem carregada
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = readImg; // Exportar a função corretamente
