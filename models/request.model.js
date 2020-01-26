
const mongoose = require('mongoose');
const User = require('./user.model');
const RequestType = require('./request-type.model');
var RequestSchema = new mongoose.Schema({

   subject : String,
   content : String,
   statusId : { type : mongoose.Schema.Types.ObjectId   , ref : RequestType},
   userId : { type : mongoose.Schema.Types.ObjectId   , ref : User},
})


module.exports = mongoose.model('Request', RequestSchema );