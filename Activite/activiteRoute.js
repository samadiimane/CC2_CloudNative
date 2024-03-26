const express = require('express');
const router = express.Router();
const Activite = require('../Activite/Activite.js');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.headers.authorization;
    if (!token) {
        return res.status(403).json({ message: "Le token est obligatoire pour l authentification" });
    }
    try {
        const secretKey = process.env.TOKEN;
        const decoded = jwt.verify(token, secretKey);
        if (!decoded) {
            return res.status(401).json({ message: "Token invalide" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide" });
    }
}
router.use(verifyToken);

// Question 11 : la creation d'une activite
app.post('/activites', async (req, res) => {
    try {
      const { utilisateur_id, tache_id } = req.body;
  
      const utilisateurExiste = await Utilisateur.findById(utilisateur_id);
      if (!utilisateurExiste) {
        return res.status(404).json({ message: "L'utilisateur n'existe pas." });
      }
  
      const tacheExiste = await Tache.findById(tache_id);
      if (!tacheExiste) {
        return res.status(404).json({ message: "La tâche n'existe pas." });
      }
  
      const activite = new Activite({
        utilisateur_id,
        tache_id,
      });
      await activite.save();
  
      res.status(201).json({ message: "Activité ajoutée avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur lors de l'ajout de l'activité." });
    }
  });

module.exports = router;
