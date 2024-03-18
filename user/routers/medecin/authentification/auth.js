const router = require("express").Router()
const Doctor = require("../../../models/Doctor")
const jwt = require("jsonwebtoken")


function generateAccessToken(infos) {
  return jwt.sign({...infos}, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '3600s' });
}
// sigin
router.post("/signin", async (req, res)=>{
  // recupération des informations
  const doctorInfos = {
    ... req.body
  }
  console.log(doctorInfos)

  // check for the mail 
  const doctorFound = await Doctor.findOne({
    email : doctorInfos.email
  })

  console.log(doctorFound)

  if (!doctorFound) return res.status(400).send({
    message: "email erroné ou inexistant."
  })

  // if email found then check for the password
  if (doctorFound.password == doctorInfos.password) {
    // create a token and stock it in a req.session 
    const userJwt = generateAccessToken(doctorFound)
    //store the jwt on session object
    req.session = {
      jwt: userJwt
    }
    return res.status(200).send({
      doctorInfos : {
        email : doctorFound.email,
        id : doctorFound._id,
        nom: doctorFound.nom,
        prenom: doctorFound.prenom
      },
      message:"bienvenu."
    })
  } else {
    return res.status(400).send({
      message: "mot de passe erroné."
    })
  }

})


// signout

module.exports = router