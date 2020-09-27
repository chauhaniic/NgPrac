import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-headert6',
  templateUrl: './headert6.component.html',
  styleUrls: ['./headert6.component.css'],
})
export class Headert6Component implements OnInit {
  loginstatus: number = 0;
  constructor() {}

  ngOnInit(): void {}
  @Input() onLogout() {}
}
