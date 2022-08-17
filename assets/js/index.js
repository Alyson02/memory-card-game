//começo

let comecoValido = false;
let numeroCartas = 0;
let jogadas = 0;

while (comecoValido == false) {
  numeroCartas = prompt(
    "Digite um numero par de cartas maior que 4 com no maximo 14"
  );
  if (numeroCartas > 4 && numeroCartas <= 14 && numeroCartas % 2 == 0) {
    comecoValido = true;
  }
}

//criando cartas
const container = document.querySelector(".container");
const cardsInj = [];

for (let i = 0; i < numeroCartas; i++) {
  for (let j = 0; j < 2; j++) {
    let divFront = document.createElement("div");
    let divBack = document.createElement("div");
    let img = document.createElement("img");
    let imgFront = document.createElement("img");

    imgFront.src = "./assets/images/front.png";
    divFront.appendChild(imgFront);
    divFront.classList.add("front-face", "face");

    img.src = `./assets/images/${i}.gif`;
    divBack.appendChild(img);
    divBack.classList.add("back-face", "face");

    let card = document.createElement("div");

    card.id = i;
    card.classList.add("card");
    card.appendChild(divFront);
    card.appendChild(divBack);

    cardsInj.push(card);
  }
}

cardsInj.sort(comparador);
cardsInj.forEach((card) => container.appendChild(card));

const cards = document.querySelectorAll(".card");

//game

let clicks = 0;

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    if (
      !card.classList.contains("selecionado") &&
      !card.classList.contains("acertou")
    )
      click(card);
    else console.log("já clicado");
  });
});

function click(card) {
  jogadas++;
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

  var acertos = document.querySelectorAll('.acertou')
  console.log(acertos.length, 'largura do acertos')
  if(acertos.length / 2 == numeroCartas){
    alert(`Parabéns! Você venceu o JOGO com ${jogadas} jogadas`)
  }
}



function comparador() {
  return Math.random() - 0.5;
}
