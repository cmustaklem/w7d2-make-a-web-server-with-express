// Libraries
var express = require('express') //require is importing from node modules
var nunjucks = require('nunjucks')
var bodyParser = require('body-parser')
var multer = require('multer')
var moreRoutes = require('./more-routes')

var port
var app = express() //we are creating a new express variable

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

//Routes

app.use('/api/v1', moreRoutes)

//Setup

var port = process.env.PORT || 8080
// var app = express()
// var upload = multer({ dest: 'public/uploads/' })

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get('/', (req, res) => {
//     // console.log(request.baseURL)
//     res.send(request.baseURL)
// })

// app.get('/', (req, res) => {
//     // console.log(request.baseURL)
//     // res.send(request.baseURL)
//     if (req.query.is_red === 'yes') {
//         res.send('<h1 style="color: red;">You are logged in!</h1>')
//     }
//     else {
//         res.send('<h1>Logged out</h1>')
//     }
// })

app.post('/photos', upload.single('photo'), (req, res) => {
    res.render('photo.html', {
      photo: req.files['photo'][0].originalname,
      caption: req.body.caption
    }
  )
})
// app.post('/photos', upload.single('photo'), (req, res) => {
//     res.json(req.body)
// })

app.get('/', (req, res) => {
    // console.log(request.baseURL)
    // res.send(request.baseURL)
    if (req.query.username === 'collin') {
        res.render('loggedin.html', {
            username: request.query.username,
            queryStuff: request.query,
            users: ['collin', 'cyrus']
        })
    }
    else {
        res.render('loggedout.html')
    }
})

// app.get('/api/', (req, res) => {
//     res.send('API lives here')
// })

// app.get('/api/', (req, res) => { //request is information about the incoming request
//     res.json([
//         {
//             id: 1,
//             name: 'Joe'
//         },
//         {
//             id: 2,
//             name: 'Sue'
//         }
//     ]
//
//     res.json(users) //this is what the response and json is the method
// )
// })

app.use(express.static('public')) //if we moved this line of code above the app.get, the system will read this first. It is like a race to see who matches what, first.

app.listen(8080)
console.log('Public Server http://localhost:8080')
console.log('Press CTRL+C To Exit')

//
