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
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getElectrical();
  }
  
  //TODO change method to download only electricals on front and back-end
  getElectrical() {
    this.http.get('/project/5a16fde3c6718700d89aac08/electrical-create/5a16fde7c6718700d89aac09')
      .subscribe((data: any) => {
        this.electricalItem = data.electrical;
    });
  }

  updateSelectedValue(event:string): void{
    this.selectedObject = JSON.parse(event);
  }
  /*saveElectrical() {
    this.http.post('/project', this.electrical)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/projects']);
        }, (err) => {
          console.log(err);
        }
      );
  }*/

}