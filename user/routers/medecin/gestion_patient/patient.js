const router = require("express").Router()
const Patient = require("../../../models/Patient")
const accessMiddleware = require("../../../middlewares/accessDoctor")

// create patient
router.post("/create", accessMiddleware, async (req, res)=>{
  const patientInfo = {
    ...req.body
  }

  // check for nss
  const patientExists = await Patient.findOne({
    numero_securite_social: patientInfo.numero_securite_social
  })

  if (patientExists) return res.status(400).send({
    message: "creation impossible, un patient portant le nss déja existe."
  })

  // else, begin creating it and save it to db 
  const newPatient = new Patient(patientInfo)

  const patientSaved = await newPatient.save()

  if(!patientSaved) return res.status(401).send({
    message: "une erreur a été survenu lors du sauvegarde du patient."
  })

  return res.status(201).send({
    patientInfo: patientSaved,
    message: "patient ajouté avec succès."
  })
})

// get all patient
router.get("/", accessMiddleware,async(req, res)=>{
  const allPatients = await Patient.find()

  return res.status(200).send({
    listOfPatients : allPatients,
    message: "liste de patients récupérée avec succès."
  })
})

// get one patient
router.get("/:nss", accessMiddleware, async(req, res)=>{
  const patient = await Patient.findOne({numero_securite_social: req.params.id})

  // I need to send to the front his dossier medical

  return res.status(200).send({
    patientInfo : patient,
    message: "patient récupéré avec succès."
  })
})


// delete one patient

module.exports = router