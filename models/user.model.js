
const mongoose = require('mongoose')
var UserSchema = new mongoose.Schema({

    firstName : {type : String , required : true},
    lastName:  {type : String , required : true},
    birthDate : Date,
    email :  {type : String , required : true},
    password :  {type : String , required : true},
})


module.exports = mongoose.model('User', UserSchema );
