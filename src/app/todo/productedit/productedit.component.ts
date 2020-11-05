import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product';
import { TaskDataService } from '../task-data.service';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {
  productForm: FormGroup;
  arrProducts: Product[] = [];
  Id;
  constructor(private _actroute:ActivatedRoute,private _data:TaskDataService,private _router:Router) { }

  ngOnInit(): void {

    this.productForm = new FormGroup({
      id: new FormControl({value:this.Id, disabled: true}, [
        Validators.required,
      ]),
      product_name: new FormControl(null, [Validators.required]),
      product_desc: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-zA-Z0-9 ]*'),
      ]),
      product_price: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9 ]*'),
      ]),
    });
    this.Id=this._actroute.snapshot.params['id'];
    this._data.getProductById(this.Id).subscribe((data: Product[]) => {
      this.productForm.patchValue({
        id:data[0].id,
        product_name:data[0].product_name,
        product_desc:data[0].product_desc,
        product_price:data[0].product_price
      })
    });

  }
  onProductEdit(){
    if (this.productForm.status == 'VALID') {
      this._data.editProduct(this.productForm.value).subscribe((x) => {
        alert('Edited Suuccesfully!');
        this._router.navigate(['/todo']);
      });
    } else {
      alert('Please Complete the Form Correctly!');
    }

  }
  onDelete(){
      this._router.navigate(['/todo']);
    }
}
