# Brief 14 Json Web Token

Ce Brief est une application Express.js simple qui utilise les tokens JWT pour authentifier les utilisateurs via des cookies.

## Installation

1. Clonez le dépôt :
2. Ouvrir le projet :
3. Installez les dépendances :
    ```sh
    npm install
    ```

## Utilisation

Pour démarrer l'application, exécutez :
```sh
npm start
```
L'application sera accessible à l'adresse http://localhost:3000

## Explication du Code

1. Récupération du Token : Le token JWT est récupéré à partir des cookies.

2. Vérification du Token : Si le token est absent, une erreur 401 est renvoyée. Sinon, le token est vérifié.

3. Gestion des Erreurs : Si la vérification échoue, une erreur 401 est renvoyée.

4. Passage à la Suite : Si la vérification réussit, le contenu décodé est ajouté à req.user et le contrôle passe au middleware suivant avec next().

### Routes
/login: Affiche un formulaire de connexion. Les utilisateurs peuvent saisir leur nom d'utilisateur et leur mot de passe.

/login (POST): Traite la soumission du formulaire de connexion. Si les informations d'identification sont correctes, un token JWT est généré et stocké dans un cookie. Les utilisateurs sont redirigés en fonction de leur rôle.

/user: Accès réservé aux utilisateurs authentifiés ayant le rôle 'user' ou 'admin'. Affiche un message de bienvenue.

/admin: Accès réservé aux utilisateurs authentifiés ayant le rôle 'admin'. Affiche un message de bienvenue pour les administrateurs.

### Cookie Parser
Le module cookie-parser est utilisé pour lire les cookies dans les requêtes.

### Configuration du Serveur
Le serveur est configuré pour écouter sur le port spécifié par la variable d'environnement PORT ou le port 3000 par défaut.

### Sources Utiles
[Outil d'encodage et de décodage de JWT](https://jwt.io/)
https://www.npmjs.com/package/cookie-parser
https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback

Bibliothèque ```jsonwebtoken```

Bibliothèque ```cookie-parser```
