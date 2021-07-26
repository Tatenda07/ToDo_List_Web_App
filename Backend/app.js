const express = require('express');
const _port = 3000;
const cors = require('cors');
require('./db-config');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tasksController = require('./controllers/tasksController');

//handle validation errors within the application
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});

app.listen(_port, (err) => {
    if (err) { throw err; }
    console.log(`Server started at port: ${_port}`)
});

app.use('/tasks', tasksController);
