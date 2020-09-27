import { Directive, HostListener, Input, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCustomDir]',
})
export class CustomDirDirective {
  b: string = 'green';
  fontSize: string = '45px';
  @Input() c: string;
  constructor() {}
  /*  setBgColor() {}
  setFontSize(fontSize: string) {
    //this.
  } */
  @HostListener('mouseenter') mouseover() {
    this.fontSize = '30px';
  }
  @HostListener('mouseleave') mouseleave() {
    this.fontSize = this.c;
  }
  @HostBinding('style.color') get setColor1() {
    return this.b;
  }
  @HostBinding('style.font-size') get setFont1() {
    return this.fontSize;
  }
}
