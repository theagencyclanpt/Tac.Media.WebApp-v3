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
      this.twitterImg.nativeElement.src = "/assets/generated/" + this.previewId + "/twitter.jpeg";
      this.instagramImg.nativeElement.src = "/assets/generated/" + this.previewId + "/instagram.jpeg";

      this.loadProcess = false;
    }
  }

  public async HandlerDownload() {
    var link = document.createElement('a');
    link.download = 'instagram.png';
    link.href = this.instagramImg.nativeElement.src;
    link.click();

    link.download = 'twitter.png';
    link.href = this.twitterImg.nativeElement.src
    link.click();
  }
}
