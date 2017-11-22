import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProjectComponent } from './project/project.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectDeleteComponent } from './project-delete/project-delete.component';
import { ProjectInfoComponent } from './project-info/project-info.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    redirectTo: '/',
  },
  {
    path: 'projects',
    component: ProjectComponent
  },
  {
    path: 'project-create',
    component: ProjectCreateComponent,
  },
  {
    path: 'project-edit/:id',
    component: ProjectEditComponent
  },
  {
    path: 'project-delete/:id',
    component: ProjectDeleteComponent
  },
  {
    path: 'project/:id',
    component: ProjectInfoComponent
  },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    ProjectCreateComponent,
    ProjectEditComponent,
    ProjectDeleteComponent,
    ProjectInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
