import { Component, OnInit } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
@Component({
  selector: 'app-demoapp',
  templateUrl: './demoapp.component.html',
  styleUrls: ['./demoapp.component.css'],
})
export class DemoappComponent implements OnInit {
  nol: number = 0;
  str: string = 'Sanjeev';
  constructor() {}

  ngOnInit(): void {}

  btnclick() {
    alert('Hello ' + this.str + '\nWelcome to Novodhi !');
  }
}
