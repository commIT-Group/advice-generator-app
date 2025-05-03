const button = document.getElementById("new-advice");
const root = document.documentElement;

// Event listeners
document.addEventListener("DOMContentLoaded", getAdvice()); // for first advice

button.addEventListener("click", () => {
  getAdvice();
  randomizeAccentColor();
});

// API function
function getAdvice() {
  const API = `https://api.adviceslip.com/advice?timestamp=${Date.now()}`;

  fetch(API)
    .then((response) => {
      return response.json(); // this will convert response to json
    })
    .then((data) => {
      const rawAdvice = data.slip.advice;
      const fixedAdvice = fixDoubleEncodedUTF8(rawAdvice);
      const adviceId = data.slip.id;

      document.getElementById("advice-text").textContent = fixedAdvice;
      document.querySelector("h1").textContent = `ADVICE #${adviceId}`;
    })
    .catch((error) => {
      console.error(error);
    });
}

// UTF-8 misencoding fix
// note: escape() is deprecated so it shouldn't be used for URI encoding,
// but were're using it to fix the double encoding that's causing the issue
// This approach works because:
// escape() converts the misinterpreted characters into percent-encoded sequences.
// decodeURIComponent() then decodes these sequences back into the correct characters.
// decoreURIComponent() alone doesn't fix the issue
// 
function fixDoubleEncodedUTF8(str) {
  try {
    return decodeURIComponent(escape(str));
  } catch (e) {
    return str;
  }
}

// Color randomization
const footer = document.querySelectorAll(".footer-link");
// Above returns an array-like object; we have to loop through it
footer.forEach((link) => {
  link.addEventListener("mouseenter", randomizeLinkColor);
});
// https://bobbyhadz.com/blog/javascript-addeventlistener-is-not-a-function
// https://flaviocopes.com/how-to-add-event-listener-multiple-elements-javascript/

function randomizeLinkColor() {
  root.style.setProperty("--ft-rand-color", getRandomColor());
}

function randomizeAccentColor() {
  root.style.setProperty("--accent", getRandomColor());
}

function getRandomColor() {
  let hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 66%)`;
}
