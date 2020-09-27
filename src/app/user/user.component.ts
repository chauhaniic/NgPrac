import { Component, OnInit } from '@angular/core';
import { Users } from './user';
import { NgForOf } from '@angular/common';
import { equal } from 'assert';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  constructor() {}
  temp: string = '';
  name;
  email;
  password;
  lemail: string = '';
  lpassword: string = '';
  message;
  arrUser: Users[] = [new Users('BabaYaga', 'baba@yaga.com', 'Hello')];
  onRegister() {
    if (
      this.email == '' ||
      this.password == '' ||
      this.name == '' ||
      this.email == null ||
      this.password == null ||
      this.name == null
    ) {
      this.message = 'Enter Details First !!';
    } else {
      this.arrUser.push(new Users(this.name, this.email, this.password));
      this.regDone();
    }
  }
  onLogin() {
    if (this.lemail == '' || this.lpassword == '') {
      this.message = 'Enter Details First !!';
    } else {
      for (const item of this.arrUser) {
        //alert(item.name);
        if (this.lemail === item.email && this.lpassword === item.password) {
          //console.log(item.name);
          this.temp = 'Hello';
          this.logStatus();
        }
      }
      if (this.status == 1) {
        this.dflag = true;
        this.lflag = false;
        this.message = 'login Successfully';
      } else {
        this.temp = 'sorry';
        this.message = 'login Failed';
      }
    }
  }
  ngOnInit(): void {}
  lflag: boolean = false;
  rflag: boolean = false;
  dflag: boolean = false;
  mflag: boolean = false;
  status: number = 0;

  logStatus() {
    if (this.status == 1) {
      this.status = 0;
    } else {
      this.status = 1;
    }
  }
  showLogin() {
    this.lflag = true;
    this.rflag = false;
  }
  showRegister() {
    this.rflag = true;
    this.lflag = false;
  }
  regDone() {
    this.lflag = this.rflag = this.dflag = false;
    this.message = 'Registered Successfull';
    this.email = this.password = this.name = '';
  }
  onLogout() {
    this.dflag = false;
    this.logStatus();
    this.message = 'logout Successfull';
    this.lemail = this.lpassword = '';
  }
}
