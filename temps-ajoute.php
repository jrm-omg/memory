<?php
  
  // récupère les valeurs stockées dans la superglobale $_POST 
  $pseudo = $_POST["pseudo"] ?? false;
  $temps  = $_POST["temps"] ?? false;

  // si ces variables sont renseignées
  if ($pseudo && $temps) {

    // chargement de fichiers supplémentaires
    include("inc/db.connect.php"); // connexion à la bdd
    include("inc/db.class.php"); // mes classes pour interagir avec la bdd

    // j'instancie un objet $parties
    // à partir de ma classe perso Parties (à qui on passe l'objet $pdo comme argument)
    $parties = new Parties($pdo);
    $ajout = $parties->ajoutTemps($pseudo, $temps); // envoie une nouvelle entrée pour la base de données

    if ($ajout === 1) { // est-ce qu'une entrée à bien été ajoutée dans la bdd ?
      // oui
      exit("ajout ok"); // on affiche un petit message de confirmation en stoppant PHP
    } else {
      // non
      exit("zut, erreur : impossible d'ajouter une nouvelle entrée à la base de données :("); // on affiche un message d'erreur en stoppant PHP
    }

  }
