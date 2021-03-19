
"use strict"; // active les spécifications (ES5+) - cf https://javascript.info/strict-mode

/*

Variables
les variables générales sont toujours déclarées en amont

*/

let secondesTotales; // temps maximum pour une partie
let secondesRestantes; // temps restant
let minuteurJeu; // variable minuteur, utilisée dans les fonctions ci-dessous
let casePrecedenteEl; // variable permettant de garder en mémoire la case du DOM précédemment cliquée

/*

Minuteur

*/

let minuteurProgresse = function() {
  secondesRestantes--; // décrémente d'une seconde
  let progressionPourcent = 100 - (100 * secondesRestantes / secondesTotales); // calcul le pourcentage d'avancement dans le temps
  document.querySelector("#jeu .progress-bar").style.width = progressionPourcent + "%"; // applique le pourcentage à la largeur de notre barre de progression dans le DOM
  if (secondesRestantes == 0) { // s'il ne reste plus de temps
    clearInterval(minuteurJeu); // stop le minuteur
    location.hash = "perdu";
  }
}

/*

Jeu : fonctions

*/

let plateauCrea = function() {
  let plateauEl = document.querySelector("#jeu .plateau"); // plateau provenant du DOM
  plateauEl.innerHTML = ""; // vide le contenu de l'élément
  let fruitsTableau = [];
  for (let i = 0; i < 18; i++) {
    fruitsTableau.push(i); // créé un tableau associatif fruitsTableau contenant 18 clés, allant de 0 à 17
  }
  let fruitsRetenus = fruitsTableau; // clone vers fruitsRetenus, une variable qui contiendra uniquement les fruits qui seront joués durant cette partie
  fruitsRetenus.sort(() => Math.random() - 0.5); // mélange le tableau - merci https://flaviocopes.com/how-to-shuffle-array-javascript/ <3
  fruitsRetenus = fruitsRetenus.slice(0, 14); // garde uniquement les 14 premiers fruits
  let cases = [].concat(fruitsRetenus, fruitsRetenus); // double les fruits retenus dans une nouvelle variable appelée cases. Cases doit contenir 14 x 2 soit 28 entrées.
  cases.sort(() => Math.random() - 0.5); // mélange le tableau cases
  cases.forEach((fruitIndex) => { // pour chaque case, on extrait la clé du fruit, puis :
    let caseEl = document.createElement("div"); // nouvelle balise DIV dans notre DOM, correspondant à notre case
    caseEl.classList.add("case"); // ajoute une classe case
    caseEl.dataset.fruitIndex = fruitIndex; // inscrit un attribut de données correspondant à la clé du fruit
    let imgEl = document.createElement("div"); // nouvelle balise DIV dans notre DOM, correspondant à l'image du fruit
    imgEl.classList.add("image"); // ajoute une classe image
    imgEl.style.backgroundPositionY = (fruitIndex * 100 / 17) + "%"; // applique un décalage au CSS de l'image du DOM, car l'image fournit est un sprite composé de 18 fruits. Le dernier fruit (17, car nous partons de 0) est égal à un décalage de 100% de notre background-image.
    caseEl.appendChild(imgEl); // insert l'image dans la case
    caseEl.addEventListener("click", caseClickEvent); // chaque case voit son click écouté et attaché à la fonction caseClickEvent
    plateauEl.appendChild(caseEl); // insert la case dans le plateau de jeu
  });
  secondesTotales = 180; // temps maximum pour une partie
  secondesRestantes = secondesTotales; // au début d'une partie on a .. tout le temps
}

let casesActiveRAZ = function() { // fonction servant à cacher de nouveau les cases non gagnées jusque là
  document.querySelectorAll("#jeu .plateau .case.active").forEach(el => { // pour chaque case ayant la classe "active" du DOM
    el.classList.remove("active"); // retire la classe "active"
  });
  document.querySelector("#jeu .plateau").classList.remove("desactive"); // retire la classe "desactive" du plateau
}

let caseClickEvent = function(evenement, i) { // fonction qui sera appelée lorsque l'on clique sur une case du plateau de jeu
  let caseActuelleEl = evenement.target; // case du DOM qui vient d'être cliquée
  caseActuelleEl.classList.add("active"); // ajoute la classe "active" à la case cliquée
  if (!casePrecedenteEl) {
    // aucune case n'a été précédemment cliquée
    fxJoue("assets/audio/fx-click-01.mp3"); // joue un effet sonore
    casePrecedenteEl = caseActuelleEl; // garde une trace de ce qui vient d'être cliqué
  } else {
    // une case a précédemment été cliquée
    if (casePrecedenteEl === caseActuelleEl) {
      // le joueur a cliqué deux fois sur la même case
      // bon bah du coup on ne fait rien du tout
      fxJoue("assets/audio/fx-click-02.mp3"); // mais on se joue un petit effet sonore quand même :)
    } else {
      // deux cases différentes ont été cliquées
      if (casePrecedenteEl.dataset.fruitIndex == caseActuelleEl.dataset.fruitIndex) { // on compare les deux identifiants de fruits
        // bingo, ce sont bien les mêmes fruits
        casePrecedenteEl.classList.add("gagne");
        caseActuelleEl.classList.add("gagne");
        fxJoue("assets/audio/fx-cork-pop-quiet.mp3"); // joue un effet sonore
        let casesGagnees = document.querySelectorAll("#jeu .plateau .case.gagne").length; // compte le nombre de cases ayant la classe "gagne"
        if (casesGagnees == 28) {
          // toutes les cases sont gagnantes !!
          location.hash = "gagne"; // alors on change de page
        } else {
          // sinon on continue le jeu sans perdre une seconde
          casePrecedenteEl = ""; // oublie la case précédente
          casesActiveRAZ();
        }
      } else {
        // zut, ces fruits sont différents
        casePrecedenteEl = ""; // oublie la case précédente
        document.querySelector("#jeu .plateau").classList.add("desactive"); // ajoute la classe "desactive" au plateau
        fxJoue("assets/audio/fx-click-02.mp3");
        setTimeout(casesActiveRAZ, 1000); // appelle la fonction dans ...
      }
      
    }
  }
}

/*

100vh réel sur les navigateurs mobiles (facultatif)

*/

// permet de réajuster la hauteur du body
// utile pour les navigateurs mobiles qui ont tendance
// à avoir un 100vh qui ne prend pas en compte leur barre d'adresse
let bodyViewportHeightAdjust = function() {
  document.querySelector("body").style.setProperty("min-height", `${window.innerHeight}px`);
}

window.addEventListener("resize", bodyViewportHeightAdjust); // dès que le viewport change de taille (par rotation du navigateur, par exemple), on appelle la fonction bodyViewportHeightAdjust

/*

Navigation

*/

if (location.hash == "") location.hash = "accueil"; // si aucun hashtag n'est présent dans la barre d'adresse, on ajoute #accueil

let pageChangee = function() { // fonction appelée lorsque l'on change de page
  
  if (typeof minuteurJeu !== "undefined") clearInterval(minuteurJeu); // si minuteurJeu existe, on le supprime

  if (location.hash == "#accueil") { // si c'est la page jeu ..
    walkman.volume = 0.10; // volume bas
  }

  if (location.hash == "#jeu") { // si c'est la page jeu ..
    minuteurJeu = window.setInterval(minuteurProgresse, 1000); // créer un minuteurJeu qui appelle la fonction minuteurProgresse automatiquement, chaque seconde
    walkman.volume = 0.33; // monte moyen
    plateauCrea(); // nouvelle partie
  }

  if (location.hash == "#gagne") {
    let temps = secondesTotales - secondesRestantes;
    document.querySelector("#gagne .temps").innerHTML = `en ${temps} secondes`; // affiche le temps passé pour gagner cette partie
    document.querySelector("#gagne form input[name='temps']").value = temps; // inscrit également ce temps dans le champ du formulaire qui sert à ajouter une entrée dans la base de données
    fxJoue("assets/audio/fx-nova-wow.aac"); // joue un effet sonore
    walkman.volume = 0.10; // volume bas
  }

  if (location.hash == "#perdu") {
    fxJoue("assets/audio/fx-nova-ouuuh.aac"); // joue un effet sonore
    walkman.volume = 0.10; // volume bas
  }

  bodyViewportHeightAdjust(); // appelle la fonction
  walkmanHasard(); // appelle la fonction

}

window.addEventListener("hashchange", pageChangee); // dès que le hash change dans la barre de navigation, on appelle la fonction pageChangee
pageChangee(); // appelle pageChangee() une première fois, pour prendre en compte la page actuelle

/*

Gestion du formulaire qui apparaît à la fin d'une partie gagnée

*/

let formGagneEl = document.querySelector("#gagne form"); // cible le formulaire de notre DOM
formGagneEl.addEventListener("submit", (evenement) => { // lorsque le formulaire est envoyé
  evenement.preventDefault(); // bloque l'envoi "classique" du formulaire, donc le rechargement de la page
  // prépare et envoi une requête asynchrone, de type fetch
  fetch("temps-ajoute.php", {
    method: "POST", // on post des données
    body: new FormData(formGagneEl), // les données postées proviennent du formulaire du DOM
    cache: "no-store" // ignore le cache du navigateur
  })
  .then(response => response.text()) // traîte la réponse comme un texte
  .then(result => { // en cas de fetch réussi
    console.log(result);
    if (result == "ajout ok") { // est-ce que PHP nous retourne bien "ajout ok" ?
      window.location.replace("index.php"); // redirige en rechargeant la page d'accueil, en omettant la page actuelle (gagne) de l'historique
    } else {
      // gestion de l'erreur :
      alert("impossible d'ajouter ce nouveau temps dans la BDD"); // non, affiche cette popup
    }
  })
  .catch(error => { // en cas de fetch échoué
    alert("erreur dans le fetch : " + error);
  }); 
});