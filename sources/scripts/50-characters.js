function addCharacter() {
  characterList.push(generateCharacter());
  let $card = generateCharacterCard(characterList[currentCardIndex++]);

  // Insert new card first
  $cardList.insertBefore($card, $cardList.firstChild);
}

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
  };

  return character;
}
