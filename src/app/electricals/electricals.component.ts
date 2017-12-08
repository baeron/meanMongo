import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-electricals',
  templateUrl: './electricals.component.html',
  styleUrls: ['./electricals.component.css']
})
export class ElectricalsComponent implements OnInit {
  projectId: any;
  project = {};
  electrical: any;
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.projectId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.getProject(this.projectId);
  }
  
  //TODO change method to download only electricals on front and back-end
  getProject(id) {
    this.http.get('/project/' + id)
      .subscribe(data => {
        this.project = data;
    });
  }

//  let temp = (this.route.snapshot.params['id']);
  saveElectrical() {
    this.electrical = {};
    this.electrical.length = 0;
    this.http.post('/project/'+this.projectId+'/electricals', this.electrical)
      .subscribe((res: Array<string>) => {
          let id = res['_id'];
          let responseId = res[res.length-1]['_id']
          console.log(responseId);
          let temp = '/project/'+this.route.snapshot.params['id']+'/electrical-create/'+responseId;
          console.log(temp);
          //this.router.navigate(['/projects']);
          this.router.navigate([temp]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}