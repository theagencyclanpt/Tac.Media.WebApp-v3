import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiClientService } from '@services/client/api-client.service';

@Component({
  selector: 'dialog-download',
  templateUrl: './dialog-download.component.html',
  styleUrls: ['./dialog-download.component.scss']
})
export class DialogDownloadComponent implements OnInit {

  constructor(
    private _api: ApiClientService,
    @Inject(MAT_DIALOG_DATA) public data: {
      getImage: () => Promise<HTMLImageElement>
    },
  ) { }

  ngOnInit(): void {

    // this.data.getImage().then(a => {
    //   let b = a.src;

    //   this._api.Banner.generateUrl({
    //     InstagramBase64: b,
    //     TwitterBase64: b
    //   }).subscribe((data: any) => {
    //     console.log(data);
    //   });
    // })
  }
}
