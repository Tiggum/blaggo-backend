var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const { pool } = require('../config.js')

router.post('/register', (req, res) => {


    if (
    !req.body.hasOwnProperty('firstname') ||
    !req.body.hasOwnProperty('lastname') ||
    !req.body.hasOwnProperty('username') ||
    !req.body.hasOwnProperty('password')
    ) {
        res.status(500).json({
            status: 500,
            message: "Missing information"            
        })
    } else {



        
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const password = req.body.password

    const saltRounds = 10
    const hash = bcrypt.hashSync(password, saltRounds)
    pool.query('INSERT INTO "user" (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *', [firstname, lastname, username, hash], (error, results) => {
        if (error) {
            res.status(409).json({
                status: 409,
                message: error
            })
        } else {
            res.status(200).json({
                status: 200,
                message: "Account Created"
            })
        }

    })}
})

router.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    pool.query('SELECT * FROM "user" WHERE username=$1', [username], (error, results) => {
        if (error) {
            throw error
        }

        if ( results.rows.length > 0) {
            if (bcrypt.compareSync(password, results.rows[0].password)) {
                const id = results.rows[0].id
                let sessionData = req.session
                
                sessionData.user = {}
                sessionData.user.id = id
                sessionData.user.username = username

                res.cookie('userid', id)

                res.status(200).json({
                    status: 200,
                    message: 'Login Successful'
                })
            } else {
                res.status(401).json({
                    status: 401,
                    message: 'User login failed'
                })
            }
        } else {
            res.status(401).json({
                status: 401,
                message: 'User login failed'
            })
        }
    })
})


module.exports = router