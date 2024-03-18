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


module.exports = router