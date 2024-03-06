const mongoose = require('mongoose');
const { Schema } = mongoose;

const doctorSchema = new Schema({
  nom: String,
  prenom: String,
  date_naissance: Date,
  id_clinique: String,
  email: String,
  password: String
});

const doctorModel = mongoose.model('Doctor', doctorSchema);

module.exports = doctorModel;