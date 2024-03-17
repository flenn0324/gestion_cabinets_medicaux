const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")

// admin routers
const gestionCliniqueRouter = require("./user/routers/admin/gestion_clinique/clinique")
const gestionMedecinsRouter = require("./user/routers/admin/gestion_medecins/medecins")
const adminAuthRouter = require("./user/routers/admin/authentification/auth")
// doctor routers
const doctorAuthRouter = require("./user/routers/medecin/authentification/auth")
const gestionPatientsRouter = require("./user/routers/medecin/gestion_patient/patient")

const app = express()

dotenv.config()

app.use(
  cookieSession({
    signed: false, //no encryption

  })
)

app.use(cors());
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/admin/cliniques",gestionCliniqueRouter)
app.use("/admin/doctors", gestionMedecinsRouter)
app.use("/admin", adminAuthRouter)

app.use("/doctor", doctorAuthRouter)
app.use("/doctor/patients", gestionPatientsRouter)


// database connection 
mongoose.connect(process.env.URI)
  .then((msg)=> {
    console.log({
      response: "successfully connected to database.",
      message: msg.version
    })
  })
  .catch((err) => {
    console.log({
      response: "connection failed",
      message: err
    })
  })


const port = process.env.PORT
app.listen(port, () => {
  console.log(`the app is listening on port ${port}`)
})