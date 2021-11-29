import { Component, OnInit, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { Configurations } from "./banner-configurations";

@Component({
  selector: 'app-draw-banner-component',
  templateUrl: './draw-banner.component.html',
  styleUrls: ['./draw-banner.component.css'],
})
export class DrawBannerComponent implements OnInit {
  @ViewChildren("instagram")
  instagramCanvas: QueryList<CanvasComponent>

  @ViewChildren("twitter")
  twitterCanvas: QueryList<CanvasComponent>

  @ViewChild('canvasMain', { static: true })
  canvasMain: ElementRef<HTMLCanvasElement>

  private _ctx: CanvasRenderingContext2D;
  public instagramCanvasMapped: Array<any> = [];
  public twitterCanvasMapped: Array<any> = [];
  public isPreviewInstagram = false;
  public isBannerResult: boolean = true;

  private _bannerMapped: any;

  public SetFormData(event) {
    const instagramCanvas = this.instagramCanvas.toArray().find(e => e.map.Id == event.key)
    const twitterCanvas = this.twitterCanvas.toArray().find(e => e.map.Id == event.key)

    if (instagramCanvas) {
      if (event.value) {
        instagramCanvas.SetValue({ value: event.value });
      } else {
        instagramCanvas.Clear();
      }
    }

    if (twitterCanvas) {
      if (event.value) {
        twitterCanvas.SetValue({ value: event.value });
      } else {
        twitterCanvas.Clear();
      }
    }
  }

  public ChangeBanerType(type: string) {
    if (type == "result") {
      this.isBannerResult = true;
    } else {
      this.isBannerResult = false;
    }

    this._bannerMapped = this.isBannerResult ? Configurations.Result : Configurations.Announcement;
    this.instagramCanvasMapped = [];
    this.twitterCanvasMapped = [];
    this.MapCanvas();
  }

  public LoadOverWrite({ id }) {
    const instagramCanvas = this.instagramCanvas.toArray().find(e => e.map.Id == id);
    const twitterCanvas = this.twitterCanvas.toArray().find(e => e.map.Id == id);

    if (instagramCanvas && this._bannerMapped.Instagram.Overwrite[id] && (!instagramCanvas.override || instagramCanvas.override.Id != id)) {
      instagramCanvas.SetOverride(
        this._bannerMapped.Instagram.Overwrite[id]
      );
    }

    if (twitterCanvas && this._bannerMapped.Twitter.Overwrite[id] && (!twitterCanvas.override || twitterCanvas.override.Id != id)) {
      twitterCanvas.SetOverride(
        this._bannerMapped.Twitter.Overwrite[id]
      );
    }
  }

  public UnloadOverwrite({ id }) {
    const instagramCanvas = this.instagramCanvas.toArray().find(e => e.map.Id == id);
    const twitterCanvas = this.twitterCanvas.toArray().find(e => e.map.Id == id);

    if (instagramCanvas && this._bannerMapped.Instagram.Overwrite[id] && (instagramCanvas.override && instagramCanvas.override.Id == id)) {
      instagramCanvas.RemoveOverride();
    }

    if (twitterCanvas && this._bannerMapped.Twitter.Overwrite[id] && (twitterCanvas.override && twitterCanvas.override.Id == id)) {
      twitterCanvas.RemoveOverride();
    }
  }

  public async GetImage(): Promise<void> {
    const ctx = this._ctx;
    const canvasMain = this.canvasMain.nativeElement;
    canvasMain.width = this._bannerMapped.Instagram.Width;
    canvasMain.height = this._bannerMapped.Instagram.Height;

    let canvasElements = this.instagramCanvas.toArray();

    for (const canvas in canvasElements) {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = canvasElements[canvas].GetImage();
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
          resolve(true);
        };
      });
    }

    const instagramImage = canvasMain.toDataURL();

    canvasMain.width = this._bannerMapped.Twitter.Width;
    canvasMain.height = this._bannerMapped.Twitter.Height;

    canvasElements = this.twitterCanvas.toArray();

    for (const canvas in canvasElements) {
      await new Promise((resolve, reject) => {
        const img = new Image();
        img.src = canvasElements[canvas].GetImage();
        img.onload = function () {
          ctx.drawImage(img, 0, 0);
          resolve(true);
        };
      });
    }

    const twitterImage = canvasMain.toDataURL();

    var link = document.createElement('a');
    link.download = 'instagram.png';
    link.href = instagramImage
    link.click();

    link.download = 'twitter.png';
    link.href = twitterImage
    link.click();
  }

  public TooglePreview() {
    this.isPreviewInstagram = !this.isPreviewInstagram;
  }

  private LoadLayer(config, layers, map) {
    Object.keys(layers).forEach((layer) => {
      map.push({
        Id: layer,
        Type: "image",
        Width: config.Width,
        Height: config.Height,
        Preview: {
          Width: config.Preview.Width,
          Height: config.Preview.Height,
        },
        Value: layers[layer],
        X: 0,
        Y: 0
      });
    });
  }

  private MapCanvas() {
    this.LoadLayer({
      Width: this._bannerMapped.Instagram.Width,
      Height: this._bannerMapped.Instagram.Height,
      Preview: {
        Width: this._bannerMapped.Instagram.Preview.Width,
        Height: this._bannerMapped.Instagram.Preview.Height,
      }
    }, this._bannerMapped.Instagram.Layers, this.instagramCanvasMapped);

    this._bannerMapped.Instagram.Fields.forEach((field) => {
      this.instagramCanvasMapped.push({
        Id: field.Id,
        Preview: {
          Width: this._bannerMapped.Instagram.Preview.Width,
          Height: this._bannerMapped.Instagram.Preview.Height,
        },
        Resolution: {
          Width: field.Width,
          Height: field.Height
        },
        Width: this._bannerMapped.Instagram.Width,
        Height: this._bannerMapped.Instagram.Height,
        Type: field.Type,
        X: field.X,
        Y: field.Y,
        Color: field.Color,
        Font: field.Font
      });
    });

    this.LoadLayer({
      Width: this._bannerMapped.Twitter.Width,
      Height: this._bannerMapped.Twitter.Height,
      Preview: {
        Width: this._bannerMapped.Twitter.Preview.Width,
        Height: this._bannerMapped.Twitter.Preview.Height,
      }
    }, this._bannerMapped.Twitter.Layers, this.twitterCanvasMapped);

    this._bannerMapped.Twitter.Fields.forEach((field) => {
      this.twitterCanvasMapped.push({
        Id: field.Id,
        Preview: {
          Width: this._bannerMapped.Twitter.Preview.Width,
          Height: this._bannerMapped.Twitter.Preview.Height,
        },
        Resolution: {
          Width: field.Width,
          Height: field.Height
        },
        Width: this._bannerMapped.Twitter.Width,
        Height: this._bannerMapped.Twitter.Height,
        Type: field.Type,
        X: field.X,
        Y: field.Y,
        Color: field.Color,
        Font: field.Font
      });
    });
  }

  ngOnInit(): void {
    this._bannerMapped = this.isBannerResult ? Configurations.Result : Configurations.Announcement;
    this.MapCanvas();
    this._ctx = this.canvasMain.nativeElement.getContext('2d');
  }
}