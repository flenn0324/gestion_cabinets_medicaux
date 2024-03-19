const mongoose = require("mongoose");

const ordonnanceSchema = new mongoose.Schema({
  id_medecin: String,
  nss_patient: String,
  date_creation: {
    type: Date,
    default: new Date()
  },
  traitements: [{
    nom: String,
    dosage: String
  }]
});

const ordonnanceModel = mongoose.model("Ordonnance", ordonnanceSchema);

module.exports = ordonnanceModel;
