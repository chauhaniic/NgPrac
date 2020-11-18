import { FormControl } from '@angular/forms'

export class Emp_Edu {
  constructor(
    public emp_id: number,
    public qualification: string,
    public institution: string,
    public passing_year: string,
    public score: number,
    public qua_area: string,
  ) {}
}

export class Emp_Exp {
  constructor(
    public emp_id: number,
    public from_date: Date,
    public to_date: Date,
    public company: string,
    public designation: string,
    public r_date: Date,
    public nr_date: Date,
  ) {}
}

export class Emp_Skill {
  constructor(
    public emp_id: number,
    public skill_cat: number,
    public skill: string,
    public skill_level: string,
    public is_current: string,
    public exper: string,
    public remarks: string,
  ) {
  }
}
