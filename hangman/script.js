const body = document.querySelector("body");
let errors = 0;
let correct = 0;

function generateDivs(type, parentElement, count, className) {
  for (let i = 0; i < count; i++) {
    const div = document.createElement(type);
    div.className = className;
    parentElement.append(div);
  }
}
generateDivs("main", body, 1, "container");

const container = document.querySelector(".container");

generateDivs("div", container, 1, "gallow");
generateDivs("div", container, 1, "field");

const gallow = document.querySelector(".gallow");
const field = document.querySelector(".field");
const field_part = document.querySelector(".field_part");

generateDivs("div", gallow, 1, "man");

const man = document.querySelector(".man");
generateDivs("img", gallow, 1, "gallow_img");
const gallow_img = document.querySelector(".gallow_img");
gallow_img.src =
  "img/628ecd90da6f2872bbf7995f_Hangman Floor_In this series_680x906px.jpg";

generateDivs("div", man, 5, "man_part");
generateDivs("div", field, 1, "field_key");
generateDivs("div", field, 1, "field_word");
generateDivs("div", field, 1, "field_errors");
generateDivs("div", field, 1, "field_keyboard");

const word = document.querySelector(".field_word");
const field_key = document.querySelector(".field_key");
const field_keyboard = document.querySelector(".field_keyboard");
const field_errors = document.querySelector(".field_errors");

field_errors.innerHTML = "Incorrect guesses: 0/6";

// function errors() {

// }

function generateWord() {
  const number = Math.floor(Math.random(10) * 10);
  const words = [
    "elephant",
    "giraffe",
    "technology",
    "adventure",
    "chocolate",
    "galaxy",
    "jazz",
    "mysterious",
    "puzzle",
    "dragon",
  ];
  const descriptions = [
    "A large mammal with tusks and a long trunk, native to Africa and Asia",
    "A tall, long-necked herbivorous mammal native to Africa, known for its distinctive spotted coat",
    "The application of scientific knowledge for practical purposes, especially in industries and commerce",
    "An exciting or daring experience, often involving exploration, risk, and unexpected event",
    "A sweet, brown food substance made from roasted and ground cacao seeds, often used in desserts",
    "A vast system of stars, gas, dust, and dark matter held together by gravity, such as our Milky Way",
    "A genre of music that originated in the African-American communities, characterized by improvisation and syncopation",
    "Something that is difficult to understand or explain, often creating a sense of curiosity or wonder",
    "A game or problem designed to test one's knowledge, skill, or ingenuity",
    "Mythical creatures often depicted as large, fire-breathing reptiles with wings and sharp claws",
  ];
  return [words[number], descriptions[number]];
}

const word_result = generateWord()[0];

function displayWord(secretWord) {
  word.innerHTML = "";
  field_key.textContent = generateWord()[1];
  for (let i = 0; i < secretWord.length; i++) {
    const letterDiv = document.createElement("div");
    letterDiv.className = "letter";
    letterDiv.textContent = "_";
    word.appendChild(letterDiv);
  }
}

displayWord(word_result);

const keyboard = [
  113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 97, 115, 100, 102, 103, 104,
  106, 107, 108, 122, 120, 99, 118, 98, 110, 109,
];

function init() {
  let out = "";
  for (let i = 0; i < keyboard.length; i++) {
    out +=
      `<div class="key" data="Key${String.fromCharCode(
        keyboard[i]
      ).toUpperCase()}">` +
      String.fromCharCode(keyboard[i]) +
      "</div>";
  }
  field_keyboard.innerHTML = out;
}

init();

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  const letter = document.querySelector(`.key[data="${e.code}"]`);
  if (word_result.includes(letter.textContent)) {
    letter.classList.add("--done");
    let count = 0;
    const result = word_result.split("");
    document.querySelectorAll(".letter").forEach((elem) => {
      if (count === result.indexOf(letter.textContent)) {
        elem.textContent = result[count];
        result.splice(count, 1, 0);
      }
      count += 1;
    });
    if (count === word_result.length - 1) {
      this.alert("YOU WON!");
    }
  } else {
    letter.classList.add("--unvailable");
    errors += 1;
    field_errors.innerHTML = `Incorrect guesses: ${errors}/6`;
  }
});

field_keyboard.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.className === "key") {
    if (word_result.includes(e.target.textContent)) {
      e.target.classList.add("--done");
      let count = 0;
      const result = word_result.split("");
      document.querySelectorAll(".letter").forEach((elem) => {
        if (count === result.indexOf(e.target.textContent)) {
          elem.textContent = result[count];
          result.splice(count, 1, 0);
        }
        count += 1;
      });
    } else {
      e.target.classList.add("--unvailable");
      errors += 1;
      field_errors.innerHTML = `Incorrect guesses: ${errors}/6`;
    }
  }
});
