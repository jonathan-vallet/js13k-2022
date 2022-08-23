var swipedDistance = 0;
var $currentCard = null;
var cardAngle = 0;
var minDistancetoSwipe = 80;

function initCardSwipe() {
  let cardList = $$$(".card");

  [...cardList].forEach((card) => cardDownHandler(card));
}

function cardDownHandler(card) {
  card.addEventListener("mousedown", (e) => startCardDrag(card, e, "mouse"));
  card.addEventListener("touchstart", (e) => startCardDrag(card, e, "touch"));
}

function startCardDrag(card, e, type) {
  $currentCard = card;
  var startX = e.pageX || e.touches[0].pageX;

  let cardMoveHandler = (e) => {
    var x = e.pageX || e.touches[0].pageX;
    swipedDistance = x - startX;

    if (swipedDistance) {
      moveCard();
    }
  };

  let cardUpHandler = (e) => {
    document.removeEventListener("mousemove", cardMoveHandler);
    document.removeEventListener("mouseup", cardUpHandler);
    if (swipedDistance) {
      release();
    }
  };

  let cardUpTouchHandler = (e) => {
    document.removeEventListener("touchmove", cardMoveHandler);
    document.removeEventListener("touchend", cardUpTouchHandler);
    if (swipedDistance) {
      release();
    }
  };

  document.addEventListener(`${type}move`, cardMoveHandler);

  if (type === "mouse") {
    document.addEventListener("mouseup", cardUpHandler);
  } else {
    document.addEventListener("touchend", cardUpTouchHandler);
  }
}

function moveCard() {
  cardAngle = swipedDistance / 10;
  $currentCard.style.transform = `translateX(${swipedDistance}px) rotate(${cardAngle}deg)`;

  var opacity = swipedDistance / 100;
  $currentCard.querySelector(".-reject").style.opacity =
    opacity >= 0 ? 0 : Math.abs(opacity);
  $currentCard.querySelector(".-accept").style.opacity =
    opacity <= 0 ? 0 : opacity;
}

function release() {
  if (swipedDistance >= minDistancetoSwipe) {
    $currentCard.classList.add("to-right");
  } else if (swipedDistance <= -minDistancetoSwipe) {
    $currentCard.classList.add("to-left");
  }

  if (Math.abs(swipedDistance) >= minDistancetoSwipe) {
    $currentCard.classList.add("inactive");

    setTimeout(function () {
      $currentCard.remove();
      generateNewCard();
    }, 300);
  }

  if (Math.abs(swipedDistance) < minDistancetoSwipe) {
    $currentCard.classList.add("reset");
  }

  setTimeout(function () {
    $currentCard.setAttribute("style", "");
    $currentCard.classList.remove("reset");
    $currentCard.querySelector(".-reject").style.opacity = 0;
    $currentCard.querySelector(".-accept").style.opacity = 0;

    swipedDistance = 0;
  }, 300);
}

function generateNewCard() {
  // TODO: Créer un nouveau personnage et lui ajouter la carte au DOM
}

let htmlCode = ``;

raceList.forEach(function (singleCard) {
  htmlCode +=
    `<div class="card">
      <div class="card_image">
        <img src="https://via.placeholder.com/150">
      </div>
      <div>
        <h3>People: ${singleCard.name}</h3>
        <p>First Name: ${getRandomItem(firstNameList.human)}</p>
        <p>Last Name: ${getRandomItem(lastNameList.human)}</p>
        <p>Height: ${singleCard.minHeight}</p>
        <p>Age: ${singleCard.maxAge}</p>
        <p>Death Cause: ${getRandomItem(deathCauseList)}</p>
      </div>
    </div>`;
});

const deathCards = document.getElementById("cardList");

deathCards.innerHTML = htmlCode;
