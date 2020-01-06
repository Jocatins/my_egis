import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'jhi-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: [
    'downloads.component.scss'
  ]
})
export class DownloadsComponent implements OnInit {

  message: string;

  constructor() {
    this.message = 'DownloadsComponent message';
  }

  ngOnInit() {
  }

}
