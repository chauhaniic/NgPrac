import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ChildComponent implements OnInit {
  @Input() categoryName: string = '';
  @Output() myEvent = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onSearchClick(val: string) {
    console.log(val, 'It is Child comp');
    this.myEvent.emit(val);
  }
}
