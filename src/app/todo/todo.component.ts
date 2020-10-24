import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { Employee } from './employee';
import { Product } from './product';
import { TaskDataService } from './task-data.service';

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
  //new Todo(1, 'Hello', 'done'),
  //new Todo(2, 'email to your manager', 'pending'),
  arrTodos: Todo[] = [];
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
  constructor(private _data: TaskDataService) {}

  ngOnInit(): void {
    this._data.getAllTasks().subscribe((data: Todo[]) => {
      this.arrTodos = data;
    });
  }
  onDeleteTask(item: Todo) {
    this.arrTodos.splice(this.arrTodos.indexOf(item), 1);
    this._data.deleteTask(item.Id).subscribe();
    //this._data.addTask().
  }
  onUpdateTask(item: Todo) {
    if (item.Status == 'done') {
      item.Status = 'pending';
      this._data.updateTask(item.Id, item).subscribe();
    } else {
      item.Status = 'done';
      this._data.updateTask(item.Id, item).subscribe();
    }
  }
  //tof=new Todo();
  onAddTask() {
    this.arrTodos.push(new Todo(this.id, this.title, this.status));
    this._data.addTask(new Todo(this.id, this.title, this.status)).subscribe();
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
