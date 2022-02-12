import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IPaint } from "./canvas-engine.component";

@Component({
  selector: 'canvas-advanced',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasAdvancedComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('canvasRender', { static: true })
  canvasRender!: ElementRef<HTMLCanvasElement>;

  @Input('maxHeight') maxHeight: number = 0;
  @Input('maxWidth') maxWidth: number = 0;

  @Input('originalWidth') originalWidth: number = 0;
  @Input('originalHeight') originalHeight: number = 0;
  @Input('map') map!: IPaint;

  private generatedImage = new Image();
  private generatingImage = false;
  private loadImageProcess: any;

  ngOnInit(): void {
    this.renderPreview();
  }

  ngOnDestroy(): void {
    if (this.loadImageProcess) {
      clearTimeout(this.loadImageProcess);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.loadImageProcess) {
      clearTimeout(this.loadImageProcess);
    }
  }

  public renderPreview() {
    let ctx = this.canvas.nativeElement.getContext('2d');

    if (ctx) {
      this.render(this.canvas.nativeElement, ctx, true);
      this.renderFinalyResult();

      this.generatingImage = true;

      this.loadImageProcess = setTimeout(() => {
        this.generatedImage.src = this.canvasRender.nativeElement?.toDataURL();
        this.generatedImage.onload = () => {
          this.generatingImage = false;
        }
      }, 1000);
    }
  }

  private renderFinalyResult() {
    const canvasRender = this.canvasRender.nativeElement;
    const ctx = canvasRender.getContext('2d');

    if (ctx)
      this.render(canvasRender, ctx, false);
  }

  private render(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, resize: boolean = false) {

    if (resize) {
      var canvasResolution = this.calculateAspectRatioFit(this.originalWidth, this.originalHeight, this.maxWidth, this.maxHeight);
      canvas.width = canvasResolution.width;
      canvas.height = canvasResolution.height;
    } else {
      canvas.width = this.originalWidth;
      canvas.height = this.originalHeight;
    }

    switch (this.map.Type) {
      case "image":
        if (!this.map.Value)
          break;

        const img = new Image();
        img.src = this.map.Value;
        img.crossOrigin = "anonymous";

        img.onload = () => {
          var normalize = {
            widthArea: 0,
            heightArea: 0,
            width: 0,
            height: 0,
            x: 0,
            y: 0
          };

          if (!this.map.Width && !this.map.Height) {
            let temp = this.calculateAspectRatioFit(
              img.width,
              img.height,
              canvas.width,
              canvas.height
            );
            normalize.height = temp.height;
            normalize.width = temp.width;

          } else if (this.map.Width && this.map.Height) {
            normalize.widthArea = this.calculateByNewResolution(this.originalWidth, canvas.width, this.map.Width);
            normalize.heightArea = this.calculateByNewResolution(this.originalHeight, canvas.height, this.map.Height);

            let newImageResolution = this.calculateAspectRatioFit(
              img.width,
              img.height,
              normalize.widthArea,
              normalize.heightArea
            );

            normalize.height = newImageResolution.height;
            normalize.width = newImageResolution.width;

            normalize.x = this.calculateByNewResolution(this.originalWidth, canvas.width, this.map.X);
            normalize.y = this.calculateByNewResolution(this.originalHeight, canvas.height, this.map.Y);

            console.log(normalize);
          }

          if (this.map.X && this.map.Y && this.map.Width && this.map.Height) {
            if (this.map.ForceRenderX) {
              ctx.drawImage(
                img,
                normalize.x,
                (normalize.y + (normalize.heightArea / 2) - (normalize.height / 2)),
                normalize.width,
                normalize.height
              );
            } else {
              ctx.drawImage(
                img,
                (normalize.x + (normalize.widthArea / 2) - (normalize.width / 2)),
                (normalize.y + (normalize.heightArea / 2) - (normalize.height / 2)),
                normalize.width,
                normalize.height
              );
            }

          } else {
            ctx?.drawImage(img, 0, 0, normalize.width, normalize.height);
          }
        };

        break;
      case "text":
        const value = this.map.Value ? this.map.Value : "";

        if (this.map.TextAlign) {
          ctx.textAlign = this.map.TextAlign;
        }

        if (this.map.Font) {
          let size = this.calculateByNewResolution(this.originalWidth, canvas.width, this.map.Font.Size);
          ctx.font = size + "px " + this.map.Font.Family;
        }

        if (this.map.IsStrokeText) {
          if (this.map.Color)
            ctx.strokeStyle = this.map.Color;
          ctx.lineWidth = 2;
          ctx.strokeText(value, this.map.X, this.map.Y);
        } else {
          if (this.map.Color)
            ctx.fillStyle = this.map.Color;

          ctx.fillText(value,
            this.calculateByNewResolution(this.originalWidth, canvas.width, this.map.X),
            this.calculateByNewResolution(this.originalHeight, canvas.height, this.map.Y)
          );

        }
        break;
      default:
        console.warn("Invalid type to render on canvas.");
    }
  }

  calculateAspectRatioFit(srcWidth: number, srcHeight: number, maxWidth: number, maxHeight: number) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  calculateByNewResolution(oldResolution: number, newResolution: number, oldPostion: number) {
    return Math.trunc((oldPostion * newResolution) / oldResolution);
  }

  public async GetImage(): Promise<HTMLImageElement> {
    if (!this.generatingImage && this.generatedImage.complete && this.generatedImage.naturalHeight !== 0) {
      return this.generatedImage;
    }

    return new Promise((resolve) => {
      console.log("NOT LOAD, CREATING IMAGE");
      this.generatingImage = true;

      this.generatedImage.src = this.canvasRender.nativeElement?.toDataURL('image/png', 0.75);

      this.generatedImage.onload = () => {
        this.generatingImage = false;
        resolve(this.generatedImage);
      }
    });
  }
}
