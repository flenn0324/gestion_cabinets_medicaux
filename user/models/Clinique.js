const mongoose = require("mongoose")


const cliniqueSchema = new mongoose.Schema({
  nom : String,
  address : { 
    numero_rue: String,
    nom_rue: String,
    code_postal: String,
    ville: String, 
    pays: String
  }
})

const cliniqueModel = mongoose.model("Clinique", cliniqueSchema)

module.exports = cliniqueModel