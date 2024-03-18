const mongoose = require("mongoose")



// create the schema
const signesVitauxSchema = new mongoose.Schema({
  frequence_cardiaque : Double,
  tension_arterielle : Double,
  frequence_resperatoire : Double,
  temperature_corporelle : Double,
  nss: String,
  date_creation: {
    type: Date,
    default: new Date()
  }

})

// create and export the model 

const signesVitauxModel = mongoose.model("SignesVitaux", signesVitauxSchema)


module.exports = signesVitauxModel