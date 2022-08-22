const maxClick = 2;

let comecoValido = false;
let numeroCartas = 0;
let jogadas = 0;
let cancel = 0;
let seconds = 0;
let clicks = 0;

function ativarEvento() {
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
}

OpcoesJogo();
IniciarRelogio();
CriarCartas();
const cards = document.querySelectorAll(".card");
ativarEvento();

function OpcoesJogo() {
  while (comecoValido == false) {
    numeroCartas = prompt(
      "Digite um numero par de cartas maior que 4 com no maximo 14"
    );

    if (numeroCartas > 4 && numeroCartas <= 14 && numeroCartas % 2 == 0) {
      numeroCartas /= 2;
      console.log(numeroCartas)
      comecoValido = true;
    }
  }
}

function IniciarRelogio() {
  console.log(numeroCartas);
  var el = document.getElementById("seconds-counter");
  cancel = setInterval(() => {
    seconds += 1;
    el.innerText = "Tempo decorrido " + seconds + " segundos.";
  }, 1000);
}

function CriarCartas() {
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
}

async function click(card) {
  jogadas++;
  let front = card.querySelector(".front-face");
  let back = card.querySelector(".back-face");

  let selecionados = document.querySelectorAll(".selecionado");

  if (clicks < maxClick && selecionados.length < maxClick) {
    card.classList.add("selecionado");
    front.classList.add("esconder");
    back.classList.add("mostrar");
    clicks++;
  }

  selecionados = document.querySelectorAll(".selecionado");

  if (clicks === maxClick) {
    if (selecionados[0].id != selecionados[1].id) {
      console.log("errou");
      cards.forEach(async (card) => {
        if (card.classList.contains("selecionado")) {
          await sleep(1000);
          card.classList.remove("selecionado");
          card.querySelector(".front-face").classList.toggle("esconder");
          card.querySelector(".back-face").classList.toggle("mostrar");
        }
      });
    } else {
      selecionados[0].classList.remove("selecionado");
      selecionados[0].classList.add("acertou");

      selecionados[1].classList.remove("selecionado");
      selecionados[1].classList.add("acertou");
      console.log("acertou");
    }
    clicks = 0;
  }

  var acertos = document.querySelectorAll(".acertou");
  if (acertos.length / 2 == numeroCartas) {
    let finalizar = false;
    let restart = "";

    await sleep(500);

    alert(
      `Parabéns! Você venceu o JOGO com ${jogadas} jogadas em ${seconds} segundos`
    );

    while (finalizar == false) {
      restart = prompt(`Deseja recomeçar o jogo?
      digite "sim" ou "não"`);

      if (restart.toLowerCase() === "sim" || restart.toLowerCase() === "não") {
        finalizar = true;
      }
    }

    if (restart === "sim") {
      location.reload();
    } else {
      clearInterval(cancel);
      return;
    }
  }
}

function comparador() {
  return Math.random() - 0.5;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
