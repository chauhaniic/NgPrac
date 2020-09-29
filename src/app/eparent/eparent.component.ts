import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eparent',
  templateUrl: './eparent.component.html',
  styleUrls: ['./eparent.component.css'],
})
export class EparentComponent implements OnInit {
  selectedText: string = '';
  constructor() {}
  temp: string = '';
  ngOnInit(): void {}
  onMyEvent(val) {
    console.log(val, 'This is Parent');
    this.temp = val;
  }
}
