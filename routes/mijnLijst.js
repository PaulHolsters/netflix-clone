const express = require('express')
const router = express.Router()
const Schema = require('../models/MijnLijst')

router.put('/', (req, res, next) => {

    const newFilm = new Schema.mijnLijstModel({
        name: req.body.name,
        cat: req.body.cat,
        price: req.body.price,
        specifications: req.body.specifications,
        options: req.body.options
    })
    newFilm.save().then(result => {
        res.status(201).json()
    }).catch(err => {
        let failedProp = ''
        if (err.errors.hasOwnProperty('name')) {
            failedProp = 'name'
        } else if (err.errors.hasOwnProperty('cat')) {
            failedProp = 'cat'
        } else if (err.errors.hasOwnProperty('price')) {
            failedProp = 'price'
        } else if (err.errors.hasOwnProperty('specifications')) {
            failedProp = 'specifications'
        } else if (err.errors.hasOwnProperty('options')) {
            failedProp = 'options'
        }
        res.status(500).json({
            error: err.errors[failedProp].properties.message
        })
    })
})

router.delete('/:id', (req, res, next) => {
    Schema.mijnLijstModel.deleteOne({_id: req.params.id}, {}).then(result => {
        res.status(200).json()
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router
