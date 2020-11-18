import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { Emp_Basic } from '../emp-basic/emp_basic';
import {Emp_Edu,Emp_Exp,Emp_Skill} from './emp_exp';
import { EmpRecordService } from '../emp-record.service';

@Component({
  selector: 'app-emp-exp',
  templateUrl: './emp-exp.component.html',
  styleUrls: ['./emp-exp.component.css']
})
export class EmpExpComponent implements OnInit {
  empEduForm:FormGroup;
  empExpForm:FormGroup;
  empSkillForm:FormGroup;
  emp_id_param;
  temp;
  constructor(
    private formBuilder: FormBuilder,
    private _router:Router,
    private _actroute:ActivatedRoute,
    private _data:EmpRecordService
  ) { }

  ngOnInit(): void {
    this.emp_id_param=this._actroute.snapshot.params['id'];
    this.empEduForm=this.formBuilder.group({
      edu_data: this.formBuilder.array([this.createEdu()])
    });
    this.empExpForm = this.formBuilder.group({
      exp_data: this.formBuilder.array([this.createExp()])
    });
    this.empSkillForm=this.formBuilder.group({
      skill_data: this.formBuilder.array([this.createSkill()])
    })
    this.empEduForm.controls['edu_data'].valueChanges.subscribe((value) => {});
    this.empSkillForm.controls['skill_data'].valueChanges.subscribe((value) => {});
    this.empExpForm.controls['exp_data'].valueChanges.subscribe((value) => {});

    if(this.emp_id_param==null){
      this._router.navigate(['/home/addbasic']);
    }else{
      this._data.getEmployeeById(this.emp_id_param).subscribe((x:Emp_Basic[])=>{
          if(x[0]==null){
            this._router.navigate(['/home/addbasic']);
          }
        })

      this._data.getEmpEduById(this.emp_id_param).subscribe((data:Emp_Edu[])=>{
        if(data[0]!=null){
          for(let i=0;data.length>=1 && i<data.length;i++){
              this.onAddEducationClick();
              let r = this.empEduForm.get('edu_data') as FormArray;
              let item=r.at(i);
              this.temp=data[i].score;
              item.patchValue({
              emp_id:data[i].emp_id,
              qualification:data[i].qualification,
              institution:data[i].institution,
              passing_year:data[i].passing_year,
              score:data[i].score,
              qua_area:data[i].qua_area
            });
          }
        }else{
          //this.empEduForm.get('emp_id').setValue(this.emp_id_param);
          //console.log(this.empEduForm.get('emp_id').value);
        }
      });
      this._data.getEmpExpById(this.emp_id_param).subscribe((data:Emp_Exp[])=>{

        if(data[0]!=null){
          for(let i=0;data.length>=1 && i<data.length;i++){
            this.onAddExpClick();
            let r = this.empExpForm.get('exp_data') as FormArray;
            let item=r.at(i);
            this.temp=data[i].designation;
            item.patchValue({
              emp_id:data[i].emp_id,
              from_date:data[i].from_date,
              to_date:data[i].to_date,
              company:data[i].company,
              designation:data[i].designation,
              r_date:data[i].r_date,
              nr_date:data[i].nr_date
            });
          }

        }else{
          //this.empExpForm.get('emp_id').setValue(this.emp_id_param);
          //console.log(this.empExpForm.get('emp_id').value);
        }
      });
      this._data.getEmpSkillById(this.emp_id_param).subscribe((data:Emp_Skill[])=>{
        if(data[0]!=null){
          for(let i=0;data.length>=1 && i<data.length;i++){
            this.onAddSkillClick();
            //let num_data = this.empExpForm.get('exp_data').value.length;
            let r = this.empSkillForm.get('skill_data') as FormArray;
            let item=r.at(i);
            console.log(item);
            this.temp=data[i].skill;
            item.patchValue({
              emp_id:data[i].emp_id,
              from_date:data[i].skill_cat,
              to_date:data[i].skill,
              company:data[i].skill_level,
              designation:data[i].is_current,
              r_date:data[i].exper,
              nr_date:data[i].remarks
            });
          }
        }else{
          this.empSkillForm.get('emp_id').setValue(this.emp_id_param);
          //console.log(this.empExpForm.get('emp_id').value);
        }
      });

    }
  }


  getControl() {
    return (<FormArray>this.empEduForm.get('emp_educations')).controls;
  }

  //Skills Part Ends

  // Experience Part Start
  getExpControl() {
    return (<FormArray>this.empExpForm.get('exp_data')).controls;
  }

  getExpFormc(form): Array<any> {
    return form.controls.exp_data.controls;
  }
  duplicateExp_from_date(given_date, a): number {
    //let myarr = this.getExpFormc(this.empExpForm);
    var to = new Date(given_date);
    //console.log(to.getFullYear());
    let dp = true;
    let num_data = this.empExpForm.get('exp_data').value.length;

    let r = this.empExpForm.get('exp_data') as FormArray;
    /* console.log(
      moment(to).isBefore(r.at(a).get('from_date').value) ||
        moment(to).isBefore(r.at(a).get('to_date').value)
    ); */
    /* if (
      moment(to).isBefore(r.at(a).get('from_date').value) ||
      moment(to).isBefore(r.at(a).get('to_date').value)
    ) {
      return true;
    } */
    //console.log(moment().isBefore(r.at(a).get('from_date').value));
    if (moment().isBefore(r.at(a).get('from_date').value)) {
      return 1;
    }
    if (
      moment(r.at(a).get('to_date').value).isBefore(
        r.at(a).get('from_date').value
      )
    ) {
      return 2;
    }
    //console.log(num_data);
    if (num_data > 0) {
      for (let index = 0; index < num_data - 1; index++) {
        //let r = this.empExpForm.get('exp_data') as FormArray;
        let item = r.at(index);
        if (
          moment(r.at(a).get('from_date').value).isBetween(
            item.get('from_date').value,
            item.get('to_date').value
          )
        ) {
          return 3;
        }
        if (
          moment(r.at(a).get('from_date').value).isBefore(
            item.get('from_date').value
          )
        ) {
          return 4;
        }
        //console.log(num_data);
        /* if (
          moment().isBefore(r.at(a).get('from_date').value) ||
          moment().isBefore(r.at(a).get('to_date').value)
        ) {
          return true;
        } */
        /* if (
          moment(r.at(a).get('from_date').value).isBetween(
            item.get('to_date').value,
            item.get('from_date').value
          )
        ) {
          //window.alert('Qualification match to ' + (index + 1) + 'Row');
          //this.column = i;
          //dp = false;
          return true;
          //break;
        }
        if (
          moment(r.at(a).get('from_date').value).isSameOrAfter(
            r.at(a).get('to_date').value
          )
        ) {
          return true;
        }
        if (
          moment(r.at(a).get('to_date').value).isSameOrBefore(
            r.at(a).get('from_date').value
          )
        ) {
          return true;
        } */
      }
    }
    if (dp) {
      //alert('No Duplicates.');
    }

    return 0;
  }
  duplicateExp_to_date(given_date, a): number {
    let myarr = this.getExpFormc(this.empExpForm);
    var to = new Date(given_date);

    let dp = true;
    let num_data = this.empExpForm.get('exp_data').value.length;

    let r = this.empExpForm.get('exp_data') as FormArray;
    //console.log(moment(to).isBefore(r.at(a).get('to_date').value));
    //console.log(moment(to).isBefore(r.at(a).get('from_date').value));
    /* if (
      moment(to).isBefore(r.at(a).get('from_date').value) ||
      moment(to).isBefore(r.at(a).get('to_date').value)
    ) {
      return true;
    } */

    if (moment().isBefore(r.at(a).get('to_date').value)) {
      return 1;
    }
    if (
      moment(r.at(a).get('from_date').value).isAfter(
        r.at(a).get('to_date').value
      )
    ) {
      return 2;
    }
    if (
      moment(r.at(a).get('from_date').value).isAfter(
        r.at(a).get('to_date').value
      )
    ) {
      return 0;
    }
    if (num_data > 1) {
      for (let index = 0; index < num_data - 1; index++) {
        //let r = this.empExpForm.get('exp_data') as FormArray;
        let item = r.at(index);
        /* if (
          moment().isBefore(r.at(a).get('to_date').value) ||
          moment().isBefore(r.at(a).get('from_date').value)
        ) {
          return 3;
        } */
        if (
          moment(r.at(a).get('to_date').value).isBetween(
            item.get('from_date').value,
            item.get('to_date').value
          )
        ) {
          return 3;
        }
        if (
          moment(r.at(a).get('to_date').value).isBefore(
            item.get('from_date').value
          )
        ) {
          return 4;
        }
        /* if (
          moment(r.at(a).get('from_date').value).isSameOrAfter(
            r.at(a).get('to_date').value
          )
        ) {
          return 1;
        }
        if (
          moment(r.at(a).get('to_date').value).isSameOrBefore(
            r.at(a).get('from_date').value
          )
        ) {
          return 1;
        } */
      }
    }
    if (dp) {
      //alert('No Duplicates.');
    }

    return 0;
  }
  createExp(): FormGroup {
    return this.formBuilder.group({
      from_date: new FormControl(null, [Validators.required]),
      to_date: new FormControl(null, [Validators.required]),
      company: new FormControl(null, [Validators.required]),
      designation: new FormControl(null, [Validators.required]),
      r_date: new FormControl(null, [Validators.required]),
      nr_date: new FormControl(null, [Validators.required]),
    });
  }
  onAddExpClick() {
    (this.empExpForm.get('exp_data') as FormArray).push(this.createExp());
  }
  onExpCheck(i) {
    let num_data = this.empExpForm.get('exp_data').value.length;
    let r = this.empExpForm.get('exp_data') as FormArray;
    let item=r.at(i);
    if(item.status == 'VALID'){
      if(this.temp==null){
        item.get('emp_id').setValue(this.emp_id_param);
        console.log(this.empExpForm.get('emp_id').value);
      this._data.addEmp_Exp(item.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          alert('Added Successfully');
          //this._router.navigate(['/home/addressadd']);
        } else {
           console.log(x);

        }
      });
    }else{
        this._data.updateExp(this.emp_id_param,item.value).subscribe((x:any)=>{
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

    if (num_data > 0) {
      for (let index = 0; index < num_data - 1; index++) {
        let item = r.at(index);
        if (item.get('company').value == r.at(i).get('company').value) {
          window.alert('Company match to ' + (index + 1) + ' Row');
          //this.column = i;
          break;
        }

      }
    }
  }
  onRemoveExpClick(i) {
    (this.empExpForm.get('exp_data') as FormArray).removeAt(i);
  }

  //Experince Part Ends
  // Skill Part Start
  getSkillControl() {
    return (<FormArray>this.empSkillForm.get('skill_data')).controls;
  }
  createSkill(): FormGroup {
    return this.formBuilder.group({
      skill_cat: new FormControl(null, [Validators.required]),
      skill: new FormControl(null, [Validators.required]),
      skill_level: new FormControl(null, [Validators.required]),
      is_current: new FormControl('no', [Validators.required]),
      exper: new FormControl(null, [Validators.required]),
      remarks: new FormControl(null, [Validators.required]),
    });
  }
  getSkillFormc(form): Array<any> {
    return form.controls.skill_data.controls;
  }
  duplicateSkill(skill, a): boolean {
    let myarr = this.getSkillFormc(this.empSkillForm);
    let text = myarr.filter(
      (data) => data.controls.skill.value == skill && skill != null
    );
    if (text.length > 1) {
      return true;
    }
    return false;
  }
  onAddSkillClick() {
    (this.empSkillForm.get('skill_data') as FormArray).push(this.createSkill());
  }
  onSkillCheck(i) {
    let num_data = this.empSkillForm.get('skill_data').value.length;
    if (num_data > 0) {
      /* for (let index = 0; index < num_data - 1; index++) { */
        let r = this.empSkillForm.get('skill_data') as FormArray;
        let item = r.at(i);

          if(item.status == 'VALID'){
            if(this.temp==null){
              item.get('emp_id').setValue(this.emp_id_param);
              console.log(item.get('emp_id').value);
            this._data.addEmp_Edu(item.value).subscribe((x:any)=>{
              if (x.affectedRows==1) {
                alert('Added Successfully');
                //this._router.navigate(['/home/addressadd']);
              } else {
                 console.log(x);

              }
            });
          }else{
              this._data.updateEdu(this.emp_id_param,item.value).subscribe((x:any)=>{
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
    /* } */
  }

  onRemoveSkillClick(i) {
    (this.empSkillForm.get('skill_data') as FormArray).removeAt(i);

    if (confirm('Are you sure you want to delete?')) {
      //let tArray:Array<string>=['skill','exp','edu','address','bank','personal',''];
      //for(var index in tArray){
        /* this._data.deleteEmpSkill().subscribe((x:any)=>{
          if(x.affectedRows==1){
            console.log(tArray[index]+':Deleted Successfully !');
            this.arrEmpBasic.splice(this.arrEmpBasic.indexOf(item), 1);
          }
        }); */
      //}
      /* this._data.deleteEmp(item.emp_id,'').subscribe((x:any)=>{
      if(x.affectedRows==1){
        alert('Deleted Successfully !');
        this.arrEmpBasic.splice(this.arrEmpBasic.indexOf(item), 1);
      }
    }); */
  }
  }
  //Skills Part Ends
  // Education Part Start
  getEduControl() {
    return (<FormArray>this.empEduForm.get('edu_data')).controls;
  }
  qualification;
  institution;
  passing_year;
  score;
  qua_area;
  createEdu(): FormGroup {
    return this.formBuilder.group({
      qualification: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z] *'),
      ]),
      institution: new FormControl(null, [Validators.required]),
      passing_year: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [Validators.required]),
      qua_area: new FormControl(null, [Validators.required]),
    });
  }

  getEduFormc(form): Array<any> {
    return form.controls.edu_data.controls;
  }
  duplicateEdu(qualification, a): boolean {
    let myarr = this.getEduFormc(this.empEduForm);
    let text = myarr.filter(
      (data) =>
        data.controls.qualification.value == qualification &&
        qualification != null
    );
    if (text.length > 1) {
      return true;
    }
    return false;
  }
  onAddEducationClick() {
    (this.empEduForm.get('edu_data') as FormArray).push(this.createEdu());
  }
  onEduCheck(i) {
    console.log(i);
    let dp = true;
    let num_data = this.empEduForm.get('edu_data').value.length;
    if (num_data > 0) {
      /* for (let index = 0; index < num_data - 1; index++) { */
        let r = this.empEduForm.get('edu_data') as FormArray;
        let item = r.at(i);
        /* if (
          item.get('qualification').value == r.at(i).get('qualification').value
        ) {
          window.alert('Qualification match to ' + (index + 1) + 'Row');
          //this.column = i;
          dp = false;
          break;
        }else{ */


            //console.log(this.empPersonalForm.value);
            if(item.status == 'VALID'){
              if(this.temp==null){
                item.get('emp_id').setValue(this.emp_id_param);
                console.log(item.get('emp_id').value);
              this._data.addEmp_Personal(item.value).subscribe((x:any)=>{
                if (x.affectedRows==1) {
                  alert('Added Successfully');
                  //this._router.navigate(['/home/addressadd']);
                } else {
                   console.log(x);

                }
              });
            }else{
                this._data.updateEdu(this.emp_id_param,item.value).subscribe((x:any)=>{
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

          //item


        /* }} */

    }/*
    if (dp) {
      alert('No Duplicates.');
    } */
  }


  onRemoveEduClick(i) {
    (this.empEduForm.get('edu_data') as FormArray).removeAt(i);
  }
  //Ends

  onComplete() {
    //alert;
  }


  empCreate() {
    //console.log(this.empForm);
  }
  empEduInfo(){

  }
  empExpInfo(){

  }
  empSkillInfo(){

  }
  goBack(){
    this._router.navigate(['/home/bank',this.emp_id_param]);
    //this._router.navigate(['/home/editbasic'],this.emp_id_param);
  }
  goNext(){
    this._router.navigate(['/home']);
    //this._router.navigate(['/home/address'],this.emp_id_param);
  }
}
