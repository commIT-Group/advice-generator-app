const button = document.getElementById("new-advice");
const root = document.documentElement;

// Event listeners
document.addEventListener("DOMContentLoaded", getAdvice); // for first advice
button.addEventListener("click", () => {
  getAdvice; // for first advice
  randomizeAccentColor();
}); // for subsequent advices
button.addEventListener("click", getAdvice); // for subsequent advices

// API function
function getAdvice() {
  const API = `https://api.adviceslip.com/advice?=${new Date().getTime()}`;

  fetch(API)
    .then((response) => {
      return response.json(); // this will convert response to json
    })
    .then((data) => {
      const advice = data.slip.advice;
      const adviceId = data.slip.id;
      document.getElementById("advice-text").textContent = advice;
      document.querySelector("h1").textContent = "ADVICE #".concat(adviceId);
    })
    .catch((error) => {
      console.error(error);
    });
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
  root.style.setProperty("--p-green", getRandomColor());
}

function getRandomColor() {
  let hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 100%, 66%)`;
}
