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

module.exports = router