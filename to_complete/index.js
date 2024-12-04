const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware = require('./middleware/authMiddleware');
var cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: 'user', password: 'user', role: 'user' },
  { id: 2, username: 'admin', password: 'admin', role: 'admin' }
];

// TODO: Ajouter un middleware de redirection qui vérifie si l'utilisateur est authentifié, on le redirige vers /user dans ce cas
app.get('/login', (req, res) => {
  res.send(`
    <html>
      <body>
        <h2>Login</h2>
        <form action="/login" method="POST">
          <label for="username">Username:</label><br>
          <input type="text" id="username" name="username"><br>
          <label for="password">Password:</label><br>
          <input type="password" id="password" name="password"><br><br>
          <input type="submit" value="Submit">
        </form>
      </body>
    </html>
  `);
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    // TODO: Créer le token JWT et le stocker dans un cookie
    const token = jwt.sign({ id: user.id, role: user.role }, 'secretKey');
    // synthax : res.cookie(nom, valeur [, options])
    res.cookie('jwt', token, { httpOnly: true, secure: true });       // httpOnly : protéger token côté client / secure : sans https
    // TODO: Rediriger l'utilisateur vers la route `/user`
    if(user.role === 'user'){
      res.redirect('/user');
    } else {
      // connexion à la page admin auto après login si role = 'admin'
      res.redirect('/admin');
    }
  } else { 
    res.status(401).send('Identifiants invalides'); 

  }
});

// TODO: Ajouter un middleware pour l'authentification avec JWT
app.get('/user', authMiddleware, (req, res) => {
  if (req.user && req.user.role === 'admin' || 'user') { 
    console.log('User:', req.user);
    res.json({ message: 'Welcome, user!' });''
  } else { 
    res.status(403).send('Vous devez vous identifier !'); 
  }
});

// TODO: Ajouter un middleware pour l'authentification avec JWT
app.get('/admin', authMiddleware, (req, res) => {
  if (req.user && req.user.role === 'admin') { 
    res.json({ message: 'Welcome, admin!' }); 
  } else { 
    res.status(403).send('Accès refusé'); 
  }
});

app.listen(PORT, () => console.log(`Server lancé sur le port ${PORT}`));

/* 
Sources pour compléter les TODO:
- Outil d'encodage décodage de JWT : https://jwt.io/
  - Vérification de la validité du JWT : https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
  - Stockage du JWT dans un cookie : https://www.npmjs.com/package/cookie-parser
*/
