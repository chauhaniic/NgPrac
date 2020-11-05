import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../todo/employee';

@Injectable({
  providedIn: 'root',
})
export class CUserService {
  url_users: string = 'http://localhost:3000/users';
  constructor(private _http: HttpClient) {}
  //User Part

  getAllUsers() {
    return this._http.get(this.url_users);
  }
  addUser(todo: Employee) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    console.log(body);
    return this._http.post<Employee>(this.url_users, todo, {
      headers: headers,
    });
  }
  deleteUser(id) {
    return this._http.delete(this.url_users + '/' + id);
  }
}
