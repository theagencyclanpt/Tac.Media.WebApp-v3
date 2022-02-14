import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dialog-download',
  templateUrl: './dialog-download.component.html',
  styleUrls: ['./dialog-download.component.scss']
})
export class DialogDownloadComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      getImage: () => Promise<HTMLImageElement>
    },
  ) { }

  ngOnInit(): void {
    this.data.getImage().then(a => console.log(a))
  }
}
