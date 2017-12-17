var mongoose = require('mongoose');

var electrucalSchema = new mongoose.Schema({
  itemNumber: String,
  //dateCreate: { type: Date, default: Date.now },
  revision: {type: String, default: 'A'},
  quantity: {type: Number, default: 5},
  equipmentType: {
    type: Array,
    'default': ['UTILITY', 'TRANSFORMER', 'SWITCHGEAR', 'MCC', 'VFD', 'DISTRIBUTION PANEL', 'MOTOR', 'MOV',
      'HEATER', 'LIGHT', 'RECEPTACLE', 'UPS CHARGER', 'CONTROL PANEL', 'JUNCTION BOX'
    ],
  },
  selectedEquipmentType: {type: String, default: 'UTILITY'},
  pidDrawing: [{type: String}],
  selectedPidDrawing: String,
  layoutDrawing: [{type: String}],
  selectedLayoutDrawing: String,
  sldDraving: [{ type: String}],
  selectedSldDraving: String,
  equipmentTag: {type: String, default: "New Electrical"},
  chiildList: {
    type: Array,
    'default': []
  },
  selectedParentTag: String,
  equipmentNotes: String,
  locationArea: [{type: String}],
  selectedLocationArea: String,
  equipmentDescription: [{type: String}],
  selectedEquipmentDescription: String,
  //clone tag
  //new tag
  length: Number,
  depth: Number,
  height: Number,
  weight: Number,
  coordForX: Number,
  coordForY: Number,
  coordForZ: Number,
  heatDissipation: Number,
  scenarioFirstLoadFactor: {type: Number, default: 0},
  powerSystem: {
    type: Array,
    'default': ['AC-3P', 'AC-1P', 'DC']
  },
  selectedPowerSystem: {type: String, default: 'AC-3P'},
  voltage: {
    type: Array,
    'default': [
        {name: '4160 VAC', powerSystemType: 'AC-3P'},
        {name: '600 VAC', powerSystemType: 'AC-3P'},
        {name: '480 VAC', powerSystemType: 'AC-3P'},
        {name: '208 VAC', powerSystemType: 'AC-3P'},
        {name: '2400 VAC', powerSystemType: 'AC-1P'},
        {name: '347 VAC', powerSystemType: 'AC-1P'},
        {name: '277 VAC', powerSystemType: 'AC-1P'},
        {name: '240 VAC', powerSystemType: 'AC-1P'},
        {name: '120 VAC', powerSystemType: 'AC-1P'},
        {name: '125 VDC', powerSystemType: 'DC'},
        {name: '48 VDC', powerSystemType: 'DC'},
        {name: '12 VDC', powerSystemType: 'DC'},
        {name: '4-20 mA', powerSystemType: 'DC'},
        {name: '1-5 mVDC', powerSystemType: 'DC'}
    ]
  },
  selectedVoltage: {
    type: Object,
    'default': {
      name: '4160 VAC',
      powerSystemType: 'AC-3P'
    }
//    name: {type: String, default: '4160 VAC'},
//    powerSystemType: {type: String, default: 'AC-3P'}
  },
  totalPF: {type: Number, default: 0},
  totalEFF: {type: Number, default: 0},
  nameplateRating: {type: Number, default: 0},
  units: {
    type: Array,
    'default': ['A', 'HP', 'KW', 'KVA']
  },
  selectedUnits: {type: String, default: 'A'},
  motorSF:{
    type: Array,
    'default': [1, 1.15, 1.25, 1.35]
  },
  selectedMotorSF: {type: Number, default: 1},
  motorCode: {
    type: Array,
    'default': [
      "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "R", "S", "U", "V"
    ]
  },
  selectedMotorCode: {type: String, default: "A"},
  sccRating: {
    type: Array,
    'default': [
      "10 KA", "18 KA", "22 KA", "42 KA", "50 KA", "65 KA", "100 KA"
    ]
  },
  selectedSccRating: {type: String, default: "10 KA"},
  enclosureRating: {
    type: Array,
    'default': [
      "NEMA 1", "NEMA 2", "NEMA 3", "NEMA 3R", "NEMA 4", "NEMA 4X", "NEMA 12", "NEMA 13", "WPI", "WPII", "TEFC", "TEFV"
    ]
  },
  selectedEnclosureRating: {type: String, default: "NEMA 1"},
  loadFactor: {type: Number, default: 0},
  loadDuty: {
    type: Array,
    'default': [
      "Continuous", "Intermitent", "Spare"
    ]
  },
  selectedLoadDuty: {type: String, default: "Continuous"},
  ambientTemp: {type: Number},
  terminationTemp: 
  {
    type: Array,
    'default': [
      75, 90
    ]
  },
  selectedTerminationTemp: {type: Number},
  operationTempMin: {type: Number},
  operationTempMax: {type: Number},
  insulDescription: {
    type: Array,
    'default': [
      "Class A(105 \u00B0С)", "Class B(130 \u00B0С)", "Class F(155 \u00B0C)", "Class A(180 \u00B0C)"
    ]
  },
  selectedInsulDescription: {type: String},
  hazlocClass: {
    type: Array,
    'default': ["General", "Class 1", "Class 2", "Class 3"]
  },
  selectedHazlocClass: String,
  hazlocZone:  {
    type: Array,
    'default': ["Zone 0", "Zone 1", "Zone 2", "Division 1", "Division 2"]
  },
  selectedHazlocZone: String,

  hazlocGroup: {
    type: Array,
    'default': ["Group IIA", "Group IIB", "Group IIA"]
  },
  selectedHazlocGroup: String,
  hazlocTemperature: {
    type: Array,
    'default': ["T1 450 \u00B0С", "T2 300 \u00B0С", "T2A 280 \u00B0С", "T2B 260 \u00B0С", "T2C 230 \u00B0С", "T2D 215 \u00B0С",
      "T3 200 \u00B0С", "T3A 180 \u00B0С", "T3B 165 \u00B0С", "T3C 160 \u00B0С", "T4 135 \u00B0С", "T4A 120 \u00B0С", "T5 100 \u00B0С", "T6 85 \u00B0С"
    ]
  },
  selectedHazlocTemperature: String,

  totalConectedFla: {type: Number, default: 0},
  totalConectedKW: {type: Number, default: 0},
  totalConnectedKVAR: {type: Number, default: 0},
  totalConnectedKVA: {type: Number, default: 0},
  totalDemandFLA: {type: Number, default: 0},
  totalDemandKW: {type: Number, default: 0},
  totalDemandKVAR: {type: Number, default: 0},
  totalDemandKVA: {type: Number, default: 0},
  scenarioFirstFLA: {type: Number, default: 0},
  scenarioFirstKW: {type: Number, default: 0},
  scenarioFirstKVAR: {type: Number, default: 0},
  scenarioFirstKVA: {type: Number, default: 0},
});


var ProjectSchema = new mongoose.Schema({
  title: String,
  date_create: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  electricals: [electrucalSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);