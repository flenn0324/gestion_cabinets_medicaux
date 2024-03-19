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


app.use("/admin/cliniques", gestionCliniqueRouter)
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
  .then((msg) => {
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
        },

        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
          },
          required: ['email', 'password']
        },

        Clinique: {
          type: 'object',
          properties: {
            nom: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                numero_rue: { type: 'string' },
                nom_rue: { type: 'string' },
                code_postal: { type: 'string' },
                ville: { type: 'string' },
                pays: { type: 'string' },
              },
            },
          },
          required: ['nom', 'address']
        },

        Consultation: {
          type: 'object',
          properties: {
            idMedecin: { type: 'string' },
            nssPatient: { type: 'string' },
            date_creation: { type: 'string', format: 'date-time' },
            remarque: { type: 'string' },
          },
          required: ['idMedecin', 'nssPatient']
        },

        PDFDocument: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            nom: { type: 'string' },
            description: { type: 'string' },
            document: { type: 'string' },
          },
          required: ['nom', 'description', 'document']
        },
        SignesVitaux: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            frequence_cardiaque: { type: 'string' },
            tension_arterielle: { type: 'string' },
            frequence_resperatoire: { type: 'string' },
            temperature_corporelle: { type: 'string' },
            nss: { type: 'string' },
            date_creation: { type: 'string', format: 'date-time' },
          },
          required: ['frequence_cardiaque', 'frequence_cardiaque', 'tension_arterielle',
            'frequence_resperatoire', 'temperature_corporelle', 'nss', 'date_creation'],
        },
        Patient: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            createdBy: { type: 'string' },
            nom: { type: 'string' },
            prenom: { type: 'string' },
            numero_securite_social: { type: 'string' },
            date_naissance: { type: 'string', format: 'date-time' },
            genre: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                numero_rue: { type: 'string' },
                nom_rue: { type: 'string' },
                code_postal: { type: 'string' },
                ville: { type: 'string' },
                pays: { type: 'string' },
              },
            },
          },
          required: ['nom', 'prenom', 'numero_securite_social', 'date_naissance',
            'genre', 'address']

        },

        Ordonnance: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            id_medecin: { type: 'string' },
            nss_patient: { type: 'string' },
            date_creation: { type: 'string', format: 'date-time' },
            traitements: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  nom: { type: 'string' },
                  dosage: { type: 'string' },
                },
              },
            },
          },
          required: ['id_medecin', 'nss_patient', 'traitements']

        },

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