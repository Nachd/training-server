const mongoose = require('mongoose');

var PostSchema = mongoose.Schema({

    title : String,
    content : String


})


module.exports =mongoose.model('Post' , PostSchema)