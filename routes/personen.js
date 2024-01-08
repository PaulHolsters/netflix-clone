const express = require('express')
const router = express.Router()
const Schema = require('../models/Persoon')

router.get('/', (req, res, next) => {
    // todo heel benieuwd of dit kan => indien niet dan zal dit met een hook moeten gebeuren
        Schema.persoonModel.find({}, {__v: 0}).then(result => {
            res.status(200).json(
                {
                    personen: result
                }
            )
        }).catch(err => {
            res.status(500).json({
                error: 'something went wrong'
            })
        })
})
router.post('/', (req, res, next) => {
    const newPerson = new Schema.persoonModel({
        naam:req.body.naam
    })
    newPerson.save().then(result => {
        res.status(201).json()
    }).catch(err => {
        let failedProp = ''
        if (err.errors.hasOwnProperty('naam')) {
            failedProp = 'name'
        }
        res.status(500).json({
            error: err.errors[failedProp].message
        })
    })
})
module.exports = router
