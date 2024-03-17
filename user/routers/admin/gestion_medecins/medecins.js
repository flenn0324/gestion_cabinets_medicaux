const router = require("express").Router()
const Doctor = require("../../../models/Doctor")
const accessMiddleware = require("../../../middlewares/access")



// gestion medecin

router.get("/", accessMiddleware, async (req, res)=>{
  var allDoctors = await Doctor.find({})
  if (allDoctors) {
    return res.status(200).send({
      doctors: allDoctors,
      message: "liste de tout les docteurs."
    })
  }
})

router.get("/:id", accessMiddleware, async (req, res)=>{
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

// to create a doctor
router.post("/create", accessMiddleware, async (req, res)=>{
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
router.delete("/:id", accessMiddleware, async (req, res)=>{
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
router.post("/:id", accessMiddleware, async (req, res) => {
  // the new information of the doctor
  var doctorUpdated = await Doctor.updateOne({_id: req.params.id}, {...req.body})

  if (doctorUpdated) return res.status(201).send({
    doctorInfos: doctorUpdated,
    message: "les informations du docteur ont été bien mis à jour."
  })

  
})






module.exports = router