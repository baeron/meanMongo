import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DataService } from '../data.service'
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService  } from 'ng4-loading-spinner';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  providers: [DataService]
})
export class ProjectComponent implements OnInit {
  testProject: any;
  projects: any;
  temp: any;
  constructor(private http: HttpClient, private dataService: DataService, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    //this.dataService.getProjects().subscribe(data => this.testProject = data);
    //console.log(this.testProject);
  }

  ngOnInit() {
    this.ng4LoadingSpinnerService.show();
    this.dataService.projects.subscribe(data => {
      this.projects = data;
      this.ng4LoadingSpinnerService.hide();
/*      setTimeout(function() {
        this.ng4LoadingSpinnerService.hide();
      }.bind(this), 4000);
*/
    });
  };
}
