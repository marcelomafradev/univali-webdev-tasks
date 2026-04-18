const word = "Barbearia";
const el = document.getElementById("typed-title");
let i = 0;

function type() {
  if (i <= word.length) {
    el.textContent = word.slice(0, i);
    i++;
    setTimeout(type, 100);
  }
}

// Começa a digitar após a animação do logo terminar
setTimeout(type, 1600);
