import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';

@Component({
  selector: 'app-registert6',
  templateUrl: './registert6.component.html',
  styleUrls: ['./registert6.component.css'],
})
export class Registert6Component implements OnInit {
  name;
  email;
  password;
  message;
  constructor() {}
  ngOnInit(): void {}
  arrUser: User[] = [
    new User('BabaYaga', 'baba@yaga.com', 'Hello', 'New Delhi'),
  ];

  onRegister(f: NgForm) {
    if (
      f.value.email == '' ||
      f.value.usr_password == '' ||
      f.value.usr_name == '' ||
      f.value.usr_email == null ||
      f.value.usr_password == null ||
      f.value.usr_name == null
    ) {
      this.message = 'Enter Details First !!';
    } else {
      this.arrUser.push(
        new User(
          f.value.usr_name,
          f.value.usr_email,
          f.value.usr_password,
          f.value.usr_city
        )
      );
      //this.regDone();
      alert('Dear ' + f.value.usr_name + ' Registration Done');
    }
  }
}
