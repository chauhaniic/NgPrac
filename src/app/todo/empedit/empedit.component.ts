import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee';
import { TaskDataService } from '../task-data.service';

@Component({
  selector: 'app-empedit',
  templateUrl: './empedit.component.html',
  styleUrls: ['./empedit.component.css']
})
export class EmpeditComponent implements OnInit {
  userForm: FormGroup
  arrEmployees: Employee[] = [];
  user_email_Id;
  constructor(private _actroute: ActivatedRoute,private _data:TaskDataService, private _router: Router) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      user_email: new FormControl({value:this.user_email_Id, disabled: true}, [
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
    this.user_email_Id=this._actroute.snapshot.params['id'];
    this._data.getUsersByEmail(this.user_email_Id).subscribe((data: Employee[]) => {
      this.userForm.patchValue({
        user_email:data[0].user_email,
        user_name:data[0].user_name,
        user_password:data[0].user_password,
        user_mb:data[0].user_mb
      })
    });

  }
  onUserEdit(){
    if (this.userForm.status == 'VALID') {
      this._data.editUser(this.userForm.value).subscribe((x) => {
        alert('Edited Suuccesfully!');
        this._router.navigate(['/todo']);
      });
    } else {
      alert('Please Complete the Form Correctly!');
    }
  }
  onDelete(){
    this._router.navigate(['/todo']);
  }

}
