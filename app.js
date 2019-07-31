const profileSize = 600;
const inputQueue = [];
const pieceSize = document.getElementById("size");
const pieceAmount = document.getElementById("amount");
const sectionInputQueue = document.getElementById("input-queue");
const form = document.getElementById("piece-form");
const sectionShowResult = document.getElementById("show-result");

function onSubmit(event) {
  event.preventDefault();
  const sizeInput = document.getElementById("size");
  const amountInput = document.getElementById("amount");
  const sizeInputValue = Number(sizeInput.value);
  const amountInputValue = Number(amountInput.value);

  sizeInput.classList.remove("is-danger");
  amountInput.classList.remove("is-danger");

  if (
    sizeInputValue <= 0 ||
    (sizeInputValue > profileSize && amountInputValue <= 0)
  ) {
    (!sizeInputValue || sizeInputValue > profileSize) &&
      sizeInput.classList.add("is-danger");
    !amountInputValue && amountInput.classList.add("is-danger");
  } else {
    inputQueue.push({
      pieceSize: Number(sizeInputValue),
      pieceAmount: Number(amountInputValue)
    });
    createHtml();
  }

  pieceSize.focus();
}

function createHtml() {
  const newHTML = inputQueue
    .map((input, i) => {
      return `<div class="is-level"><span class="tag is-success is-large">${
        input.pieceSize
      } m x ${
        input.pieceAmount
      } kom<button class="delete" onClick="removeInput(${i})"></button></span></div>`;
    })
    .join("");

  console.log(newHTML);

  sectionInputQueue.innerHTML = newHTML;
  form.reset();
}

function removeInput(buttonId) {
  inputQueue.splice(buttonId, 1);
  createHtml();
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function displayResult() {
  if (inputQueue.length < 1) {
    return;
  }
  const piecesToCut = [];
  inputQueue.forEach(inputObj => {
    for (let i = 0; i < inputObj.pieceAmount; i++) {
      piecesToCut.push(inputObj.pieceSize);
    }
  });
  const resultArray = mainCounting(piecesToCut);
  console.log(resultArray);
  const restArray = resultArray.map(profile => {
    return (
      profileSize -
      profile.reduce((t, e) => {
        return (t += e);
      })
    );
  });

  const newHtml =
    `<div>Broj potrebnih profila je ${resultArray.length}:</div>` +
    `<div>Ostatak, redom: ${restArray}</div><br>` +
    resultArray
      .map(profile => {
        const restOfProfile =
          profileSize -
          profile.reduce((total, el) => {
            return (total += el);
          });
        const piecesHtml = profile.map(
          piece =>
            `<div class="piece" style="width: ${(piece * 100) /
              profileSize}%; background-color: ${getRandomColor()}">${piece}cm</div>`
        );
        return `<div class="wrapper">${piecesHtml.join(
          ""
        )} &${restOfProfile}cm</div>`;
      })
      .join("");
  console.log(newHtml);

  document.getElementById("show-result").innerHTML = newHtml;
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
