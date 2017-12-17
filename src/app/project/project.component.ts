import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { DataService } from '../data.service'

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
  constructor(private http: HttpClient, private dataService: DataService) {
    //this.dataService.getProjects().subscribe(data => this.testProject = data);
    //console.log(this.testProject);
  }

  ngOnInit() {
    this.dataService.projects.subscribe(data => {
      this.projects = data;
    });
  };
}
