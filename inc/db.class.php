<?php

  class MyPDO {
    
    // propriété
    protected $pdo;

    // méthode constructeur
    public function __construct(PDO $pdo) {
      $this->pdo = $pdo;
    }

    // méthode pdoDestroy
    // permet de clôturer la connexion à la bdd
    public function pdoDestroy() {
      $this->pdo = NULL; // bye
    }

  }

  class Parties extends MyPDO {

    /*

    on s'appuie sur la classe MyPDO précédente
    et on y ajoute de nouvelles fonctionnalités

    */

    // méthode getMeilleursTemps
    // retourne les (3) meilleures temps de jeu gagné stockés dans la bdd
    public function getMeilleursTemps($rows = 3) {
      try {
        $req = "SELECT * FROM `parties` ORDER BY `p_temps` LIMIT :rows"; // requête SQL de sélection
        $prep = $this->pdo->prepare($req); // prépare la requête
        $prep->execute([ // lance la requête en remplaçant le(s) marqueur(s)
          ":rows" => $rows
        ]);
        return $prep->fetchAll(); // récupère les éventuels résultats
      } catch (PDOException $e) {
        $this->pdoDestroy(); // en cas d'erreur, on ferme la connexion à la bdd
        exit("OOPS, erreur BDD : " . $e->getMessage()); // et on stoppe PHP tout en affichant le message d'erreur
      }
    }

    // méthode ajoutTemps
    // ajoute une nouvelle entrée dans la bdd
    public function ajoutTemps($pseudo, $temps) {
      try {

        $req = "INSERT INTO `parties` (`p_pseudo`, `p_temps`, `p_datetime`)
                VALUES (:pseudo, :temps, now());"; // requête SQL d'ajout, on forme une date et une heure automatiquement via SQL et sa fonction "now()"
        $prep = $this->pdo->prepare($req); // prépare la requête
        $prep->execute([ // lance la requête en remplaçant le(s) marqueur(s)
          ":pseudo" => $pseudo,
          ":temps" => $temps
        ]);
        return $prep->rowCount(); // retourne le nombre d'entrées affectées par cette requête
      } catch (PDOException $e) {
        $this->pdoDestroy(); // en cas d'erreur, on ferme la connexion à la bdd
        exit("OOPS, erreur BDD : " . $e->getMessage()); // et on stoppe PHP tout en affichant le message d'erreur
      }
    }

  }