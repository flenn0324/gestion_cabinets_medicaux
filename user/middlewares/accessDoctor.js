const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  token = req.session.jwt


  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.SECRET_ACCESS_TOKEN , (err, user) => {
    console.log(err)

    if (err) return res.sendStatus(403)

    req.user = user


    if(req.user._doc.role != "doctor")  return res.sendStatus(403) 
    
    next()
  })
}

module.exports = authenticateToken