import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';

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

  private ctx: CanvasRenderingContext2D;
  public override: IPaint;

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.RenderByType();
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

        const img = new Image();
        img.src = override && override.Value ? override.Value : map.Value;
        img.crossOrigin = "anonymous";
        img.onload = function () {
          if (map.Resolution && map.Resolution.Height && map.Resolution.Width) {
            if (override && override.Width && override.Height && override.X && override.Y) {
              ctx.drawImage(img, override.X, override.Y, override.Width, override.Height);
            } else {
              ctx.drawImage(img, map.X, map.Y, map.Resolution.Width, map.Resolution.Height);
            }
          } else {
            ctx.drawImage(img, map.X, map.Y);
          }
        };
        break;

      case "text":
        const value = map.Value ? map.Value : "";

        if (override && override.X && override.Y) {
          ctx.fillStyle = override.Color;
          ctx.font = override.Font;
          ctx.fillText(value, override.X, override.Y);
        } else {
          ctx.fillStyle = map.Color;
          ctx.font = map.Font;
          ctx.fillText(value, map.X, map.Y);
        }
        break;

      default:
        console.warn("Invalid type to render on canvas.");
    }
  }

  public SetOverride(value: IPaint) {
    this.override = value;
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
