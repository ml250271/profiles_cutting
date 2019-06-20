const profileSize = 10;
const inputQueue = [];

function onSubmit(event) {
  event.preventDefault();
  const pieceSize = document.getElementById("size");
  const pieceAmount = document.getElementById("amount");

  inputQueue.push({
    pieceSize: Number(pieceSize.value),
    pieceAmount: Number(pieceAmount.value)
  });
  const newHTML = inputQueue
    .map(input => {
      return `<p>${input.pieceSize}m X ${
        input.pieceAmount
      }</p><button onClick="alert('hi')">remove</button>`;
    })
    .join("");

  document.getElementById("input-queue").innerHTML = newHTML;
  document.getElementById("piece-form").reset();
  pieceSize.focus();
  console.log(newHTML);
}

function createPieces() {
  const piecesToCut = [];
  inputQueue.forEach(inputObj => {
    for (let i = 0; i < inputObj.pieceAmount; i++) {
      piecesToCut.push(inputObj.pieceSize);
    }
  });
  mainCounting(piecesToCut);
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
  console.table("rarr", resultArray);
}
