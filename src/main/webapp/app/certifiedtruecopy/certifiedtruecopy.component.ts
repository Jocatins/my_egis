import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-certifiedtruecopy',
  templateUrl: './certifiedtruecopy.component.html',
  styleUrls: ['certifiedtruecopy.component.scss']
})
export class CertifiedtruecopyComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'CertifiedtruecopyComponent message';
  }

  ngOnInit(): void {}
}
