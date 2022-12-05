//import
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")

//create express app
const app = express()

//establish database connection
mongoose.connect(process.env.DATABASE_URL)

//mongoose connection events
mongoose.connection
.on("open", () => console.log("Connected to Mongoose"))
.on("close", () => console.log("Disconnected from Mongoose"))
.on("error", (error) => console.log(error))


//register middleware
app.use(morgan("dev"))//why?? app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))// /static is needed here to show path. 
app.use(express.urlencoded({extended: true})) 

//Routes and Routers
app.get("/",(req,res) => {
  res.send("<h1>Server is Working</h1>")
})

//start server
const PORT =process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))