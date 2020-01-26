const Test = require('../models/test.model')
const RequestType = require('../models/request-type.model');
const Request = require('../models/request.model');
const User = require('../models/user.model')
exports.testFn = (req,res)=>{

    var t = new Test();
  
    t.qte = 7;

  /*  t.save()
    .then(()=>{

    })
    .catch(()=>{

    })*/

    t.save((err , result)=>{
        if(err){
            res.status(500).send("ok")
        }
       // res.status(500).send("ok")
        res.send(result)
    });
    
}

exports.createUser = (req,res)=>{
    var u = new User(req.body)

    u.save((err,result)=>{
        res.send(result)
    })
}

exports.createType = (req,res)=>{
    var t = new RequestType(req.body)

    t.save((err,result)=>{
        res.send(result)
    })
}

exports.createType = (req,res)=>{
    var t = new RequestType(req.body)

    t.save((err,result)=>{
        res.send(result)
    })
}

exports.createRequest = (req,res)=>{
    var request = new Request(req.body)
    RequestType.findOne({type : 'in progress'} , (type_error , type_result)=>{
        if(!type_result){
            // send error
            console.log(type_result)
        }
        request.statusId = type_result;
        request.save((err,result)=>{
            res.send(result)
        })
    })
    
   
}

exports.getAllRequests = (req,res)=>{
    Request.find()
    .populate('userId')
    .populate('statusId')
    .then(result=>{
        res.send(result)
    })
}