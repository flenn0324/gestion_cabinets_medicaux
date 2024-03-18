const mongoose = require("mongoose")


// creation of the schema
const patientSchema = new mongoose.Schema({
  createdBy: String,
  nom: String,
  prenom: String,
  numero_securite_social: String,
  date_naissance: Date,
  genre: String,
  address : { 
    numero_rue: String,
    nom_rue: String,
    code_postal: String,
    ville: String, 
    pays: String
  }
})


// creation of the model 
const patientModel = mongoose.model("Patient", patientSchema)


// exportation of the model
module.exports = patientModel