export class Emp_Basic {
  constructor(
    public emp_id: number,
    public f_name: string,
    public m_name: string,
    public l_name: string,
    public gender: string,
    public dob: Date,
    public ophone: string,
    public phone1: string,
    public fax: string,
    public oemail: string,
    public pemail: string,
    public photo: string
  ) {}
}
export class Emp_Personal{
  constructor(
    public emp_id:number,
    public birth_place:string,
    public religion:string,
    public caste:string,
    public domicile:string,
    public nationality:string,
    public voter_id:string,
    public pan_card:string,
    public adhar_card:string,
    public maritual_status:string,
    public children:number,
    public marriage_date:Date,
    public spouse_name:string
  ){}
}
export class Emp_Adrress{
  constructor(
    public emp_id: number,
    public add_line1: string,
    public add_line2: string,
    public add_country: string,
    public add_state: string,
    public add_district: string,
    public add_city: string,
    public add_pincode: string,
    public padd_line1: string,
    public padd_line2: string,
    public padd_country: string,
    public padd_state: string,
    public padd_district: string,
    public padd_city: string,
    public padd_pincode: string
  ){}
}

export class Emp_Bank {
  constructor(
    public emp_id: number,
    public bank_name: string,
    public acc_type: string,
    public acc_no: string,
    public pay_type: string,
    public branch_det: string,
    public ifsc: string,
    public rbank_name: string,
    public racc_no: string
  ) {

  }
}
