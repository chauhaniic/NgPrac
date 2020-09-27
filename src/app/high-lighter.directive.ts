import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[appHighLighter]',
})
export class HighLighterDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    //this.color('black');
    /* elementRef.nativeElement.style.backgroundColor = 'red';
    renderer.setStyle(elementRef.nativeElement, 'backgroundColor', 'green'); */
  }
  @Input() defaultColor: string;

  setBgColor(color: string) {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'backgroundColor',
      color
    );
  }
  OnInit() {
    if (this.defaultColor) {
      this.setBgColor(this.defaultColor);
    } else {
      this.setBgColor('red');
    }
  }
  @HostListener('mouseenter') onMouseEnter() {
    this, this.setBgColor('black');
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.setBgColor('green');
  }

  /*    @HostListener('event',) onmousehover(){

    }
    @HostBinding('style.font-size').fun1(){
      return this.fonts;
} */
}
