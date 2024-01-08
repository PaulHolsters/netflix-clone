const mongoose = require('mongoose')

/************************************************************   schema's  *************************************************************************************/

const filmSchema = new mongoose.Schema({
    titel: {
        type: String, required: true, trim: true
    },
    acteurs: {
        type: [{persoonId:{type: mongoose.Schema.Types.ObjectId, ref: 'Persoon'}, karakter:{type:String}}]
    },
    jaar: {type: Number, min:1900, max:2080}
}, {})
/************************************************************   validation functions   **************************************************************************/

/*filmSchema.path('name').validate(async function (propValue) {
    if(this._update){
        // a name always gets inserted in lowercase after trimming
        let docs = await productModel.find().where('name').equals(propValue).exec()
        docs = docs.filter(doc=>{
            return doc._id.toString()!==this._conditions._id.toString()
        })
        return docs.length === 0
    } else{
        // a name always gets inserted in lowercase after trimming
        return (await productModel.find().where('name').equals(propValue).countDocuments()) === 0
    }
}, 'Er bestaat al een product met deze naam.')*/

/*******************************************************************   methods  *********************************************************************************/
const listsAreUnique = function (list) {
    for (let i = 0; i < list.length; i++) {
        for (let j=0;j<list.length;j++){
            if(i!==j){
                // mathematical definition of equality of lists
                if(list[j].every(x=>list[i].includes(x))&&list[i].every(x=>list[j].includes(x))){
                    return false
                }
            }
        }
    }
    return true
}


/********************************************************************   hooks  **********************************************************************************/

/*productSpecificationSchema.pre('deleteOne',function (next) {
    const id = this._conditions._id.toString()
    productModel.find().select({specifications:1,_id:0}).exec().then(async specsArray => {
        specsArray.forEach(specsList => {
            // specList is an object
            const index = specsList.specifications.findIndex(spec => {
                return spec.toString() === id
            })
            if(index!==-1){
                specsList.specifications.splice(index, 1)
            }
        })
        const arr =  specsArray.map(list => {
            return list.specifications
        })
        let ok = this.listOfSpecsIsUnique(arr)
        if (!ok) {
            next('Het verwijderen van deze specificatie heeft tot gevolg dat er producten ontstaan die dezelfde eigenschappen hebben.')
        } else {
            ok = this.noEmptySpecList(arr)
            if(ok){
                next()
            } else{
                next('Het verwijderen van deze specificatie heeft tot gevolg dat er producten ontstaan zonder eigenschappen.')
            }
        }
    }).catch(err=>{
        console.log(err)
    })
})*/
filmSchema.post('find',function(next){
    console.log(this._collection.collection.collection)
})

/*****************************************************************   models  ************************************************************************************/
const filmModel = mongoose.model('Film', filmSchema)
module.exports = {filmModel,listsAreUnique}
