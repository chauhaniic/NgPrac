import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demonew',
  templateUrl: './demonew.component.html',
  styleUrls: ['./demonew.component.css'],
})
export class DemonewComponent implements OnInit {
  fonts: number = 25;
  tab_n: number = 1;
  str1;
  tflag: boolean = false;
  today: number = Date.now();
  price: number = 28;
  constructor() {}
  showTodo() {}
  showEmployee() {}
  ngOnInit(): void {}
  showTable() {
    //this.tab_number1 = this.tab_number;
    this.tflag = true;
  }
  onclear() {
    this.tflag = false;
    this.tab_n = 1;
  }
}
