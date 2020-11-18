import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emp_Adrress, Emp_Basic } from '../../emp-basic/emp_basic';
import { EmpRecordService } from '../../emp-record.service';

@Component({
  selector: 'app-emp-address',
  templateUrl: './emp-address.component.html',
  styleUrls: ['./emp-address.component.css']
})
export class EmpAddressComponent implements OnInit {
  empAddForm:FormGroup;
  emp_id_param;
  temp;
  pflag: boolean = false;
  dflag:string='';
  constructor(private _data:EmpRecordService,private _router:Router,private _actroute:ActivatedRoute) { }

  ngOnInit(): void {
    this.emp_id_param=this._actroute.snapshot.params['id'];
    this.empAddForm=new FormGroup({
      emp_id:new FormControl('',[Validators.required]),
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
    });
    this.empAddForm
      .get('check_Add_Value')
      .valueChanges.subscribe((value) => this.map_Add(value));
    this.empAddForm.get('add_line1').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_line1')
            .setValue(this.empAddForm.get('add_line1').value);
        }
      }
    });
    this.empAddForm.get('add_line2').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_line2')
            .setValue(this.empAddForm.get('add_line2').value);
        }
      }
    });
    this.empAddForm.get('add_country').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_country')
            .setValue(this.empAddForm.get('add_country').value);
        }
      }
    });
    this.empAddForm.get('add_state').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_state')
            .setValue(this.empAddForm.get('add_state').value);
        }
      }
    });
    this.empAddForm.get('add_city').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_city')
            .setValue(this.empAddForm.get('add_city').value);
        }
      }
    });
    this.empAddForm.get('add_district').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_district')
            .setValue(this.empAddForm.get('add_district').value);
        }
      }
    });
    this.empAddForm.get('add_pincode').valueChanges.subscribe((value) => {
      if (value) {
        if (this.pflag) {
          this.empAddForm
            .get('padd_pincode')
            .setValue(this.empAddForm.get('add_pincode').value);
        }
      }
    });

    if(this.emp_id_param==null){
      console.log('NUll emp');
      this._router.navigate(['/home/addbasic']);
    }else{
        this._data.getEmployeeById(this.emp_id_param).subscribe((x:Emp_Basic[])=>{
          if(x[0]==null){
            console.log('NUll emp_id');
            this._router.navigate(['/home/addbasic']);
          }
        });
      this.empAddForm.get('emp_id').setValue(this.emp_id_param);
      this._data.getEmpAddressById(this.emp_id_param).subscribe((data:Emp_Adrress[])=>{
        if(data[0]!=null){
            this.temp=data[0].add_pincode;
            this.empAddForm.patchValue({
            emp_id:data[0].emp_id,
            add_line1:data[0].add_line1,
            add_line2:data[0].add_line2,
            add_country:data[0].add_country,
            add_state:data[0].add_state,
            add_district:data[0].add_district,
            add_city:data[0].add_city,
            add_pincode:data[0].add_pincode,
            padd_line1:data[0].padd_line1,
            padd_line2:data[0].padd_line2,
            padd_country:data[0].padd_country,
            padd_state:data[0].padd_state,
            padd_district:data[0].padd_district,
            padd_city:data[0].padd_city,
            padd_pincode:data[0].padd_pincode,
          })
        }else{
          this.empAddForm.get('emp_id').setValue(this.emp_id_param);
          console.log(this.empAddForm.get('emp_id').value);
        }


      });
    }
  }
  map_Add(value: boolean) {
    if (value) {
      this.pflag = true;
      this.dflag='readonly';
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
      this.pflag = false;
      this.dflag='';
      this.empAddForm.get('padd_line1').setValue(null);
      this.empAddForm.get('padd_line2').setValue(null);
      this.empAddForm.get('padd_country').setValue(null);
      this.empAddForm.get('padd_state').setValue(null);
      this.empAddForm.get('padd_city').setValue(null);
      this.empAddForm.get('padd_district').setValue(null);
      this.empAddForm.get('padd_pincode').setValue(null);
    }
  }
  addAddress(){
    console.log(this.empAddForm.value);
    if(this.empAddForm.status == 'VALID'){
      if(this.temp==null){
        this.empAddForm.get('emp_id').setValue(this.emp_id_param);
        console.log(this.empAddForm.get('emp_id').value);
      this._data.addEmp_Address(this.empAddForm.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          alert('Added Successfully');
          //this._router.navigate(['/home/addressadd']);
        } else {
           console.log(x);

        }
      });
    }else{
        this._data.updateAddress(this.emp_id_param,this.empAddForm.value).subscribe((x:any)=>{
          if (x.affectedRows==1) {
            alert('Updated Successfully');
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
    this._router.navigate(['/home/addpersonal',this.emp_id_param]);
    //this._router.navigate(['/home/addpersonal'],this.emp_id_param);
  }
  goNext(){
    this._router.navigate(['/home/bank',this.emp_id_param]);
    //this._router.navigate(['/home/bank'],this.emp_id_param);
  }

}
