import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { EmpRecordService } from '../../emp-record.service';
import { Emp_Basic } from '../emp_basic';
@Component({
  selector: 'app-emp-basic-edit',
  templateUrl: './emp-basic-edit.component.html',
  styleUrls: ['./emp-basic-edit.component.css']
})
export class EmpBasicEditComponent implements OnInit {
  empBasicForm: FormGroup;
  arrEmpBasic:Emp_Basic[]=[];
  age;
  emp_id_param;
  title:string='mr';
  constructor(private _data: EmpRecordService, private _router: Router,private _actroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.emp_id_param=this._actroute.snapshot.params['id'];
    console.log(this.emp_id_param);

    this.empBasicForm = new FormGroup({
      emp_id: new FormControl({value:this.emp_id_param, disabled: true}, [
        Validators.required
      ]),
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
    if(this.emp_id_param!=''){
      this._data.getEmployeeById(this.emp_id_param).subscribe((data:Emp_Basic[])=>{
        //console.log(moment('2019-11-03T05:00:00.000Z').utc().format('MM/DD/YYYY'));
        this.empBasicForm.patchValue({
          emp_id:data[0].emp_id,
          f_name:data[0].f_name,
          gender:data[0].gender,
          dob:data[0].dob,
          ophone:data[0].ophone,
          phone1:data[0].phone1,
          fax:data[0].fax,
          oemail:data[0].oemail
        });
        if(data[0].gender=='female'){
          this.empBasicForm.get('emp_title').setValue('mrs');
        }
      });
    }
  }

  calculateAge(control: AbstractControl) {
    //let today: Date;
    this.age = moment().diff(control.value, 'years');
    //this.emp_age;
  }
  forward:boolean=false;
  empBasicUpdate(){
    if(this.empBasicForm.status == 'VALID'){
      this._data.updateBasic(this.emp_id_param,this.empBasicForm.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          alert('Added Successfully');
          this.forward=true;
          //this._router.navigate(['/home']);
        } else {
          if(x.code=='ER_DUP_ENTRY'){
            alert('Duplicate Email')
          }else{
            console.log(x);
          }

        }
      });
    }
  }
  onNext(){
      console.log(this.emp_id_param);
      this._router.navigate(['/home/addpersonal',this.emp_id_param]);
      //this._router.navigate(['/home/personaladd',this.emp_id_param]);

  }
  onHome(){
    this._router.navigate(['/home']);
  }
}
