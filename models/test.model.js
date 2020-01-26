
const mongoose = require('mongoose')
var TestSchema = new mongoose.Schema({

    name : {
        type : String , required : true
    },
    qte: Number
})


module.exports = mongoose.model('Test', TestSchema );
