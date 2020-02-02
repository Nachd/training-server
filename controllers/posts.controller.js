const Post = require('../models/post.model');
const React = require('../models/react.model');

exports.createPost = (req,res)=>{

    var tab = [
        new Post({title : 'a' , content : 'content a'}),
        new Post({title : 'b' , content : 'content b'}),
        new Post({title : 'c' , content : 'content c'}),
        new Post({title : 'd' , content : 'content d'})
    ]

    Post.insertMany(tab , (err , result)=>{
        console.log("saved")
    })

}

exports.getAllPosts = (req,res)=>{
    Post.find({})
    .then(posts=>{
        res.send(posts)
    })
}

exports.getReactsByPostId = (req,res)=>{
    React.find({postId : req.params.postId} , (err , reacts)=>{
        res.send(reacts)
    })
}

exports.userReact = (req,res)=>{
    //params : userId , postId , reaction
    React.findOne({userId : req.body.userId , postId : req.body.postId} , (err , react)=>{
        if(react){
            //update
            react.reaction = req.body.reaction;
            React.updateOne({_id : react._id} , react , (updateErr , updateSucc)=>{
                res.send(updateSucc)
            })
        }
        else{
            //create
            react = new React(req.body);
            react.save()
            .then(result=>{
                res.send(result)
            })
        }
    })
}