const readline = require("readline");
const readImg = require("./readImg");
const neighborInterpolation = require("./neighborInterpolation");
const bilinearInterpolation = require("./bilinearInterpolation");
const bicubicInterpolation = require("./bicubicInterpolation");

const createNegative = require("./problem3/negative");
const logTransform = require("./problem3/logTransform");
const powerTransform = require("./problem3/powerTransform");
const contrastStretching = require("./problem3/contrastStretching");
const bitPlaneSlicing = require("./problem3/bitPlaneSlicing");
const generateHistogram = require("./problem3/generateHistogram");
const intensitySlicing = require("./problem3/intensitySlicing");
const equalizeHistogram = require("./problem3/equalizeHistogram");

const applyCorrelation = require("./problem4/correlation");
const applyConvolution = require("./problem4/convolution");
const filters = require("./problem4/meanFilter");
const applyLaplacianFilter = require("./problem4/laplacianFilter");

// Criação da interface para ler entradas do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function getImage() {
  const image = await readImg("./src/teste.jpg");
  // const image = await readImg("./src/teste2.png");
  // const image = await readImg("./src/teste3.png");

  return image;
}

// Função para exibir o menu principal
function showMainMenu() {
  console.clear(); // Limpa o terminal
  console.log("\n===== MENU PRINCIPAL =====");
  console.log("1. Redimensionamento de imagens");
  console.log("2. Transformações geométricas");
  console.log("3. Transformações de intensidade");
  console.log("4. Filtragem espacial");
  console.log("5. Sair");

  rl.question("Escolha uma opção: ", (choice) => {
    switch (choice) {
      case "1":
        showSubMenu1();
        break;
      case "2":
        showSubMenu2();
        break;
      case "3":
        showSubMenu3();
        break;
      case "4":
        showSubMenu4();
        break;
      case "5":
        console.log("Saindo...");
        rl.close(); // Encerra o programa
        break;
      default:
        console.log("Opção inválida!");
        showMainMenu(); // Exibe o menu principal novamente
        break;
    }
  });
}

// Função para exibir o submenu correspondente à opção selecionada
async function showSubMenu1() {
  console.clear(); // Limpa o terminal
  console.log(`\n===== REDIMENSIONAMENTO =====`);
  console.log("a. Interpolação por vizinhos mais próximo");
  console.log("b. Interpolação bilinear");
  console.log("c. Interpolação bi-cúbica");
  console.log("d. Voltar ao menu principal");

  const image = await getImage();

  rl.question("Escolha uma sub-opção: ", (subChoice) => {
    switch (subChoice) {
      case "a":
        console.log(`Você escolheu (Interpolação por vizinho mais próximo)`);
        neighborInterpolation(image, 200, 200);
        rl.close();

        break;
      case "b":
        console.log(`Você escolheu (Interpolação bilinear)`);
        bilinearInterpolation(image, 200, 200);
        rl.close();

        break;
      case "c":
        console.log(`Você escolheu (Interpolação bi-cúbica)`);
        bicubicInterpolation(image, 200, 200);
        rl.close();

        break;
      case "d":
        showMainMenu();

        break;
      default:
        console.log("Sub-opção inválida!");
        rl.question("\nPressione Enter para continuar...", () =>
          showSubMenu1()
        );
        break;
    }
  });
}

async function showSubMenu3() {
  console.clear(); // Limpa o terminal
  console.log(`\n===== Intensidade =====`);
  console.log("a. Negativo");
  console.log("b. Transformação logarítmica");
  console.log("c. Transformação de potência");
  console.log("d. Alargamento de contraste");
  console.log("e. Fatiamento - Metodologia 0");
  console.log("f. Fatiamento - Metodologia 1");
  console.log("g. Fatiamento de Níveis de bit");
  console.log("h. Histograma");
  console.log("i. Equalização e especificação de histograma");
  console.log("j. Media e Variância");
  console.log("k. Voltar ao menu principal");

  const image = await getImage();

  rl.question("Escolha uma sub-opção: ", async (subChoice) => {
    switch (subChoice) {
      case "a":
        console.log(`Você escolheu (Negativo)`);
        createNegative(image);
        rl.close();

        break;
      case "b":
        console.log(`Você escolheu (Transformação logarítmica)`);
        logTransform(image);
        rl.close();

        break;
      case "c":
        console.log(`Você escolheu (Transformação de potência)`);
        powerTransform(image, 0.5);
        rl.close();

        break;
      case "d":
        console.log(`Você escolheu (Alargamento de contraste)`);
        contrastStretching(image);
        rl.close();

        break;

      case "e":
        console.log(`Você escolheu (Fatiamento - Metodologia 0)`);
        intensitySlicing(
          image,
          130,
          150,
          0,
          "./assets/fatiamento-metodologia-0.png"
        );
        rl.close();

        break;

      case "f":
        console.log(`Você escolheu (Fatiamento - Metodologia 1)`);
        intensitySlicing(
          image,
          100,
          150,
          1,
          "./assets/fatiamento-metodologia-1.png"
        );

        rl.close();

        break;

      case "g":
        console.log(`Você escolheu (Fatiamento de Níveis de bit)`);
        bitPlaneSlicing(image, 0, "./assets/fatiamento/bit-0.png");
        const image1 = await getImage();
        bitPlaneSlicing(image1, 1, "./assets/fatiamento/bit-1.png");
        const image2 = await getImage();
        bitPlaneSlicing(image2, 2, "./assets/fatiamento/bit-2.png");
        const image3 = await getImage();
        bitPlaneSlicing(image3, 3, "./assets/fatiamento/bit-3.png");
        const image4 = await getImage();
        bitPlaneSlicing(image4, 4, "./assets/fatiamento/bit-4.png");
        const image5 = await getImage();
        bitPlaneSlicing(image5, 5, "./assets/fatiamento/bit-5.png");
        const image6 = await getImage();
        bitPlaneSlicing(image6, 6, "./assets/fatiamento/bit-6.png");
        const image7 = await getImage();
        bitPlaneSlicing(image7, 7, "./assets/fatiamento/bit-7.png");
        rl.close();

        break;

      case "h":
        console.log(`Você escolheu (Histograma)`);
        const histogram = await generateHistogram(image);
        console.log("Histograma do canal vermelho (R):", histogram.red);
        console.log("Histograma do canal verde (G):", histogram.green);
        console.log("Histograma do canal azul (B):", histogram.blue);
        console.log("Histograma em escala de cinza:", histogram.gray);
        rl.close();

        break;

      case "i":
        console.log(`Você escolheu (Equalização de histograma)`);
        equalizeHistogram(image, "./assets/equalizacao-histograma.png");
        rl.close();

        break;

      case "j":
        console.log(`Você escolheu (Fatiamento Mais Significativo)`);
        bitPlaneSlicing(image, 7);
        rl.close();

        break;

      case "k":
        showMainMenu();
        break;
      default:
        console.log("Sub-opção inválida!");
        rl.question("\nPressione Enter para continuar...", () =>
          showSubMenu3()
        );
        break;
    }
  });
}

async function showSubMenu4() {
  console.clear(); // Limpa o terminal
  console.log(`\n===== FILTRAGEM =====`);
  console.log("a. Correlação");
  console.log("b. Convolução");
  console.log("c. Media, Média Ponderada e Mediana");
  console.log("d. Transformada de Laplace");
  console.log("e. Nitidez e High-boost");
  console.log("f. Sobel e Roberts");
  console.log("g. Voltar ao menu principal");

  const image = await getImage();
  const blurKernel = [
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
    1 / 9,
  ];

  rl.question("Escolha uma sub-opção: ", async (subChoice) => {
    switch (subChoice) {
      case "a":
        console.log(`Você escolheu (Correlação)`);
        applyCorrelation(image, blurKernel, "./assets/correlacao.png");
        rl.close();

        break;
      case "b":
        console.log(`Você escolheu (Convolução)`);
        applyConvolution(image, blurKernel, "./assets/convolucao.png");

        rl.close();

        break;
      case "c":
        console.log(
          `Você escolheu (FIltro de Média, Média Ponderada e Mediana)`
        );

        filters.applyMeanFilter(image, "./assets/filtro-media.png");
        const image1 = await getImage();
        filters.applyWeightedMeanFilter(
          image1,
          "./assets/filtro-media-ponderada.png"
        );
        const image2 = await getImage();
        filters.applyMedianFilter(image2, "./assets/filtro-mediana.png");
        rl.close();

        break;
      case "d":
        console.log(`Você escolheu (Transformada de Laplace)`);
        applyLaplacianFilter(image, "./assets/laplaciano.png");
        rl.close();

        break;

      case "e":
        console.log(`Você escolheu (Fatiamento - Metodologia 0)`);
        intensitySlicing(
          image,
          130,
          150,
          0,
          "./assets/fatiamento-metodologia-0.png"
        );
        rl.close();

        break;

      case "f":
        console.log(`Você escolheu (Fatiamento - Metodologia 1)`);
        intensitySlicing(
          image,
          100,
          150,
          1,
          "./assets/fatiamento-metodologia-1.png"
        );

        rl.close();

        break;

      case "g":
        showMainMenu();
        break;
      default:
        console.log("Sub-opção inválida!");
        rl.question("\nPressione Enter para continuar...", () =>
          showSubMenu3()
        );
        break;
    }
  });
}

module.exports = showMainMenu;
