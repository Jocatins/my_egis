import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-onlinecalculator',
  templateUrl: './onlinecalculator.component.html',
  styleUrls: ['onlinecalculator.component.scss']
})
export class OnlinecalculatorComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'OnlinecalculatorComponent message';
  }

  ngOnInit(): void {}
}
