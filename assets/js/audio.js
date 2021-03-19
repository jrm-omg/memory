
"use strict";

/*

Audio
partie facultative mais ajoutée parce qu'un jeu, avec du son, c'est encore mieux
(j'trouve)

*/

let walkman = new Audio(); // instancie un objet walkman à parti de la classe / API Audio - cf https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
const musiques = [
  "https://cdn.hmz.tf/music-74-75.mid.opus",
  "https://cdn.hmz.tf/music-all-that-she-wants.mid.opus",
  "https://cdn.hmz.tf/music-beautiful-life.mid.opus",
  "https://cdn.hmz.tf/music-bitter-sweet-symphony.mid.opus",
  "https://cdn.hmz.tf/music-das-model.mid.opus",
  "https://cdn.hmz.tf/music-gimme-gimme-gimme.mid.opus",
  "https://cdn.hmz.tf/music-greensleeves.mid.opus",
  "https://cdn.hmz.tf/music-happy-nation.mid.opus",
  "https://cdn.hmz.tf/music-house-of-the-rising-sun.mid.opus",
  "https://cdn.hmz.tf/music-just-cant-get-enough.mid.opus",
  "https://cdn.hmz.tf/music-my-baker.mid.opus",
  "https://cdn.hmz.tf/music-tainted-love.mid.opus",
  "https://cdn.hmz.tf/music-take-on-me.mid.opus",
  "https://cdn.hmz.tf/music-the-good-the-bad-the-ugly.mid.opus",
  "https://cdn.hmz.tf/music-thriller.mid.opus",
  "https://cdn.hmz.tf/music-underworld.mid.opus",
  "https://cdn.hmz.tf/music-wheel-of-fortune.mid.opus"
];
let walkmanHasard = function() { // joue une piste au hasard
  walkman.src = musiques[musiques.length * Math.random() | 0]; // prend une piste au hasard - merci https://stackoverflow.com/questions/5915096/get-a-random-item-from-a-javascript-array
  walkman.play(); // enclenche la musique !
}
walkman.addEventListener("ended", () => { // lorsque la piste est terminée
  walkmanHasard(); // on joue une nouvelle piste au hasard
});

let fxAudio = new Audio(); // objet fx à partir de la class Audio
let fxJoue = function (url) {
  fxAudio.src = url;
  fxAudio.play();
}