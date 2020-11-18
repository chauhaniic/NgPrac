import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { Product } from './product';
@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  url: string = 'http://localhost:3000/tasks';
  url_users: string = 'http://localhost:3000/users';
  url_products: string = 'http://localhost:3000/products';
  constructor(private _http: HttpClient) {}

  getAllTasks() {
    return this._http.get(this.url);
  }
  addTask(todo: Todo): Observable<Todo> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Todo>(this.url, todo, { headers: headers });
  }
  deleteTask(id) {
    return this._http.delete(this.url + '/' + id);
  }
  updateTask(id, todo: Todo) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url + '/' + id, todo, {
      headers: headers,
    });
  }

  //User Part

  getAllUsers() {
    return this._http.get(this.url_users);
  }
  getUsersByEmail(user_email) {
    return this._http.get(this.url_users+'/'+user_email);
  }
  addUser(todo: Employee): Observable<Employee> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Employee>(this.url_users, todo, {
      headers: headers,
    });
  }
  editUser(todo: Employee): Observable<Employee> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put<Employee>(this.url_users+'/'+todo.user_email, todo, {
      headers: headers,
    });
  }
  deleteUser(id) {
    return this._http.delete(this.url_users + '/' + id);
  }

  //Product Part

  getAllProduct() {
    return this._http.get(this.url_products);
  }
  getProductById(id) {
    return this._http.get(this.url_products+'/'+id);
  }
  editProduct(todo: Product): Observable<Product> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put<Product>(this.url_products+'/'+todo.id, todo, {
      headers: headers,
    });
  }
  addProduct(product: Product): Observable<Product> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(product);
    //console.log(body);
    return this._http.post<Product>(this.url_products, product, {
      headers: headers,
    });
  }
  deleteProduct(id) {
    return this._http.delete(this.url_products + '/' + id);
  }
}
