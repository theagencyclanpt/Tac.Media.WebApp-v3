import { Component, Input, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

export type IPaintType = "image" | "text";

export interface IPaint {
  Id: string,
  Type: IPaintType,
  X: number,
  Y: number,
  Width: number,
  Height: number,
  Value: any,
  Color: string,
  Font: string,
  TextAlign: CanvasTextAlign,
  ForceRenderX: boolean,
  IsStrokeText: boolean,
  Preview: {
    Width: string,
    Height: string,
  },
  Resolution: {
    Width: number,
    Height: number,
  }
}

@Component({
  selector: 'tac-canvas',
  templateUrl: "./canvas.component.html",
  styleUrls: ["./canvas.component.css"]
})
export class CanvasComponent implements OnInit {
  @Input('index') currIndex: number;
  @Input('map') map: IPaint;

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  @Output("startLoad")
  StartLoad = new EventEmitter<any>();

  @Output("endLoad")
  EndLoad = new EventEmitter<any>();

  private ctx: CanvasRenderingContext2D;
  public override: IPaint;
  public overrideId: string;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.RenderByType();
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {
    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
    console.log(ratio);
    return { width: srcWidth * ratio, height: srcHeight * ratio };
  }

  private RenderByType(value = null) {
    const ctx = this.ctx;
    const map = this.map;
    const override = this.override;

    this.Clear();

    if (value) {
      map.Value = value;
    }

    switch (this.map.Type) {
      case "image":
        if (!map.Value) {
          return;
        }
        this.StartLoad.emit(map.Id);
        const endLoad = this.EndLoad;
        const img = new Image();
        img.src = override && override.Value ? override.Value : map.Value;
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (map.Resolution && map.Resolution.Height && map.Resolution.Width) {
            let normalizeSize = this.calculateAspectRatioFit(img.width, img.height, map.Resolution.Width, map.Resolution.Height);

            if (override && override.Width && override.Height && override.X && override.Y) {
              normalizeSize = this.calculateAspectRatioFit(img.width, img.height, override.Width, override.Height);

              if (map.ForceRenderX) {
                ctx.drawImage(img, override.X, (override.Y + (override.Height / 2) - (normalizeSize.height / 2)), normalizeSize.width, normalizeSize.height);
              } else {
                ctx.drawImage(img, (override.X + (override.Width / 2) - (normalizeSize.width / 2)), (override.Y + (override.Height / 2) - (normalizeSize.height / 2)), normalizeSize.width, normalizeSize.height);
              }
            } else {
              if (map.ForceRenderX) {
                ctx.drawImage(img, map.X, (map.Y + (map.Resolution.Height / 2) - (normalizeSize.height / 2)), normalizeSize.width, normalizeSize.height);
              } else {
                ctx.drawImage(img, (map.X + (map.Resolution.Width / 2) - (normalizeSize.width / 2)), (map.Y + (map.Resolution.Height / 2) - (normalizeSize.height / 2)), normalizeSize.width, normalizeSize.height);
              }
            }
          } else {
            ctx.drawImage(img, map.X, map.Y);
          }
          endLoad.emit(map.Id);
        };
        break;

      case "text":
        const value = map.Value ? map.Value : "";

        if (override && override.X && override.Y) {
          ctx.font = override.Font;
          if (map.IsStrokeText) {
            ctx.strokeStyle = override.Color;
            ctx.lineWidth = 2;
            ctx.strokeText(value, override.X, override.Y);
          } else {
            ctx.fillStyle = override.Color;
            ctx.fillText(value, override.X, override.Y);
          }
        } else {
          if (map.TextAlign) {
            ctx.textAlign = map.TextAlign;
          }

          ctx.font = map.Font;

          if (map.IsStrokeText) {
            ctx.strokeStyle = map.Color;
            ctx.lineWidth = 2;
            ctx.strokeText(value, map.X, map.Y);
          } else {
            ctx.fillStyle = map.Color;
            ctx.fillText(value, map.X, map.Y);
          }
        }
        break;

      default:
        console.warn("Invalid type to render on canvas.");
    }
  }

  public SetOverride(value: IPaint, id: string) {
    this.override = value;
    this.overrideId = id;
    this.RenderByType();
  }

  public RemoveOverride() {
    this.override = null;
    this.RenderByType();
  }

  public SetValue({ value }) {
    this.RenderByType(value);
  }

  public Clear() {
    this.ctx.clearRect(0, 0, this.map.Width, this.map.Height);
  }

  public GetImage(): string {
    return this.canvas.nativeElement.toDataURL();
  }
}
