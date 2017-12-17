import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
  projects: any;
  projectsData: any;

  constructor(private http: HttpClient) {
    this.projects = this.getProjects();
  }

  
  getProjects(){
    //this.projectsData = this.http.get('/project').map((res:Response) => res);
    //console.log(this.projectsData);
    return this.http.get('/project').map((res:Response) => res);//this.projectsData;
  }

  getElectricals(id){
    return this.http.get('/project/'+id+'/electricals').map((res:Response) => res);
  }
}