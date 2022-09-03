function addCharacter() {
  characterList.push(generateCharacter());
  let $card = generateCharacterCard(characterList[currentCardIndex++]);

  // Insert new card first
  $cardList.insertBefore($card, $cardList.firstChild);
}

// Generate a new character with all his infos
function generateCharacter() {
  let isSpecificTutorialCard = currentTutorialStep && currentCardIndex === 1;
  let race = isSpecificTutorialCard ? raceList[3] : getRandomItem(raceList);
  let character = {
    race: race.name,
    name: `${getRandomItem(firstNameList[race.name])} ${getRandomItem(
      lastNameList[race.name]
    )}`,
    deathCause: getRandomItem(deathCauseList),
    height: getRandomGaussian(race.minHeight, race.maxHeight),
    weight: getRandomGaussian(race.minWeight, race.maxWeight),
    age: getRandomGaussian(42, race.maxAge),
  };
  // Set a random element for every part
  Object.keys(customizationList).forEach((part) => {
    character[part] =
      customizationList[part][
        getRandomNumber(0, customizationList[part].length - 1)
      ];
    character[part + "Col"] =
      colorList[part][getRandomNumber(0, colorList[part].length - 1)];
  });

  // Set specific changes for races
  if (character.race == "orc") {
    character.faceCol = getRandomItem(characterOrcFaceColorList);
  }
  if (character.race == "elf") {
    character.faceCol = getRandomItem(characterElfFaceColorList);
    character.ear = elfEars;
  }

  // Adds error randomly. For tutorial set second card on error only
  if (isSpecificTutorialCard) {
    // Change character race for human
    character.error = {
      race: raceList[0].name,
    };
  } else if (!currentTutorialStep) {
    // No error during first card of tutorial
    addRandomError(character);
  }

  // Sets ear color like skin color, after error is set, has it can change
  character["earCol"] = character["faceCol"];
  character["eyebrowCol"] = character["hairCol"];

  return character;
}

// Adds some errors to character randomly
function addRandomError(character) {
  let error;

  // Change character race
  if (random() < 0.3) {
    // Switch elf/orc to human/dwarf or opposite, to avoid confusions
    var newRace =
      ["elf", "orc"].indexOf(character.race) >= 0
        ? raceList[getRandomNumber(0, 1)]
        : raceList[getRandomNumber(2, 3)];

    character.error = {
      race: newRace.name,
      m: `a ${character.race} looking like ${newRace.name}`,
    };
  }

  // Change height for elf/dwarfs
  if (character.race == "dwarf" && random() < 0.2) {
    error = {
      height: getRandomGaussian(1.8, 2.4),
      m: `a dwarf taller than 1.5m`,
    };
  }
  if (character.race == "elf") {
    if (random() < 0.2) {
      error = {
        height: getRandomGaussian(1, 1.4),
        m: `an elf smaller than 1.9m`,
      };
    } else if (random() < 0.2) {
      // Change elf ears
      error = {
        ear: getRandomItem(customizationList["ear"]),
        m: `an elf without pointy ears`,
      };
    }
  } else {
    // Set elf ears to other races
    if (random() < 0.2) {
      error = {
        ear: elfEars,
        m: `a ${character.race} with pointy ears`,
      };
    }
    // Change age
    if (random() < 0.1) {
      error = {
        age: getRandomNumber(160, 230),
        m: `a ${character.race} older than 150 years`,
      };
    }

    // Change skin color for orc/not orc
    if (random() < 0.1) {
      let skinColor = getRandomItem(
        ["orc", "elf"].indexOf(character.race) >= 0
          ? colorList.face
          : characterOrcFaceColorList.concat(characterElfFaceColorList)
      );
      error = {
        faceCol: skinColor,
        earCol: skinColor,
        m: `a ${character.race} with this skin color`,
      };
    }
  }

  character.error = error;
}

function drawCharacterFace(character) {
  // Clothes, always same pattern
  // TODO: surement simplifier le "326, 305" redondant
  let characterFace = `
  ${createSvg(326, 305, [
    {
      d: "M116.7 214.8a61.7 61.7 0 0 1 46-19.3c18.8 0 35.4 7.6 46 19.3a40.3 40.3 0 0 1 34.6 39.7V305H82v-50.5a40.3 40.3 0 0 1 34.7-39.7Z",
      fill: `#${character.clothesCol}`,
    },
  ])}`;

  // Draws every body parts, loop on all parts typa available
  Object.keys(customizationList).forEach((part) => {
    // Draw every path of the part
    for (var pathIndex in character[part]) {
      let color =
        pathIndex < 1 || part == "eye"
          ? `#${character[part + "Col"]}`
          : "rgba(0, 0 ,0, 0.1)";
      let pathProperties = { fill: color };
      if (character[part][pathIndex]) {
        if (character[part][pathIndex].startsWith("M")) {
          pathProperties.d = character[part][pathIndex];
        } else {
          pathProperties = Object.assign(
            pathProperties,
            JSON.parse(character[part][pathIndex])
          );
        }
        characterFace += createSvg(326, 305, [pathProperties]);
      }
    }
  });

  characterFace += `
  <svg width="326" height="305" viewBox="0 0 326 305" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M183.087 176.888C174.956 191.071 154.276 192.421 146.044 186.939C137.813 181.456 140.282 169.577 148.926 169.577C167.035 169.577 167.447 170.402 175.267 165.833C179.794 163.188 188.849 166.836 183.087 176.888Z" fill="#B53B3B"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M178.332 182.725C170.007 190.136 157.197 191.324 149.386 188.567C151.607 181.316 157.386 182.025 161.438 182.523C162.599 182.666 163.618 182.791 164.371 182.707C165.087 182.626 166.029 182.275 167.111 181.872C170.354 180.663 174.857 178.985 178.332 182.725Z" fill="#E04545"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M145.721 170.204C145.885 172.559 146.354 175.513 147.69 175.711C149.452 175.972 169.504 174.476 171.974 173.241C172.458 173.233 172.797 168.714 172.797 168.714C172.797 168.714 175.204 172.452 175.678 172.418C176.009 172.197 176.32 172.047 176.619 171.902C177.435 171.506 178.162 171.154 178.971 169.537C179.82 167.839 179.696 166.465 179 165.015C177.673 164.931 176.342 165.204 175.266 165.833C168.623 169.714 167.326 169.703 155.986 169.612C153.976 169.596 151.651 169.577 148.925 169.577C147.736 169.577 146.664 169.802 145.721 170.204Z" fill="white"/>
  </svg>
  `;

  return characterFace;
}
