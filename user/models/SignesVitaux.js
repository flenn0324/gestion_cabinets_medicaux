const mongoose = require("mongoose")



// create the schema
const signesVitauxSchema = new mongoose.Schema({
  frequence_cardiaque : String,
  tension_arterielle : String,
  frequence_resperatoire : String,
  temperature_corporelle : String,
  nss: String,
  date_creation: {
    type: Date,
    default: new Date()
  }

})

// create and export the model 

const signesVitauxModel = mongoose.model("SignesVitaux", signesVitauxSchema)


module.exports = signesVitauxModel