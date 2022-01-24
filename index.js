const bodyParser = require("body-parser")
const express = require('express')
const cors = require('cors')
const pool = require("./config")
const session = require("express-session")
const cookieParser = require("cookie-parser")

const user = require('./routes/user')
const post = require('./routes/post')

const app = express()
const port = process.env.PORT || 9001

const corsOptions = {
    credentials: true,
    origin: ['https://blaggo.herokuapp.com', 'http://localhost:3000'],
    
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'yoursecret',
    cookie: {
        path: '/',
        domain: 'herokuapp.com',
        maxAge: 1000 * 60 * 24 // 24 hours
    }
}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});

app.use('/user', user)
app.use('/post', post)

app.listen(port, () =>
    console.log(`Listening on port ${port}`)
)