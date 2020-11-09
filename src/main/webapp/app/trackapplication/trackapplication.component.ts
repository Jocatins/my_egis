import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-trackapplication',
  templateUrl: './trackapplication.component.html',
  styleUrls: ['trackapplication.component.scss']
})
export class TrackapplicationComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'TrackapplicationComponent message';
  }

  ngOnInit(): void {}
}
