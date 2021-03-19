<?php

  // chargement de fichiers supplémentaires
  include("inc/db.connect.php"); // inclus la connexion à la bdd
  include("inc/db.class.php"); // inclus mes classes pour interagir avec la bdd

  // j'instancie un objet $parties
  // à partir de ma classe perso Parties (à qui on passe l'objet $pdo comme argument)
  $parties = new Parties($pdo);
  $meilleursTemps = $parties->getMeilleursTemps(3); // récupère les x meilleurs temps de la BDD
  $parties->pdoDestroy(); // clôture la connexion à la BDD

?><!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">

  <!-- Tous les viewports à 1:1 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Infos sur la page -->
  <title>Memory 🍉</title>
  <meta name="description" content="Un jeu de mémoire et de vitesse, à partir de 4 ans ツ">

  <!-- CSS -->
  <link rel="stylesheet" href="assets/css/style.css?v0.1">

</head>
<body>
  <main>

    <!-- ACCUEIL -->
    <article id="accueil">
      <div class="container">
        <div class="titre">
          <h1>Memory</h1>
        </div>
        <div class="score">
          <h2>Meilleurs temps:</h2>
          <ol class="temps">
          <?php
            foreach ($meilleursTemps as $entree) {

              // chaque donnée provenant de la BDD est d'abord nettoyée
              // grâce à la fonction htmlentities
              // de manière à protéger contre les failles de type XSS - cf https://owasp.org/www-community/attacks/xss/

              $joueurTemps = htmlentities($entree['p_temps'], ENT_QUOTES);
              $joueurPseudo = htmlentities($entree['p_pseudo'], ENT_QUOTES);

              echo "<li>" . $joueurTemps . "s <em>•</em> " . $joueurPseudo . "</li>";
            }
          ?>
          </ol>
        </div>
        <div class="call-to-action">
          <a href="#jeu" class="btn">JOUER</a>
        </div>
      </div>
    </article>

    <!-- JEU -->
    <article id="jeu">
      <div class="container">
        <div class="plateau"></div>
        <div class="progress">
          <div class="progress-bar"></div>
        </div>
      </div>
    </article>

    <!-- GAGNÉ -->
    <article id="gagne">
      <div class="container">
        <div class="titre">
          <h1>gagné!</h1>
        </div>
        <div class="temps"></div>
        <form action="score-ajoute.php" method="post">
          <input type="text" name="pseudo" placeholder="saisir votre pseudo.." required>
          <input type="hidden" name="temps" value="666">
          <input type="submit" value="valider">
        </form>
      </div>
    </article>

    <!-- PERDU -->
    <article id="perdu">
      <div class="container">
        <div class="titre">
          <h1>perdu!</h1>
        </div>
        <a href="#accueil" class="btn">SNIF</a>
      </div>
    </article>

  </main>

  <!-- on appelle le JavaScript en dernier -->
  <!-- pour ne pas ralentir le chargement de la page -->
  <script src="assets/js/audio.js?v0.1"></script>
  <script src="assets/js/app.js?v0.1"></script>

</body>
</html>