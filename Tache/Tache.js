const mongoose = require('mongoose');

const tacheSchema = new mongoose.Schema({
  titre: String,
  description: String,
  date_echeance: Date,
  priorite: String
});

module.exports = mongoose.model('Tache', tacheSchema);
