const express = require('express')
const router = express.Router()
const Schema = require('../models/Film')

router.get('/', (req, res, next) => {
        Schema.filmModel.find({}, {__v: 0})
            .populate('acteurs.persoonId',{naam:1}).then(result => {
            res.status(200).json(
                {
                    films: result
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
        titel:req.body.titel,
        acteurs:req.body.acteurs,
        jaar:req.body.jaar
    })
    newFilm.save().then(result => {
        res.status(201).json()
    }).catch(err => {
        let failedProp = ''
        if (err.errors.hasOwnProperty('titel')) {
            failedProp = 'titel'
        } else if(err.errors.hasOwnProperty('acteurs')){
            failedProp = 'acteurs'
        }else if(err.errors.hasOwnProperty('jaar')){
            failedProp = 'jaar'
        }
        res.status(500).json({
            error: err.errors[failedProp].message
        })
    })
})
module.exports = router
