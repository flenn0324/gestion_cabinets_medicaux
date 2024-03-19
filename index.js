const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


// admin routers
const gestionCliniqueRouter = require("./user/routers/admin/gestion_clinique/clinique")
const gestionMedecinsRouter = require("./user/routers/admin/gestion_medecins/medecins")
const adminAuthRouter = require("./user/routers/admin/authentification/auth")
// doctor routers
const doctorAuthRouter = require("./user/routers/medecin/authentification/auth")
const gestionPatientsRouter = require("./user/routers/medecin/gestion_patient/patient")
const gestionSignesVitauxRouter = require("./user/routers/medecin/dossier_medical/gestion_signes_vitaux")
const documentMedicalRouter = require("./user/routers/medecin/dossier_medical/document_medical")
const consultationRouter = require("./user/routers/medecin/consultations/gestion_consultation")
const ordonnanceRouter = require("./user/routers/medecin/gestion_ordonnance/ordonnance")

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
app.use("/doctor/patient/signesvitaux/", gestionSignesVitauxRouter)
app.use("/doctor/document_medical", documentMedicalRouter)
app.use("/doctor/patient/consultations", consultationRouter)
app.use("/doctor/ordonnance", ordonnanceRouter)

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


// Swagger configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestion Cabinet API Documentation',
      version: '1.0.0',
      description: 'API documentation pour projet web'
    },
    components: {
      schemas: {
        Doctor: {
          type: 'object',
          properties: {
            role: { type: 'string' },
            _id: { type: 'string' },
            nom: { type: 'string' },
            prenom: { type: 'string' },
            date_naissance: { type: 'string', format: 'date' },
            id_clinique: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
          },
          required: ['nom', 'prenom', 'date_naissance', 'id_clinique', 'email', 'password']
        }
      }
    }
  },
  apis: ['./user/routers/**/**/*.js'] // Path to your API routes
};


const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
const port = process.env.PORT
app.listen(port, () => {
  console.log(`the app is listening on port ${port}`)
})