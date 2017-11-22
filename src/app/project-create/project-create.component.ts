import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {
  project = {};
  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveProject() {
    this.http.post('/project', this.project)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/projects']);
        }, (err) => {
          console.log(err);
        }
      );
  }
}
