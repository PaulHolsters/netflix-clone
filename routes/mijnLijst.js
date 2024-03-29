const express = require('express')
const router = express.Router()
const Schema = require('../models/MijnLijst')
const SchemaFilm = require('../models/Film')
router.put('/add/:id/:contentId', async(req, res, next) => {
    const film =  await SchemaFilm.filmModel.findById(req.params.contentId)
    if(film){
        Schema.mijnLijstModel.findOne({account:req.params.id}).then(lijst=>{
            if(!lijst){
                Schema.mijnLijstModel.create({
                    account:req.params.id,
                    films:[req.params.contentId],
                    series:[]
                }).then(result=>{
                    film._doc['isInList']=true
                    res.status(201).json(
                        {
                            data:film
                        }
                    )
                })
            } else{
                const newArrOfFilms = lijst.films.map(el=>el.toString())
                newArrOfFilms.push(req.params.contentId)
                Schema.mijnLijstModel.findOneAndUpdate({account:req.params.id},
                    {films:newArrOfFilms}).then(result=>{
                    film._doc['isInList']=true
                    res.status(201).json({
                        data:film
                    })
            })
        }}).catch(err => {
            console.log('error!!!!!!')
            res.status(500).json({
                error: err.errors
            })
        })
    } else{
        // todo
    }
})

router.put('/remove/:id/:contentId', async(req, res, next) => {
    const accountId = req.params.id
    const contentId = req.params.contentId
    const film =  await SchemaFilm.filmModel.findById(req.params.contentId)
    Schema.mijnLijstModel.findOne({account:accountId}).then(doc=>{
        let arrOfFilms = [...doc.films.map(el=>el.toString())]
        if(doc['films'] && arrOfFilms.includes(contentId)){
            arrOfFilms.splice(arrOfFilms.indexOf(contentId),1)
            Schema.mijnLijstModel.findOneAndUpdate({account:accountId},
                {films:arrOfFilms}).then(result=>{
                film._doc['isInList']=false
                 res.status(201).json({
                     data:film
                 })
            })
        } else if(doc.hasOwnProperty('series') && doc.series.includes(contentId.toString())){
            Schema.mijnLijstModel.findOneAndUpdate({account:accountId},
                {series:doc.series.splice(doc.series.indexOf(contentId.toString()),1)})
                .then(result=>{
                    film._doc['isInList']=false
                    res.status(201).json({
                        data:film
                    })
            })
        }
    }).catch(err => {
        res.status(500).json({
            error: err.errors
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
