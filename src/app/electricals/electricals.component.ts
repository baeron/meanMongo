import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service'
import { log } from 'util';

@Component({
  selector: 'app-electricals',
  templateUrl: './electricals.component.html',
  styleUrls: ['./electricals.component.css'],
  providers: [DataService]
})
export class ElectricalsComponent implements OnInit {
  projectId: any;
  project = {};
  electrical: any;
  electricals: any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private dataService: DataService) {
    this.projectId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    //this.getProject(this.projectId);
    this.dataService.getElectricals(this.projectId).subscribe(data => {
      this.project = data;
      this.recalculationParentValeu(data);
    });
  }
  
  recalculationParentValeu(projects){
    for(let i=0; i<projects.electricals.length; i++){
      let electricalItem = projects.electricals[i];
//      console.log(projects.electricals[i]);
      if(electricalItem.chiildList.length > 0 ){
        electricalItem.totalPF = 0;
        electricalItem.totalEFF = 0;
        electricalItem.loadFactor = 0;
        electricalItem.scenarioFirstLoadFactor = 0;
        electricalItem.totalConnectedKVAR = 0;
        electricalItem.totalConnectedKVA = 0;
        electricalItem.totalDemandFLA = 0;
        electricalItem.totalDemandKW = 0;
        electricalItem.totalDemandKVAR = 0;
        electricalItem.totalDemandKVA = 0;
        electricalItem.scenarioFirstFLA = 0;
        electricalItem.scenarioFirstKW = 0;
        electricalItem.scenarioFirstKVAR = 0;
        electricalItem.scenarioFirstKVA = 0;

        for(let j=0; j<electricalItem.chiildList.length; ++j){
          let childElement = electricalItem.chiildList[j];
          electricalItem.totalConectedFla += childElement.totalConectedFla;
          electricalItem.totalConectedKW += childElement.totalConectedKW;
          electricalItem.totalConnectedKVAR += childElement.totalConnectedKVAR;
          electricalItem.totalConnectedKVA += childElement.totalConnectedKVA;
          //
          electricalItem.totalPF += childElement.totalPF;
          electricalItem.totalEFF += childElement.totalEFF;
          electricalItem.loadFactor += childElement.loadFactor;
          //
          electricalItem.totalDemandFLA += childElement.totalDemandFLA;
          electricalItem.totalDemandKW += childElement.totalDemandKW;
          electricalItem.totalDemandKVAR += childElement.totalDemandKVAR;
          electricalItem.totalDemandKVA += childElement.totalDemandKVA;
          //
          electricalItem.scenarioFirstLoadFactor += childElement.scenarioFirstLoadFactor;
          //
          electricalItem.scenarioFirstFLA += childElement.scenarioFirstFLA;
          electricalItem.scenarioFirstKW += childElement.scenarioFirstKW;
          electricalItem.scenarioFirstKVAR += childElement.scenarioFirstKVAR;
          electricalItem.scenarioFirstKVA += childElement.scenarioFirstKVA;
        }
        electricalItem.totalConectedFla = Math.ceil(electricalItem.totalConectedFla*100)/100;
        electricalItem.totalConectedKW = Math.ceil(electricalItem.totalConectedKW*100)/100;
        electricalItem.totalConnectedKVAR = Math.ceil(electricalItem.totalConnectedKVAR*100)/100;
        electricalItem.totalConnectedKVA = Math.ceil(electricalItem.totalConnectedKVA*100)/100;
        electricalItem.totalDemandKW = Math.ceil(electricalItem.totalDemandKW*100)/100;
        electricalItem.totalDemandFLA = Math.ceil(electricalItem.totalDemandFLA*100)/100;
        electricalItem.totalDemandKVAR = Math.ceil(electricalItem.totalDemandKVAR*100)/100;
        electricalItem.totalDemandKVA = Math.ceil(electricalItem.totalDemandKVA*100)/100;
        electricalItem.scenarioFirstFLA = Math.ceil(electricalItem.scenarioFirstFLA*100)/100;
        electricalItem.scenarioFirstKW = Math.ceil(electricalItem.scenarioFirstKW*100)/100;
        electricalItem.scenarioFirstKVAR = Math.ceil(electricalItem.scenarioFirstKVAR*100)/100;
        electricalItem.scenarioFirstKVA = Math.ceil(electricalItem.scenarioFirstKVA*100)/100;
        //console.log(electricalItem.totalDemandFLA);
        electricalItem.totalPF = Math.ceil((electricalItem.totalPF/electricalItem.chiildList.length)*100)/100;
        electricalItem.totalEFF = Math.ceil((electricalItem.totalEFF/electricalItem.chiildList.length)*100)/100;
        electricalItem.loadFactor = Math.ceil((electricalItem.loadFactor/electricalItem.chiildList.length)*100)/100;
        //electricalItem.selectedMotorSF
        electricalItem.scenarioFirstLoadFactor = Math.ceil((electricalItem.scenarioFirstLoadFactor/electricalItem.chiildList.length)*100)/100;
      }
      console.log(electricalItem)
    }
  }

  //TODO change method to download only electricals on front and back-end
  /*getProject(id) {
    this.http.get('/project/' + id)
      .subscribe(data => {
        this.project = data;
    });
  }*/

//  let temp = (this.route.snapshot.params['id']);
  saveElectrical() {
    this.electrical = {};
    this.electrical.length = 0;
    this.http.post('/project/'+this.projectId+'/electricals', this.electrical)
      .subscribe((res: Array<string>) => {
          let id = res['_id'];
          let responseId = res[res.length-1]['_id']
          //console.log(responseId);
          let temp = '/project/'+this.route.snapshot.params['id']+'/electrical-create/'+responseId;
          //console.log(temp);
          //this.router.navigate(['/projects']);
          this.router.navigate([temp]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}