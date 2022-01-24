var express = require('express');
var router = express.Router();
const { pool } = require('../config.js')

router.get('/', (req, res) => {
    
    const userid = req.query.userid

    if (userid >= 0){
        pool.query('SELECT * FROM post WHERE userid=$1',[userid], (error, results) => {
            if (error) {
                throw error
            }
        res.status(200).json(results.rows)
        })
    } else {
        pool.query('SELECT * FROM post', (error, results) => {
            if (error) {
                throw error
            }
        res.status(200).json(results.rows)
        })
    }

})

router.get('/:id', (req, res) => {
    const id = req.params.id
    pool.query('SELECT * FROM post WHERE id=$1',[id], (error, results) => {
        if (error) {
            throw error
        }
    res.status(200).json(results.rows)
})
})

router.post('/', (req, res) => {
    
    const userid = req.cookies.userid
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


router.delete('/', (req, res) => {
    const postid = req.body.id
    const userid =  req.cookies.userid

    pool.query('DELETE FROM "post" where id=$1 userid=$2 ', [postid, userid], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({
            status:200,
            message: results
        })
    })

})

router.patch('/', (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const content = req.body.content

    pool.query('UPDATE "post" SET title=$2,content=$3 WHERE id=$1', [id, title, content], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json({
            status:200,
            message: results
        })
    })


})
module.exports = router