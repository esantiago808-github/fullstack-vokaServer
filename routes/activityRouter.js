const express = require('express');
const bodyParser = require('body-parser');
const Activity = require('../models/activity');

const activityRouter = express.Router();

activityRouter.use(bodyParser.json());

activityRouter.route('/')   
.get((req, res, next) => {
    Activity.find()
    .then(activities => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(activities);
    })
    .catch(err => next(err));
})
.post((req, res, next) => {
    Activity.create(req.body)
    .then(activity => {
        console.log('Activity Created ', activity);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(activity);
    })
    .catch(err => next(err));
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /activity');
})
.delete((req, res, next) => {
    Activity.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

activityRouter.route('/:activityId')
.get((req, res, next) => {
    Activity.findById(req.params.activityId)
    .then(activity => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(activity);
    })
    .catch(err => next(err));
})
.post((req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /activity/${req.params.activityId}`);
})
.put((req, res, next) => {
    Activity.findByIdAndUpdate(req.params.activityId, {
        $set: req.body
    }, { new: true })
    .then(activity => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(activity);
    })
    .catch(err => next(err));
})
.delete((req, res, next) => {
    Activity.findByIdAndDelete(req.params.activityId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = activityRouter;
