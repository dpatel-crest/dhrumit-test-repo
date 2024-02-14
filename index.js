const express = require("express")
const jwt = require("jsonwebtoken")
const bodyParser = require('body-parser');
const axios = require("axios");

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


app.get("/", (req, res) => {
    // console.log(req) 
    res.send("Hello Dhrumit")
})
app.post("/", (req, res) => {
    try {
        console.log(req.body.username)
        res.send(req.body)
    } catch (error) {
        console.log(error)
        throw new Error("Error")
    }
})
app.post("/login", (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    // We have username and password
    // DB call
    // Validate password
    // After that fetch the user info
    const user = {
        "name": "Dhrumit Patel",
        "Company": "Crest"
    }

    // Make token
    const jwt_secret = "ThisIsJwtSecret"
    const token = jwt.sign(user, jwt_secret, {
        expiresIn: 100,
    })

    res.status(200).send({ token })
})

app.post("/verify", (req, res) => {
    console.log(`Verify Req: ${req.body.token}`)

    const token = req.body.token
    const jwt_secret = "ThisIsJwtSecret"

    // Verify
    const decode_token = jwt.verify(token, jwt_secret)
    console.log(`Decode Token : ${decode_token}`)
    res.status(200).send({ decode_token })

})

app.get("/login", (req, res) => {
    console.log(req.query)
    res.send("JWT GET Request Login Page")
})

app.get("/home", async (req, res) => {

    // Features of Axios
        // Make XMLHttpRequests from the browser
        // Make http requests from node.js
        // Supports the Promise API
        // Intercept request and response
        // Transform request and response data
        // Cancel requests
        // Automatic transforms for JSON data
        // 🆕 Automatic data object serialization to multipart / form - data and x - www - form - urlencoded body encodings
        // Client side support for protecting against XSRF

        
    // Fetch Data from APIs
    console.log("Home page")
    const API = "https://api.github.com/users/dhrumitpatel"
    const response = await axios.get(API)
    console.log(response.data)
    // res.send("I am at Home")
    res.send(JSON.stringify(response.data))
})

app.get("/home/sale", (req, res) => {
    res.status(201).send("Republic Sale")
})

app.listen(3000, () => {
    console.log("Server started successfully")
})