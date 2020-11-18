import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Emp_Bank, Emp_Basic } from '../../emp-basic/emp_basic';
import { EmpRecordService } from '../../emp-record.service';

@Component({
  selector: 'app-emp-bank',
  templateUrl: './emp-bank.component.html',
  styleUrls: ['./emp-bank.component.css']
})
export class EmpBankComponent implements OnInit {
  empBankForm:FormGroup;
  emp_id_param;
  temp;
  constructor(
    private _actroute:ActivatedRoute,
    private _router:Router,
    private _data:EmpRecordService
    ) { }

  ngOnInit(): void {
    this.emp_id_param=this._actroute.snapshot.params['id'];
    this.empBankForm = new FormGroup({
      emp_id:new FormControl({value:''},[
        Validators.required
      ]),
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
    if(this.emp_id_param==null){
      this._router.navigate(['/home/addbasic']);
    }else{
        this._data.getEmployeeById(this.emp_id_param).subscribe((x:Emp_Basic[])=>{
          if(x[0]==null){
            this._router.navigate(['/home/addbasic']);
          }
        })
        this.empBankForm.get('emp_id').setValue(this.emp_id_param);
      this._data.getEmpBankById(this.emp_id_param).subscribe((data:Emp_Bank[])=>{
        if(data[0]!=null){
            this.temp=data[0].acc_no;
            this.empBankForm.patchValue({
            emp_id:data[0].emp_id,
            bank_name:data[0].bank_name,
            acc_type:data[0].acc_type,
            acc_no:data[0].acc_no,
            pay_type:data[0].pay_type,
            branch_det:data[0].branch_det,
            ifsc:data[0].ifsc,
            rbank_name:data[0].rbank_name,
            racc_no:data[0].racc_no
          })
        }else{
          this.empBankForm.get('emp_id').setValue(this.emp_id_param);
          console.log(this.empBankForm.get('emp_id').value);
        }


      });
    }
  }
  empBankInfo(){
    console.log(this.empBankForm.value);
    if(this.empBankForm.status == 'VALID'){
      if(this.temp==null){
        this.empBankForm.get('emp_id').setValue(this.emp_id_param);
        console.log(this.empBankForm.get('emp_id').value);
      this._data.addEmp_Bank(this.empBankForm.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          alert('Added Successfully');
          //this._router.navigate(['/home/addressadd']);
        } else {
           console.log(x);

        }
      });
    }else{
        this._data.updateBank(this.emp_id_param,this.empBankForm.value).subscribe((x:any)=>{
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
    console.log(this.emp_id_param);
    this._router.navigate(['/home/address',this.emp_id_param]);
    //this._router.navigate(['/home/address'],this.emp_id_param);
  }
  goNext(){
    console.log(this.emp_id_param);
    this._router.navigate(['/home/exp',this.emp_id_param]);
    //this._router.navigate(['/home/exp'],this.emp_id_param);
  }

}
