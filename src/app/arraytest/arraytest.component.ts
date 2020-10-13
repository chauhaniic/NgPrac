import { ThrowStmt } from '@angular/compiler';
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
  selector: 'app-arraytest',
  templateUrl: './arraytest.component.html',
  styleUrls: ['./arraytest.component.css'],
})
export class ArraytestComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  pflag: boolean = true;
  items: FormArray;
  empExForm: FormGroup;

  ngOnInit(): void {
    this.empExForm = new FormGroup({
      //items: this.formBuilder.array([this.createItem()]),
      user_hobbies: new FormArray([]),
      edu_data: new FormArray([], {
        validators: Validators.required,
      }),
      exp_data: new FormArray([]),
      skill_data: new FormArray([]),
    });
    /*     this.testArray = new FormGroup({
      usr_mulinp: new FormArray([]),
      arrForm: new FormGroup({
        addlin1: new FormControl(null, Validators.required),
        paddlin1: new FormControl(null),
      }),
    }); */
  }
  onSignup() {
    console.log(this.empExForm.value);
    console.log(this.empExForm.status);
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      name: '',
      description: '',
      price: '',
    });
  }
  /*   addItem(): void {
    this.items = this.empExForm.get('items') as FormArray;
    this.items.push(this.createItem());
  } */
  getControl() {
    return (<FormArray>this.empExForm.get('user_hobbies')).controls;
  }
  onAddHobbiesClick() {
    if (this.empExForm.get('user_hobbies').value.length < 3) {
      //const control = new FormControl(null);
      (this.empExForm.get('user_hobbies') as FormArray).push(this.createItem());
    } else {
      alert('you can add max 3 hobbies');
    }
  }
  onRemoveHobbiesClick(i) {
    (this.empExForm.get('edu_data') as FormArray).removeAt(i);
  }
  onRemoveEduClick(i) {
    (this.empExForm.get('edu_data') as FormArray).removeAt(i);
  }
  // Experience Part Start
  getExpControl() {
    return (<FormArray>this.empExForm.get('exp_data')).controls;
  }
  createExp(): FormGroup {
    return this.formBuilder.group(
      {
        from_date: '',
        to_date: '',
        company: '',
        designation: '',
        r_date: '',
        nr_date: '',
      },
      Validators.required
    );
  }
  onAddExpClick() {
    //if (this.empExForm.get('exp_data').value.length < 3) {
    //const control = new FormControl(null);
    (this.empExForm.get('exp_data') as FormArray).push(this.createExp());
    /*    } else {
      alert('you can add max 3 hobbies');
    } */
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
    //if (this.empExForm.get('skill_data').value.length < 3) {
    //const control = new FormControl(null);
    (this.empExForm.get('skill_data') as FormArray).push(this.createSkill());
    /*    } else {
      alert('you can add max 3 hobbies');
    } */
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
        //{ validators: Validators.required }
      ],
      institution: '',
      passing_year: '',
      score: '',
      qua_area: '',
    });
  }
  erroroutput: string = '';
  column: number;
  onValidateEduClick(i) {
    let num_data = this.empExForm.get('edu_data').value.length;
    if (num_data > 0) {
      for (let index = 0; index < num_data - 1; index++) {
        let r = this.empExForm.get('edu_data') as FormArray;
        let item = r.at(index);
        if (
          item.get('qualification').value == r.at(i).get('qualification').value
        ) {
          this.erroroutput = 'Qualification match to ' + (index + 1) + 'Row';
          this.column = i;
          break;
        }
        console.log(item.get('institution').value);
        console.log(this.empExForm.status);
      }
    }
  }
  onAddEducationClick() {
    if (this.empExForm.get('edu_data').value.length < 3) {
      //const control = new FormControl(null);
      (this.empExForm.get('edu_data') as FormArray).push(this.createEdu());
    } else {
      alert('you can add max 3 hobbies');
    }
  }
  onRemoveEducationClick(i) {
    (this.empExForm.get('edu_data') as FormArray).removeAt(i);
  }

  //Education Part Ends
}
