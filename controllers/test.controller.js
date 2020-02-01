const Test = require('../models/test.model')
const RequestType = require('../models/request-type.model');
const Request = require('../models/request.model');
const User = require('../models/user.model');

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
    var u = new User(req.body)

    u.save((err, result) => {
        res.send(result)
        // res.sendStatus(403)
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