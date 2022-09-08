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
    height: getRandomGaussian(race.minHeight * 10, race.maxHeight * 10) / 10,
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
  character["beardCol"] = character["hairCol"];

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
        part == "mouth"
          ? "transparent"
          : pathIndex < 1 || part == "eye"
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

  return characterFace;
}
