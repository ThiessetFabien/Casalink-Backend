// Import des modules nécessaires
// `jsonwebtoken` est utilisé pour vérifier les JWT
// `debugLib` est utilisé pour les messages de débogage
// `config` est utilisé pour charger les variables d'environnement à partir de `.env.development`
import jwt from 'jsonwebtoken';
import debugLib from 'debug';
import { config } from 'dotenv';

// Chargement des variables d'environnement à partir du fichier `.env.development`
config({ path: `.env.development` });

// Initialisation du débogueur avec l'étiquette 'app:jwtMiddleware'
const debug = debugLib('app:jwtMiddleware');

// Middleware JWT pour vérifier les JWT dans les requêtes
const jwtMiddleware = (req, res, next) => {
    // Récupération de l'en-tête d'autorisation de la requête
    const authHeader = req.headers.authorization;
    debug('Authorization Header:', authHeader);

    // Vérification de la présence de l'en-tête d'autorisation
    if (!authHeader) {
      // Retourne une erreur 401 si l'en-tête d'autorisation est manquant
      return res.status(401).json({ message: 'Authorization header missing' });
    }

    // Séparation du schéma et du jeton JWT à partir de l'en-tête d'autorisation
    const [scheme, token] = authHeader.split(' ');
    debug('Scheme:', scheme);
    debug('Token:', token);

    // Vérification du format de l'en-tête d'autorisation
    if (scheme !== 'Bearer' || !token) {
      // Retourne une erreur 401 si le format de l'en-tête d'autorisation est invalide
      return res.status(401).json({ message: 'Invalid authorization format' });
    }

    try {
      // Vérification et décodage du jeton JWT
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      debug('Decoded JWT:', decoded);

      // Exemple de vérification des permissions dans le jeton JWT décodé
      if (!decoded.permissions || !decoded.permissions.includes('required-permission')) {
        // Retourne une erreur 403 si les permissions nécessaires ne sont pas présentes dans le jeton
        return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      }
      
      // Ajout de l'objet utilisateur décodé à la requête pour une utilisation ultérieure
      req.user = decoded;
      next(); // Passe au middleware suivant dans la chaîne de middleware
    } catch (error) {
      // Gestion des erreurs lors de la vérification du jeton JWT
      debug('JWT verification error:', error);
      // Retourne une erreur 401 en cas de jeton invalide ou expiré
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// Exporte le middleware JWT pour une utilisation dans d'autres parties de l'application
export default jwtMiddleware;
