const router = require("express").Router();
const bcrypt = require('bcrypt');
const Admin = require('../../../models/Admin');
const jwt = require('jsonwebtoken');


function generateAccessToken(infos) {
  return jwt.sign({...infos}, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '3600s' });
}


router.post('/signin', async (req, res) => {
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


module.exports = router;