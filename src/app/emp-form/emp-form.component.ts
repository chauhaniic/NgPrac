import { DatePipe, formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.css'],
})
export class EmpFormComponent implements OnInit {
  bflag: boolean = true;
  aflag: boolean = false;
  eflag: boolean = false;
  pflag: boolean = true;
  age: Date;
  today: number = Date.now();
  check_option: boolean = false;
  paddress: boolean = !this.check_option;
  tempa: string;
  lin1: string;
  lin2: string;
  country: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  constructor(private formBuilder: FormBuilder) {}
  empBasicForm: FormGroup;
  empAddForm: FormGroup;
  empExForm: FormGroup;
  ngOnInit(): void {
    this.empBasicForm = new FormGroup({
      emp_id: new FormControl(null, [Validators.required]),
      emp_title: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      fname: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      mname: new FormControl(''),
      lname: new FormControl(''),
      gender: new FormControl('male'),
      dob: new FormControl(null, [
        Validators.required,
        this.calculateAge.bind(this),
      ]),
      emp_ophone: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      emp_phone1: new FormControl(''),
      emp_phone2: new FormControl(''),
      emp_fax: new FormControl(''),
      emp_oemail: new FormControl(null, [
        Validators.required,
        Validators.email,
      ]),
      emp_pemail: new FormControl(''),
      emp_pemail2: new FormControl(''),
      emp_photo: new FormControl(null, [Validators.required]),
    });
    this.empAddForm = new FormGroup({
      postalPart: new FormGroup(
        {
          add_line1: new FormControl(null, [Validators.required]),
          add_line2: new FormControl(''),
          add_country: new FormControl('India', [Validators.required]),
          add_state: new FormControl('Uttar Pradesh'),
          add_district: new FormControl('Varanasi'),
          add_city: new FormControl('Varanasi'),
          add_pincode: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(6),
          ]),
        },
        [this.copyValueAdd.bind(this)]
      ),

      permanentPart: new FormGroup({
        padd_line1: new FormControl(null, [Validators.required]),
        padd_line2: new FormControl(''),
        padd_country: new FormControl('India'),
        padd_state: new FormControl('Uttar Pradesh'),
        padd_district: new FormControl('Varanasi'),
        padd_city: new FormControl('Varanasi'),
        padd_pincode: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ]),
      }),
      check_Add_Value: new FormControl(false),
      bank_name: new FormControl(null, [Validators.required]),
      acc_type: new FormControl(null, [Validators.required]),
      acc_no: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9]*'),
      ]),
      pay_type: new FormControl(null, Validators.required),
      branch_det: new FormControl(null, Validators.required),
      ifsc: new FormControl(null, Validators.required),
      rbank_name: new FormControl(null, Validators.required),
      racc_no: new FormControl(null, Validators.required),
    });
    this.empExForm = new FormGroup({
      emp_educations: new FormArray([]),
    });
    this.empExForm = new FormGroup({
      //items: this.formBuilder.array([this.createItem()]),
      //user_hobbies: new FormArray([]),
      edu_data: new FormArray([]),
      exp_data: new FormArray([]),
      skill_data: new FormArray([]),
    });
  }
  temp: Date;
  calculateAge(control: AbstractControl): { [key: number]: boolean } {
    this.age = control.value;
    return null;
    //this.emp_age;
  }
  empBasicDetails() {
    console.log(this.empBasicForm.status);
    console.log(this.empBasicForm);
    if (this.empBasicForm.status == 'VALID') {
      this.bflag = false;
      this.aflag = true;
    } else {
      alert('Fill Required Details !');
    }
  }
  empAddInfo() {
    console.log(this.empAddForm.status);
    if (this.empBasicForm.status == 'VALID') {
      this.aflag = false;
      this.eflag = true;
    } else {
      alert('Fill Required Details !');
    }
  }
  empExpInfo() {
    console.log(this.empExForm.status);
    if (this.empExForm.status == 'VALID') {
      alert('Thank You For Filling These Details.!');
    } else {
      alert('Fill Required Details !');
    }
  }
  empCreate() {
    //console.log(this.empForm);
  }
  check_Add() {
    if (this.empAddForm.get('check_Add_Value').value == true) {
      this.empAddForm.patchValue({
        parmanentPart: {
          padd_line1: this.lin1,
          padd_line2: this.lin2,
          padd_country: this.country,
          padd_state: this.state,
          padd_district: this.district,
          padd_city: this.city,
        },
      });
      this.pflag = false;
      console.log(this.empAddForm.value);
    } else {
      this.empAddForm.patchValue({
        parmanentPart: {
          padd_line1: '',
          padd_line2: '',
          padd_country: '',
          padd_state: '',
          padd_district: '',
          padd_city: '',
        },
      });
      this.pflag = true;
      console.log(this.empAddForm.value);
    }
  }
  copyValueAdd(value: AbstractControl) {
    this.lin1 = value.get('add_line1').value;
    this.lin2 = value.get('add_line2').value;
    this.country = value.get('add_country').value;
    this.state = value.get('add_state').value;
    this.district = value.get('add_district').value;
    this.city = value.get('add_city').value;
    this.pincode = value.get('add_pincode').value;
  }

  getControl() {
    return (<FormArray>this.empExForm.get('emp_educations')).controls;
  }

  //Skills Part Ends

  // Experience Part Start
  getExpControl() {
    return (<FormArray>this.empExForm.get('exp_data')).controls;
  }
  createExp(): FormGroup {
    return this.formBuilder.group({
      from_date: '',
      to_date: '',
      company: '',
      designation: '',
      r_date: '',
      nr_date: '',
    });
  }
  onAddExpClick() {
    (this.empExForm.get('exp_data') as FormArray).push(this.createExp());
  }
  onRemoveExpClick(i) {
    (this.empExForm.get('exp_data') as FormArray).removeAt(i);
  }

  //Experince Part Ends
  // Skill Part Start
  getSkillControl() {
    return (<FormArray>this.empExForm.get('skill_data')).controls;
  }
  createSkill(): FormGroup {
    return this.formBuilder.group({
      skill_cat: '',
      skill: '',
      skill_level: '',
      is_current: '',
      exper: '',
      remarks: '',
    });
  }
  onAddSkillClick() {
    (this.empExForm.get('skill_data') as FormArray).push(this.createSkill());
  }
  onRemoveSkillClick(i) {
    (this.empExForm.get('skill_data') as FormArray).removeAt(i);
  }

  //Skills Part Ends
  // Education Part Start
  getEduControl() {
    return (<FormArray>this.empExForm.get('edu_data')).controls;
  }
  createEdu(): FormGroup {
    return this.formBuilder.group({
      qualification: [
        null,
        {
          validator: Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z] *'),
          ]),
        },
      ],
      institution: '',
      passing_year: '',
      score: '',
      qua_area: '',
    });
  }
  onAddEducationClick() {
    (this.empExForm.get('edu_data') as FormArray).push(this.createEdu());
  }
  onRemoveEduClick(i) {
    (this.empExForm.get('edu_data') as FormArray).removeAt(i);
  }
  //Ends

  onComplete() {
    //alert;
  }

  helloTest() {
    console.log('Hello test');
  }
}
