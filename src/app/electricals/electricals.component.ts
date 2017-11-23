import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-electricals',
  templateUrl: './electricals.component.html',
  styleUrls: ['./electricals.component.css']
})
export class ElectricalsComponent implements OnInit {
  project = {};
  electrical = {};
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.params['id']);
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
    this.http.post('/project/'+this.route.snapshot.params['id']+'/electricals', this.electrical)
      .subscribe((res: Array<string>) => {
          let id = res['_id'];
          let responseId = res[res.length-1]['_id']
          console.log(responseId);
          this.router.navigate(['/projects/'+this.route.snapshot.params['id']+'/electrical-create/'+responseId]);
        }, (err) => {
          console.log(err);
        }
      );
  }
}