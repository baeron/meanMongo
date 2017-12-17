import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service'

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css'],
  providers: [DataService]
})
export class ProjectInfoComponent implements OnInit {
  project: any;
  projectId: string;
  projectTitle: string;
  constructor(private route: ActivatedRoute, private http: HttpClient, private dataService: DataService) {
    this.projectId = this.route.snapshot.params['id'];
   }

  ngOnInit() {
    this.dataService.projects.subscribe(data => {
      this.project = data;
      for (var key in this.project) {
        if(this.project[key]['_id'] === this.projectId){
          this.projectTitle = this.project[key]['title']
          return;
        }
      }
    });
  }

  /*getProject(id) {
    this.http.get('/project/' + id)
      .subscribe(data => {
        this.project = data;
    });
  }*/
}