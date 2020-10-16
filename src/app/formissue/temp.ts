import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from '@angular/forms';
//import { format } from 'path';
//import{Qualification,Skill} from './qualification';
@Component({
  selector: 'app-empinfo',
  templateUrl: './temp.html',
})
export class Temp implements OnInit {
  // qualificationform1:FormGroup;
  qualificationform: FormGroup;
  constructor(private fb: FormBuilder) {}
  qualification;
  institute;
  year;
  score;
  qualiarr: Qualification[] = [];
  skillarr: Skill[] = [];
  skillcatogary;
  skill;
  skilllevel;
  iscurrent;
  experience;
  address: string;
  city: string;
  country: string;
  state: string;
  dis: string;
  pin: string;
  flag1: boolean = true;
  flag2: boolean = false;
  flag3: boolean = false;
  basicInfo: FormGroup;
  age: number;
  empInfo: FormGroup;
  ngOnInit(): void {
    this.empInfo = new FormGroup({
      PAddresspermanent: new FormControl(null, [Validators.required]),
      PCity: new FormControl(null, [Validators.required]),
      PCountry: new FormControl(),
      PState: new FormControl(),
      PDistrict: new FormControl(),
      PPin: new FormControl(),
      Addresspermanent: new FormControl(null, [Validators.required]),
      City: new FormControl(null, [Validators.required]),
      Country: new FormControl(),
      State: new FormControl(),
      District: new FormControl(),
      Pin: new FormControl(),
      Phone1: new FormControl(),
      Phone2: new FormControl(),
      Fax: new FormControl(),
      Padd: new FormControl(),
      PersonalEmail: new FormControl(),
      SameAsPresentAddress: new FormControl(),
      BirthPlace: new FormControl(null, [Validators.required]),
      Religion: new FormControl(),
      Caste: new FormControl(),
      Domicile: new FormControl(),
      Nationality: new FormControl(null, [Validators.required]),
      VoterID: new FormControl(),
      PANno: new FormControl(),
      AadharNo: new FormControl(null, [Validators.required]),
      MaritalStatus: new FormControl(),
      NoOfChildren: new FormControl(),
      MarriageDate: new FormControl(),
      SpouseName: new FormControl(),
      BankName: new FormControl(null, [Validators.required]),
      AccountType: new FormControl(),
      PaymentType: new FormControl(null, [Validators.required]),
      AccountNo: new FormControl(null, [Validators.required]),
      BranchDetails: new FormControl(),
      IFSCcode: new FormControl(null, [Validators.required]),
      ReimbursementBankName: new FormControl(),
      ReimbursementAccNo: new FormControl(),
    });

    this.qualificationform = this.fb.group({
      qualification_details: this.fb.array([this.qualificationgroup()]),
      skill_details: this.fb.array([this.skillgroup()]),
      experience_details: this.fb.array([this.experiencegroup()]),
    });
    this.qualificationform.controls[
      'qualification_details'
    ].valueChanges.subscribe((value) => {});
    this.qualificationform.controls[
      'skill_details'
    ].valueChanges.subscribe((value) => {});
    this.qualificationform.controls[
      'experience_details'
    ].valueChanges.subscribe((value) => {});

    this.basicInfo = new FormGroup({
      empNum: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      addAs: new FormControl(),
      fname: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      mname: new FormControl(),
      lname: new FormControl(),
      initials: new FormControl(),
      gender: new FormControl('male'),
      dob: new FormControl(),
      empAge: new FormControl(),
      offPhone: new FormControl(null),
      perMobile: new FormControl(null, [
        Validators.required,
        Validators.min(9),
      ]),
      Fax: new FormControl(),
      OfficialMail: new FormControl(),
      perEmail: new FormControl(null, [Validators.required]),
      perEmail2: new FormControl(),
      perEmail3: new FormControl(),
      Photofile: new FormControl(),
    });
    this.empInfo.get('Padd').valueChanges.subscribe((x) => this.setAddress(x));
    this.basicInfo.get('dob').valueChanges.subscribe((x) => this.setAge(x));
  }
  get qualiarray() {
    return <FormArray>this.qualificationform.get('qualification_details');
  }
  get experiencearray() {
    return <FormArray>this.qualificationform.get('experience_details');
  }
  addqualification() {
    this.qualiarray.push(this.qualificationgroup());
  }
  deletequalification(index) {
    this.qualiarray.removeAt(index);
  }
  addexperience() {
    this.experiencearray.push(this.experiencegroup());
  }
  deleteexperience(index) {
    this.experiencearray.removeAt(index);
  }
  qualificationgroup() {
    return this.fb.group({
      qualification: new FormControl(null, [Validators.required]),
      institute: new FormControl(null, [Validators.required]),
      year: new FormControl(null, [Validators.required]),
      score: new FormControl(null, [Validators.required]),
    });
  }
  experiencegroup() {
    return this.fb.group({
      fromdate: new FormControl(null, [Validators.required]),
      todate: new FormControl(null, [Validators.required]),
      organization: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
    });
  }
  resetexperience() {
    this.experiencearray.reset();
  }
  skillgroup() {
    return this.fb.group({
      skillcatogary: new FormControl(null, [Validators.required]),
      skill: new FormControl(null, [Validators.required]),
      skilllevel: new FormControl(null, [Validators.required]),
      iscurrent: new FormControl(null, [Validators.required]),
      experience: new FormControl(null, [Validators.required]),
    });
  }
  getang(form): Array<any> {
    return form.controls.qualification_details.controls;
  }
  getskill(form): Array<any> {
    return form.controls.skill_details.controls;
  }
  get skillarrr() {
    return <FormArray>this.qualificationform.get('skill_details');
  }
  duplicate(qualification, a): boolean {
    let myarr = this.getang(this.qualificationform);
    let text = myarr.filter(
      (data) =>
        data.controls.qualification.value == qualification &&
        qualification != null
    );
    if (text.length > 1) {
      return true;
    } else {
      return false;
    }
  }
  duplicateskill(skill, a): boolean {
    let myskill = this.getskill(this.qualificationform);
    let textskill = myskill.filter(
      (data) => data.controls.skill.value == skill && skill != null
    );
    if (textskill.length > 1) {
      return true;
    } else {
      return false;
    }
  }

  setAddress(val: boolean) {
    if (val) {
      this.address = this.empInfo.get('PAddresspermanent').value;
      this.city = this.empInfo.get('PCity').value;
      this.country = this.empInfo.get('PCountry').value;
      this.state = this.empInfo.get('PState').value;
      this.dis = this.empInfo.get('PDistrict').value;
      this.pin = this.empInfo.get('PPin').value;
    } else {
      this.address = null;
      this.city = null;
      this.country = null;
      this.state = null;
      this.dis = null;
      this.pin = null;
    }
  }

  onNextClick() {
    this.flag1 = false;
    this.flag2 = true;
    this.flag3 = false;
    console.log(this.basicInfo.value);
  }

  onProceedClick() {
    this.flag1 = false;
    this.flag2 = false;
    this.flag3 = true;
    console.log(this.empInfo.value);
  }
  onBackClick() {
    this.flag1 = true;
    this.flag2 = false;
    this.flag3 = false;
  }
  onPreviousClick() {
    this.flag1 = false;
    this.flag2 = true;
    this.flag3 = false;
  }

  getExperience() {
    return (<FormArray>this.qualificationform.get('user_experience')).controls;
  }
  onAddExperienceClick() {
    const control = new FormControl(null);
    (this.qualificationform.get('user_experience') as FormArray).push(control);
  }
  onAddSkillClick() {
    this.skillarrr.push(this.skillgroup());
  }

  onSubmitClick() {
    alert('Details submitted successfully');
  }
  onDeleteSkillClick(c) {
    this.skillarrr.removeAt(c);
  }
  onEditQualificationClick() {
    this.qualiarray.reset();
  }
  onSaveQualificationClick() {
    alert('Qualifications saved successfully');
  }
  onEditExperienceClick() {
    alert('edit experiences');
  }
  onSaveExperienceClick() {
    alert('Experience saved successfully');
  }

  onEditSkillClick() {
    this.skillarrr.reset();
  }
  onSaveSkillClick() {
    alert('Skills saved successfully');
  }
  setAge(val: Date) {
    var td = new Date();
    var py = td.getFullYear();
    var doby = new Date(val).getFullYear();
    var ans = py - doby;
    console.log(ans);
    this.age = ans;
  }
  onSubmitBasicInfo() {
    console.log(this.basicInfo.value);
  }
}
