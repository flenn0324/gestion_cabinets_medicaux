const router = require("express").Router()
const Consultation = require("../../../models/Consultation")

// create new consultation
router.post("/create", async (req, res)=>{
  const consultationInfos = {
    ...req.body
  }

  const consultationToCreate = new Consultation(consultationInfos)

  const consultationSaved = await consultationToCreate.save()

  if (consultationSaved) {
    return res.status(201).send({
      consultationInfos : consultationSaved,
      message: "consultation créée avec succès."
    })
  } else {
    return res.status(401).send({
      message : "une erreur s'est produite lors de la creation d'une consultation."
    })
  }
})
// delete consultation
router.delete("/:id", async (req, res)=>{
  const idConsultation = req.params.id

  const consultationDeleted = await Consultation.deleteOne({_id: idConsultation})

  if (consultationDeleted) {
    return res.status(201).send({
      message: "consultation supprimée avec succes."
    })
  } else {
    return res.status(401).send({
      message: "une erreur s'est produite lors de la suppression d'une consultation."
    })
  }
})

// get one consultation
router.get("/:id", async (req, res)=>{
  
  return res.status(200).send({
    consultationInfos: await Consultation.findById(req.params.id)
  })
})
// get all consultation
router.get("/all/:nss", async (req, res)=>{
  return res.status(200).send({
    consultationList: await Consultation.find({nssPatient: req.params.nss}),
  })
})

// update consultation
router.post("/:id", async (req, res)=>{

  const updatedConsultation = await Consultation.updateOne({_id: req.params.id}, { ...req.body})

  if (updatedConsultation) {
    return res.status(201).send({
      consultationInfo : updatedConsultation,
      message: "consultation a été mise à jour."
    })

  } else {
    return res.status(401).send({
      message: "une erreur s'est produite lors de la mise à jour de la consultation."
    })
  }

})



module.exports = router