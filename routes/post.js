var express = require('express');
var router = express.Router();
const pool = require('../config.js')

router.get('/', (req, res) => {
    pool.query('SELECT * FROM post', (error, results) => {
        if (error) {
            throw error
        }
    res.status(200).json(results.rows)
    })
})