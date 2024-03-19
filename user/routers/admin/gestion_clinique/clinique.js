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

/**
 * @swagger
 * tags:
 *   name: Cliniques 
 *   description: API endpoints for managing cliniques by Admin
 */

/**
 * @swagger
 * /admin/cliniques/create:
 *   post:
 *     summary: Create a new clinic
 *     tags: [Cliniques]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clinique'
 *     responses:
 *       '201':
 *         description: Clinic created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clinique'
 *       '401':
 *         description: Error occurred while adding the clinic
 *
 * /admin/cliniques:
 *   get:
 *     summary: Get all clinics
 *     tags: [Cliniques]
 *     responses:
 *       '200':
 *         description: List of all clinics
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listeClinique:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Clinique'
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '401':
 *         description: Error occurred while retrieving clinics
 *
 * /admin/cliniques/{id}:
 *   get:
 *     summary: Get a single clinic by ID
 *     tags: [Cliniques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the clinic to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Clinic retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clinique'
 *       '400':
 *         description: Clinic does not exist
 *
 *   delete:
 *     summary: Delete a clinic by ID
 *     tags: [Cliniques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the clinic to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Clinic deleted successfully
 *       '400':
 *         description: Error occurred while deleting the clinic
 *
 *   put:
 *     summary: Update a clinic by ID
 *     tags: [Cliniques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the clinic to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Clinique'
 *     responses:
 *       '200':
 *         description: Clinic updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Clinique'
 *       '404':
 *         description: Clinic to update does not exist
 *       '500':
 *         description: Error occurred while updating the clinic
 */







module.exports = router