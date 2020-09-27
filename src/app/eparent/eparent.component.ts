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
    console.log(val, 'from Parent');
    this.temp = val;

    //this.productarr = this.productarr.filter((x) => x.pname.startsWith(val));
  }
}
