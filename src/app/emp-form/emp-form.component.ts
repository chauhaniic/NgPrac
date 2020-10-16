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
import * as moment from 'moment';

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
  age: number = 0;
  today: number = Date.now();
  check_option: boolean = false;
  paddress: boolean = !this.check_option;
  tempa: string;
  dflag: boolean = false;
  lin1: string;
  lin2: string;
  country: string;
  state: string;
  district: string;
  city: string;
  pincode: string;
  mart_status: string;
  constructor(private formBuilder: FormBuilder) {}
  empBasicForm: FormGroup;
  empAddForm: FormGroup;
  empExForm: FormGroup;
  ngOnInit(): void {
    this.empBasicForm = new FormGroup({
      emp_id: new FormControl(null, [Validators.required]),
      emp_title: new FormControl('mr'),
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
      emp_pemail: new FormControl('', [Validators.email]),
      emp_pemail2: new FormControl('', [Validators.email]),
      emp_photo: new FormControl(null, [Validators.required]),
    });
    this.empAddForm = new FormGroup({
      /* postalPart: new FormGroup(
        { */
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
      /* },
        [this.copyValueAdd.bind(this)]
      ), */

      /* permanentPart: new FormGroup({ */
      padd_line1: new FormControl(null, [Validators.required]),
      padd_line2: new FormControl({ value: '', disabled: false }),
      padd_country: new FormControl('India'),
      padd_state: new FormControl('Uttar Pradesh'),
      padd_district: new FormControl('Varanasi'),
      padd_city: new FormControl('Varanasi'),
      padd_pincode: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      /* }), */
      check_Add_Value: new FormControl(false),
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
      children: new FormControl('', [Validators.pattern('[0-9]')]),
      marriage_date: new FormControl(''),
      spouse_name: new FormControl('', [Validators.pattern('[0-9a-zA-Z ]*')]),
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
    /* this.empExForm = new FormGroup({
      //items: this.formBuilder.array([this.createItem()]),
      //user_hobbies: new FormArray([]),

      edu_data: new FormArray([]),
      exp_data: new FormArray([]),
      skill_data: new FormArray([]),
    }); */
    this.empAddForm
      .get('check_Add_Value')
      .valueChanges.subscribe((value) => this.map_Add(value));
    this.empAddForm.get('add_line1').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_line1')
          .setValue(this.empAddForm.get('add_line1').value);
      }
    });
    this.empAddForm.get('add_line2').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_line2')
          .setValue(this.empAddForm.get('add_line2').value);
      }
    });
    this.empAddForm.get('add_country').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_country')
          .setValue(this.empAddForm.get('add_country').value);
      }
    });
    this.empAddForm.get('add_state').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_state')
          .setValue(this.empAddForm.get('add_state').value);
      }
    });
    this.empAddForm.get('add_city').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_city')
          .setValue(this.empAddForm.get('add_city').value);
      }
    });
    this.empAddForm.get('add_district').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_district')
          .setValue(this.empAddForm.get('add_district').value);
      }
    });
    this.empAddForm.get('add_pincode').valueChanges.subscribe((value) => {
      if (value) {
        this.empAddForm
          .get('padd_pincode')
          .setValue(this.empAddForm.get('add_pincode').value);
      }
    });

    this.empExForm = this.formBuilder.group({
      edu_data: this.formBuilder.array([this.createEdu()]),
      skill_data: this.formBuilder.array([this.createSkill()]),
      exp_data: this.formBuilder.array([this.createExp()]),
    });
    this.empExForm.controls['edu_data'].valueChanges.subscribe((value) => {});
    this.empExForm.controls['skill_data'].valueChanges.subscribe((value) => {});
    this.empExForm.controls['exp_data'].valueChanges.subscribe((value) => {});
  }
  map_Add(value: boolean) {
    if (value) {
      this.dflag = true;
      this.empAddForm
        .get('padd_line1')
        .setValue(this.empAddForm.get('add_line1').value);
      this.empAddForm
        .get('padd_line2')
        .setValue(this.empAddForm.get('add_line2').value);
      this.empAddForm
        .get('padd_country')
        .setValue(this.empAddForm.get('add_country').value);
      this.empAddForm
        .get('padd_state')
        .setValue(this.empAddForm.get('add_state').value);
      this.empAddForm
        .get('padd_city')
        .setValue(this.empAddForm.get('add_city').value);
      this.empAddForm
        .get('padd_district')
        .setValue(this.empAddForm.get('add_district').value);
      this.empAddForm
        .get('padd_pincode')
        .setValue(this.empAddForm.get('add_pincode').value);
    } else {
      this.dflag = false;
      this.empAddForm.get('padd_line1').setValue(null);
      this.empAddForm.get('padd_line2').setValue(null);
      this.empAddForm.get('padd_country').setValue(null);
      this.empAddForm.get('padd_state').setValue(null);
      this.empAddForm.get('padd_city').setValue(null);
      this.empAddForm.get('padd_district').setValue(null);
      this.empAddForm.get('padd_pincode').setValue(null);
    }
  }
  mchange() {
    this.mart_status = this.empAddForm.get('maritual_status').value;
  }
  temp: Date;
  calculateAge(control: AbstractControl) {
    let today: Date;
    this.age = moment().diff(control.value, 'years');
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
    console.log(this.empAddForm.value);
    if (this.empAddForm.status == 'VALID') {
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
    /*
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
      //this.pflag = false;
      console.log(this.empAddForm.value);
    } else {
      this.empAddForm.patchValue({
        parmanentPart: {
          padd_line1: null,
          padd_line2: '',
          padd_country: 'india',
          padd_state: '',
          padd_district: '',
          padd_city: '',
        },
      });
      //this.pflag = true;
      console.log(this.empAddForm.value);
    } */
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

  getExpFormc(form): Array<any> {
    return form.controls.exp_data.controls;
  }
  duplicateExp(given_date, a): boolean {
    let myarr = this.getExpFormc(this.empExForm);
    var to = new Date(given_date);

    /*     let text = myarr.filter(
      //moment('2010-10-20').isBetween('2010-10-19', '2010-10-25'); // true
      (data) =>
        data.controls.given_date.value == given_date && given_date != null
    );
    console.log(myarr);
    if (text.length > 1) {
      return true;
    } */
    let dp = true;
    let num_data = this.empExForm.get('exp_data').value.length;

    let r = this.empExForm.get('exp_data') as FormArray;
    console.log(
      moment(to).isBefore(r.at(a).get('from_date').value) ||
        moment(to).isBefore(r.at(a).get('to_date').value)
    );
    /* if (
      moment(to).isBefore(r.at(a).get('from_date').value) ||
      moment(to).isBefore(r.at(a).get('to_date').value)
    ) {
      return true;
    } */

    if (num_data > 0) {
      for (let index = 0; index < num_data - 1; index++) {
        let r = this.empExForm.get('exp_data') as FormArray;
        let item = r.at(index);
        if (
          moment().isBefore(r.at(a).get('from_date').value) ||
          moment().isBefore(r.at(a).get('to_date').value)
        ) {
          return true;
        }
        if (
          moment(r.at(a).get('from_date').value).isBetween(
            item.get('from_date').value,
            item.get('to_date').value
          )
        ) {
          //window.alert('Qualification match to ' + (index + 1) + 'Row');
          //this.column = i;
          //dp = false;
          return true;
          //break;
        }
        if (
          moment(r.at(a).get('to_date').value).isSameOrAfter(
            r.at(a).get('from_date').value
          )
        ) {
          return true;
        }
        if (
          moment(r.at(a).get('from_date').value).isSameOrBefore(
            r.at(a).get('to_date').value
          )
        ) {
          return true;
        }
      }
    }
    if (dp) {
      //alert('No Duplicates.');
    }

    return false;
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
    let myarr = this.getSkillFormc(this.empExForm);
    let text = myarr.filter(
      (data) => data.controls.skill.value == skill && skill != null
    );
    if (text.length > 1) {
      return true;
    }
    return false;
  }
  onAddSkillClick() {
    (this.empExForm.get('skill_data') as FormArray).push(this.createSkill());
  }
  onSkillCheck(i) {
    let num_data = this.empExForm.get('skill_data').value.length;
    if (num_data > 0) {
      for (let index = 0; index < num_data - 1; index++) {
        let r = this.empExForm.get('skill_data') as FormArray;
        let item = r.at(index);
        if (item.get('skill').value == r.at(i).get('skill').value) {
          window.alert('Skill match to ' + (index + 1) + ' Row');
          //this.column = i;
          break;
        }
      }
    }
  }

  onRemoveSkillClick(i) {
    (this.empExForm.get('skill_data') as FormArray).removeAt(i);
  }

  //Skills Part Ends
  // Education Part Start
  getEduControl() {
    return (<FormArray>this.empExForm.get('edu_data')).controls;
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
    let myarr = this.getEduFormc(this.empExForm);
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
    (this.empExForm.get('edu_data') as FormArray).push(this.createEdu());
  }
  onEduCheck(i) {
    let dp = true;
    let num_data = this.empExForm.get('edu_data').value.length;
    if (num_data > 0) {
      for (let index = 0; index < num_data - 1; index++) {
        let r = this.empExForm.get('edu_data') as FormArray;
        let item = r.at(index);
        if (
          item.get('qualification').value == r.at(i).get('qualification').value
        ) {
          window.alert('Qualification match to ' + (index + 1) + 'Row');
          //this.column = i;
          dp = false;
          break;
        }
      }
    }
    if (dp) {
      alert('No Duplicates.');
    }
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
