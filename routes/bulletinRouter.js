const express = require('express');
const bodyParser = require('body-parser');
const Bulletin = require('../models/bulletin');
const authenticate = require('../authenticate');
const cors = require('./cors');

const bulletinRouter = express.Router();

bulletinRouter.use(bodyParser.json());

bulletinRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))      
.get(cors.cors, (req, res, next) => {
    Bulletin.find()
    .then(bulletins => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bulletins);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Bulletin.create(req.body)
    .then(bulletin => {
        console.log('Bulletin Created ', bulletin);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bulletin);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /bulletin');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Bulletin.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

bulletinRouter.route('/:bulletinId') 
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))     
.get(cors.cors, (req, res, next) => {
    Bulletin.findById(req.params.bulletinId)
    .then(bulletin => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bulletin);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /bulletin/${req.params.bulletinId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Bulletin.findByIdAndUpdate(req.params.bulletinId, {
        $set: req.body
    }, { new: true })
    .then(bulletin => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(bulletin);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Bulletin.findByIdAndDelete(req.params.bulletinId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


module.exports = bulletinRouter;
