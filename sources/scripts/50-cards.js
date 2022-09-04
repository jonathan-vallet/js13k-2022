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
<div class="card__imageWrapper" style="background: #${
    character.backgroundCol
  }"><div class="card__image" style="transform:translateY(${
    (2.5 - character.height) * 50
  }px) scaleX(${1 + (character.weight - 70) / 200})">
${drawCharacterFace(character)}
</div></div>
<div class="card__content">
<b class="card__race -${character.race}">${raceDiplayName[character.race]}</b>
 <p class="card__name">${character.name}</p>
 <p>💀<b> ${character.deathCause}</b></p>
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

    // During tutorial, lock swipe in a direction depending of step (swipe left or right only)
    if (currentTutorialStep) {
      // Removes "demo" animation playing while not interacting
      $gameWrapper.classList.remove("-demo");
      swipedDistance = Math[currentTutorialStep === 1 ? "max" : "min"](
        0,
        swipedDistance
      );
    }

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
  let hasAccepted = true;
  if (currentTutorialStep === 1) {
    showTutorialStep3();
  } else if (currentTutorialStep === 2) {
    showTutorialStep4();
  }

  if (swipedDistance >= minDistancetoSwipe) {
    $currentCard.classList.add("to-right");
  } else if (swipedDistance <= -minDistancetoSwipe) {
    hasAccepted = false;
    $currentCard.classList.add("to-left");
  }

  if (Math.abs(swipedDistance) >= minDistancetoSwipe) {
    $currentCard.classList.add("inactive");
    clearTimeout(errorMessageTimeout);
    clearTimeout(comboMessageTimeout);
    // 4 characters created at start, set offset to get current card
    updateScore(hasAccepted, characterList[currentCardIndex - 4]);
    setTimeout(() => {
      $currentCard.remove();
      addCharacter();
    }, 300);
  }

  if (Math.abs(swipedDistance) < minDistancetoSwipe) {
    $currentCard.classList.add("reset");
  }

  setTimeout(() => {
    $currentCard.setAttribute("style", "");
    $currentCard.classList.remove("reset");
    $currentCard.querySelector(".-reject").style.opacity = 0;
    $currentCard.querySelector(".-accept").style.opacity = 0;

    swipedDistance = 0;
  }, 300);
}
