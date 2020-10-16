import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formissue',
  templateUrl: './formissue.component.html',
  styleUrls: ['./formissue.component.css'],
})
export class FormissueComponent implements OnInit {
  empExForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.empExForm = new FormGroup({
      edu_data: new FormArray([]),
    });
  }
  empExpInfo() {}
  getEduControl() {
    return (<FormArray>this.empExForm.get('edu_data')).controls;
  }
  myform: FormGroup;
  createEdu(): FormGroup {
    return (this.myform = this.formBuilder.group({
      qualification: [
        null,
        {
          validator: Validators.compose([
            Validators.required,
            Validators.pattern('[a-zA-Z] *'),
          ]),
        },
      ],
      institution: null,
      passing_year: null,
      score: '',
      qua_area: '',
    })); //,this.myform.valueChanges.subscribe((x)=>),
  }

  onAddEducationClick() {
    (this.empExForm.get('edu_data') as FormArray).push(this.createEdu());
  }
  onEduCheck(i) {
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
          break;
        }
      }
    }
  }
  onRemoveEduClick(i) {
    (this.empExForm.get('edu_data') as FormArray).removeAt(i);
  }
}
