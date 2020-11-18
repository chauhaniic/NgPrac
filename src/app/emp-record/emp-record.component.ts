import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emp_Basic } from './emp-basic/emp_basic';
import { EmpRecordService } from './emp-record.service';

@Component({
  selector: 'app-emp-record',
  templateUrl: './emp-record.component.html',
  styleUrls: ['./emp-record.component.css']
})
export class EmpRecordComponent implements OnInit {

  arrEmpBasic:Emp_Basic[]=[];
  flag:boolean=false;
  constructor(private _data:EmpRecordService,private router:Router ) { }

  ngOnInit(): void {
    this._data.getAllEmployee().subscribe((data:Emp_Basic[])=>{
      this.arrEmpBasic=data;
    });
    /* this._data.getAllTasks().subscribe((data: Todo[]) => {
      this.arrTodos = data;
    }); */
  }
  res;
  genSession(){
    let length=20;
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    console.log(result);
    this.res=result;
    return result;
  }
  empShow(){
    this.flag?this.flag=false:this.flag=true;
  }
  addEmpButton(){
    this.router.navigate(['/home/addbasic']);
  }
  onDeleteBasic(item:Emp_Basic){
    if (confirm('Are you sure you want to delete? \n It will Delete all Data Regarding this User')) {
      let tArray:Array<string>=['skill','exp','edu','address','bank','personal',''];
      for(var index in tArray){
        this._data.deleteEmp(item.emp_id,tArray[index]).subscribe((x:any)=>{
          if(x.affectedRows==1){
            console.log(tArray[index]+':Deleted Successfully !');
            this.arrEmpBasic.splice(this.arrEmpBasic.indexOf(item), 1);
          }
        });
      }
      /* this._data.deleteEmp(item.emp_id,'').subscribe((x:any)=>{
      if(x.affectedRows==1){
        alert('Deleted Successfully !');
        this.arrEmpBasic.splice(this.arrEmpBasic.indexOf(item), 1);
      }
    }); */
  }
  }
  onUpdateBasic(item:Emp_Basic){
    this.router.navigate(['/home/editbasic',item.emp_id]);
  }

}
