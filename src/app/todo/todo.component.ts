import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { Employee } from './employee';
import { Product } from './product';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  id;
  title;
  status;
  name;
  age;
  flag: boolean = false;
  eflag: boolean = false;

  //arrName: string[] = ['baba', 'yaga'];
  //arrNum: number[] = [1, 2, 3, 4, 5, 8, 6];

  arrTodos: Todo[] = [
    new Todo(1, 'Hello', 'done'),
    new Todo(2, 'email to your manager', 'pending'),
  ];
  arrEmployees: Employee[] = [
    new Employee(1, 'Ramu', 28),
    new Employee(2, 'Mahesh Babu', 32),
    new Employee(3, 'Ajit Kumar', 48),
    new Employee(4, 'Ravi Teja', 42),
  ];
  arrProduct: Product[] = [
    new Product(1, 'Camera', 'new', 23000),
    new Product(2, 'Micromax Dongle', 'unused', 1000),
    new Product(3, 'Dell Laptop', '1 year old', 18000),
  ];
  constructor() {}

  ngOnInit(): void {}
  onDeleteTask(item: Todo) {
    this.arrTodos.splice(this.arrTodos.indexOf(item), 1);
  }
  onUpdateTask(item: Todo) {
    if (item.status == 'done') {
      item.status = 'pending';
    } else {
      item.status = 'done';
    }
  }
  onAddTask() {
    this.arrTodos.push(new Todo(this.id, this.title, this.status));
    this.flag = false;
  }
  onCancelTask() {
    this.flag = false;
  }
  onAddNewTask() {
    if (this.flag == false) {
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
  onAddNewEmployee() {
    if (this.eflag == false) {
      this.eflag = true;
    } else {
      this.eflag = false;
    }
  }

  onDeleteEmpoyee(item: Employee) {
    this.arrEmployees.splice(this.arrEmployees.indexOf(item), 1);
  }
  onAddEmployee() {
    this.arrEmployees.push(new Employee(this.id, this.name, this.age));
    this.eflag = false;
  }
  onCancelEmployee() {
    this.eflag = false;
  }
}
