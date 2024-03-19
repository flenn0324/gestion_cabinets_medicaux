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


/**
 * @swagger
 * tags:
 *   - name: Consultations
 *     description: Operations related to consultations by Doctor
 */

// Create new consultation
/**
 * @swagger
 * /doctor/patient/consultations/create:
 *   post:
 *     summary: Create a new consultation
 *     tags: [Consultations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consultation'
 *     responses:
 *       '201':
 *         description: Consultation created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 *       '401':
 *         description: Error creating consultation
 */

// Delete consultation
/**
 * @swagger
 * /doctor/patient/consultations/{id}:
 *   delete:
 *     summary: Delete a consultation
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '201':
 *         description: Consultation deleted successfully
 *       '401':
 *         description: Error deleting consultation
 */

// Get one consultation
/**
 * @swagger
 * /doctor/patient/consultations/{id}:
 *   get:
 *     summary: Get a consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved consultation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 */

// Get all consultations for a specific patient
/**
 * @swagger
 * /doctor/patient/consultations/all/{nss}:
 *   get:
 *     summary: Get all consultations for a specific patient
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: nss
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved consultations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 consultationList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Consultation'
 */

// Update consultation
/**
 * @swagger
 * /doctor/patient/consultations/{id}:
 *   put:
 *     summary: Update a consultation by ID
 *     tags: [Consultations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consultation'
 *     responses:
 *       '201':
 *         description: Consultation updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultation'
 *       '401':
 *         description: Error updating consultation
 */



module.exports = router