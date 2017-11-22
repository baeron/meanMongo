import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {
  project = {};
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProject(this.route.snapshot.params['id']);
  }

  getProject(id) {
    this.http.get('/project/' + id)
      .subscribe(data => {
        this.project = data;
    });
  }

  updatProject(id, data) {
    data.updated_date = Date.now();
    this.http.put('/project/' + id, data)
      .subscribe(res => {
        let id = res['_id'];
        this.router.navigate(['projects']);
      }, (err) => {
        console.log(err);
      }
    );
  }
}
