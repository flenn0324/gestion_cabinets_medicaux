const router = require("express").Router()
const Clinique = require("../../../models/Clinique")
const accessMiddleware = require("../../../middlewares/access")


// createion clinique
router.post("/create", accessMiddleware, async (req, res)=>{
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
router.get("/", accessMiddleware, async (req, res)=>{
  const allClinique = await Clinique.find();

  return res.status(200).send({
    listeClinique: allClinique,
    message : "récuperation de tout les clinique avec succès."
  })
})


// recuperation d'une seule clinique
router.get("/:id",accessMiddleware, async (req, res)=>{
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

router.delete("/:id", accessMiddleware, async(req, res)=>{
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








module.exports = router