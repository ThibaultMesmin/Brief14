const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // TODO: Récupérer le token dans les cookies et vérifier s'il est valide avec la méthode `jwt.verify`
  const token = req.cookies.jwt;
  // TODO: Si le token est invalide, retourner une erreur 401
  if (!token) { 
    return res.status(401).send('Accès refusé. Aucun token fourni.');
  } else {
      // TODO: Si le token est valide, ajouter le contenu décodé du token dans `req.user`
    try { 
      const contenuDecoder = jwt.verify(token, 'secretKey');
      req.user = contenuDecoder;
      next(); // passer au midldleware suivant
      } catch (error) { 
        res.status(401).send('Token invalide');
      }
  }
};