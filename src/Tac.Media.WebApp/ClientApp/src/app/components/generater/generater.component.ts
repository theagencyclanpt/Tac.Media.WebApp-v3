import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Maps } from "./maps/export";
import { CanvasEngineComponent } from "./components/canvas-engine/canvas-engine.component";

@Component({
  selector: 'app-generater',
  templateUrl: './generater.component.html',
  styleUrls: ['./generater.component.scss']
})
export class GeneraterComponent implements OnInit, AfterViewInit {


  @ViewChild('previewDiv', { static: true })
  previewDivElement!: ElementRef<HTMLDivElement>;

  @ViewChild(CanvasEngineComponent)
  canvasEngine!: CanvasEngineComponent;

  gameType: string = "CSGO";
  styleType: string = "RESULTADO";
  previewType: string = "INSTAGRAM";
  defaultPreview: { width: number, heigth: number } = {
    width: 0,
    heigth: 0
  }

  layers: string[] = [];
  selectedMap: any;

  ngOnInit(): void {
    this.selectedMap = Maps.find(e => {
      return e.Game == this.gameType && e.Style == this.styleType && e.Type == this.previewType
    });

    if (this.selectedMap?.Layers) {
      Object.values(this.selectedMap?.Layers).map(a => {
        if (Array.isArray(a)) {
          this.layers.push(a[0]);
        } else {
          this.layers.push(a as string);
        }
      })
    }

    this.defaultPreview = {
      width: this.previewDivElement.nativeElement.clientWidth,
      heigth: this.previewDivElement.nativeElement.clientHeight
    }
  }

  ngAfterViewInit(): void {
    console.log(this.canvasEngine.layers);

    this.canvasEngine.changeLayer(1, this.selectedMap.Layers["1"][1]);

    // this.canvasEngine.layers
  }
}
