const express = require('express')
const router = express.Router()
const Schema = require('../models/Film')
const mijnLijstSchema = require('../models/MijnLijst')

router.get('/', async (req, res, next) => {
    const lijst = await mijnLijstSchema.mijnLijstModel.findOne({account: '659bd2769fd74132944d1171'})
    Schema.filmModel.find({}, {__v: 0})
        .populate('acteurs.persoonId', {naam: 1}).then(result => {
        result = result.map( r => {
            if (lijst && lijst['films']) {
                r._doc['isInList'] = lijst.films.includes(r._id)
            }
            return r
        })
        res.status(200).json(
            {
                data: result
            }
        )
    }).catch(err => {
        res.status(500).json({
            error: 'something went wrong'
        })
    })
})
router.post('/', (req, res, next) => {
    const newFilm = new Schema.filmModel({
        titel: req.body.titel,
        acteurs: req.body.acteurs,
        jaar: req.body.jaar
    })
    newFilm.save().then(result => {
        res.status(201).json()
    }).catch(err => {
        let failedProp = ''
        if (err.errors.hasOwnProperty('titel')) {
            failedProp = 'titel'
        } else if (err.errors.hasOwnProperty('acteurs')) {
            failedProp = 'acteurs'
        } else if (err.errors.hasOwnProperty('jaar')) {
            failedProp = 'jaar'
        }
        res.status(500).json({
            error: err.errors[failedProp].message
        })
    })
})
module.exports = router
