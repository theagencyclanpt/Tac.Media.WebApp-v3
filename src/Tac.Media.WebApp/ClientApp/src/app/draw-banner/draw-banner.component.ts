import { Component, OnInit, QueryList, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanvasComponent } from '../components/canvas/canvas.component';
import { Configurations } from "./banner-configurations";
import { MatSnackBar } from '@angular/material/snack-bar';

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
  public loadProcess: boolean = true;
  public gameType = "CSGO";
  private canvasLoad = [];
  private formData = {};
  private overrideCanvas = [];
  private _bannerMapped: any;
  public previewSettings = {
    Instagram: {
      Desktop: {
        Width: "400px",
        Height: "704px"
      },
      Mobile: {
        Width: window.innerWidth / 3 + "px",
        Height: window.innerHeight / 3 + "px"
      }
    },
    Twitter: {
      Desktop: {
        Width: "979px",
        Height: "580px"
      },
      Mobile: {
        Width: window.innerWidth + "px",
        Height: window.innerHeight / 3 + "px"
      }
    }
  }

  constructor(private http: HttpClient,
    private _snackBar: MatSnackBar) { }

  public IsMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  private LoadFormData() {
    const _this = this;
    Object.keys(this.formData).forEach((key) => {
      _this.SetFormData({ key: key, value: _this.formData[key] });
    })
  }

  public SetFormData(event) {
    const instagramCanvas = this.instagramCanvas.toArray().find(e => e.map.Id == event.key);
    const twitterCanvas = this.twitterCanvas.toArray().find(e => e.map.Id == event.key);

    this.formData[event.key] = event.value;

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

  public HandlerChangeGameType(event) {
    this.loadProcess = true;
    this.gameType = event;

    this.instagramCanvasMapped = [];
    this.twitterCanvasMapped = [];

    this.MapCanvas();

    this.loadProcess = false;
  }

  private ApplyGameType() {
    Object.assign(this._bannerMapped.Instagram.Layers, this._bannerMapped.Instagram.GameType[this.gameType].Layers);
    Object.assign(this._bannerMapped.Instagram.Overwrite, this._bannerMapped.Instagram.GameType[this.gameType].Overwrite);

    Object.assign(this._bannerMapped.Twitter.Layers, this._bannerMapped.Twitter.GameType[this.gameType].Layers);
    Object.assign(this._bannerMapped.Twitter.Overwrite, this._bannerMapped.Twitter.GameType[this.gameType].Overwrite);
  }

  public ChangeBanerType(type: string) {
    if (type == "result") {
      this.isBannerResult = true;
    } else {
      this.isBannerResult = false;
    }

    this.formData = {};
    this.overrideCanvas = [];
    this._bannerMapped = this.isBannerResult ? Configurations.Result : Configurations.Announcement;
    this.instagramCanvasMapped = [];
    this.twitterCanvasMapped = [];
    this.MapCanvas();
  }

  public LoadOverWrite({ id }) {
    this.overrideCanvas.push(id);
    const twitterOverwrite = this._bannerMapped.Twitter.Overwrite[id];

    if (twitterOverwrite) {

      twitterOverwrite.forEach(overWrite => {
        const twitterCanvas = this.twitterCanvas.toArray().find(e => e.map.Id == overWrite.Id);
        if (twitterCanvas && (!twitterCanvas.override || twitterCanvas.overrideId != id)) {
          twitterCanvas.SetOverride(
            overWrite,
            id
          );
        }
      });
    }

    const instagramOverwrite = this._bannerMapped.Instagram.Overwrite[id];

    if (instagramOverwrite) {
      instagramOverwrite.forEach(overWrite => {
        const instagramCanvas = this.instagramCanvas.toArray().find(e => e.map.Id == overWrite.Id);

        if (instagramCanvas && (!instagramCanvas.override || instagramCanvas.overrideId != id)) {
          instagramCanvas.SetOverride(
            overWrite,
            id
          );
        }
      });
    }
  }

  public UnloadOverwrite({ id }) {
    this.overrideCanvas = this.overrideCanvas.filter(e => e != id);

    const twitterOverwrite = this._bannerMapped.Twitter.Overwrite[id];

    if (twitterOverwrite) {

      twitterOverwrite.forEach(overWrite => {
        const twitterCanvas = this.twitterCanvas.toArray().find(e => e.map.Id == overWrite.Id);

        if (twitterCanvas && (twitterCanvas.override && twitterCanvas.overrideId == id)) {
          twitterCanvas.RemoveOverride();
        }
      });
    }

    const instagramOverwrite = this._bannerMapped.Instagram.Overwrite[id];

    if (instagramOverwrite) {
      instagramOverwrite.forEach(overWrite => {
        const instagramCanvas = this.instagramCanvas.toArray().find(e => e.map.Id == overWrite.Id);

        if (instagramCanvas && (instagramCanvas.override && instagramCanvas.overrideId == id)) {
          instagramCanvas.RemoveOverride();
        }
      });
    }
  }

  public StartLoadCanvas(id) {
    this.canvasLoad.push(id);
    if (this.canvasLoad.length > 0) {
      this.loadProcess = true;
    }
  }

  public EndLoadCanvas(id) {
    this.canvasLoad = this.canvasLoad.filter(function (item) {
      return item !== id
    });

    if (this.canvasLoad.length == 0) {
      this.loadProcess = false;
    }
  }

  public async HandlerDownload() {
    this.loadProcess = true;

    const images = await this.GetImages();

    var link = document.createElement('a');
    link.download = 'instagram.png';
    link.href = images.instagramImage;
    link.click();

    link.download = 'twitter.png';
    link.href = images.twitterImage
    link.click();

    this.loadProcess = false;
  }

  public async HandlerGenerateUrl() {
    this.loadProcess = true;

    const images = await this.GetImages();

    this.http.post("/api/banner/generate-url", {
      InstagramBase64: images.instagramImage.split(',')[1],
      TwitterBase64: images.twitterImage.split(',')[1]
    }).subscribe(async (data) => {
      const url = window.location.host + "/preview?id=" + data["guid"];

      const snackBarRef = this._snackBar.open(url, "Copy");

      this.copyText(url);
      snackBarRef.onAction().subscribe(() => {
        this.copyText(url);
      });

      this.loadProcess = false;
    });
  }

  public async GetImages(): Promise<{ twitterImage: string, instagramImage: string }> {
    this.loadProcess = true;
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

    return {
      twitterImage: twitterImage,
      instagramImage: instagramImage
    }
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

  private copyText(val: string) {
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  private MapCanvas() {
    this.ApplyGameType();

    const instagramPreview = this.IsMobile() ? this.previewSettings.Instagram.Mobile : this.previewSettings.Instagram.Desktop;

    this.LoadLayer({
      Width: this._bannerMapped.Instagram.Width,
      Height: this._bannerMapped.Instagram.Height,
      Preview: instagramPreview,
    }, this._bannerMapped.Instagram.Layers, this.instagramCanvasMapped);

    this._bannerMapped.Instagram.Fields.forEach((field) => {
      this.instagramCanvasMapped.push({
        Id: field.Id,
        Preview: instagramPreview,
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
        Font: field.Font,
        TextAlign: field.TextAlign,
        ForceRenderX: field.ForceRenderX,
        IsStrokeText: field.IsStrokeText,
        Value: field.Value
      });
    });

    const twitterPreview = this.IsMobile() ? this.previewSettings.Twitter.Mobile : this.previewSettings.Twitter.Desktop;

    this.LoadLayer({
      Width: this._bannerMapped.Twitter.Width,
      Height: this._bannerMapped.Twitter.Height,
      Preview: twitterPreview,
    }, this._bannerMapped.Twitter.Layers, this.twitterCanvasMapped);

    this._bannerMapped.Twitter.Fields.forEach((field) => {
      this.twitterCanvasMapped.push({
        Id: field.Id,
        Preview: twitterPreview,
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
        Font: field.Font,
        TextAlign: field.TextAlign,
        ForceRenderX: field.ForceRenderX,
        IsStrokeText: field.IsStrokeText,
        Value: field.Value
      });
    });
  }

  ngOnInit(): void {
    this._bannerMapped = this.isBannerResult ? Configurations.Result : Configurations.Announcement;
    this.ApplyGameType();
    this.MapCanvas();
    this._ctx = this.canvasMain.nativeElement.getContext('2d');
  }

  ngAfterViewInit() {
    this.instagramCanvas.changes.subscribe(t => {
      this.LoadFormData();
    });

    this.twitterCanvas.changes.subscribe(t => {
      this.LoadFormData();
    })
  }
}
