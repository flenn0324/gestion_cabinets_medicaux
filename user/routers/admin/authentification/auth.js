const router = require("express").Router();
const bcrypt = require('bcrypt');
const Admin = require('../../../models/Admin');
const jwt = require('jsonwebtoken');


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
 * path:
 *  /admin/signin:
 *    post:
 *      summary: Sign in to the admin account
 *      tags: [Authentication]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *              example:
 *                email: admin@example.com
 *                password: password123
 *      responses:
 *        "200":
 *          description: Successful signin
 *        "400":
 *          description: Invalid credentials
 *        "401":
 *          description: Email does not exist
 */

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