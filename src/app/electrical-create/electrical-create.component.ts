import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-electrical-create',
  templateUrl: './electrical-create.component.html',
  styleUrls: ['./electrical-create.component.css']
})
export class ElectricalCreateComponent implements OnInit {

  electricalItem = {};
  temp: any;
  sizeWindow: any;

  @ViewChild('selectedHazlocZone') private selectedHazlocZone: NgModel;
  @ViewChild('selectedHazlocTemperature') private selectedHazlocTemperature: NgModel;
  @ViewChild('selectedHazlocGroup') private selectedHazlocGroup: NgModel;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    event.target.innerWidth;
    this.sizeWindow = event.target.innerWidth;
  }

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.temp = this.route.snapshot.params['id'];
    this.sizeWindow = window.innerWidth;
  }

  ngOnInit() {
    this.getElectrical(this.route.snapshot.params['id']);
  }
  
  //TODO change method to download only electricals on front and back-end
  getElectrical(id) {
    this.http.get('/project/'+id+'/electrical-create/5a1ed5f61af5b524cc2b412a')
      .subscribe((data: any) => {
        this.electricalItem = data.electrical;
    });
  }

  saveElectrical(idElectrical, data){
    this.http.patch('/project/5a1ed5f11af5b524cc2b4129/electrical-create/' + idElectrical, data)
    .subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['projects']);
    }, (err) => {
      console.log(err);
    });
  }

  optionChanged($event) {
      //logic
      this.selectedHazlocZone.reset(null);
      this.selectedHazlocTemperature.reset(null);
      this.selectedHazlocGroup.reset(null);
  }
}