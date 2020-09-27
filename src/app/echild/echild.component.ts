import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-echild',
  templateUrl: './echild.component.html',
  styleUrls: ['./echild.component.css'],
})
export class EchildComponent implements OnInit {
  @Input() categoryName: string = '';
  constructor() {}
  @Output() myEvent = new EventEmitter();
  ngOnInit(): void {}
  onSearchClick(val: string) {
    console.log(val, 'It is EChild comp');
    this.myEvent.emit(val);
  }
}
