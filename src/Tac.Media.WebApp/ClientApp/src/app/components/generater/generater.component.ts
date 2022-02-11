import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Maps } from "./maps/export";
import { CanvasEngineComponent, IPaint } from "./components/canvas-engine/canvas-engine.component";
import { FormResultComponent } from "./components/form-result/form-result.component";

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

  @ViewChild(FormResultComponent)
  formResult!: FormResultComponent;

  layers: string[] = [];
  inputs: IPaint[] = [];
  selectedMap: any;
  gameType: string = "CSGO";
  styleType: string = "RESULTADO";
  previewType: string = "INSTAGRAM";
  defaultPreview: { width: number, heigth: number } = {
    width: 0,
    heigth: 0
  }

  ngOnInit(): void {
    this.map();
    this.defaultPreview = {
      width: this.previewDivElement.nativeElement.clientWidth,
      heigth: this.previewDivElement.nativeElement.clientHeight
    }
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.canvasEngine.changeLayer(1, this.selectedMap.Layers["1"][1]);
    // }, 2000);
  }

  @HostListener('window:resize')
  onResize() {
    this.defaultPreview = {
      width: this.previewDivElement.nativeElement.clientWidth,
      heigth: this.previewDivElement.nativeElement.clientHeight
    }

    this.canvasEngine.maxHeight = this.defaultPreview.heigth;
    this.canvasEngine.maxWidth = this.defaultPreview.width;

    this.map();
  }

  map() {
    this.selectedMap = Maps.find(e => {
      return e.Game == this.gameType && e.Style == this.styleType && e.Type == this.previewType
    });

    this.layers = [];
    this.inputs = [];
    let formData = this.getDataFromSelectedForm();
    let action = this.selectedMap.Actions[formData?.Action];

    if (this.selectedMap?.Layers) {
      Object.values(this.selectedMap?.Layers).map(a => {
        if (Array.isArray(a)) {
          this.layers.push(a[this.randomIntFromInterval(0, a.length - 1)]);
        } else {
          this.layers.push(a as string);
        }
      });

      if (action?.Layer) {
        Object.keys(action.Layer).forEach((key) => {
          let temp = action.Layer[key];

          if (Array.isArray(temp)) {
            temp = temp[this.randomIntFromInterval(0, temp.length - 1)];
          }

          this.layers[parseInt(key)] = temp;
        });
      }
    }

    if (this.selectedMap?.Inputs) {
      this.selectedMap?.Inputs.forEach((input: IPaint) => {
        this.inputs.push(input);
      });

      if (formData?.Inputs) {
        Object.keys(formData.Inputs).forEach(key => {
          let objIndex = this.inputs.findIndex((obj => obj.Id == key));

          if (objIndex == -1) {
            return;
          }

          //@ts-ignore
          this.inputs[objIndex].Value = formData.Inputs[key];
        });
      }
    }

    if (this.canvasEngine) {
      this.canvasEngine.layers = this.layers;
      this.canvasEngine.inputs = this.inputs;
      this.canvasEngine.ngOnInit();
    }
  }

  onStyleTypeChange(value: string) {
    this.styleType = value;
    this.map();
  }

  onGameTypeChange(value: string) {
    this.gameType = value;
    this.map();
  }

  invokeAction(actionName: string) {
    let action = this.selectedMap.Actions[actionName];

    if (!action) {
      console.error("Not found action " + actionName);
      return;
    }

    if (action.Layer) {

      Object.keys(action.Layer).forEach((key) => {
        let temp = action.Layer[key];

        if (Array.isArray(temp)) {
          temp = temp[this.randomIntFromInterval(0, temp.length - 1)];
        }

        this.canvasEngine.changeLayer(key, temp);
      });
    }
  }

  onFormChange({ key, value }: { key: string, value: any }) {
    this.canvasEngine.changeInputValue(key, value);
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  getDataFromSelectedForm() {
    return this.formResult?.getAllData();
  }

  public async onDownload() {
    let image = await this.canvasEngine.GetResult();

    var link = document.createElement('a');
    link.download = 'instagram.jpg';
    link.href = image.src;
    link.click();
  }
}
