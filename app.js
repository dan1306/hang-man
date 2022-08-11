const Countries = ["GHANA", "ROMANIA", "INDIA", "GERMANY", "CANADA"];

let body = [
  "#head",
  "#right-arm",
  "#left-arm",
  "#top-body",
  "#bottom-body",
  "#right-leg",
  "#left-leg",
];

const hangmanSymbols = [
  { "#head": "O" },
  { "#right-arm": "/" },
  { "#left-arm": `\\` },
  { "#top-body": "|" },
  { "#bottom-body": "|" },
  { "#right-leg": "/" },
  { "#left-leg": "\\" },
];

const Animals = ["DOG", "CAT", "LION", "ZEBRA", "SHARK"];

const Food = ["SALAD", "CHICKEN", "CHEESE", "RICE", "BREAD"];

const aClue = {
  "GHANA": "Second-largest producer of gold in Africa.",
  "ROMANIA": "It's home to the world's heaviest building.",
  "INDIA": "Cows are considered sacred",
  "GERMANY": "Has 1,000 Varieties of Sausages!",
  "CANADA": "Has 20% of the world's fresh water.",
  "DOG": "Have 18 muscles to move their ears.",
  "CAT": "Has 9 lives.",
  "LION": "Hunts in storms.",
  "ZEBRA": "Can run up to 65km per/hr.",
  "SHARK": "Do not have bones.",
  "SALAD": "Combination of vegies with hard bread and ceaser dressing.",
  "CHICKEN": "Able to distinguish colours.",
  "CHEESE": "Over 2000 varieties",
  "RICE": "Good for years.",
  "BREAD": "99% of UK household buy it.",
};

let categoryClicked = false;

let difficultyClicked = false;

let letterBoardActived = false;

let categorySelectedIndex = 0;

let lives = 7;

let hangManBodyIndex = -1;

let livesToStr = lives.toString();

let clickedLetters = [];

let catergorySelected;

let catergoryIndexSelected;

let difficultySelected;

let difficultyIndexSelected;

let wordToBeCompleted;

let wordArray;

let word_field;

let rightPlayerInputs;

let hint;

for (let i = 0; i < document.querySelectorAll(".buttonCategory").length; i++) {
  document
    .querySelectorAll(".buttonCategory")
    [i].addEventListener("click", function (e) {
      if (!categoryClicked && !difficultyClicked) {
        if (e.target.textContent == "Countries") {
          catergorySelected = Countries;
        } else if (e.target.textContent == "Animals") {
          catergorySelected = Animals;
        } else {
          catergorySelected = Food;
        }

        categoryClicked = true;

        catergoryIndexSelected = i;

        document.querySelector("#header-text").textContent =
          "Select Difficulty";

        document
          .querySelectorAll(".buttonCategory")
          [i].classList.remove("btn-warning");

        document
          .querySelectorAll(".buttonCategory")
          [i].classList.add("btn-outline-warning");

        document.querySelector(".categories").classList.add("disable");

        wordToBeCompleted = catergorySelected[categorySelectedIndex];
      }
    });
}

for (
  let i = 0;
  i < document.querySelectorAll(".buttonDifficulty").length;
  i++
) {
  document
    .querySelectorAll(".buttonDifficulty")
    [i].addEventListener("click", function (e) {
      if (categoryClicked && !difficultyClicked) {
        passDifficultyIndex(i, e);
      }
    });
}

for (
  let i = 0;
  i < document.querySelectorAll(".player-clickable-alphabets").length;
  i++
) {
  document
    .querySelectorAll(".player-clickable-alphabets")
    [i].addEventListener("click", function (e) {
      if (letterBoarActived) {
        difficulyBehaviour(difficultySelected, e, i);
      }
    });
}

document.querySelector(".Hint-button").addEventListener("click", function (e) {
  if (letterBoarActived) {
    hint = aClue[wordToBeCompleted];

    if (hint) {
      document.querySelector("#hintField").textContent = hint;
    }
  }
});

document.querySelector(".reset").addEventListener("click", function (e) {
    if (categoryClicked && difficultyClicked) {
        reset();
    }
});

function fillsWordArray() {
  let arr = [];

  for (let i = 0; i < wordToBeCompleted.length; i++) {
    arr.push("_ ");
  }

  return arr;
}

function fillWordField(arr) {
  let dashes = "";

  for (let i = 0; i < arr.length; i++) {
    dashes += arr[i];
  }

  return dashes;
}

function checkPlayerInput(letterPassed) {
  for (let i = 0; i < wordToBeCompleted.length; i++) {
    if (letterPassed == wordToBeCompleted[i]) {
      wordArray[i] = letterPassed;
    }
  }

  let dashOrLetter = "";

  for (let i = 0; i < wordArray.length; i++) {
    dashOrLetter += wordArray[i] + " ";
  }

  return dashOrLetter;
}

function reset() {
  categoryClicked = false;

  difficultyClicked = false;

  letterBoarActived = false;

  if (difficultyIndexSelected == 0) {
    document
      .querySelectorAll(".buttonDifficulty")
      [difficultyIndexSelected].classList.add("btn-success");

    document
      .querySelectorAll(".buttonDifficulty")
      [difficultyIndexSelected].classList.remove("btn-outline-success");
  } else {
    document
      .querySelectorAll(".buttonDifficulty")
      [difficultyIndexSelected].classList.add("btn-danger");

    document
      .querySelectorAll(".buttonDifficulty")
      [difficultyIndexSelected].classList.remove("btn-outline-danger");
  }

  document.querySelector("#header-text").textContent = "Select A Category";

  document
    .querySelectorAll(".buttonCategory")
    [catergoryIndexSelected].classList.add("btn-warning");

  document
    .querySelectorAll(".buttonCategory")
    [catergoryIndexSelected].classList.remove("btn-outline-warning");

  document.querySelector(".categories").classList.remove("disable");

  document.querySelector(".difficulty").classList.remove("disable");

  clickedLetters = [];

  document.querySelector("#hintField").textContent = "Hint Goes Here";

  for (let i = 0; i < document.querySelectorAll(".rightOrWrong").length; i++) {
    if (
      document.querySelectorAll(".rightOrWrong")[i].classList.contains("red")
    ) {
      document.querySelectorAll(".rightOrWrong")[i].classList.remove("red");
    } else {
      document.querySelectorAll(".rightOrWrong")[i].classList.remove("green");
    }
  }

  for (
    let i = 0;
    i < document.querySelectorAll(".player-clickable-alphabets").length;
    i++
  ) {
    document
      .querySelectorAll(".player-clickable-alphabets")
      [i].classList.remove("disable");
  }

  categorySelectedIndex = 0;

  document.querySelector(".progression").innerHTML = `<h1>0/0</h1>`;

  document.querySelector(".fieldInput").textContent = "_ _ _ _ _ _ _";

  lives = 7;

  livesToStr = lives.toString();

  document.querySelector("#countdown").textContent = livesToStr;

  hangManBodyIndex = -1;
}

function playAsound(rightOrWrong) {
  var audio = new Audio("./Sound-Effects/" + rightOrWrong + ".wav");

  audio.play();
}

function difficulyBehaviour(passAdifficulty, e, i) {
  if (e.target.textContent == "") {
  } else {
    if (
      wordToBeCompleted.includes(e.target.textContent) &&
      clickedLetters.includes(e.target.textContent) == false
    ) {
      playAsound("right");

      document.querySelectorAll(".rightOrWrong")[i].classList.add("green");

      clickedLetters.push(e.target.textContent);

      document
        .querySelectorAll(".player-clickable-alphabets")
        [i].classList.add("disable");

      rightPlayerInputs = checkPlayerInput(e.target.textContent);

      document.querySelector(".fieldInput").textContent = rightPlayerInputs;

      if (rightPlayerInputs.includes("_") == false) {
        if (passAdifficulty == "Easy") {
          for (let i = 0; i < body.length; i++) {
            document.querySelector(body[i]).textContent = "";
          }

          lives = 7;

          hangManBodyIndex = -1;

          livesToStr = lives.toString();

          document.querySelector("#countdown").textContent = livesToStr;
        }

        document.querySelector("#hintField").textContent = "Hint Goes Here";

        categorySelectedIndex++;

        if (categorySelectedIndex < catergorySelected.length) {
          wordToBeCompleted = catergorySelected[categorySelectedIndex];

          wordArray = fillsWordArray();

          word_field = fillWordField(wordArray);

          document.querySelector(".fieldInput").textContent = word_field;

          for (
            let i = 0;
            i < document.querySelectorAll(".rightOrWrong").length;
            i++
          ) {
            if (
              document
                .querySelectorAll(".rightOrWrong")
                [i].classList.contains("red")
            ) {
              document
                .querySelectorAll(".rightOrWrong")
                [i].classList.remove("red");
            } else {
              document
                .querySelectorAll(".rightOrWrong")
                [i].classList.remove("green");
            }
          }

          for (
            let i = 0;
            i < document.querySelectorAll(".player-clickable-alphabets").length;
            i++
          ) {
            document
              .querySelectorAll(".player-clickable-alphabets")
              [i].classList.remove("disable");
          }

          clickedLetters = [];

          document.querySelector(
            ".progression"
          ).innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`;
        } else {
          document.querySelector(
            ".progression"
          ).innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`;

          document.querySelector("#hintField").textContent =
            "You have Completed Every Word Click RESET";

          letterBoarActived = false;
        }
      }
    } else if (
      clickedLetters.includes(e.target.textContent) == false &&
      wordToBeCompleted.includes(e.target.textContent) == false
    ) {
      playAsound("wrong");

      document.querySelectorAll(".rightOrWrong")[i].classList.add("red");

      lives -= 1;

      hangManBodyIndex += 1;

      livesToStr = lives.toString();

      document.querySelector(body[hangManBodyIndex]).textContent =
        hangmanSymbols[hangManBodyIndex][body[hangManBodyIndex]];

      clickedLetters.push(e.target.textContent);

      document
        .querySelectorAll(".player-clickable-alphabets")
        [i].classList.add("disable");

      document.querySelector("#countdown").textContent = livesToStr;

      if (lives == 0) {
        letterBoarActived = false;

        document.querySelector("#hintField").textContent =
          "You Have Run Out Of Lives Click RESET To Start Over";
      }
    }
  }
}

function passDifficultyIndex(num, e) {
  difficultySelected = e.target.textContent;

  difficultyClicked = true;

  difficultyIndexSelected = num;

  document.querySelector("#header-text").textContent =
    "Letter Board Is Now Active To Make A Change Click RESET";

  if (num == 0) {
    document
      .querySelectorAll(".buttonDifficulty")
      [num].classList.remove("btn-success");

    document
      .querySelectorAll(".buttonDifficulty")
      [num].classList.add("btn-outline-success");
  } else {
    document
      .querySelectorAll(".buttonDifficulty")
      [num].classList.remove("btn-danger");

    document
      .querySelectorAll(".buttonDifficulty")
      [num].classList.add("btn-outline-danger");
  }

  document.querySelector(".difficulty").classList.add("disable");

  letterBoarActived = true;

  livesToStr = lives.toString();

  document.querySelector("#countdown").textContent = livesToStr;

  wordArray = fillsWordArray();

  word_field = fillWordField(wordArray);

  document.querySelector(".fieldInput").textContent = word_field;

  document.querySelector(
    ".progression"
  ).innerHTML = `<h1>${categorySelectedIndex.toString()}/${catergorySelected.length.toString()}</h1>`;

  for (let a = 0; a < body.length; a++) {
    document.querySelector(body[a]).textContent = "";
  }
}