import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstPicture: string;

  constructor() {
    this.firstPicture = 'assets/images/Engenieering-Optimization.jpg';
  }

  ngOnInit() {
  }

}
