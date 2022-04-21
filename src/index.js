const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://dhaval-functionup:gRrFSwHIong4NV9B@cluster0.az0cl.mongodb.net/Dhaval44-Database?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

app.use('/', route);





// app.use(function(req, res, next) {
//     console.log('This is a global middleware')
//     //Adding a property in request object
//     req['current-day'] = 'Wednesday'
//     next()
// })