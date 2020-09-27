import { Directive, HostBinding, HostListener, Input } from '@angular/core';
import { Cart } from './cartt6/cart';
import { Product } from './parent/product';

@Directive({
  selector: '[appRegDatat6]',
})
export class RegDatat6Directive {
  //tempcart: Cart[];
  constructor() {}
  /* @Input() onAddCart(item: Product) {
    //this.arrEmployees.push(new Employee(this.id, this.name, this.age));
    this.tempcart.push(new Cart(item.pname, item.images, item.price));
    //console.log(this.productcart);
  } */
  @Input() var: number;
  temp: number = 0;
  @HostListener('onclick') onclick() {
    if (this.var == 1) {
    }
  }
  @HostBinding('value') get setFont1() {
    return this.temp;
  }
}
