import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-yourproperty',
  templateUrl: './yourproperty.component.html',
  styleUrls: ['yourproperty.component.scss']
})
export class YourpropertyComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'YourpropertyComponent message';
  }

  ngOnInit(): void {}
}
