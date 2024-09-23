const Jimp = require("jimp");

async function main() {
  const image = Jimp.Jimp.read("./6_thumbnail.jpg");

  (await image).invert().write("imagem-invertida.jpg");
}

main();
