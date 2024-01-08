const mongoose = require('mongoose')

/************************************************************   schema's  *************************************************************************************/

const accountSchema = new mongoose.Schema({
    gebruikersnaam: {
        type: String, required: true, trim: true
    },
}, {})
/************************************************************   validation functions   **************************************************************************/

/*******************************************************************   methods  *********************************************************************************/

/********************************************************************   hooks  **********************************************************************************/

/*****************************************************************   models  ************************************************************************************/

const accountModel = mongoose.model('Account', accountSchema)
module.exports = {accountModel}
