const mongoose = require('mongoose');

const User = require('./user.model');
const Post = require('./post.model')
var ReactSchema = mongoose.Schema({

    userId : {type : mongoose.Schema.Types.ObjectId , ref: User},
    postId :  {type : mongoose.Schema.Types.ObjectId , ref: Post},
    reaction : String


})


module.exports =mongoose.model('React' , ReactSchema)