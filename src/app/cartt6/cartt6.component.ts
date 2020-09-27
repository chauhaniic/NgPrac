import { Component, OnInit } from '@angular/core';
import { ParentComponent } from '../parent/parent.component';
import { Cart } from './cart';

@Component({
  selector: 'app-cartt6',
  templateUrl: './cartt6.component.html',
  styleUrls: ['./cartt6.component.css'],
})
//extends ParentComponent
export class Cartt6Component implements OnInit {
  constructor() {
    //super();
  }
  tempcart: Cart[];

  ngOnInit(): void {}
  CartEvent(item) {}
  /* onAddCart(pname: string, images: string, price: number) {
    this.tempcart.push(new Cart(pname, images, price));
  } */
}
