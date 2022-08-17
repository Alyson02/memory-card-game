//começo

let comecoValido = false;

while (comecoValido == false) {
    const numeroCartas = prompt('Digite um numero par de cartas maior que duas com no maximo 14');
    if((numeroCartas >2 && numeroCartas <= 14) && numeroCartas % 2 == 0){
        comecoValido = true
    }
}

//criando cartas



const cards = document.querySelectorAll(".card");

let clicks = 0;

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (!card.classList.contains("selecionado") && !card.classList.contains("acertou")) click(card);
    else console.log("já clicado");
  });
});

function click(card) {
  let front = card.querySelector(".front-face");
  let back = card.querySelector(".back-face");

  if (clicks < 2) {
    card.classList.add("selecionado");
    front.classList.add("esconder");
    back.classList.add("mostrar");
    clicks++;
  }

  let selecionados = document.querySelectorAll(".selecionado");
  if (clicks === 2) {
    if (selecionados[0].id != selecionados[1].id) {
      console.log("errou");
      cards.forEach((card) => {
        if (card.classList.contains("selecionado")) {
          setTimeout(() => {
            card.classList.remove("selecionado");
            card.querySelector(".front-face").classList.toggle("esconder");
            card.querySelector(".back-face").classList.toggle("mostrar");
          }, 1000);
        }
      });
      clicks = 0;
    } else {
      selecionados[0].classList.remove("selecionado");
      selecionados[0].classList.add("acertou");

      selecionados[1].classList.remove("selecionado");
      selecionados[1].classList.add("acertou");
      console.log("acertou");
      clicks = 0;
    }
  }
}
