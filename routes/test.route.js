module.exports = (app) => {

const myCntrl = require('../controllers/test.controller');
const postCntrl = require('../controllers/posts.controller');
app.get('/a' , myCntrl.testFn);

app.post('/addtype' , myCntrl.createType)

app.post('/addrequest' , myCntrl.createRequest)

app.get('/allrequests' , myCntrl.getAllRequests)

app.delete('/remove/:_id')

app.post('/sendmail' , myCntrl.sendMail)


// auth routes
app.post('/adduser' , myCntrl.createUser)
app.post('/login' , myCntrl.login)

// posts routes
app.get('/addposts' , postCntrl.createPost);
app.get('/getPosts' , postCntrl.getAllPosts);
app.get('/getReactsByPostId/:postId' , postCntrl.getReactsByPostId);
app.post('/saveReact' , postCntrl.userReact);
}