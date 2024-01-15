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

// generateDivs("div", gallow, 1, "man");

const man = document.querySelector(".man");
generateDivs("img", gallow, 1, "gallow_img");
const gallow_img = document.querySelector(".gallow_img");
gallow_img.src = "img/hang_back.png";

generateDivs("div", gallow, 1, "man_head hidden");
generateDivs("div", gallow, 1, "man_body hidden");
generateDivs("div", gallow, 1, "man_larm hidden");
generateDivs("div", gallow, 1, "man_rarm hidden");
generateDivs("div", gallow, 1, "man_lleg hidden");
generateDivs("div", gallow, 1, "man_rleg hidden");
generateDivs("div", field, 1, "field_key");
generateDivs("div", field, 1, "field_word");
generateDivs("div", field, 1, "field_errors");
generateDivs("div", field, 1, "field_keyboard");

const man_head = document.querySelector(".man_head");
man_head.innerHTML = "O";

const man_body = document.querySelector(".man_body");
man_body.innerHTML = "|";

const man_larm = document.querySelector(".man_larm");
man_larm.innerHTML = "/";

const man_rarm = document.querySelector(".man_rarm");
man_rarm.innerHTML = "\\";

const man_lleg = document.querySelector(".man_lleg");
man_lleg.innerHTML = "/";

const man_rleg = document.querySelector(".man_rleg");
man_rleg.innerHTML = "\\";

const word = document.querySelector(".field_word");
const field_key = document.querySelector(".field_key");
const field_keyboard = document.querySelector(".field_keyboard");
const field_errors = document.querySelector(".field_errors");

field_errors.innerHTML = "Incorrect guesses: 0/6";
const number = Math.floor(Math.random(10) * 10);
function generateWord() {
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
const key_result = generateWord()[1];

function displayWord(secretWord) {
  word.innerHTML = "";
  field_key.textContent = key_result;
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

const man_parts = [
  "man_head",
  "man_body",
  "man_larm",
  "man_rarm",
  "man_lleg",
  "man_rleg",
];

window.addEventListener("keydown", function (e) {
  const letter = document.querySelector(`.key[data="${e.code}"]`);
  if (
    letter.classList[1] === "--unvailable" ||
    letter.classList[1] === "--done"
  ) {
    letter.preventDefault();
  }
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
  } else {
    this.document.querySelector(`.${man_parts[errors]}`).classList =
      this.document
        .querySelector(`.${man_parts[errors]}`)
        .className.split(" ")[0];

    letter.classList.add("--unvailable");
    errors += 1;
    field_errors.innerHTML = `Incorrect guesses: ${errors}/6`;
    end();
  }

  check_correct();
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
      end();
    }
  }
  check_correct();
});

const button = document.createElement("button");
button.setAttribute("type", "button");
button.classList.add("btn");
button.textContent = "New game";
button.addEventListener("click", () => {
  location.reload();
});

function end() {
  if (errors === 6) {
    const end = document.createElement("div");
    end.className = "end";
    end.innerHTML = `You lost! =( <br> The correct word: ${word_result} <br> Try again! <br>`;
    container.append(end);
    end.append(button);
  }
}

function check_correct() {
  const len = word_result.length;
  let i = len;
  document.querySelectorAll(".letter").forEach((item) => {
    if (item.textContent !== "_") {
      i -= 1;
    }
    if (i === 0) {
      const win = document.createElement("div");
      win.className = "end";
      win.innerHTML = `You win! =) <br> The correct word: ${word_result} <br> Try again! <br>`;
      container.append(win);
      win.append(button);
    }
  });
}
