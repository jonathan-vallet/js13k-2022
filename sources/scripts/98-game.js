// Plays you music
var audio = document.createElement("audio");
var musicplayer = new CPlayer();
musicplayer.init(song);

while (musicplayer.generate() < 1) { }
var wave = musicplayer.createWave();

audio.src = URL.createObjectURL(new Blob([wave], {type: "audio/wav"}));

function playMusic() {
    audio.play();
    audio.loop = true;
}

function stopMusic() {
    audio.pause();
}

function startGame() {
    console.log('game starting!');
    playMusic();
    loop();
}

/*
 * Game loop
 */
function loop() {
    // Your game loop
    requestAnimationFrame(loop);
}

// Let's the game start!
startGame();