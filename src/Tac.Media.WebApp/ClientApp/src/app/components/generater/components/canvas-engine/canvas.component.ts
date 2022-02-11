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

  @Input('originalWidth') originalWidth: number = 0;
  @Input('originalHeight') originalHeight: number = 0;
  @Input('map') map!: IPaint;

  private ctx!: CanvasRenderingContext2D | null;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.render();
  }

  public render() {
    if (this.ctx && this.map) {
      switch (this.map.Type) {
        case "image":
          const img = new Image();
          img.src = this.map.Value;
          img.crossOrigin = "anonymous";

          img.onload = () => {

            if (!this.map.Width && !this.map.Height) {
              var normalizeSize = this.calculateAspectRatioFit(
                img.width,
                img.height,
                this.maxWidth,
                this.maxHeight
              );

              this.canvas.nativeElement.width = normalizeSize.width;
              this.canvas.nativeElement.height = normalizeSize.height;

              this.ctx?.drawImage(img, 0, 0, normalizeSize.width, normalizeSize.height);
            } else {

            }

            // if (this.map.Resolution && this.map.Resolution.Height && this.map.Resolution.Width) {

            //   // let normalizeSize = this.calculateAspectRatioFit(img.width, img.height, this.map.Resolution.Width, this.map.Resolution.Height);

            // } else {
            //   this.ctx?.drawImage(img, this.map.X, this.map.Y);
            // }
          };

          break;
        case "text":
          const value = this.map.Value ? this.map.Value : "";

          console.log("CANVAS RENDER");

          if (this.map.TextAlign) {
            this.ctx.textAlign = this.map.TextAlign;
          }

          if (this.map.Font)
            this.ctx.font = this.map.Font;

          if (this.map.IsStrokeText) {
            if (this.map.Color)
              this.ctx.strokeStyle = this.map.Color;
            this.ctx.lineWidth = 2;
            this.ctx.strokeText(value, this.map.X, this.map.Y);
          } else {
            if (this.map.Color)
              this.ctx.fillStyle = this.map.Color;

            var canvasResolution = this.calculateAspectRatioFit(this.originalWidth, this.originalHeight, this.maxWidth, this.maxHeight);

            this.canvas.nativeElement.width = canvasResolution.width;
            this.canvas.nativeElement.height = canvasResolution.height;

            this.ctx.fillText(value,
              this.calculateByNewResolution(this.originalWidth, canvasResolution.width, this.map.X),
              this.calculateByNewResolution(this.originalHeight, canvasResolution.height, this.map.Y)
            );

          }
          break;
        default:
          console.warn("Invalid type to render on canvas.");
      }
    }
  }

  public clear() {
    this.ctx?.clearRect(0, 0, this.maxWidth, this.maxHeight);
  }

  calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  calculateByNewResolution(oldResolution: number, newResolution: number, oldPostion: number) {
    return (oldPostion * newResolution) / oldResolution;
  }
}
