var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

/* GET ALL Projects */
router.get('/', function(req, res, next) {
    Project.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE Project BY ID */
  router.get('/:id', function(req, res, next) {
    Project.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* SAVE Project */
  router.post('/', function(req, res, next) {
    Project.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE Project */
  router.put('/:id', function(req, res, next) {
    Project.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE Project */
  router.delete('/:id', function(req, res, next) {
    Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
module.exports = router;
