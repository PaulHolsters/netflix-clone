const mongoose = require('mongoose')

/************************************************************   schema's  *************************************************************************************/

const mijnLijstSchema = new mongoose.Schema({
    account:{type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    films: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Film'}]
    },
    series: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Serie'}]}
}, {})

const mijnLijstModel = mongoose.model('MijnLijst', mijnLijstSchema)
module.exports = {mijnLijstModel}
