var express = require('express');
var router = express.Router();
const { pool } = require('../config.js')

router.get('/', (req, res) => {
    pool.query('SELECT * FROM post', (error, results) => {
        if (error) {
            throw error
        }
    res.status(200).json(results.rows)
    })
})

router.post('/', (req, res) => {
    
    const userid = req.body.userid
    const title = req.body.title
    const content = req.body.content
    
    pool.query('INSERT INTO "post" (userid, title, content) values ($1, $2, $3)', [userid, title, content], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({
            status:200,
            message: "Post successfully submitted"
        })
    })
})

module.exports = router