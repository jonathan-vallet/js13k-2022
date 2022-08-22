var pullDeltaX = 0;
var isCardDragging = false;
var $currentCard = null;
var cardAngle = 0;
var decisionVal = 80;
var cardsCounter = 0;
var numOfCards = 3;

function initCardSwipe() {
  let cardList = $$$(".card");

  [...cardList].forEach((card) => {
    card.addEventListener("mousedown", (e) => startCardDrag(card, e, "mouse"));
    card.addEventListener("touchstart", (e) => startCardDrag(card, e, "touch"));
  });
}

function startCardDrag(card, e, type) {
  $currentCard = card;
  var startX = e.pageX || e.originalEvent.touches[0].pageX;

  let cardMoveHandler = (e) => {
    var x = e.pageX || e.originalEvent.touches[0].pageX;
    pullDeltaX = x - startX;

    if (!pullDeltaX) {
      return;
    }
    moveCard();
  };

  let cardUpHandler = (e) => {
    document.removeEventListener("mousemove", cardMoveHandler);
    document.removeEventListener("mouseup", cardUpHandler);
    if (!pullDeltaX) {
      return;
    } // prevents from rapid click events
    release();
  };

  document.addEventListener(`${type}move`, cardMoveHandler);

  if (type === "mouse") {
    document.addEventListener("mouseup", cardUpHandler);
  } else {
    document.addEventListener("touchend", (e) => {
      document.removeEventListener("touchmove", arguments.callee);
      document.removeEventListener("touchend", arguments.callee);
      if (!pullDeltaX) {
        return;
      } // prevents from rapid click events
      release();
    });
  }
}

function moveCard() {
  isCardDragging = true;
  cardAngle = pullDeltaX / 10;
  $currentCard.style.transform = `translateX(${pullDeltaX}px) rotate(${cardAngle}deg)`;

  var opacity = pullDeltaX / 100;
  // var rejectOpacity = opacity >= 0 ? 0 : Math.abs(opacity);
  // var likeOpacity = opacity <= 0 ? 0 : opacity;
  // $currentCardReject.css("opacity", rejectOpacity);
  // $currentCardLike.css("opacity", likeOpacity);
}

function release() {
  if (pullDeltaX >= decisionVal) {
    $currentCard.classList.add("to-right");
  } else if (pullDeltaX <= -decisionVal) {
    $currentCard.classList.add("to-left");
  }

  if (Math.abs(pullDeltaX) >= decisionVal) {
    $currentCard.classList.add("inactive");

    setTimeout(function () {
      $currentCard.classList.add("below");
      $currentCard.classList.remove("inactive", "to-left", "to-right");
      ++cardsCounter;
      if (cardsCounter === numOfCards) {
        cardsCounter = 0;
        $(".demo__card").classList.remove("below");
      }
    }, 300);
  }

  if (Math.abs(pullDeltaX) < decisionVal) {
    $currentCard.classList.add("reset");
  }

  setTimeout(function () {
    $currentCard.setAttribute("style", "");
    $currentCard.classList.remove("reset");
    // .remove("reset")
    // .find(".demo__card__choice")
    // .attr("style", "");

    pullDeltaX = 0;
    isCardDragging = false;
  }, 300);
}
