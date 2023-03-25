const button = document.getElementById("new-advice");

// API function

function getAdvice() {
  fetch("https://api.adviceslip.com/advice")
    .then(response => {
        return response.json(); // this will convert response to json
      }
    )
    .then(data => {
        const advice = data.slip.advice;
        const adviceId = data.slip.id;
        document.getElementById("advice-text").textContent = " ".concat(advice, " ");
        document.querySelector("h1").textContent = "ADVICE #".concat(adviceId);
      }  
    )
    .catch(error => {
      console.error(error);
    });
}
document.addEventListener("DOMContentLoaded", getAdvice); // for first advice
button.addEventListener("click", getAdvice);