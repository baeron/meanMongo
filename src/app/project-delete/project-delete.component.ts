import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-delete',
  templateUrl: './project-delete.component.html',
  styleUrls: ['./project-delete.component.css']
})
export class ProjectDeleteComponent implements OnInit {
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

  deleteProject(id) {
    this.http.delete('/project/' + id)
      .subscribe(res => {
          this.router.navigate(['/projects']);
        }, (err) => {
          console.log(err);
        }
      );
    }
}