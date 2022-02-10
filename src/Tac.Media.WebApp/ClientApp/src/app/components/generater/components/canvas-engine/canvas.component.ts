import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IPaint } from "./canvas-engine.component";

@Component({
  selector: 'canvas-advanced',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasAdvancedComponent implements OnInit {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @Input('maxHeight') maxHeight: number = 0;
  @Input('maxWidth') maxWidth: number = 0;
  @Input('map') map!: IPaint;

  ngOnInit(): void {
    var ctx = this.canvas.nativeElement.getContext('2d');

    const img = new Image();
    img.src = this.map.Value;
    img.crossOrigin = "anonymous";

    img.onload = () => {

      var result = this.calculateAspectRatioFit(
        img.width,
        img.height,
        this.maxWidth,
        this.maxHeight
      );

      this.canvas.nativeElement.width = result.width;
      this.canvas.nativeElement.height = result.height;

      ctx?.drawImage(img, 0, 0, result.width, result.height);
    };
  }

  public reRender() {
    var ctx = this.canvas.nativeElement.getContext('2d');

    const img = new Image();
    img.src = this.map.Value;
    img.crossOrigin = "anonymous";

    img.onload = () => {

      var result = this.calculateAspectRatioFit(
        img.width,
        img.height,
        this.maxWidth,
        this.maxHeight
      );

      this.canvas.nativeElement.width = result.width;
      this.canvas.nativeElement.height = result.height;

      ctx?.drawImage(img, 0, 0, result.width, result.height);
    };
  }

  calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }
}
