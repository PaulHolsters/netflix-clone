const express = require('express')
const router = express.Router()
const Schema = require('../models/Account')
router.get('/:id', (req, res, next) => {
    Schema.accountModel.findOne({_id:req.params.id}).then(result => {
        res.status(201).json({
            res:result
        })
    }).catch(err => {
        res.status(500).json({
            error: err.errors
        })
    })
})
router.post('/', (req, res, next) => {
    const newAccount = new Schema.accountModel({
        gebruikersnaam:req.body.gebruikersnaam
    })
    newAccount.save().then(result => {
        res.status(201).json()
    }).catch(err => {
        if (err.errors.hasOwnProperty('gebruikersnaam')) {
            res.status(500).json({
                error: err.errors['gebruikersnaam'].message
            })
        }
        res.status(500).json({
            error: err.errors
        })
    })
})
module.exports = router
