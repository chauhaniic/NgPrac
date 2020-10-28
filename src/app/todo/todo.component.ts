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
  password;
  mobile;
  email;
  pid;
  pname;
  pdesc;
  price;
  flag: boolean = false;
  eflag: boolean = false;
  pflag: boolean = false;

  //arrName: string[] = ['baba', 'yaga'];
  //arrNum: number[] = [1, 2, 3, 4, 5, 8, 6];
  //new Todo(1, 'Hello', 'done'),
  //new Todo(2, 'email to your manager', 'pending'),
  arrTodos: Todo[] = [];
  arrEmployees: Employee[] = [];
  arrProduct: Product[] = [
    /*     new Product(1, 'Camera', 'new', 23000),
    new Product(2, 'Micromax Dongle', 'unused', 1000),
    new Product(3, 'Dell Laptop', '1 year old', 18000), */
  ];
  constructor(private _data: TaskDataService) {}

  ngOnInit(): void {
    this._data.getAllTasks().subscribe((data: Todo[]) => {
      this.arrTodos = data;
    });
    this._data.getAllUsers().subscribe((data: Employee[]) => {
      this.arrEmployees = data;
    });
    this._data.getAllProduct().subscribe((data: Product[]) => {
      this.arrProduct = data;
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
    if (!this.flag) {
      this.flag = true;
      this.pflag = this.eflag = false;
    } else {
      this.flag = false;
    }
  }
  onAddNewEmployee() {
    if (!this.eflag) {
      this.eflag = true;
      this.flag = this.pflag = false;
    } else {
      this.eflag = false;
    }
  }

  onDeleteEmpoyee(item: Employee) {
    this.arrEmployees.splice(this.arrEmployees.indexOf(item), 1);
    this._data.deleteUser(item.user_email).subscribe();
  }
  onAddEmployee() {
    this.arrEmployees.push(
      new Employee(this.email, this.name, this.password, this.mobile)
    );
    this._data
      .addUser(new Employee(this.email, this.name, this.password, this.mobile))
      .subscribe();
    //this.eflag = false;
  }
  onCancelEmployee() {
    this.eflag = false;
  }

  onShowProduct() {
    if (this.pflag) {
      this.pflag = false;
    } else {
      this.pflag = true;
      this.flag = this.eflag = false;
    }
  }
  onCancleProduct() {
    this.pflag = false;
  }
  onDeleteProduct(item: Product) {
    this.arrProduct.splice(this.arrProduct.indexOf(item), 1);
    this._data.deleteProduct(item.id).subscribe();
  }
  onAddProduct() {
    this.arrProduct.push(
      new Product(this.pid, this.pname, this.pdesc, this.price)
    );
    this._data
      .addProduct(new Product(this.pid, this.pname, this.pdesc, this.price))
      .subscribe();
    //this.eflag = false;
    this.pid = this.pname = this.pdesc = this.price = '';
  }
}
