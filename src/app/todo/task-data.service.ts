import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TaskDataService {
  url: string = 'http://localhost:3000/tasks';
  constructor(private _http: HttpClient) {}

  getAllTasks() {
    return this._http.get(this.url);
  }
  addTask(todo: Todo): Observable<Todo> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    console.log(body);
    return this._http.post<Todo>(this.url, todo, { headers: headers });
  }
  deleteTask(id) {
    return this._http.delete(this.url + '/' + id);
  }
  updateTask(id, todo: Todo) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    console.log(body);
    return this._http.put(this.url + '/' + id, todo, {
      headers: headers,
    });
  }
}
