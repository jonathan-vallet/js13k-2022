function addCharacter() {
  characterList.push(generateCharacter());
  let $card = generateCharacterCard(characterList[currentCardIndex++]);

  // Insert new card first
  $cardList.insertBefore($card, $cardList.firstChild);
}

// Generate a new character with all his infos
function generateCharacter() {
  let race = getRandomItem(raceList);
  let character = {
    race: race.name,
    name: `${getRandomItem(firstNameList[race.name])} ${getRandomItem(
      lastNameList[race.name]
    )}`,
    deathCause: getRandomItem(deathCauseList),
    height: getRandomGaussian(race.minHeight, race.maxHeight),
    weight: getRandomGaussian(race.minWeight, race.maxWeight),
    age: getRandomGaussian(16, race.maxAge),
    // Character display customization
    backgroundColor: getRandomItem(cardBackgroundColorList),
    faceType: getRandomItem(characterFaceTypeList),
    faceColor: getRandomItem(
      race.name === "orc" ? characterOrcFaceColorList : characterFaceColorList
    ),
    clothesColor: getRandomItem(characterClothesColorList),
  };

  // Adds error randomly
  if (random() > 0.4) {
    // Change character race
    do {
      var newRace = getRandomItem(raceList);
    } while (newRace.name === character.race.name);
    character.error = {
      race: newRace.name,
    };
  }

  return character;
}

function drawCharacterFace(character) {
  let characterFace = `
  ${drawSvg(
    "card__clothes",
    "M.646 84.125c0-45.928 25.936-83.16 57.93-83.16 31.995 0 57.932 37.232 57.932 83.16V122H.646V84.125Z",
    character.clothesColor,
    117,
    122
  )}
  ${drawSvg("card__face", character.faceType, character.faceColor, 117, 171)}
<svg class="card__eyes" width="76" height="29">
 <path d="M28.8 14.43A14.4 14.4 0 1 1 0 14.43h28.8Z" fill="#fff"/>
 <circle cx="14" cy="22" r="2.9" fill="#111"/>
 <path d="M75.7 14.4a14.4 14.4 0 1 1-28.8 0h28.8Z" fill="#fff"/>
 <circle cx="61" cy="22" r="2.9" fill="#111"/>
</svg>
<svg class="card__mouth" width="45" height="26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M42.806 12.762C34.675 26.945 13.995 28.296 5.763 22.813-2.469 17.331.001 5.452 8.644 5.452c18.11 0 18.521.824 26.341-3.745 4.528-2.645 13.583 1.004 7.82 11.055Z" fill="#B53B3B"/>
  <mask id="a" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="45" height="26">
    <path d="M42.806 12.762C34.675 26.945 13.995 28.296 5.763 22.813-2.469 17.331.001 5.452 8.644 5.452c18.11 0 18.521.824 26.341-3.745 4.528-2.645 13.583 1.004 7.82 11.055Z" fill="#F6CCB1"/>
  </mask>
  <g mask="url(#a)">
    <path d="M24.09 18.581c-3.499.391-12.733-3.736-15.257 6.865 9.027 6.43 25.074 1.371 31.97-1.962-4.346-12.144-13.214-5.294-16.713-4.903Z" fill="#E04545"/>
    <path d="M7.41 11.585C5.372 11.284 5.35 4.588 5.35 3.354l32.104-4.528c1.646 2.332 2.47 4.116 1.235 6.586-1.105 2.208-2.058 2.057-3.293 2.88-.474.034-2.881-3.704-2.881-3.704s-.34 4.52-.823 4.528c-2.47 1.235-22.522 2.73-24.284 2.47Z" fill="#fff"/>
  </g>
</svg>
`;
  if (["elf", "orc"].indexOf(character.race) >= 0) {
    characterFace += drawSvg(
      "card_ears",
      "M4.718.167c-6.508-2.356.042 20.722 5.343 36.947 3.004 9.194 11.674 15.216 21.346 15.216V31.65S14.66 3.767 4.718.168ZM168.4.167c6.508-2.356-.042 20.722-5.343 36.947-3.004 9.194-11.673 15.216-21.345 15.216V31.65S158.458 3.767 168.4.168Z",
      character.faceColor,
      172,
      54
    );
  }

  return characterFace;
}

function drawSvg(className, path, fill, width, height) {
  return `<svg class="${className}" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
<path d="${path}" fill="#${fill}"/>
</svg>`;
}
