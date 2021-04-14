const express = require("express")
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const cors = require("cors")
require("dotenv/config")

//middlewares
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)
app.use(bodyParser.json())
//import routes
const postRoutes = require("./routes/posts")
app.use("/posts", postRoutes)

app.get("/", (req, res) => {
  res.send("we are on home")
})

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB")
  }
)

//Listen or start the server
app.listen(3000)
