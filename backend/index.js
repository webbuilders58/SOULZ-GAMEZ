require('dotenv').config();
const express = require("express")
const bodyParser = require("body-parser")
// const ejs = require("ejs");
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

//database connection
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT  || 5000

const connection = async () => {
await mongoose.connect(CONNECTION_URL,{ useNewUrlParser : true , useUnifiedTopology : true})
}

connection()

app.listen( PORT, () => {
    console.log(`app is listening on port ${PORT}`)
})


app.get("/", (req,res) => {
    res.send("hello")
})