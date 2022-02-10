import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-generater',
  templateUrl: './generater.component.html',
  styleUrls: ['./generater.component.scss']
})
export class GeneraterComponent implements OnInit {

  @ViewChild('previewDiv', { static: true })
  previewDivElement!: ElementRef<HTMLDivElement>;

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  gameType: string = "CSGO";
  styleType: string = "ANUNCIO";

  constructor() { }

  ngOnInit(): void {
    var ctx = this.canvas.nativeElement.getContext('2d');

    this.canvas.nativeElement.onclick = () => {
      this.canvas.nativeElement.classList.add("elementToFadeInAndOut");

      setTimeout(() => {
        this.canvas.nativeElement.classList.remove("elementToFadeInAndOut");
      }, 1000);
    };

    const img = new Image();
    img.src = "assets/twitter.png";
    img.crossOrigin = "anonymous";

    img.onload = () => {

      var result = this.calculateAspectRatioFit(
        img.width,
        img.height,
        this.previewDivElement.nativeElement.clientWidth,
        this.previewDivElement.nativeElement.clientHeight
      );

      this.canvas.nativeElement.width = result.width;
      this.canvas.nativeElement.height = result.height;

      ctx?.drawImage(img, 0, 0, result.width, result.height);
    };
  }

  calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    console.log(ratio);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
}
