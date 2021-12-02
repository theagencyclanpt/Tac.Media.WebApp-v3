import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tac-preview',
  templateUrl: "./preview.component.html",
  styleUrls: ["./preview.component.css"]
})
export class PreviewComponent implements OnInit {

  @ViewChild('twitterImg', { static: true })
  twitterImg: ElementRef<HTMLImageElement>;

  @ViewChild('instagramImg', { static: true })
  instagramImg: ElementRef<HTMLImageElement>;


  public loadProcess = true;
  public previewId = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.previewId = params["id"];
    });

    if (!this.previewId) {
      this.loadProcess = false;
    } else {
      this.http.get("/api/banner/preview-by-id?id=" + this.previewId)
        .subscribe(data => {
          if (data) {
            this.twitterImg.nativeElement.src = data["twitterImage"];
            this.twitterImg.nativeElement.crossOrigin = "anonymous";
            this.instagramImg.nativeElement.src = data["instagramImage"];
            this.instagramImg.nativeElement.crossOrigin = "anonymous";

          } else {
            this.previewId = null;
          }

          this.loadProcess = false;
        });
    }
  }
}
