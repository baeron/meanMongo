var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

/* GET ALL Projects */
router.get('/', function (req, res) {
  if(req.params){
    Project
      .find({}, "title updated_date date_create", function(err, project){
        if(err)
          res.send(err);
          res.json(project /*, userName*/);
      });
  } else {
    sendJSONresponse(res, 404, {
      "message": "No projects in request"
    });
  }
});

/* GET SINGLE Project BY ID */
router.get('/:id', function (req, res) {
  if(req.params && req.params.id){
      Project
      .findById(req.params.id)
      .exec(function(err, project) {
          if(!project){
              sendJSONresponse(res, 404, {
                  "message": "projectid not found"
              });
              return;
          } else if (err){
              sendJSONresponse(res, 404, err);
          }
          sendJSONresponse(res, 200, project);
      });
  } else {
      sendJSONresponse(res, 404, {
          "message": "No projectid in request"
      });
  }
});

/* GET ALL Electricals */
router.get('/:id/electricals',function (req, res) {
  if(req.params){
    Project
    .findById(req.params.id, 'electricals._id electricals.revision electricals.equipmentTag electricals.selectedEquipmentType electricals.selectedVoltage '+
    'electricals.selectedPowerSystem electricals.nameplateRating electricals.selectedUnits electricals.totalPF electricals.totalEFF electricals.selectedMotorSF '+
    'electricals.selectedMotorCode electricals.selectedLoadDuty electricals.selectedParentTag electricals.totalConectedFla electricals.totalConectedKW '+
    'electricals.totalConnectedKVAR electricals.totalConnectedKVA electricals.totalDemandFLA electricals.totalDemandKW electricals.totalDemandKVAR electricals.totalDemandKVA '+
    'electricals.scenarioFirstFLA electricals.scenarioFirstKW electricals.scenarioFirstKVAR electricals.scenarioFirstKVA electricals.loadFactor electricals.scenarioFirstLoadFactor '+
    'electricals.chiildList')
    .exec(function(err, project) {
        if(!project){
            sendJSONresponse(res, 404, {
                "message": "projectid not found"
            });
            return;
        } else if (err){
            sendJSONresponse(res, 404, err);
        }
        sendJSONresponse(res, 200, project);
    });
  } else {
      sendJSONresponse(res, 404, {
          "message": "No projects in request"
      });
  }
});

/* GET SINGLE Electrical BY ID */
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
                electrical
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
});

/* CREATE NEW Electrical */
router.post('/:id/electricals', function(req, res) {
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
              project.electricals.push({});
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
          electrical.equipmentType = req.body.equipmentType;
          electrical.selectedEquipmentType = req.body.selectedEquipmentType;
          electrical.pidDrawing = req.body.pidDrawing;
          electrical.selectedPidDrawing = req.body.selectedPidDrawing;
          electrical.layoutDrawing = req.body.layoutDrawing;
          electrical.selectedLayoutDrawing = req.body.selectedLayoutDrawing;
          electrical.sldDraving = req.body.sldDraving;
          electrical.selectedSldDraving = req.body.selectedSldDraving;
          electrical.equipmentTag = req.body.equipmentTag;
          electrical.locationArea = req.body.locationArea;
          electrical.selectedLocationArea = req.body.selectedLocationArea;
          electrical.equipmentDescription = req.body.equipmentDescription;
          electrical.selectedEquipmentDescription = req.body.selectedEquipmentDescription;
          electrical.selectedParentTag = req.body.selectedParentTag;
          //parent tag
          //equipment notes
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
          electrical.voltage = req.body.voltage;
          electrical.selectedVoltage = req.body.selectedVoltage;
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
          electrical.ambientTemp = req.body.ambientTemp;
          electrical.selectedTerminationTemp = req.body.selectedTerminationTemp;
          electrical.operationTempMin = req.body.operationTempMin;
          electrical.operationTempMax = req.body.operationTempMax;
          electrical.selectedInsulDescription = req.body.selectedInsulDescription;
          electrical.selectedHazlocClass = req.body.selectedHazlocClass;
          electrical.hazlocZone = req.body.hazlocZone;
          electrical.selectedHazlocZone = req.body.selectedHazlocZone;
          electrical.selectedHazlocGroup = req.body.selectedHazlocGroup;
          electrical.hazlocTemperature = req.body.hazlocTemperature;
          electrical.selectedHazlocTemperature = req.body.selectedHazlocTemperature;
          //
          electrical.totalConectedFla = req.body.totalConectedFla;
          electrical.totalConectedKW  = req.body.totalConectedKW;
          electrical.totalConnectedKVAR = req.body.totalConnectedKVAR;
          electrical.totalConnectedKVA = req.body.totalConnectedKVA;
          electrical.totalDemandFLA = req.body.totalDemandFLA;
          electrical.totalDemandKW = req.body.totalDemandKW;
          electrical.totalDemandKVAR = req.body.totalDemandKVAR;
          electrical.totalDemandKVA = req.body.totalDemandKVA;
          electrical.scenarioFirstFLA = req.body.scenarioFirstFLA;
          electrical.scenarioFirstKW = req.body.scenarioFirstKW;
          electrical.scenarioFirstKVAR = req.body.scenarioFirstKVAR;
          electrical.scenarioFirstKVA = req.body.scenarioFirstKVA;
          //
          electrical.chiildList = req.body.chiildList;
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
});

/* DELETE Electrical by ID*/
router.delete('/:id/electrical-create/:electricalid', function (req, res) { 
  if (!req.params && !req.params.id && !req.params.electricalid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, projectid and electricalid are both required"
    });
    return;
  }
  Project
    .findById(req.params.id)
    .select('electricals')
    .exec(
      function(err, project) {
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
          project.electricals.id(req.params.electricalid).remove();
          //console.log(project);
          project.save(function(err) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              sendJSONresponse(res, 204, null);
            }
          });
        } else {
          sendJSONresponse(res, 404, {
            "message": "No electrical to delete"
          });
        }
    }
  );
});

/* DELETE Project */
router.delete('/:id', function(req, res, next) {
  Project.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
  
module.exports = router;
