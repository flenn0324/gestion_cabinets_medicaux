const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const adminrouter = require("./user/routers/admin")
const app = express()

dotenv.config()

app.use(
  cookieSession({
    signed: false, //no encryption

  })
)
app.use(cors());
app.disable("x-powered-by"); //Reduce fingerprinting
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(adminrouter)


// database connection 
mongoose.connect(process.env.URI)
  .then((msg)=> {
    console.log({
      response: "successfully connected to database.",
      message: msg.version
    })
  })
  .catch((err) => {
    console.log({
      response: "connection failed",
      message: err
    })
  })


const port = process.env.PORT
app.listen(port, () => {
  console.log(`the app is listening on port ${port}`)
})