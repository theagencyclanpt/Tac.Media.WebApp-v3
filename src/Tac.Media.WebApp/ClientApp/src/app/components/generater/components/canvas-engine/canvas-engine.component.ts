import { Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CanvasAdvancedComponent } from "./canvas.component";

export type IPaintType = "image" | "text";

export interface IPaint {
  Id: number,
  Type: IPaintType,
  X: number,
  Y: number,
  Width?: number,
  Height?: number,
  Value?: any,
  Color?: string,
  Font?: string,
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
  @Input('layers') layers: string[] = [];

  @ViewChildren("canvas")
  canvas!: QueryList<CanvasAdvancedComponent>;

  public mappedPaint: IPaint[] = [];

  ngOnInit(): void {
    this.layers.forEach((layer, index) => {
      this.mappedPaint.push({
        Id: index,
        Type: "image",
        Value: layer,
        X: 0,
        Y: 0,
      });
    });

    console.log(this.mappedPaint);
  }

  public changeInputValue(id: number, value: any) {

  }

  public changeLayer(id: number, value: any) {
    let canvas = this.canvas.toArray().find(e => e.map.Id == id);

    if (canvas) {
      canvas.map.Value = value;
      canvas.reRender();
    }
  }
}
