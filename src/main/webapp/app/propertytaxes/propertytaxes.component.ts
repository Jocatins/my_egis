import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-propertytaxes',
  templateUrl: './propertytaxes.component.html',
  styleUrls: ['propertytaxes.component.scss']
})
export class PropertytaxesComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'PropertytaxesComponent message';
  }

  ngOnInit(): void {}
}
