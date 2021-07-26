const mongoose = require('mongoose');
require('dotenv/config');

const connectionParams = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
}

//to connect to localhost database:
mongoose.connect('mongodb://localhost:27017/ToDo-List', connectionParams, (err) => {
    if (!err)
        console.log('Connected to Database');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;