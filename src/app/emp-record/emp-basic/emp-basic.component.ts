import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EmpRecordService } from '../emp-record.service';
import { Emp_Basic } from './emp_basic';
@Component({
  selector: 'app-emp-basic',
  templateUrl: './emp-basic.component.html',
  styleUrls: ['./emp-basic.component.css']
})
export class EmpBasicComponent implements OnInit {
  empBasicForm: FormGroup;
  arrEmpBasic:Emp_Basic[]=[];
  age;
  constructor(private _data: EmpRecordService, private _router: Router,private _actroute: ActivatedRoute) { }

  ngOnInit(): void {
    //this.emp_id=this._actroute.snapshot.params['id'];
    this.empBasicForm = new FormGroup({
      emp_id: new FormControl({value:'',disabled:true}, [Validators.required]),
      emp_title: new FormControl('mr'),
      f_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      m_name: new FormControl(''),
      l_name: new FormControl(''),
      gender: new FormControl('male'),
      dob: new FormControl(null, [
        Validators.required,
        this.calculateAge.bind(this),
      ]),
      ophone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      phone1: new FormControl(''),
      phone2: new FormControl(''),
      fax: new FormControl(''),
      oemail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      pemail: new FormControl('', [Validators.email]),
      pemail2: new FormControl('', [Validators.email]),
      photo: new FormControl(null, [Validators.required]),
    });
  }
  calculateAge(control: AbstractControl) {
    let today: Date;
    this.age = moment().diff(control.value, 'years');
    //this.emp_age;
  }
  emp_id_param;
  empBasicDetails(){
    if(this.empBasicForm.status == 'VALID'){
      this._data.addEmp_Basic(this.empBasicForm.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          this.emp_id_param=this.empBasicForm.get('oemail').value;
          console.log(this.emp_id_param);
          alert('Added Successfully');
          this.route_me();
        } else {
          if(x.code=='ER_DUP_ENTRY'){
            alert('Duplicate Email')
          }else{
            console.log(x);
          }

        }
      });
    }else{
      alert ('Please Fill The Form Correctly');
    }
  }
  route_me(){
    this._data.getEmployeeById(this.emp_id_param).subscribe((data:Emp_Basic[])=>{
      this.emp_id_param=data[0].emp_id;
      console.log(this.emp_id_param);
      this._router.navigate(['/home/addpersonal',this.emp_id_param]);
    })
  }

}
