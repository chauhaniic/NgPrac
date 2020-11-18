import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emp_Basic, Emp_Personal } from '../emp-basic/emp_basic';
import { EmpRecordService } from '../emp-record.service';

@Component({
  selector: 'app-emp-personal',
  templateUrl: './emp-personal.component.html',
  styleUrls: ['./emp-personal.component.css']
})
export class EmpPersonalComponent implements OnInit {
  empPersonalForm:FormGroup;
  mart_status;
  emp_id_param;
  temp;
  constructor(private _actroute:ActivatedRoute,private _router:Router,private _data:EmpRecordService) { }

  ngOnInit(): void {
    this.emp_id_param=this._actroute.snapshot.params['id'];
    this.empPersonalForm = new FormGroup({
      emp_id:new FormControl({value:''},[
        Validators.required
      ]),
      /* postalPart: new FormGroup(
        { */

      birth_place: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      religion: new FormControl(''),
      caste: new FormControl(''),
      domicile: new FormControl(null, [Validators.pattern('[a-zA-Z ]*')]),
      nationality: new FormControl('indian', [Validators.required]),
      voter_id: new FormControl(null, [Validators.pattern('[0-9a-zA-Z ]*')]),
      pan_card: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z ]*'),
      ]),
      adhar_card: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9a-zA-Z ]*'),
      ]),
      maritual_status: new FormControl('married'),
      children: new FormControl('', [Validators.pattern('[0-9 ]*')]),
      marriage_date: new FormControl(''),
      spouse_name: new FormControl('', [Validators.pattern('[0-9a-zA-Z ]*')]),

    });
    if(this.emp_id_param==null){
      this._router.navigate(['/home/addbasic']);
    }else{
        this._data.getEmployeeById(this.emp_id_param).subscribe((x:Emp_Basic[])=>{
          if(x[0]==null){
            this._router.navigate(['/home/addbasic']);
          }
        })

      this._data.getEmpPersonalById(this.emp_id_param).subscribe((data:Emp_Personal[])=>{
        if(data[0]!=null){
            this.temp=data[0].pan_card;
            this.empPersonalForm.patchValue({
            emp_id:data[0].emp_id,
            birth_place:data[0].birth_place,
            religion:data[0].religion,
            caste:data[0].caste,
            domicile:data[0].domicile,
            nationality:data[0].nationality,
            voter_id:data[0].voter_id,
            pan_card:data[0].pan_card,
            adhar_card:data[0].adhar_card,
            maritual_status:data[0].maritual_status,
            children:data[0].children,
            marriage_date:data[0].marriage_date,
            spouse_name:data[0].spouse_name,
          })
        }else{
          this.empPersonalForm.get('emp_id').setValue(this.emp_id_param);
          console.log(this.empPersonalForm.get('emp_id').value);
        }


      });
    }
  }
  mchange() {
    this.mart_status = this.empPersonalForm.get('maritual_status').value;
  }
  addPersonal(){
    console.log(this.empPersonalForm.value);
    if(this.empPersonalForm.status == 'VALID'){
      if(this.temp==null){
        this.empPersonalForm.get('emp_id').setValue(this.emp_id_param);
        console.log(this.empPersonalForm.get('emp_id').value);
      this._data.addEmp_Personal(this.empPersonalForm.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          alert('Added Successfully');
          //this._router.navigate(['/home/addressadd']);
        } else {
           console.log(x);

        }
      });
    }else{
        this._data.updatePersonal(this.emp_id_param,this.empPersonalForm.value).subscribe((x:any)=>{
          if (x.affectedRows==1) {
            alert('Added Successfully');
            //this._router.navigate(['/home/addressadd']);
          } else {
            console.log(x);

          }
        });
      }
    }else{
      alert('Fill The Form Completely!')
    }
  }
  goBack(){
    this._router.navigate(['/home/editbasic',this.emp_id_param]);
    //this._router.navigate(['/home/editbasic'],this.emp_id_param);
  }
  goNext(){
    this._router.navigate(['/home/address',this.emp_id_param]);
    //this._router.navigate(['/home/address'],this.emp_id_param);
  }
}
