import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../todo/employee';
import { CUserService } from './c-user.service';

@Component({
  selector: 'app-connecting-user',
  templateUrl: './connecting-user.component.html',
  styleUrls: ['./connecting-user.component.css'],
})
export class ConnectingUserComponent implements OnInit {
  userForm: FormGroup;
  arrEmployees: Employee[] = [];
  constructor(private _data: CUserService, private _router: Router) {}

  ngOnInit(): void {
    this._data.getAllUsers().subscribe((data: Employee[]) => {
      this.arrEmployees = data;
    });
    this.userForm = new FormGroup({
      user_email: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      user_name: new FormControl(null, [Validators.required]),
      user_password: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
      user_mb: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9 ]*'),
      ]),
    });
  }
  userFilled() {
    if (this.userForm.status == 'VALID') {
      this._data.addUser(this.userForm.value).subscribe((x) => {
        alert('Added Suuccesfully!');
        this._router.navigate(['/todo']);
      });
    } else {
      alert('Please Complete the Form Correctly!');
    }
  }
}
