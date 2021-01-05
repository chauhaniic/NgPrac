import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileServiceService } from './file-service.service';
import { Files } from './file_manage';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-manage',
  templateUrl: './file-manage.component.html',
  styleUrls: ['./file-manage.component.css']
})
export class FileManageComponent implements OnInit {
  FileForm:FormGroup;
  tempV;
  tempName;
  tempType;
  flag:boolean=false;
  arry:Files[]=[];
  apiUrl:string='http://localhost:3000';
  constructor(private _data:FileServiceService,private _http:HttpClient) { }

  ngOnInit(): void {
    this.FileForm = new FormGroup({
      //id: new FormControl(null, [Validators.required]),
      files:new FormControl('', [Validators.required]),/*
      fileName: new FormControl('', [Validators.required]),
      fileType: new FormControl('', [Validators.required]), */
      fileSource:new FormControl('',[Validators.required])
    });
    this._data.getFileDetails().subscribe((data:any)=>{
      this.arry=data;
    })
  }
  uploadedFiles:  File=null  ;
  onFileChange(element){
    this.uploadedFiles = element.target.files[0];
    /*
    //For FormGroup
     if (event.target.files.length > 0) {
      const files = event.target.files[0];
      this.FileForm.patchValue({
        fileSource: files
      });
    } */
    if(this.uploadedFiles){
      this.flag=true;
    }
  }
  fileUp(){
    let formData = new FormData();
    formData.append("upload", this.uploadedFiles, this.uploadedFiles.name)

    /* this._http.post('http://localhost:3000/files', formData)
    .subscribe((response) => {
         console.log('response received is ', response);
    }) */

    this._data.uploadFile(formData).subscribe((x:any)=>{
      if (x.affectedRows==1) {
        //console.log(x);
        alert("File is Uploaded Successfully!");
        //this.arry.push(new Files(this.uploadedFiles.name,this.uploadedFiles.name,this.uploadedFiles.size))
        window.location.reload();
      }else if(x.message){
        alert(x.message);
        //console.log(x.message);
      }

    })
    /*
    //For FormGroup
    const formData = new FormData();
    formData.append('upload',this.FileForm.get('fileSource').value);
    this._data.uploadFile(formData).subscribe((x:any)=>{
      console.log(x)
    }) */
  }

  onDeleteFile(item){
    if (confirm('Are you sure you want to delete?')){
      // console.log(this.apiUrl+item.filePath)
      //this._http.delete(this.apiUrl+item.filePath)
      this._data.deleteFile(this.apiUrl+item.filePath).subscribe((x:any)=>{
        if(x.affectedRows==1){
          //console.log(x);
          alert("File Deleted Successfully");
          this.arry.splice(this.arry.indexOf(item),1);
        }
      })
    }

  }
  /*
    this.tempV=this.FileForm.get('files').value;
    this.tempName=this.tempV.replace("C:\fakepath","");
    console.log(this.tempName);
    this.tempName=this.tempV.substr(12);
    this.tempType=this.tempV.slice((this.tempV.lastIndexOf(".")))
    this.FileForm.patchValue({
      fileName:this.tempName,
      fileType:this.tempType,
    });
    console.log(this.FileForm.value);
    if(this.FileForm.status == 'VALID'){
      this._data.addFiles(this.FileForm.value).subscribe((x:any)=>{
        if (x.affectedRows==1) {
          console.log(x);
        } else {
          if(x.code=='ER_DUP_ENTRY'){
            alert('Duplicate Email')
          }else{
            console.log(x);
          }

        }
      });
    }else{
      alert ('Please Choose a File');
    } */
//}
}
