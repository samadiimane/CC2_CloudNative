const express = require('express');
const router = express.Router();
const Tache = require('../Tache/Tache.js');
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


// Question 8 : Ajouter une tache
router.post('/ajouterTache', async (req, res) => {

    const tache = new Tache({
        titre: req.body.titre,
        description: req.body.description,
        date_echeance: req.body.date_echeance,
        priorite: req.body.priorite
    });
    // verification de l'unicite du titre
    if (Tache.findOne({ titre: req.body.titre })) {
        return res.status(400).json({ message: "le titre doit etre unique" });
    }

    try {
        const newTache = await tache.save();
        res.status(201).json(newTache);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Question 9 : recuperation des details d'une tache
router.get('/taches/:tachetitre', async (req, res) => {
    try {
        const tache = await Tache.findOne({ titre: req.params.tachetitre });
        if (!tache) {
            return res.status(404).json({ message: "Tache non trouvé" });
        }
        res.json(tache);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
