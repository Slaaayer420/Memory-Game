const board = document.getElementById("game-board");
const status = document.getElementById("status");
const symbols = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
let cards = [...symbols, ...symbols]; // Doublé pour paires
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;
const themes = {
    animaux: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
    nature: ["🌲", "🌳", "🌴", "🌵", "🌷", "🌸", "🌹", "🍀"],
    emojis: ["😀", "😎", "🤩", "😍", "🤪", "🧐", "😴", "🤯"],
    aliments: ["🍎", "🍕", "🍔", "🍟", "🍩", "🍫", "🍦", "🍭"]
  };

// Mélanger les cartes
cards.sort(() => 0.5 - Math.random());

// Créer les cartes
cards.forEach((symbol) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.addEventListener("click", handleClick);
  board.appendChild(card);
});

function handleClick() {
  if (lockBoard || this.classList.contains("flipped") || this.classList.contains("matched")) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
  } else {
    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matchesFound++;
      resetTurn();

      if (matchesFound === symbols.length) {
        status.textContent = "🎉 Félicitations ! Vous avez gagné !";
      }
    } else {
      setTimeout(() => {
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        resetTurn();
      }, 900);
    }
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
