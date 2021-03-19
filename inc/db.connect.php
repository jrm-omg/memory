<?php

  include("conf.php"); // inclus mes identifiants personnelles, nécessaires pour se connecter la base de données (bdd)

  // complété par les informations et options suivantes
  const DB_DRIVER  = "mysql"; // nom du SGBD
  const DB_CHARSET = "utf8mb4"; // encodage des caractères
  const DB_OPTIONS = [ // options spécifiques à la classe PDO
    PDO::ATTR_EMULATE_PREPARES   => false, // désactive l'émulation pour obtenir de "vraies" requêtes préparées
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, // active les erreurs sous forme d'exceptions, ce qui est bien sur un server de DEV mais pas sur un server de PROD
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // les données rapatriées seront sous la forme de tableaux associatifs
    PDO::MYSQL_ATTR_FOUND_ROWS   => true // suivre le nombre de lignes SQL affectées (via la fonction rowCount)
  ];

  try {
    // instancie un objet $pdo à partir de la classe PDO
    $pdo = new PDO(DB_DRIVER . ":host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET, DB_LOGIN, DB_PASS, DB_OPTIONS);
  } catch (PDOException $e) {
    // et en cas d'erreur :
    $pdo = NULL; // ferme la connexion à la bdd
    exit("OOPS, erreur BDD : " . $e->getMessage()); // affiche le message d'erreur et arrête immédiatement PHP
  }