const router = require("express").Router()
const Doctor = require("../../../models/Doctor")
const accessMiddleware = require("../../../middlewares/access")



// gestion medecin


/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: API endpoints for managing doctors
 */

/**
 * @swagger
 * /admin/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       '200':
 *         description: A list of doctors
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 doctors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
 *                 message:
 *                   type: string
 *                   description: Success message
 */

router.get("/", async (req, res)=>{
  var allDoctors = await Doctor.find({})
  if (allDoctors) {
    return res.status(200).send({
      doctors: allDoctors,
      message: "liste de tout les docteurs."
    })
  }
})


/**
 * @swagger
 * /admin/doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the doctor
 *     responses:
 *       '200':
 *         description: A doctor object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       '400':
 *         description: Doctor not found
 */

router.get("/:id", async (req, res)=>{
  //get the id of the doctor
  var doctorId = req.params.id

  // make the request
  var doctorFound = await Doctor.findById(doctorId)
  

  if (!doctorFound) return res.status(400).send({
    message: "docteur n'existe pas."
  })

  
  return res.status(200).send({
    doctorInformations : doctorFound,
    message: "le docteur a été trouvé avec succès."
  })
 

})

/**
 * @swagger
 * /admin/doctors/create:
 *   post:
 *     summary: Create a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       '201':
 *         description: Doctor created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Doctor'
 *       '401':
 *         description: Error creating doctor
 */

// to create a doctor
router.post("/create", async (req, res)=>{
  // information du docteur
  var doctorInformation = {
    ...req.body
  }
  // create the doctor
  var newDoctor = new Doctor(doctorInformation)
  // save the doctor to database
  var saveDoctor = await newDoctor.save()

  if (saveDoctor) {
    return res.status(201).send({
      doctorInfos: newDoctor,
      createdBy: req.user,
      message : "docteur est bien créé."
    })
  } else {
    return res.status(401).send({
      error : saveDoctor,
      message : "une erreur s'est produite lors de la creation d'un docteur."
    })
  }

})

// to delete a doctor
router.delete("/:id", async (req, res)=>{
 //get the id of the doctor
 var doctorId = req.params.id

 // make the request
 var doctorFound = await Doctor.deleteOne({_id: doctorId})
 

 if (!doctorFound) return res.status(400).send({
   message: "docteur n'existe pas."
 })

 
 return res.status(200).send({
   doctorInfos : doctorFound,
   message: "le docteur a été supprimé avec succès."
 })
})

// to upadate a doctor
router.post("/:id", async (req, res) => {
  // the new information of the doctor
  var doctorUpdated = await Doctor.updateOne({_id: req.params.id}, {...req.body})

  if (doctorUpdated) return res.status(201).send({
    doctorInfos: doctorUpdated,
    message: "les informations du docteur ont été bien mis à jour."
  })

  
})






module.exports = router