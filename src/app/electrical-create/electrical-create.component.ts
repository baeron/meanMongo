import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-electrical-create',
  templateUrl: './electrical-create.component.html',
  styleUrls: ['./electrical-create.component.css']
})
export class ElectricalCreateComponent implements OnInit {
  electricalItem = {};
  selectedObject: any;
  trueFlag = true;
  selectedDeviceObj: any;
  selectedPowerSystem: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getElectrical();
  }
  
  //TODO change method to download only electricals on front and back-end
  getElectrical() {
    this.http.get('/project/5a1d757ddb58ee00ccd29568/electrical-create/5a1d7580db58ee00ccd29569')
      .subscribe((data: any) => {
        this.electricalItem = data.electrical;
    });
  }

  saveElectrical(idElectrical, data){
    this.http.patch('/project/5a1d757ddb58ee00ccd29568/electrical-create/' + idElectrical, data)
    .subscribe(res => {
      let id = res['_id'];
      this.router.navigate(['projects']);
    }, (err) => {
      console.log(err);
    });
  }
}