// Libraries
var express = require('express')
var router = express.Router()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./store.sqlite3')

// SQLite3 Library (https://github.com/mapbox/node-sqlite3/wiki/API)
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('./store.sqlite3')


//Routes
router.get('/users', function (req, res) {
  db.serialize(function () {
      db.all('SELECT * FROM users', (errors, rows) => {
        if (req.query.format === 'html') {
          res.render('users.html', {
            users: rows  //this returns everything back as rows of data
        })
      }
      else {
        res.json(rows)
      }
    })
  })
})
//
router.get('/orders', function (req, res) {
  db.serialize(function () {
      db.all('SELECT * FROM orders', (errors, rows) => {
        if (req.query.format === 'html') {
          res.render('orders.html', {
            orders: rows  //this returns everything back as rows of data
        })
      }
      else {
        res.json(rows)
      }
    })
  })
})


router.get('/items', function (req, res) {
  db.serialize(function () {
      db.all('SELECT * FROM items', (errors, rows) => {
        if (req.query.format === 'html') {
          res.render('items.html', {
            items: rows  //this returns everything back as rows of data
        })
      }
      else {
        res.json(rows)
      }
    })
  })
})


router.get('/addresses', function (req, res) {
  db.serialize(function () {
    db.all('SELECT * FROM addresses', (errors, rows) => {
      if (req.query.format === 'html') {
        res.render('addresses.html', {
          addresses: rows
        })
      }
      else {
        res.join(rows)
      }
    })
  })
})


// router.get('/items', function (req, res) {
//   db.serialize(function () {
//
//       db.all('SELECT * FROM items', (errors, rows) => {
//           res.json(rows) //this returns everything back as rows of data
//       })
//
//   })
// })
//
//
// router.get('/addresses', function (req, res) {
//   db.serialize(function () {
//
//       db.all('SELECT * FROM addresses ', (errors, rows) => {
//           res.render(rows) //this returns everything back as rows of data
//           res.render('addresses.html', {
//               street: rows.street,
//               city: rows.city,
//               state: rows.state,
//               zip: rows.zip
//           })
//       })
//
//   })
// })

module.exports = router
