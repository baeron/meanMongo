var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

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

    /* GET SINGLE Project BY ID  and ALL Electricals*/
/*    router.get('/:id/electricals', function(req, res, next) {
      Project.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    });
*/

    //TODO this method not working
    /*
    router.get('/:id/electricals', function (req, res) {
      if(req.params){
        Project
          .find({_id: req.params.id}, "electricals", function(err, electrical){
            if(err)
              res.send(err);
              res.json(electrical)
          });
      } else {
          sendJSONresponse(res, 404, {
              "message": "No projects in request"
          });
      }
  });*/


    router.get('/:id/electrical-create/:electricalid', function(req, res) {
    if (req.params && req.params.id && req.params.electricalid) {
      Project
        .findById(req.params.id)
        .select('electricals')
        .exec(
          function(err, project) {
            var response, electrical;
            if (!project) {
              sendJSONresponse(res, 404, {
                "message": "projectid not found"
              });
              return;
            } else if (err) {
              sendJSONresponse(res, 400, err);
              return;
            }
            if (project.electricals && project.electricals.length > 0) {
                electrical = project.electricals.id(req.params.electricalid);
              if (!electrical) {
                sendJSONresponse(res, 404, {
                  "message": "electricalid not found"
                });
              } else {
                response = {
/*                  project: {
                    name: project.title,
                    id: req.params.electricalid
                  },*/
                  /*electrical:*/ electrical
                };
                sendJSONresponse(res, 200, response);
              }
            } else {
              sendJSONresponse(res, 404, {
                "message": "No reviews found"
              });
            }
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, electricalid and electrical are both required"
      });
    }
  }
    );

    /* SAVE Electrical */
    router.post('/:id/electricals', function(req, res, next) {
      if (req.params.id) {
        Project
          .findById(req.params.id)
          .select('electricals')
          .exec(
            function(err, project) {
              if (err) {
                sendJSONresponse(res, 400, err);
              } else {
                if (!project) {
                  sendJSONresponse(res, 404, "Projectid not found");
                } else {
                  project.electricals.push({/*
                    equipmentTag:             req.body.equipmentTag,
                    revision:                 req.body.revision,
                    quantity:                 req.body.quantity,
                    equipmentType:            req.body.equipmentType,
                    pidDrawing:               req.body.pidDrawing,
                    layoutDrawing:            req.body.layoutDrawing,
                    //parentTag - добавить потом зависимости от других electrical
                    equipmentNotes:           req.body.equipmentNotes,
                    locationArea:             req.body.locationArea,
                    equipmentDescription:     req.body.equipmentDescription,
                    //Clone Tag
                    //New Tag
                    length:                   req.body.length,
                    depth:                    req.body.depth,
                    height:                   req.body.height,
                    weight:                   req.body.weight,
                    coordForX:                req.body.coordForX,
                    coordForY:                req.body.coordForY,
                    coordForZ:                req.body.coordForZ,
                    heatDissipation:          req.body.heatDissipation,
                    scenarioFirstLoadFactor:  req.body.scenarioFirstLoadFactor,
                    powerSystem:              req.body.powerSystem,
                    voltage:                  req.body.voltage,
                    totalEFF:                 req.body.totalEFF,
                    units:                    req.body.units,
                    motorSF:                  req.body.motorSF,
                    sccRating:                req.body.sccRating,
                    enclosureRating:          req.body.enclosureRating,
                    loadFactor:               req.body.loadFactor,
                    loadDuty:                 req.body.loadDuty,
                    ambientTemp:              req.body.ambientTemp,
                    terminationTemp:          req.body.terminationTemp,
                    operationTempMin:         req.body.operationTempMin,
                    operationTempMax:         req.body.operationTempMax,
                    insulDescription:         req.body.insulDescription,
                    hazlocClass:              req.body.hazlocClass,
                    hazlocZone:               req.body.hazlocZone,
                    hazlocGroup:              req.body.hazlocGroup,
                    hazlocTemperature:        req.body.hazlocTemperature*/
                });
                project.save(function(err, project) {
                  if (err) {
                    sendJSONresponse(res, 400, err);
                  } else {
                  sendJSONresponse(res, 201, project.electricals);
                }
              });
            }
          }
        });
      } else {
        sendJSONresponse(res, 404, {
          "message": "Not found, projectid"
        });
      }
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
  
/* UPDATE Electrical*/
router.patch('/:id/electrical-create/:electricalid', function(req, res) {
  if (req.params && req.params.id && req.params.electricalid) {
    Project
      .findById(req.params.id)
      .exec(
        function(err, project) {
          var response, electrical;
          electrical = project.electricals.id(req.params.electricalid);
      
      //Equipment Entry
          //item number
          electrical.dateCreate = req.body.dateCreate;
          electrical.quantity = req.body.quantity;
          electrical.revision = req.body.revision;
          electrical.selectedEquipmentType = req.body.selectedEquipmentType;
          //pid drawing
          //layout drawing
          //sld drawing
          electrical.equipmentTag = req.body.equipmentTag;
          //parent tag
          //equipment notes
          //location area
          //equipment description
          //clone tag
          //new tag
          electrical.length = req.body.length;
          electrical.depth = req.body.depth;
          electrical.height = req.body.height;
          electrical.weight = req.body.weight;
          electrical.coordForX = req.body.coordForX;
          electrical.coordForY = req.body.coordForY;
          electrical.coordForZ = req.body.coordForZ;
          electrical.heatDissipation = req.body.heatDissipation;
          electrical.scenarioFirstLoadFactor = req.body.scenarioFirstLoadFactor;
      
      //General Rating
          electrical.selectedPowerSystem = req.body.selectedPowerSystem;
          //voltage
          electrical.totalPF = req.body.totalPF;
          electrical.totalEFF = req.body.totalEFF;
          electrical.nameplateRating = req.body.nameplateRating;          
          electrical.selectedUnits = req.body.selectedUnits;
          electrical.selectedMotorSF = req.body.selectedMotorSF;
          electrical.selectedMotorCode = req.body.selectedMotorCode;          
          electrical.selectedSccRating = req.body.selectedSccRating;
          electrical.selectedEnclosureRating = req.body.selectedEnclosureRating;
          electrical.loadFactor = req.body.loadFactor;
          electrical.selectedLoadDuty = req.body.selectedLoadDuty;
          //ambient temp
          //termination temp
          //operating Temp Min
          //operating Temp Max
          //insul description
          //hazloc class
          //hazloc Zone
          //hazloc Group
          //Hazloc Temp
          project.save(function(err, electrical){
            if(err){
              sendJSONresponse(res, 404, err);
            } else {
              sendJSONresponse(res, 200, project);
            }
          });
        }
      );
  } else {
    sendJSONresponse(res, 404, {
      "message": "Not found, project or electrical id"
    });
    return;
  }
}
);

  /* DELETE Project */
  router.delete('/:id', function(req, res, next) {
    Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
module.exports = router;
