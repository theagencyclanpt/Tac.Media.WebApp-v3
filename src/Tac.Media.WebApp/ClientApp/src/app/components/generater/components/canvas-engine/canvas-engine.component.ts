import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CanvasAdvancedComponent } from "./canvas.component";

export type IPaintType = "image" | "text";

export interface IPaint {
  Id: string,
  Type: IPaintType,
  X: number,
  Y: number,
  Width?: number,
  Height?: number,
  Value?: any,
  Color?: string,
  Font?: {
    Size: number,
    Family: string
  },
  TextAlign?: CanvasTextAlign,
  ForceRenderX?: boolean,
  IsStrokeText?: boolean,
  Resolution?: {
    Width: number,
    Height: number,
  }
}

@Component({
  selector: 'canvas-engine',
  templateUrl: './canvas-engine.component.html',
  styleUrls: ['./canvas-engine.component.scss']
})
export class CanvasEngineComponent implements OnInit {

  @Input('maxHeight') maxHeight: number = 0;
  @Input('maxWidth') maxWidth: number = 0;

  @Input('originalWidth') originalWidth: number = 0;
  @Input('originalHeight') originalHeight: number = 0;

  @Input('layers') layers: string[] = [];
  @Input('inputs') inputs: IPaint[] = [];

  @ViewChild('canvasRender', { static: true })
  canvasRender!: ElementRef<HTMLCanvasElement>;

  @ViewChildren("canvas")
  canvas!: QueryList<CanvasAdvancedComponent>;

  public mappedPaint: IPaint[] = [];

  ngOnInit(): void {
    this.mappedPaint = [];

    this.layers.forEach((layer, index) => {
      this.mappedPaint.push({
        Id: index.toString(),
        Type: "image",
        Value: layer,
        X: 0,
        Y: 0,
      });
    });

    this.inputs.forEach((input) => {
      this.mappedPaint.push({
        Id: input.Id,
        Type: input.Type,
        Value: input.Value,
        X: input.X,
        Y: input.Y,
        Color: input.Color,
        Font: input.Font,
        ForceRenderX: input.ForceRenderX,
        Height: input.Height,
        Width: input.Width,
        IsStrokeText: input.IsStrokeText,
        TextAlign: input.TextAlign
      });
    });
  }

  public changeInputValue(id: string, value: any) {
    let canvas = this.canvas.toArray().find(e => e.map.Id == id);

    if (canvas) {
      canvas.map.Value = value;
      canvas.renderPreview();
    }
  }

  public changeLayer(id: string, value: any) {
    let canvas = this.canvas.toArray().find(e => e.map.Id == id);

    if (canvas) {
      canvas.map.Value = value;
      canvas.renderPreview();
    }
  }

  public async GetResult(): Promise<HTMLImageElement> {
    const canvasMain = this.canvasRender.nativeElement;
    canvasMain.width = this.originalWidth;
    canvasMain.height = this.originalHeight;
    const ctx = canvasMain.getContext('2d');

    for (let canvas of this.canvas.toArray()) {
      ctx?.drawImage(await canvas.GetImage(), 0, 0);
    }

    let image = new Image();
    image.src = canvasMain?.toDataURL('image/jpeg', 0.75);

    return new Promise((resolve) => {
      image.onload = () => {
        resolve(image);
      }
    });
  }
}
