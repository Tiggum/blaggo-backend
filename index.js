const bodyParser = require("body-parser")
const express = require('express')
const cors = require('cors')
const pool = require("./config")
const session = require("express-session")

const user = require('./routes/user')
const post = require('./routes/post')

const app = express()
const port = process.env.PORT || 9001
console.log(process.env.NODE_ENV)
console.log(process.env.DATABASE_URL)

const corsOptions = {
    credentials: true,
    origin: ['https://blaggo.herokuapp.com', 'http://localhost:3000'],
    
}

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(
    session({ secret: "Blaggo", resave: true, saveUninitialized: true, cookie: {sameSite: 'none', secure: false}})
);

app.use('/user', user)
app.use('/post', post)

app.listen(port, () =>
    console.log(`Listening on port ${port}`)
)