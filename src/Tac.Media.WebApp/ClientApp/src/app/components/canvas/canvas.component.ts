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
        img.onload = function () {
          if (map.Resolution && map.Resolution.Height && map.Resolution.Width) {
            let normalizeHeight = map.Resolution.Height * (img.height / img.width);

            if (override && override.Width && override.Height && override.X && override.Y) {
              normalizeHeight = override.Height * (img.height / img.width);

              ctx.drawImage(img, override.X, (override.Y + (override.Height / 2) - (normalizeHeight / 2)), override.Width, normalizeHeight);
            } else {
              ctx.drawImage(img, map.X, (map.Y + (map.Resolution.Height / 2) - (normalizeHeight / 2)), map.Resolution.Width, normalizeHeight);
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
          ctx.fillStyle = override.Color;
          ctx.font = override.Font;
          ctx.fillText(value, override.X, override.Y);
        } else {
          if (map.TextAlign) {
            ctx.textAlign = map.TextAlign;
          }

          ctx.fillStyle = map.Color;
          ctx.font = map.Font;
          ctx.fillText(value, map.X, map.Y);
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
