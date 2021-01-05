import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Files } from './file_manage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  url:string='http://localhost:3000/files';
  constructor(private _http:HttpClient) { }
  getFileDetails(){
    return this._http.get(this.url);
  }
  getFileById(id){
    return this._http.get(this.url+'/'+id);
  }
  addFiles(todo){
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    console.log(body);
    return this._http.post(
      this.url, body, { headers: headers });
  }
  uploadFile(file){
    const headers = { 'content-type': 'multipart/form-data' };
    //console.log(file);
    return this._http.post(this.url,file);
  }
  deleteFile(file){
    return this._http.delete(file);
  }
}
