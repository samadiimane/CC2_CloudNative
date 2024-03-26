const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateur = require('../Auth-service/Utilisateur.js');


// question 6 : Ajout d'un utilisateur
router.post('/ajouterUtilisateur', async (req, res) => {
  try {
    const { nom, email, login, mdp } = req.body;

    // verifier l'unicite du email, login
    let utilisateurEmail = await Utilisateur.findOne({ email });
    if (utilisateurEmail) {
      return res.status(400).json({ message: "L'utilisateur existe déjà, l'email doit etre Unique!!!!" });
    }

    let utilisateurLogin = await Utilisateur.findOne({ login });
    if (utilisateurLogin) {
      return res.status(400).json({ message: "L'utilisateur existe déjà, login doit etre Unique!!!!" });
    }

    const hashPassword = await bcrypt.hash(mdp, 10);

    utilisateur = new Utilisateur({ nom, email, login, mdp: hashPassword });

    await utilisateur.save();

    res.status(201).json({ message: "Utilisateur enregistré avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur lors de l\'enregistrement de l\'utilisateur");
  }
});

// Question 7 : connecter un utilisateur avec generation du token
router.post('/connecterUtilisateur', async (req, res) => {
  try {
    const { login, mdp } = req.body;
    const utilisateur = await Utilisateur.findOne({ login: req.body.login });
    if (!utilisateur) {
      return res.status(400).json({ message: "Utilisateur non trouvé, Essayez un autre login enregistré" });
    }

    const passwordMatch = await bcrypt.compare(req.body.mdp, utilisateur.mdp);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }
    
    // generation du token
    const token = jwt.sign({ userId: utilisateur._id }, process.env.TOKEN);

  res.status(200).json({ message: 'Connexion réussie', token: token });
    } catch (error) {
      console.error('Erreur lors de la connexion de l\'utilisateur:', error);
      res.status(500).json({ message: 'Erreur lors de la connexion de l\'utilisateur' });
    }
});

module.exports = router;
