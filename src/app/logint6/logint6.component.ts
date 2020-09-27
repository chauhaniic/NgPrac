import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ROUTES } from '@angular/router';
import { User } from '../registert6/user';
import { Headert6Component } from './../headert6/headert6.component';
@Component({
  selector: 'app-logint6',
  templateUrl: './logint6.component.html',
  styleUrls: ['./logint6.component.css'],
})
export class Logint6Component implements OnInit {
  //l:Headert6Component = new Headert6Component();
  @Input() loginstatus: number = 0;
  constructor() {}
  arrUser: User[] = [
    new User('BabaYaga', 'baba@yaga.com', 'Hello', 'New Delhi'),
    new User('Hello world', 'tm@mail.com', '123456', 'New Delhi'),
  ];
  temp: number = 0;
  ngOnInit(): void {}
  onLogin(f: NgForm) {
    //f.value.usr_email;

    for (const item of this.arrUser) {
      //alert(item.name);
      if (
        f.value.usr_email === item.email &&
        f.value.password === item.password
      ) {
        //ROUTES.
        //console.log(item.name);
      }
    }
    if (this.temp == 1) {
      this.loginstatus = 1;
    }
  }
  onLogout() {}
}
