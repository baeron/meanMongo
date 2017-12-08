import { Component, OnInit, ViewChild, HostListener, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-electrical-create',
  templateUrl: './electrical-create.component.html',
  styleUrls: ['./electrical-create.component.css']
})
export class ElectricalCreateComponent implements OnInit, DoCheck {

  electricalItem: any;
  projectId: any;
  sizeWindow: any;
  someVal: any;
  productsAfterChangeEvent = [];
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

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.params['id'];
    this.route.snapshot.params['electricalid'];
    this.sizeWindow = window.innerWidth;
  }

  ngOnInit() {
    this.getElectrical(this.projectId);
  }

  ngDoCheck() {
    if(!this.electricalItem){
      return;
    } else {
    this.calc();
    }
 }

  calc(){
    if(this.electricalItem.selectedPowerSystem == undefined){
      this.electricalItem.selectedPowerSystem = 'Select'; 
    }
    if(this.electricalItem.selectedPowerSystem == this.electricalItem.powerSystem[0]){
      switch (this.electricalItem.selectedUnits) {
        case this.electricalItem.units[0]:
          this.electricalItem.totalConectedFla = parseFloat(this.electricalItem.nameplateRating);
          break;
          case this.electricalItem.units[1]:

          break;
        default:
          break;
      }
    }
  }

  //TODO change method to download only electricals on front and back-end
  getElectrical(id) {
    this.http.get('/project/'+id+'/electrical-create/'+this.route.snapshot.params['electricalid'])
      .subscribe((data: any) => {
        this.electricalItem = data.electrical;
        //this.productsAfterChangeEvent = data.electrical.voltage;
        this.productsAfterChangeEvent = data.electrical.voltage.filter(p => p.powerSystemType == data.electrical.selectedPowerSystem);
        //console.log(this.productsAfterChangeEvent);
    });
  }

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
    this.http.patch('/project/'+this.projectId+'/electrical-create/' + idElectrical, data)
    .subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['projects']);
    }, (err) => {
      console.log(err);
    });
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

  isDisabled(data):boolean {
    return data.length == 0;
  }

  typeChanged() {
    if(!this.electricalItem){
      return;
    } else {
      //const productType = this.electricalItem.selectedPowerSystem;
      //console.log(productType);
      this.productsAfterChangeEvent = this.electricalItem.voltage.filter(p => p.powerSystemType == this.electricalItem.selectedPowerSystem);
     //console.log(this.productsAfterChangeEvent);
    }
  }
}