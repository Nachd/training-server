//imports
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
var mongoose = require('mongoose');
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

//config


const app = express();
app.use(cors());
app.use(bodyParser.json()); //{limit: '50mb'}
app.use(bodyParser.urlencoded({
    limit : '50mb',
    extended: true
}));
app.use(express.static('./'));

//connect to db 
mongoose.connect('mongodb://127.0.0.1:27017/training' , { useNewUrlParser: true})

    .then(()=> console.log('MongoDB Connected...'))
    .catch(err=>console.log(err));

//routes

require('./routes/test.route')(app)


//socket io
var http = require('http');
var server = http.Server(app);

//socket io initialization
var socketIO = require('socket.io');
var io = socketIO(server);
var clients = [];
io.on('connection', (socket) => {
console.log('socket connected')
socket.on('login' , (id)=>{
    //save socket id for each connected user by _id as key
    clientSet(id , socket.id);
    //console.log(clientGet(id))
})

// recuperer notif : new-request

socket.on('notify' , (data)=>{
    
    var notif ={
        Content : data.Content,
        Link : data.Link,
        ToUserId : data.ToUserId,
        IsSeen : false
    }
   // notificationCtrl.save(notif);
    var socket_client = clientGet( data.ToUserId);
    if(socket_client){
        console.log(socket_client)
        io.to(socket_client.sid).emit('receiveNotif' , notif)
    }

})

// envoi notif appto admin  

})

//
app.post('/upload', multipartMiddleware, (req, res) => {
    var file = req.files.uploads;
    console.log(file)
    res.send(file[0])
});


//run

function clientSet(userId , socketId){
    var e = {
        _id : userId,
        sid : socketId
    }
    var cli =  clients.find((c)=> c._id == userId);
    if(cli){
        clients.map((s ,i )=>{
            if(s._id == userId){
                clients[i] = e
            }
        })
    }else{
        clients.push(e)
    }
   
}

function clientGet(userId){
    return clients.find((c)=> c._id == userId);
  
}


server.listen(5000 , ()=>{
    console.log("ok")
})