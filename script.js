const button = document.getElementById("new-advice");

// Event listeners
document.addEventListener("DOMContentLoaded", getAdvice); // for first advice
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
