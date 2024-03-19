const Ordonnance = require("../../../models/Ordonnance")

const router = require("express").Router()


router.post("/create", async (req, res)=>{
  const newOrd = {
    ...req.body
  }

  const createOrd = new Ordonnance(newOrd)

  const ordSaved = await createOrd.save()

  if (ordSaved) {
    return res.status(201).send({
      infoOrdonnance : ordSaved,
      message: "ordonnance créée avec succes"
    })
  } else {
    return res.status (401).send({
      message: "erreur lors de la création de l'ordonnance"
    })
  }
})


// get ord 
router.get("/:id", async (req, res)=>{
  return res.status(200).send({
    ordInfos : await Ordonnance.findById(req.params.id)
  })
})

// get all ord 
router.get("/patient/:nss", async (req, res)=>{
  return res.status(200).send({
    ordList: await Ordonnance.find({nss_patient: req.params.nss})
  })
})


/**
 * @swagger
 * tags:
 *   - name: Ordonnances
 *     description: Operations related to prescriptions (Ordonnances) by Doctor
 */

// Create an ordonnance
/**
 * @swagger
 * /doctor/ordonnance/create:
 *   post:
 *     summary: Create a new ordonnance
 *     tags: [Ordonnances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ordonnance'
 *     responses:
 *       '201':
 *         description: Ordonnance created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ordonnance'
 *       '401':
 *         description: Error creating ordonnance
 */

// Get an ordonnance by ID
/**
 * @swagger
 * /doctor/ordonnance/{id}:
 *   get:
 *     summary: Get an ordonnance by ID
 *     tags: [Ordonnances]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved ordonnance
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ordonnance'
 */

// Get all ordonnances for a specific patient
/**
 * @swagger
 * /doctor/ordonnance/patient/{nss}:
 *   get:
 *     summary: Get all ordonnances for a specific patient
 *     tags: [Ordonnances]
 *     parameters:
 *       - in: path
 *         name: nss
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved ordonnances
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ordList:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Ordonnance'
 */
module.exports = router