const router = require("express").Router()
const Doctor = require("../../../models/Doctor")
const jwt = require("jsonwebtoken")


function generateAccessToken(infos) {
  return jwt.sign({...infos}, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '3600s' });
}


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /doctor/signin:
 *   post:
 *     summary: Sign in to the doctor account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             example:
 *               email: anis@gmail.com
 *               password: anis
 *     responses:
 *       '200':
 *         description: Successful signin
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userInfo:
 *                   type: object
 *                   properties:
 *                     Token:
 *                       type: string
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                 message:
 *                   type: string
 *                   description: Success message
 *       '400':
 *         description: Invalid credentials
 *       '401':
 *         description: Email does not exist
 */
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