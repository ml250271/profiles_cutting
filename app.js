const profileSize = 10;
const inputQueue = [];
const pieceSize = document.getElementById("size");
const pieceAmount = document.getElementById("amount");
const sectionInputQueue = document.getElementById("input-queue");
const form = document.getElementById("piece-form");
const sectionShowResult = document.getElementById("show-result");

function onSubmit(event) {
  event.preventDefault();

  inputQueue.push({
    pieceSize: Number(pieceSize.value),
    pieceAmount: Number(pieceAmount.value)
  });
  createHtml();
  pieceSize.focus();
}

function createHtml() {
  const newHTML = inputQueue
    .map((input, i) => {
      return `<p>${input.pieceSize}m x ${
        input.pieceAmount
      }kom</p><button id="${i}" onClick="removeInput(${i})">remove</button>`;
    })
    .join("");

  sectionInputQueue.innerHTML = newHTML;
  form.reset();
}

function removeInput(buttonId) {
  inputQueue.splice(buttonId, 1);
  createHtml();
}

function displayResult() {
  const piecesToCut = [];
  inputQueue.forEach(inputObj => {
    for (let i = 0; i < inputObj.pieceAmount; i++) {
      piecesToCut.push(inputObj.pieceSize);
    }
  });
  const resultArray = mainCounting(piecesToCut);
  console.log(resultArray);
  const htmlResult = [];
  resultArray.forEach((profile, i) => {
    htmlResult.push(`<p>Spisak dimenzija za profil ${i + 1}: (${profile}) <p>`);
  });
  console.log(htmlResult.join(""));

  sectionShowResult.innerHTML = htmlResult;
}

function mainCounting(pieces) {
  let resultArray = [];
  pieces.sort((a, b) => b - a); // [9,7,6,5,4,3,2,2];
  console.log("sorted pieces " + pieces);

  pieces.forEach(piece => {
    const availablePlace = resultArray.findIndex(subarray => {
      return profileSize - subarray.reduce((a, b) => a + b) >= piece;
    });

    if (availablePlace < 0) {
      resultArray.push([piece]);
    } else {
      resultArray[availablePlace].push(piece);
    }
  });
  resultArray.sort((a, b) => {
    return b.reduce((c, d) => c + d) - a.reduce((c, d) => c + d);
  });
  return resultArray;
}
