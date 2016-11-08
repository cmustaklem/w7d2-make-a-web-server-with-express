var express = require('express')
var router = express.Router() //these two lines are necessary for all files with back-end
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./store.sqlite3')

router.get('/users', (req, res) => {

    db.serialize(() => { //serialize means that everything needs to run in sequence
        db.all('SELECT id, first_name FROM users ORDER BY id DESC', (errors, rows) => {
            res.json(rows) //this returns everything back as rows of data
        })
    })
    // res.json([])
})

module.exports = router
