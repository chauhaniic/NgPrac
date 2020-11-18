import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Emp_Adrress, Emp_Bank, Emp_Basic, Emp_Personal } from './emp-basic/emp_basic';
import { Emp_Edu, Emp_Exp, Emp_Skill } from './emp-exp/emp_exp';

@Injectable({
  providedIn: 'root'
})
export class EmpRecordService {
  url: string = 'http://localhost:3000/employee';
  url_personal: string = 'http://localhost:3000/employee/personal';
  url_address: string = 'http://localhost:3000/employee/address';
  url_bank: string = 'http://localhost:3000/employee/bank';
  url_edu: string = 'http://localhost:3000/employee/edu';
  url_exp: string = 'http://localhost:3000/employee/exp';
  url_skill: string = 'http://localhost:3000/employee/skill';
  constructor(private _http: HttpClient) {}
  getAllEmployee(){
    return this._http.get(this.url);
  }
  getEmployeeById(id){
    return this._http.get(this.url+'/'+id);
  }
  getEmpPersonalById(id){
    return this._http.get(this.url_personal+'/'+id);
  }
  getEmpAddressById(id){
    return this._http.get(this.url_address+'/'+id);
  }
  getEmpBankById(id){
    return this._http.get(this.url_bank+'/'+id);
  }
  getEmpEduById(id){
    return this._http.get(this.url_edu+'/'+id);
  }
  getEmpExpById(id){
    return this._http.get(this.url_exp+'/'+id);
  }
  getEmpSkillById(id){
    return this._http.get(this.url_skill+'/'+id);
  }
  addEmp_Basic(todo: Emp_Basic): Observable<Emp_Basic> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Basic>(this.url/* +'/addbasic' */, todo, { headers: headers });
  }
  addEmp_Personal(todo: Emp_Personal): Observable<Emp_Personal> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Personal>(this.url_personal, todo, { headers: headers });
  }
  addEmp_Address(todo: Emp_Personal): Observable<Emp_Adrress> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Adrress>(this.url_address, todo, { headers: headers });
  }
  addEmp_Bank(todo: Emp_Bank): Observable<Emp_Bank> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Bank>(this.url_bank, todo, { headers: headers });
  }
  addEmp_Edu(todo: Emp_Edu): Observable<Emp_Edu> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Edu>(this.url_edu, todo, { headers: headers });
  }
  addEmp_Exp(todo: Emp_Exp): Observable<Emp_Exp> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Exp>(this.url_exp, todo, { headers: headers });
  }
  addEmp_Skill(todo: Emp_Skill): Observable<Emp_Skill> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.post<Emp_Skill>(this.url_skill, todo, { headers: headers });
  }
  deleteEmp(id,add_url) {
    return this._http.delete(this.url + '/' +add_url +'/' + id);
  }
  deleteEmpSkill(id) {
    return this._http.delete(this.url + '/skill/' + id);
  }
  updateBasic(id, todo: Emp_Basic) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url + '/' + id, body, {
      headers: headers,
    });
  }
  updatePersonal(id, todo: Emp_Personal) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url_personal + '/' + id, body, {
      headers: headers,
    });
  }
  updateBank(id, todo: Emp_Bank) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url_bank + '/' + id, body, {
      headers: headers,
    });
  }
  updateAddress(id, todo: Emp_Adrress) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url_address + '/' + id, body, {
      headers: headers,
    });
  }
  updateEdu(id, todo: Emp_Edu) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url_edu + '/' + id, body, {
      headers: headers,
    });
  }
  updateExp(id, todo: Emp_Exp) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url_exp + '/' + id, body, {
      headers: headers,
    });
  }
  updateSkill(id, todo: Emp_Skill) {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(todo);
    //console.log(body);
    return this._http.put(this.url_skill + '/' + id, body, {
      headers: headers,
    });
  }

}
