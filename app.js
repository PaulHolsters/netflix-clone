'use strict'
const express = require('express')

const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const multer = require('multer')
const app = express()

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:`+ process.env.MONGO_ATLAS_PW +`${process.env.MONGO_ATLAS_DB}`,
{
    useNewUrlParser: true,
    useCreateIndex: true,
    autoIndex: true, //this is the code I added that solved it all: should be false in production!!
    keepAlive: true,
    poolSize: 10,
    bufferMaxEntries: 0,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // Use IPv4, skip trying IPv6
    useFindAndModify: false,
    useUnifiedTopology: true
}
,(err)=>{console.log(err)})

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'images')
    },
    filename:(req, file, cb)=>{
        // todo use a package that generates a truely unique hashcode
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})
const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/png'){
        cb(null,true)
    } else{
        cb(null,false)
    }
}

// todo store the path to the image so it can be retreived to create the supplierorder

// logging middleware which will do it's thing and then forwards the request automatically to the next middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(multer({storage:fileStorage, fileFilter:fileFilter}).single('image'))

const filmRoutes = require('./routes/films')
const mijnLijstRoutes = require('./routes/mijnLijst')
const personenRoutes = require('./routes/personen')
const accountRoutes = require('./routes/accounts')

app.use(((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if(req.method === 'OPTIONS'){
        console.log('options called')
        res.header('Access-Control-Allow-Methods','PUT, PATCH, DELETE, POST, GET')
        return res.status(200).json({})
    }
    next()
}))

// setting up middlewares
app.use('/films',filmRoutes)
app.use('/mijn-lijst',mijnLijstRoutes)
app.use('/personen',personenRoutes)
app.use('/accounts',accountRoutes)

// handle all non-defined requests
// todo de return value trekt hier op niets
app.use((req,res,next)=>{
    const err = new Error('not found')
    err.status = 404
    next(err)
})

app.use(( req, res, next) =>{
    res.error()
})

module.exports = app

