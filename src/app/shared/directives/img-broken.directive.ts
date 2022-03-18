import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @HostListener('error') handleError():void {
    const elNative = this.elHost.nativeElement;
    console.log('Imagen F', this.elHost);
    elNative.src = '../../../assets/images/imagen-default.jpg'
  }
  constructor(private elHost: ElementRef) {
    
   }

}
