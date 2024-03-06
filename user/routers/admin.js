const router = require("express").Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');
const Clinique = require('../models/Clinique')
const accessMiddleware = require("../middlewares/access")
const jwt = require('jsonwebtoken');


function generateAccessToken(infos) {
  return jwt.sign({...infos}, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '3600s' });
}


router.post('/admin/signin', async (req, res) => {
  // get the information 
  const information_admin = {
    ...req.body
  }

  
  const admin_exists = await Admin.findOne({email: information_admin.email})
  console.log(admin_exists)

  if (admin_exists) {
    // know lets check for its password
    const hashedPassword = admin_exists.password
    const match = bcrypt.compare(admin_exists.password, hashedPassword)
    
    if (match) {
      // creation of the jwt
       // generate jwt
    const userJwt = generateAccessToken(admin_exists)
    //store the jwt on session object
    req.session = {
      jwt: userJwt
    }

      res.status(200).send({
        userInfo : {
          
            Token: userJwt,
            user: admin_exists
        },
        message : "bienvenu"
      })

  
    } else {
      res.status(400).send({
        error : "signin error",
        message : "mot de passe erroné."
      })
    }
  } else {
    res.status(401).send({
      error : "signin error",
      message : "l'email communiqué n'existe pas."
    })
  }
  
})


// gestion medecin

router.get("/admin/doctors", accessMiddleware, async (req, res)=>{
  var allDoctors = await Doctor.find({})
  if (allDoctors) {
    return res.status(200).send({
      doctors: allDoctors,
      message: "liste de tout les docteurs."
    })
  }
})

router.get("/admin/doctors/:id", accessMiddleware, async (req, res)=>{
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
router.post("/admin/doctors/create", accessMiddleware, async (req, res)=>{
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
router.delete("/admin/doctors/:id", accessMiddleware, async (req, res)=>{
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
router.post("/admin/doctors/:id", accessMiddleware, async (req, res) => {
  // the new information of the doctor
  var doctorUpdated = await Doctor.updateOne({_id: req.params.id}, {...req.body})

  if (doctorUpdated) return res.status(201).send({
    doctorInfos: doctorUpdated,
    message: "les informations du docteur ont été bien mis à jour."
  })

  
})




// gestion clinique 

/* 

  les infos d'une clinique
  id, nom, et Adresse(numero_rue, nom_rue, code_postal, ville, pays)

*/ 

// creation clinique 

router.post("/admin/cliniques/create", accessMiddleware, async (req, res)=>{
  // récupération des informations 
  const cliniqueInfo = {
    ...req.body
  }


  const newClinique = new Clinique(cliniqueInfo)

  const cliniqueSaved = await newClinique.save()
  if (!cliniqueSaved) return res.status(401).send({
    message: "une erreur s'est produite lors d'ajout de la clinique."
  })

  return res.status(201).send({
    cliniqueInfo : cliniqueSaved,
    message : "votre clinique a bien été ajoutée."
  })

})

// recuperation de toute les clinique 
router.get("/admin/cliniques", accessMiddleware, async (req, res)=>{
  const allClinique = await Clinique.find();

  return res.status(200).send({
    listeClinique: allClinique,
    message : "récuperation de tout les clinique avec succès."
  })
})


// recuperation d'une seule clinique
router.get("/admin/cliniques/:id",accessMiddleware, async (req, res)=>{
  const idClinique = req.params.id

  // search for the clinique
  const cliniqueFound = await Clinique.findOne({_id: idClinique})


  if (!cliniqueFound) return res.status(400).send({
    message: "clinique n'existe pas."
  })

  return res.status(200).send({
    cliniqueInfo : cliniqueFound,
    message: "la clinique a été retrouvée avec succès."
  })

})

// suppression d'une clinque

router.delete("/admin/cliniques/:id", accessMiddleware, async(req, res)=>{
  const idClinique = req.params.id

  // search for the clinique
  const cliniqueDeleted = await Clinique.deleteOne({_id: idClinique})

  if (cliniqueDeleted) {
    return res.status(200).send({
      message: "clinique a été supprimé avec succès."
    })
  }

  return res.status(400).send({
    message: "une erreur s'est produite."
  })

})

// mise à jour d'une clinique


module.exports = router;