import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.css']
})
export class ProjectInfoComponent implements OnInit {
  project = {};
  constructor(private route: ActivatedRoute, private http: HttpClient,) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.params['id']);
  }
  getProject(id) {
    this.http.get('/project/' + id)
      .subscribe(data => {
        this.project = data;
    });
  }
}
