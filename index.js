const bodyParser = require("body-parser")
const express = require('express')
const cors = require('cors')
const pool = require("./config")
const session = require("express-session")

const user = require('./routes/user')

const app = express()
const port = process.env.PORT || 9001


const corsOptions = {
    credentials: true,
    origin: '*'
}

app.use(bodyParser.json());
app.use(
    session({ secret: "Blaggo", resave: true, saveUninitialized: true })
);

app.use('/user', user)

app.listen(port, () =>
    console.log(`Listening on port ${port}`)
)