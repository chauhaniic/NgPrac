import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { Employee } from './employee';
import { Product } from './product';
import { TaskDataService } from './task-data.service';
import { Router } from '@angular/router';

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
  constructor(private _data: TaskDataService,private _router:Router) {}

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
  item_Recieved;
  onDeleteTask(item: Todo) {
    this.notify_me();
    this.item_Recieved=item;
    return item;
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
    this._data
    .addTask(new Todo(this.id, this.title, this.status))
    .subscribe((x:any) => {
      //console.log(x);
      if (x.affectedRows == 1){
      this.arrTodos.push(new Todo(this.id, this.title, this.status));
      //this.flag = false;
    }
      else if(x.code=='ER_DUP_ENTRY'){
        alert('Duplicate Entry');
      }else{
        alert('Try Again Later');
      }
    });

    /* this.arrTodos.push(new Todo(this.id, this.title, this.status));
    this._data.addTask(new Todo(this.id, this.title, this.status)).subscribe((x:any)=>{
      if(x.code=='ER_DUP_ENTRY'){
        alert('Duplicate Entry');
      }
    }); */
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
    this.notify_me();
    this.item_Recieved=item;
    return item;
    this.arrEmployees.splice(this.arrEmployees.indexOf(item), 1);
    this._data.deleteUser(item.user_email).subscribe();
  }
  onEditEmpoyee(item: Employee) {
    this._router.navigate(['/editemp', item.user_email]);
  }
  onAddEmployee() {

    this._data
      .addUser(new Employee(this.email, this.name, this.password, this.mobile))
      .subscribe((x:any)=>{
        if(x.affectedRows==1){
          this.arrEmployees.push(
      new Employee(this.email, this.name, this.password, this.mobile)
    );
        }else if(x.code=='ER_DUP_ENTRY'){
          alert('Duplicate Entry');
        }else{
          alert('Try Again Later');
        }
      });
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
  pdframe:boolean=false;
  onEditProduct(item: Product) {
    this._router.navigate(['/editproduct', item.id]);
    //this.

  }
  onDeleteProduct(item: Product) {
    this.notify_me();
    this.item_Recieved=item;
    return item;
    this.arrProduct.splice(this.arrProduct.indexOf(item), 1);
    this._data.deleteProduct(item.id).subscribe();
  }
  onAddProduct() {

    this._data
      .addProduct(new Product(this.pid, this.pname, this.pdesc, this.price))
      .subscribe((x:any)=>{
        if(x.affectedRows==1){
         this.arrProduct.push(
      new Product(this.pid, this.pname, this.pdesc, this.price)
    );
        }else if(x.code=='ER_DUP_ENTRY'){
          alert('Duplicate Entry');
        }else{
          alert('Try Again Later');
        }
      });
    //this.eflag = false;
    this.pid = this.pname = this.pdesc = this.price = '';
  }



  // Notification Part
  close_notify:boolean=false;
  onDelete(){
    //this.arrTodos.splice(this.arrTodos.indexOf(this.item_Recieved), 1);
    /* console.log(this.item_Recieved.Id);
    console.log(this.item_Recieved.id);
    console.log(this.item_Recieved.user_email);
 */
    if(this.item_Recieved.Id!=null){
      this._data.deleteTask(this.item_Recieved.Id).subscribe((x:any)=>{
        if(x.affectedRows==1){
          this.arrTodos.splice(this.arrTodos.indexOf(this.item_Recieved), 1);
      alert('Task Deleted Successfully ! ');
        }else{
          alert('Please Try Again Later!');
        }
      });
    }
    if(this.item_Recieved.id!=null){

      this._data.deleteProduct(this.item_Recieved.id).subscribe((x:any)=>{
        if(x.affectedRows==1){
          this.arrProduct.splice(this.arrProduct.indexOf(this.item_Recieved), 1);
      alert('Product Deleted Successfully ! ');
        }else{
          alert('Please Try Again Later!');
        }
      });
    }
    if(this.item_Recieved.user_email!=null){

      this._data.deleteUser(this.item_Recieved.user_email).subscribe((x:any)=>{
        if(x.affectedRows==1){
          this.arrEmployees.splice(this.arrEmployees.indexOf(this.item_Recieved), 1);
      alert('User Deleted Successfully ! ');
        }else{
          alert('Please Try Again Later!');
        }
      });
    }

    this.close_me();
  }
  notify_me(){
    this.close_notify=true;
  }
  close_me(){
    this.close_notify=false;
  }

}
