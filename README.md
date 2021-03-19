## Memory

Test technique Full Stack

Vous pouvez passer directement à [la juteuse démo](https://humanize.me/tmp/memory/) 🍉

## Contexte et objectifs

Il est maintenant temps de démontrer ta compétence technique en s’amusant à développer un petit jeu :)

## Finalité pédagogique
- Coder proprement, de manière facile à comprendre (pour les autres)
- Coder en commentant

## Spécifications

Le but est de créer le jeu Memory.

### Fonctionnalités
- Au commencement du jeu, des cartes sont disposées face cachée à l'écran.
- Le joueur doit cliquer sur deux cartes. Si celles-ci sont identiques, la paire est validée. Sinon, les cartes sont retournées face cachée, et le joueur doit sélectionner une nouvelle paire de cartes.
- Un compteur de temps, avec une barre de progression, s’affiche en dessous du plateau.
- Le joueur gagne s'il arrive à découvrir toutes les paires avant la fin du temps imparti.
- Chaque temps de partie effectuée doit être sauvegardée en base de données. Avant le début du jeu, les meilleurs temps s’affichent à l’écran.

### Résultat attendu
- Créer le jeu en HTML / CSS / JS
  - La répartition des fruits doit être aléatoire à chaque jeu.
  - précisions​ CSS​ : SASS ou autre préprocesseur encouragé.
  - précisions ​JS : L’utilisation d’une librairie (au hasard, jQuery) est acceptée, pour faciliter la gestion d'événements et les modifications du DOM.
- Faire la persistance des données côté back : PHP ou Node.js
  - Choisis le langage ​ qui te permettra le mieux de répondre à l’exercice.
  - Ton application doit être codée en ​ objet.
  - N’hésite pas à commenter ton code.
- Charte graphique
  - Pas de charte graphique imposée. Tu peux partir du design des exemples ci-dessus, ou improviser si tu sens l’inspiration pointer le bout de son nez. Quoi qu’il en soit, le code CSS doit être compréhensible et abordable.

## Livraison
Le code doit être pushé sur un repo public sur GitHub.

## Exemples
Les captures d’écran représentent les situations suivantes :
1. Le plateau de départ ![plateau de départ](https://cdn.hmz.tf/brief-exemple-plateau-de-depart.jpg)
2. Le plateau pendant le jeu ![plateau pendant le jeu](https://cdn.hmz.tf/brief-exemple-plateau-pendant-le-jeu.jpg)
3. On a gagné ! ![on a gagné](https://cdn.hmz.tf/brief-exemple-on-a-gagne.jpg)
4. On a perdu... ![on a perdu](https://cdn.hmz.tf/brief-exemple-on-a-perdu.jpg)