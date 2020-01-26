module.exports = (app) => {

const myCntrl = require('../controllers/test.controller');

app.get('/a' , myCntrl.testFn);
app.post('/adduser' , myCntrl.createUser)

app.post('/addtype' , myCntrl.createType)

app.post('/addrequest' , myCntrl.createRequest)

app.get('/allrequests' , myCntrl.getAllRequests)

}