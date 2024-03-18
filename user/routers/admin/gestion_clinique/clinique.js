const router = require("express").Router()
const Clinique = require("../../../models/Clinique")
const accessMiddleware = require("../../../middlewares/access")


// createion clinique
router.post("/create", async (req, res)=>{
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
router.get("/", async (req, res)=>{
  const allClinique = await Clinique.find();

  return res.status(200).send({
    listeClinique: allClinique,
    message : "récuperation de tout les clinique avec succès."
  })
})


// recuperation d'une seule clinique
router.get("/:id", async (req, res)=>{
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

router.delete("/:id", async(req, res)=>{
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
router.put("/:id", async (req, res) => {
  const idClinique = req.params.id;

  try {
    // Find the clinic by ID
    const clinicToUpdate = await Clinique.findById(idClinique);
    
    if (!clinicToUpdate) {
      return res.status(404).send({
        message: "La clinique à mettre à jour n'existe pas."
      });
    }

    // Update clinic information with data from request body
    Object.assign(clinicToUpdate, req.body);

    // Save the updated clinic
    const updatedClinic = await clinicToUpdate.save();

    return res.status(200).send({
      cliniqueInfo: updatedClinic,
      message: "La clinique a été mise à jour avec succès."
    });
  } catch (error) {
    console.error("Error updating clinic:", error);
    return res.status(500).send({
      message: "Une erreur s'est produite lors de la mise à jour de la clinique."
    });
  }
});









module.exports = router