const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const _ = require('lodash'); 
require('../models/task.model');

const Task = mongoose.model('Task');

//add new task
router.post('/',(req, res, next) => {
    const newTask = new Task (req.body);

    newTask.save((err, doc) => {
        if(!err)
            res.send(doc);
       
        else {
            return next(err);
        }
    })

});

//list all tasks
router.get('/', (req, res) => {
    Task.find((err, docs) => {
        if(!err){
            res.send(docs);
        }else{
            console.log('Error in retrieving Tasks: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

//get single task record
router.get('/:id', (req,res) => {
    //check if task exists
    Task.exists({ _id: req.params.id }).then((result) => {
        if(!result){
            return res.status(400).send(`No task found with given id:${req.params.id}`);
        }else{
            Task.findById(req.params.id, (err, doc) => {
                if(!err)
                    res.send(doc);
                else
                    console.log('Error in retrieving task: ' + JSON.stringify(err, undefined, 2));
            });
        }
    });
});

//edit or update Task
router.patch('/:id', (req, res, next) => {
    //check if task exists in the database
    Task.exists({ _id: req.params.id }).then((result) => {
        if(!result){
            return res.status(400).send(`No task found with given id:${req.params.id}`);
        }else{
            //fetch task record
            Task.findById(req.params.id, (err, post) => {
                if (err) return next(err);

                //update task using lodash
                _.assign(post, req.body);
                post.save((err) => {
                    if(err) return next(err);

                    return res.status(200).json(post);
                })
            });
        }
    });

});

//delete task
router.delete('/:id', (req, res) => {
    //check if task exists
    Task.exists({ _id: req.params.id }).then((result) => {
        if(!result){
            return res.status(400).send(`No task found with given id:${req.params.id}`);
        }else{
            Task.findByIdAndRemove(req.params.id, (err, doc) => {
                if (!err) {
                    res.send(doc);
                }else{
                    console.log(`Error: could not delete task: ` +JSON.stringify(err, undefined, 2));
                }
            });
        }
    });
});

module.exports = router;