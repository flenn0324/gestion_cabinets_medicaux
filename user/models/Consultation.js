const mongoose = require("mongoose")


// create the schema
const consultationSchema = new mongoose.Schema({
  idMedecin: String,
  nssPatient: String,
  date_creation: {
    type: Date,
    default: new Date()
  },
  remarque: String
})

// create the model and export it 
const consultationModel = mongoose.model("Consultation", consultationSchema)

module.exports = consultationModel