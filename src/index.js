const readImg = require("./utils/readImg");
const showMainMenu = require("./utils/menu");
const bicubicInterpolation = require("./utils/bicubicInterpolation");

async function main() {
  const image = await readImg("./src/teste.jpg");

  console.log("Width da imagem:", image.bitmap.width);
  console.log("Height da imagem:", image.bitmap.height);
  // =============================================================================================

  await bicubicInterpolation(image, 300, 300);

  console.log("Imagem interpolada com sucesso!");
  process.exit();
}

// main();

showMainMenu();
