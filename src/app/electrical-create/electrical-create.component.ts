import { Component, OnInit, ViewChild, HostListener, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { DataService } from '../data.service'

@Component({
  selector: 'app-electrical-create',
  templateUrl: './electrical-create.component.html',
  styleUrls: ['./electrical-create.component.css'],
  providers: [DataService]
})
export class ElectricalCreateComponent implements OnInit, DoCheck {
  project: any;
  parentList: any;
  electricalId: any;
  presetParentTag: any;
  itemProject: any;
  //
  electricalItem: any;
  projectId: any;
  sizeWindow: any;
  someVal: any;
  productsAfterChangeEvent = [];
  electricalsList: any;
//
  dropElementFlag: boolean = true;
//
  equipmentType: string = "Equipment Type";
  pidDraving: string = "Pid Drawing";
  layoutDrawing: string = "Layout Drawing";
  sldDraving: string = "SLD Drawing";
  locationArea: string = "Location/Area";
  equipmentDescription: string = "Equipment Description";
  voltage: string = "Voltage";
  hazlocZone: string = "Hazloc Zone";
  hazlocTemperature: string = "Hazloc Temperature";
//
  @ViewChild('selectedHazlocZone') private selectedHazlocZone: NgModel;
  @ViewChild('selectedHazlocTemperature') private selectedHazlocTemperature: NgModel;
  @ViewChild('selectedHazlocGroup') private selectedHazlocGroup: NgModel;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.sizeWindow = event.target.innerWidth;
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.projectId = this.route.snapshot.params['id'];
    this.electricalId = this.route.snapshot.params['electricalid'];
    this.sizeWindow = window.innerWidth;
  }

  ngOnInit() {
    this.getElectrical(this.projectId);
    this.dataService.projects.subscribe(data => {
      this.electricalsList = data;
    });
    this.dataService.getElectricals(this.projectId).subscribe(data => {
      this.project = data;
      this.parentList = [];
      for(let key in this.project.electricals){
        if(this.project.electricals[key]._id == this.electricalId){
        }else {
          this.parentList.push(this.project.electricals[key].equipmentTag);
        }
      }
    });
  }

  electricalChildList(){
    if(this.electricalItem.selectedParentTag){
      if(this.presetParentTag == this.electricalItem.selectedParentTag){
        return;
      } else {
        for(let i=0; i<this.project.electricals.length; ++i){
          let tempElectricalItem = this.project.electricals[i];
          for(let j=0; j<tempElectricalItem.chiildList.length; ++j){
            let childElement = tempElectricalItem.chiildList[j];
            if(childElement._id == this.electricalItem._id){
              tempElectricalItem.chiildList.splice(j, 1);
              this.http.patch('/project/'+this.projectId+'/electrical-create/' + tempElectricalItem._id, tempElectricalItem)
              .subscribe();
            }
            console.log(tempElectricalItem.chiildList);
          }
          if(tempElectricalItem.equipmentTag == this.electricalItem.selectedParentTag){
            this.project.electricals[i].chiildList.push(this.electricalItem);
            let temp = this.project.electricals[i];
            this.http.patch('/project/'+this.projectId+'/electrical-create/' + tempElectricalItem._id, temp)
            .subscribe();
            return;
          }
        }
      }
    } else {
      return;
    }
  }

  ngDoCheck() {
    if(!this.electricalItem){
      return;
    } else {
    this.calc();
    }
  }

  calc(){
    this.electricalItem.totalConectedFla = 0;
    this.electricalItem.totalConectedKW = 0;
    this.electricalItem.totalConnectedKVA = 0;
    this.electricalItem.totalConnectedKVAR = 0;

    this.electricalItem.totalDemandFLA = 0;
    this.electricalItem.totalDemandKW = 0;
    this.electricalItem.totalDemandKVAR = 0;
    this.electricalItem.totalDemandKVA = 0;

    this.electricalItem.scenarioFirstFLA = 0;
    this.electricalItem.scenarioFirstKW = 0;
    this.electricalItem.scenarioFirstKVAR = 0;
    this.electricalItem.scenarioFirstKVA = 0;
//
    let voltageValue = this.electricalItem.selectedVoltage.name;
    let toSimbol = voltageValue.search(" ");
    let voltageCalcValue = voltageValue.substring(0, toSimbol);
    let parsingValue = parseInt(voltageCalcValue);
//
    if(this.electricalItem.selectedPowerSystem == this.electricalItem.powerSystem[0]){                // AC-3P ALL CHECKED+2
      if(!this.electricalItem.totalPF){
        this.electricalItem.totalPF = 0;
      }
      if(!this.electricalItem.totalEFF){
        this.electricalItem.totalEFF = 0;
      }
      switch (this.electricalItem.selectedUnits) {
        case this.electricalItem.units[0]:                                                              // A check+2
          this.electricalItem.totalConectedFla = parseFloat(this.electricalItem.nameplateRating);
          break;
        case this.electricalItem.units[1]:                                                              // HP check+2
          if(this.electricalItem.selectedVoltage.name && this.electricalItem.totalPF != 0 && this.electricalItem.totalEFF != 0){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating)*746)/(parsingValue * 1.73 * this.electricalItem.totalPF * this.electricalItem.totalEFF)*10000;
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          } else {
            this.electricalItem.totalConectedFla = 0;
          }
          break;
        case this.electricalItem.units[2]:                                                              // KW check+2
          if(this.electricalItem.selectedVoltage.name && this.electricalItem.totalPF != 0){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating) * 1000) / (parsingValue * 1.73 * this.electricalItem.totalPF / 100);
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          } else {
            this.electricalItem.totalConectedFla = 0;
          }
          break;
        case this.electricalItem.units[3]:                                                              // KVA check+2
          if(this.electricalItem.selectedVoltage.name){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating)*1000)/(parsingValue*1.73);
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          }
          break;
        default:
          break;
      }     
      let tempTotalConnectedKVA = this.electricalItem.totalConectedFla * parsingValue * 1.73/1000;
      this.electricalItem.totalConnectedKVA = Math.ceil(tempTotalConnectedKVA*100)/100;
      let tempTotalConectedKW = this.electricalItem.totalConnectedKVA * this.electricalItem.totalPF / 100;
      this.electricalItem.totalConectedKW =  Math.ceil(tempTotalConectedKW*100)/100;
      if(this.electricalItem.totalConectedKW == 0){
        this.electricalItem.totalConnectedKVAR = 0;
      } else {
        let tempTotalConnectedKVAR = Math.sqrt(Math.pow(this.electricalItem.totalConnectedKVA, 2) - Math.pow(this.electricalItem.totalConectedKW, 2));
        this.electricalItem.totalConnectedKVAR =  Math.ceil(tempTotalConnectedKVAR*100)/100;
      }
    } else if (this.electricalItem.selectedPowerSystem == this.electricalItem.powerSystem[1]) {     //AC-1P ALL CHECKED+2
      if(!this.electricalItem.totalPF){
        this.electricalItem.totalPF = 0;
      }
      if(!this.electricalItem.totalEFF){
        this.electricalItem.totalEFF = 0;
      }
      switch (this.electricalItem.selectedUnits) {
        case this.electricalItem.units[0]:                                                          //A check+2
          this.electricalItem.totalConectedFla = parseFloat(this.electricalItem.nameplateRating);
          break;
        case this.electricalItem.units[1]:                                                          // HP check+2
          if(this.electricalItem.selectedVoltage.name && this.electricalItem.totalPF != 0 && this.electricalItem.totalEFF != 0){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating)*746)/(parsingValue * this.electricalItem.totalPF * this.electricalItem.totalEFF)*10000;
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          } else {
            this.electricalItem.totalConectedFla = 0;
          }
          break;
        case this.electricalItem.units[2]:                                                          // KW check+2
          if(this.electricalItem.selectedVoltage.name && this.electricalItem.totalPF != 0){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating) * 1000) / (parsingValue * this.electricalItem.totalPF / 100);
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          } else {
            this.electricalItem.totalConectedFla = 0;
          }
          break;
        case this.electricalItem.units[3]:                                                          // KVA check+2
          if(this.electricalItem.selectedVoltage.name){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating)*1000)/(parsingValue);
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          }
          break;
        default:
        break;
      }
      let tempTotalConnectedKVA = this.electricalItem.totalConectedFla * parsingValue/1000;
      this.electricalItem.totalConnectedKVA = Math.ceil(tempTotalConnectedKVA*100)/100;
      let tempTotalConectedKW = this.electricalItem.totalConnectedKVA * this.electricalItem.totalPF / 100;
      this.electricalItem.totalConectedKW =  Math.ceil(tempTotalConectedKW*100)/100;
      let tempTotalConnectedKVAR = Math.sqrt(Math.pow(this.electricalItem.totalConnectedKVA, 2) - Math.pow(this.electricalItem.totalConectedKW, 2));
      this.electricalItem.totalConnectedKVAR =  Math.ceil(tempTotalConnectedKVAR*100)/100;

    } else if(this.electricalItem.selectedPowerSystem == this.electricalItem.powerSystem[2]){       //DC ALL CHECKED+2
      if(!this.electricalItem.totalEFF){
        this.electricalItem.totalEFF = 0;
      }
      switch (this.electricalItem.selectedUnits) {
        case this.electricalItem.units[0]:                                                          //A check+2
          this.electricalItem.totalConectedFla = parseFloat(this.electricalItem.nameplateRating);
          this.electricalItem.totalConnectedKVA = 0;
          this.electricalItem.totalConnectedKVAR = 0;
          break;
        case this.electricalItem.units[1]:                                                          // HP check+2
          if(this.electricalItem.selectedVoltage.name && this.electricalItem.totalEFF != 0){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating)*746)/(parsingValue * this.electricalItem.totalEFF)*100;
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          } else {
            this.electricalItem.totalConectedFla = 0;
          }
          this.electricalItem.totalConnectedKVA = 0;
          this.electricalItem.totalConnectedKVAR = 0;
          break;
        case this.electricalItem.units[2]:                                                          // KW check+2
          if(this.electricalItem.selectedVoltage.name){
            let temporalTotalConectedFla = (parseFloat(this.electricalItem.nameplateRating) * 1000) / parsingValue;
            this.electricalItem.totalConectedFla = Math.ceil(temporalTotalConectedFla*100)/100;
          } else {
            this.electricalItem.totalConectedFla = 0;
          }
          this.electricalItem.totalConnectedKVA = 0;
          this.electricalItem.totalConnectedKVAR = 0;
          break;
        default:
          this.electricalItem.totalConectedFla = 0;
          this.electricalItem.totalConectedKW = 0;
          this.electricalItem.totalConnectedKVA = 0;
          this.electricalItem.totalConnectedKVAR = 0;
          break;
      }
      let tempTotalConectedKW = this.electricalItem.totalConectedFla * parsingValue/1000;
      this.electricalItem.totalConectedKW =  Math.ceil(tempTotalConectedKW*100)/100;
    }
    let temporalTotalDemandFLA = (this.electricalItem.totalConectedFla * this.electricalItem.loadFactor)/100;
    this.electricalItem.totalDemandFLA = Math.ceil(temporalTotalDemandFLA*100)/100;
    let temporalTotalDemandKW = (this.electricalItem.totalConectedKW * this.electricalItem.loadFactor)/100;
    this.electricalItem.totalDemandKW = Math.ceil(temporalTotalDemandKW*100)/100;
    let temporalTotalDemandKVAR = (this.electricalItem.totalConnectedKVAR * this.electricalItem.loadFactor)/100;
    this.electricalItem.totalDemandKVAR = Math.ceil(temporalTotalDemandKVAR*100)/100;
    let temporalTotalDemandKVA = (this.electricalItem.totalConnectedKVA * this.electricalItem.loadFactor)/100;
    this.electricalItem.totalDemandKVA = Math.ceil(temporalTotalDemandKVA*100)/100;

    let scenarioFirstLoadFactor = parseFloat(this.electricalItem.scenarioFirstLoadFactor);
    let temporalScenarioFirstFLA = (this.electricalItem.totalConectedFla * scenarioFirstLoadFactor)/100;
    this.electricalItem.scenarioFirstFLA = Math.ceil(temporalScenarioFirstFLA*100)/100;
    let temporalScenarioFirstKW = (this.electricalItem.totalConectedKW * scenarioFirstLoadFactor)/100;
    this.electricalItem.scenarioFirstKW = Math.ceil(temporalScenarioFirstKW*100)/100;
    let temporalScenarioFirstKVAR =(this.electricalItem.totalConnectedKVAR * scenarioFirstLoadFactor)/100;
    this.electricalItem.scenarioFirstKVAR = Math.ceil(temporalScenarioFirstKVAR*100)/100;
    let temporalScenarioFirstKVA = (this.electricalItem.totalConnectedKVA * scenarioFirstLoadFactor)/100;
    this.electricalItem.scenarioFirstKVA = Math.ceil(temporalScenarioFirstKVA*100)/100;
  }

  //TODO change method to download only electricals on front and back-end
  getElectrical(id) {
    this.http.get('/project/'+id+'/electrical-create/'+this.route.snapshot.params['electricalid'])
      .subscribe((data: any) => {
        this.electricalItem = data.electrical;
        this.presetParentTag = data.electrical.selectedParentTag;
        //console.log(this.presetParentTag);
        //this.productsAfterChangeEvent = data.electrical.voltage;
        this.productsAfterChangeEvent = data.electrical.voltage.filter(p => p.powerSystemType == data.electrical.selectedPowerSystem);
        //console.log(this.productsAfterChangeEvent);
    });
  }

  /*saveChildsElectrical(){
    let temp = this.childList();
    console.log(temp);
    if(!temp){
      return;
    } else {
      let parentElectricalId = temp._id;
      this.http.patch('/project/'+this.projectId+'/electrical-create/' + parentElectricalId, temp)
      .subscribe(res => {
        let id = res['_id'];
      }, (err) => {
        console.log(err);
      });
    }
  }*/

  saveElectrical(idElectrical, data){
    this.someVal = data.selectedVoltage;
    data.selectedVoltage = {};
    data.selectedVoltage.name = this.someVal;
    data.voltage = this.changeVoltageArrayObject(this.productsAfterChangeEvent, this.electricalItem.voltage);
    data.selectedVoltage.powerSystemType = data.selectedPowerSystem;
    data.pidDrawing = this.electricalItem.pidDrawing;
    data.layoutDrawing = this.electricalItem.layoutDrawing;
    data.sldDraving = this.electricalItem.sldDraving;
    data.equipmentType = this.electricalItem.equipmentType;
    data.locationArea = this.electricalItem.locationArea;
    data.equipmentDescription = this.electricalItem.equipmentDescription;
    data.hazlocZone = this.electricalItem.hazlocZone;
    data.hazlocTemperature = this.electricalItem.hazlocTemperature;
    //
    data.totalConectedFla = this.electricalItem.totalConectedFla || 0;
    data.totalConectedKW  = this.electricalItem.totalConectedKW || 0;
    data.totalConnectedKVAR = this.electricalItem.totalConnectedKVAR || 0;
    data.totalConnectedKVA = this.electricalItem.totalConnectedKVA || 0;
    data.totalDemandFLA = this.electricalItem.totalDemandFLA || 0;
    data.totalDemandKW = this.electricalItem.totalDemandKW || 0;
    data.totalDemandKVAR = this.electricalItem.totalDemandKVAR || 0;
    data.totalDemandKVA = this.electricalItem.totalDemandKVA || 0;
    data.scenarioFirstFLA = this.electricalItem.scenarioFirstFLA || 0;
    data.scenarioFirstKW = this.electricalItem.scenarioFirstKW || 0;
    data.scenarioFirstKVAR = this.electricalItem.scenarioFirstKVAR || 0;
    data.scenarioFirstKVA = this.electricalItem.scenarioFirstKVA || 0;
    //
    this.http.patch('/project/'+this.projectId+'/electrical-create/' + idElectrical, data)
    .subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['projects']);
    }, (err) => {
      console.log(err);
    });
    this.electricalChildList();
  }

  changeVoltageArrayObject(productsAfterChange, projectData){
    let arayObjectsAfterFilter = projectData.filter(p => p.powerSystemType != productsAfterChange[0].powerSystemType);
    for(let i=0; i<productsAfterChange.length; ++i){
      let itemElement = productsAfterChange[i];
      arayObjectsAfterFilter.push(itemElement);
    }
    return arayObjectsAfterFilter;
  }

  optionChanged($event) {
      this.selectedHazlocZone.reset(null);
      this.selectedHazlocTemperature.reset(null);
      this.selectedHazlocGroup.reset(null);
  }

  typeChanged() {
    if(!this.electricalItem){
      return;
    } else {
      this.productsAfterChangeEvent = this.electricalItem.voltage.filter(p => p.powerSystemType == this.electricalItem.selectedPowerSystem);
    }
  }

  deleteElectrical(electricalItemId){
    if(this.electricalItem.chiildList.length >= 1){
      for(let i=0; i<this.project.electricals.length; ++i){
        let temporaryElectricalItem = this.project.electricals[i];
        if(temporaryElectricalItem.selectedParentTag === this.electricalItem.equipmentTag){
          temporaryElectricalItem.selectedParentTag = '';
          console.log(temporaryElectricalItem);
          //let temp = this.project.electricals[i];
          this.http.patch('/project/'+this.projectId+'/electrical-create/' + temporaryElectricalItem._id, temporaryElectricalItem)
          .subscribe();
        }
      }
    }
    for(let j=0; j<this.project.electricals.length; ++j){
      let electricalItemElment = this.project.electricals[j];
      for(let k=0; k<electricalItemElment.chiildList.length; ++k){
        let temporalChildElement = electricalItemElment.chiildList[k];
        if(temporalChildElement._id === this.electricalItem._id){
          electricalItemElment.chiildList.splice(j, 1);
          this.http.patch('/project/'+this.projectId+'/electrical-create/' + electricalItemElment._id, electricalItemElment)
          .subscribe();
        }
        console.log(electricalItemElment);
      }
    }
    this.http.delete('/project/'+this.projectId+'/electrical-create/' + electricalItemId)
    .subscribe(res => {
      this.router.navigate(['projects']);
    }, (err) => {
      console.log(err);
    });
  }
}