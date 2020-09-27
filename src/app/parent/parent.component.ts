import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { Cart } from '../cartt6/cart';
import { Product } from './product';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class ParentComponent implements OnInit {
  selectedCategory: string = 'Computer and Electronics ';
  productarr: Product[] = [
    new Product('mouse', 'mouse.png', 699),
    new Product('joystick', 'joys.jpg', 599),
    new Product('dell keyboard', 'dkey.jpg', 999),
    new Product('portable camera', 'pcamera.jpg', 499),
  ];
  productcart: Cart[] = [];
  @Output() cartpass = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onMyEvent(val) {
    //console.log(val, 'from Parent');
    this.productarr = this.productarr.filter((x) => x.pname.startsWith(val));
  }
  onAddCart(item: Product) {
    //this.arrEmployees.push(new Employee(this.id, this.name, this.age));
    this.productcart.push(new Cart(item.pname, item.images, item.price));
    //console.log(this.productcart);
    //this.cartpass.emit(item);
  }
  cflag: boolean = false;
  pflag: boolean = false;
  showCart() {
    this.cflag = true;
    this.pflag = false;
  }
  showParent() {
    this.pflag = true;
    this.cflag = false;
  }
}
