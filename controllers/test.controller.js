const Test = require('../models/test.model')
const RequestType = require('../models/request-type.model');
const Request = require('../models/request.model');
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer')
var myemail = "nourhene.amara@gmail.com";
var pass = "";

exports.testFn = (req, res) => {

    var t = new Test();

    t.qte = 7;

    /*  t.save()
      .then(()=>{
  
      })
      .catch(()=>{
  
      })*/

    t.save((err, result) => {
        if (err) {
            res.status(500).send("ok")
        }
        // res.status(500).send("ok")
        res.send(result)
    });

}

exports.createUser = (req, res) => {
   if(!req.body){
       return res.status(500)
   }
    const newUser = new User(req.body)
    //1- test if email exist
    User.findOne({email : req.body.email} , (err , userResult)=>{
        if(userResult){
           // res.send({"error" : "email exist"})
          return res.status(403).send({"error" : "email exist"})
        }
        //generate hash
        bcrypt.genSalt(10 , (saltErr , key)=>{
            bcrypt.hash(req.body.password , key , (hashErr , hashPass)=>{
                console.log(hashPass)
                newUser.password = hashPass;
                newUser.save((saveErr , SavedUser)=>{
                    if(saveErr){
                        return res.status(500)
                    }
                    //Send Mail
                    res.send(SavedUser)
                })
            })
        })

    })
}

exports.login = (req , res)=>{
    User.findOne({email : req.body.email} , (err , userResult)=>{
        //1- test email
        if(!userResult){
            return res.status(403).send({"error" : "invalid_email"})
        }
        // 2 - test password

        bcrypt.compare(req.body.password , userResult.password , (compareErr , validPass)=>{
            if(!validPass){
                return res.status(403).send({"error" : "invalid_passowrd"})
            }
            res.send(userResult)
        })
    })
}

exports.createType = (req, res) => {
    var t = new RequestType(req.body)

    t.save((err, result) => {
        res.send(result)
    })
}

exports.createType = (req, res) => {
    var t = new RequestType(req.body)

    t.save((err, result) => {
        res.send(result)
    })
}

exports.createRequest = (req, res) => {
    var request = new Request(req.body)

    // delete deleteOne (_id) update updateOne ( _id , body)
    RequestType.findOne({ type: 'in progress' }, (type_error, type_result) => {
        if (!type_result) {
            // send error
            console.log(type_result)
        }
        request.statusId = type_result;
        request.save((err, result) => {
            res.send(result)
        })
    })


}

exports.getAllRequests = (req, res) => {
    Request.find()
        .populate('userId')
        .populate('statusId')
        .then(result => {
            res.send(result)
        })
}

exports.sendMail = (req , res)=>{
    // 1 - transporteur
    var email = req.body.email;
    var content = req.body.content;
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: myemail,
            pass: pass
        },
        secureConnection: true,
        tls: {
            ciphers: 'SSLv3'
        }
    });

    // 2- Mail content
    var mailOptions = {
        from: 'nourhene.amara@gmail.com',
        to: email,
        subject: 'test mail',
        text: content,
        html: '<a href="http://localhost:4200">click here </a>'
    };
 

    // 3 - send mail

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send({message: info.response})
        }
    });

}