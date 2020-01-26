
const mongoose = require('mongoose')
var RequestTypeSchema = new mongoose.Schema({

   type : String
})


module.exports = mongoose.model('RequestType', RequestTypeSchema );
