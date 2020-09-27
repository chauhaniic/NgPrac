import { Component, OnInit } from '@angular/core';
import { Emp } from './emp';

@Component({
  selector: 'app-emp',
  templateUrl: './emp.component.html',
  styleUrls: ['./emp.component.css'],
})
export class EmpComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onEmpAdd(f) {
    console.log(f);
  }
}
