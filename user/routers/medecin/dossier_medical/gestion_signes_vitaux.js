const router = require("express").Router()
const SignesVitaux = require("../../../models/SignesVitaux")

//ajout d'une liste de signe vitaux
router.post("/add", async (req, res)=>{
 
  const newSignesVitaux = new SignesVitaux({
    ...req.body
  })

  const signesVitauxAdded = await newSignesVitaux.save();

  if (!signesVitauxAdded) return res.status(401).send({
    message: "une erreur s'est produite lors d'ajout d'une nouvelle liste de signes vitaux."
  })

  return res.status(201).send({
    signesVitauxInfos: signesVitauxAdded,
    message : "la liste des signes vitaux est bien ajoutée."
  })
})

//get all liste des signes vitaux
router.get("/:nss", async (req, res)=>{
  const listeSignesVitaux = await SignesVitaux.find({nss: req.params.nss})

  return res.status(200).send({
    listeSignesVitaux : listeSignesVitaux,
    message: "liste des signes vitaux récupérée correctement."
  })
})


//delete signe vitaux
router.delete("/:id", async(req, res)=>{
  const id_signes = req.params.id

  // search for it and send it 
  res.status(200).send(
    {
      signesVitaux : await SignesVitaux.deleteOne({_id:id_signes})
    }
  )
})


/**
 * @swagger
 * tags:
 *   - name: Signes Vitaux
 *     description: Operations related to signes vitaux by Doctor
 */

// Add a new list of signes vitaux
/**
 * @swagger
 * /doctor/patient/signesvitaux/add:
 *   post:
 *     summary: Add a new list of signes vitaux
 *     tags: [Signes Vitaux]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SignesVitaux'
 *     responses:
 *       '201':
 *         description: Signes vitaux list added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SignesVitaux'
 *       '401':
 *         description: Error adding signes vitaux list
 */

// Get all lists of signes vitaux for a specific NSS
/**
 * @swagger
 * /doctor/patient/signesvitaux/{nss}:
 *   get:
 *     summary: Get all lists of signes vitaux for a specific NSS
 *     tags: [Signes Vitaux]
 *     parameters:
 *       - in: path
 *         name: nss
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved lists of signes vitaux
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listeSignesVitaux:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SignesVitaux'
 *                 message:
 *                   type: string
 *       '500':
 *         description: Internal server error
 */

// Delete a list of signes vitaux by ID
/**
 * @swagger
 * /doctor/patient/signesvitaux/{id}:
 *   delete:
 *     summary: Delete a list of signes vitaux by ID
 *     tags: [Signes Vitaux]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Signes vitaux list deleted successfully
 *       '500':
 *         description: Internal server error
 */

module.exports = router