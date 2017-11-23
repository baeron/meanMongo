var mongoose = require('mongoose');

var electrucalSchema = new mongoose.Schema({
  itemNumber: String,
  dateCreate: { type: Date, default: Date.now },
  revision: {type: String, default: 'A'},
  quantity: {type: Number, default: 5},
  equipmentType: [
    {
      name: {type: String, default: 'UTILITY'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'TRANSFORMER'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'SWITCHGEAR'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'MCC'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'VFD'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'DISTRIBUTION PANEL'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'MOTOR'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'MOV'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'HEATER'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'LIGHT'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'RECEPTACLE'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'UPS CHARGER'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'CONTROL PANEL'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'JUNCTION BOX'}, 
      flag: {type: Boolean, default: false}
    }
  ],
  pidDrawing: [{ name : String, flag : Boolean}],
  layoutDrawing: [{ name : String, flag : Boolean}],
  sldDraving: [{ name : String, flag : Boolean}],
  equipmentTag: String,
  parentTag: [{ name : String, flag : Boolean}],
  equipmentNotes: String,
  locationArea: [{ name : String, flag : Boolean}],
  equipmentDescription: [{ name : String, flag : Boolean}],
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
  scenarioFirstLoadFactor: Number,
  powerSystem: {
    type: Array,
    'default': [
      {
        'name': 'AC-3P', 
        'flag': false
      },
      {
        'name': 'AC-1P', 
        'flag': false
      },
      {
        'name': 'DC', 
        'flag': false
      }
    ]
  },
/*  powerSystem: [
    {
      name: {type: String, default: 'AC-3P'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'AC-1P'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'DC'}, 
      flag: {type: Boolean, default: false}
    }
  ],*/
  voltage: [
    [
      {
        name: {type: String, default: '4160 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '600 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '480 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '208 VAC'}, 
        flag: {type: Boolean, default: false}
      }
    ],
    [
      {
        name: {type: String, default: '2400 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '347 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '277 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '240 VAC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '120 VAC'}, 
        flag: {type: Boolean, default: false}
      }
    ],
    [
      {
        name: {type: String, default: '125 VDC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '48 VDC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '12 VDC'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '4-20 mA'}, 
        flag: {type: Boolean, default: false}
      },
      {
        name: {type: String, default: '1-5 mVDC'}, 
        flag: {type: Boolean, default: false}
      }
    ]
  ],
  totalPF: Number,
  totalEFF: Number,
  nameplateRating: Number,
  units: [
    {
      name: {type: String, default: 'A'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'HP'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'KW'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'KWA'}, 
      flag: {type: Boolean, default: false}
    }
  ],
  motorSF: [
    {
      name: {type: Number, default: 1}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: Number, default: 1.15}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: Number, default: 1.25}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: Number, default: 1.35}, 
      flag: {type: Boolean, default: false}
    }
  ],
  motorCode: [
    {
      name: {type: String, default: "A"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "B"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "C"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "D"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "E"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "F"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "G"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "H"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "J"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "K"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "L"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "M"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "N"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "P"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "R"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "S"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "U"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "V"}, 
      flag: {type: Boolean, default: false}
    }
  ],
  sccRating: [
    {
      name: {type: String, default: "10 KA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "18 KA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "22 KA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "42 KA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "50 KA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "65 KA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "100 KA"}, 
      flag: {type: Boolean, default: false}
      }
  ],
  enclosureRating: [
    {
      name: {type: String, default: "NEMA 1"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 2"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 3"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 3R"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 4"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 4X"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 12"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "NEMA 13"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "WPI"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "WPII"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "TEFC"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "TEFV"}, 
      flag: {type: Boolean, default: false}
    }
  ],
  loadFactor: Number,
  loadDuty: [
    {
      name: {type: String, default: 'Continuous'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'Intermitent'}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: 'Spare'}, 
      flag: {type: Boolean, default: false}
    }
  ],
  ambientTemp: {type: Number, default: 0},
  terminationTemp: [
    {
      name: {type: Number, default: 75}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: Number, default: 90}, 
      flag: {type: Boolean, default: false}
    }
  ],
  operationTempMin: {type: Number, default: 0},
  operationTempMax: {type: Number, default: 0},
  insulDescription: [
    {
      name: {type: String, default: "Class A(105 \u00B0С)"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Class B(130 \u00B0С)"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Class F(155 \u00B0C)"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Class A(180 \u00B0C)"}, 
      flag: {type: Boolean, default: false}
    }
  ],
  hazlocClass: [
    {
      name: {type: String, default: "General"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Class 1"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Class 2"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Class 3"}, 
      flag: {type: Boolean, default: false}
    }
  ],
  hazlocZone: [
    {
      name: {type: String, default: "Zone 0"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Zone 1"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Zone 2"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Division 1"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Division 2"}, 
      flag: {type: Boolean, default: false}
    }
  ],
  hazlocGroup: [
    {
      name: {type: String, default: "Group IIA"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Group IIB"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "Group IIA"}, 
      flag: {type: Boolean, default: false}
    }, { minimize: false }
  ],
  hazlocTemperature: [
    {
      name: {type: String, default: "T1 450 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T2 300 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T2A 280 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T2B 260 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T2C 230 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T2D 215 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T3 200 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T3A 180 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T3B 165 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T3C 160 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T4 135 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T4A 120 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T5 100 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    },
    {
      name: {type: String, default: "T6 85 \u00B0С"}, 
      flag: {type: Boolean, default: false}
    }
  ]
});


var ProjectSchema = new mongoose.Schema({
  title: String,
  date_create: { type: Date, default: Date.now },
  updated_date: { type: Date, default: Date.now },
  electricals: [electrucalSchema]
});

module.exports = mongoose.model('Project', ProjectSchema);