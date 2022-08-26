var swipedDistance = 0;
var $currentCard = null;
var cardAngle = 0;
var minDistancetoSwipe = 80;

// Generates card element from character info
function generateCharacterCard(character) {
  character = { ...character, ...character.error };
  let $card = createElement("div");
  $card.classList.add("card");
  $card.innerHTML = `
<div class="card__image" style="background: #${character.backgroundColor}">
${drawCharacterFace(character)}
 </div>
<div>
 <p class="card__name">${character.name}</p>
 <p class="card__race">People: ${character.race}</p>
 <p>💀: ${character.deathCause}</p>
 <p><b>${character.height}</b>m
 <b>${character.weight}</b>kg
 <b>${character.age}</b>yo</p>
</div>
<div class="card__choice -accept"></div>
<div class="card__choice -reject"></div>
`;

  cardDownHandler($card);
  return $card;
}

// Adds card events to drag
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
      addCharacter();
    }, 300);
  }

  function createToast({ color }) {
    const toastInfo = document.createElement("p");
    toastInfo.className = "toast";

    toastInfo.textContent = `Cookie ${name} ${state}.`;
    toastInfo.style.backgroundColor = color;
    toastsContainer.appendChild(toastInfo);

    setTimeout(() => {
      toastInfo.remove();
    }, 2500);
  }

  if ($currentCard.classList.contains("to-left")) {
    const toastsContainer = document.querySelector(".toasts-container");

    function createToast() {
      const toastInfo = document.createElement("p");
      toastInfo.className = "toast";

      toastInfo.textContent = "Beware ! -2 points ...";
      toastInfo.style.backgroundColor = "red";
      toastsContainer.appendChild(toastInfo);

      setTimeout(() => {
        toastInfo.remove();
      }, 2500);
    }

    createToast();
  } else if ($currentCard.classList.contains("to-right")) {
    const toastsContainer = document.querySelector(".toasts-container");

    function createToast() {
      const toastInfo = document.createElement("p");
      toastInfo.className = "toast";

      toastInfo.textContent = "Hurray ! +2 points !";
      toastInfo.style.backgroundColor = "green";
      toastsContainer.appendChild(toastInfo);

      setTimeout(() => {
        toastInfo.remove();
      }, 2500);
    }

    createToast();
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
