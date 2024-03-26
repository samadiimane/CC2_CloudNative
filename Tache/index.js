const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// question 4 : la connexion a la base de donnes MongoDB

dotenv.config();

const PORT = process.env.PORT || 3030;

const URL_MONGOOSE = process.env.URL_MONGOOSE;

const app = express()

app.use(express.json());

mongoose.connect(URL_MONGOOSE, { useNewUrlParser: true})

const db = mongoose.connection;

db.on('error', (err) => console.log(`Erreur de connexion à MongoDB ${err}`));
db.once('open', () => console.log('Connexion à MongoDB réussie'));


app.use('/ajouterTaches', require('../Tache/tacheRoutes.js'));
app.use('/taches/:tachetitre', require('../Tache/tacheRoutes.js'));

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))
