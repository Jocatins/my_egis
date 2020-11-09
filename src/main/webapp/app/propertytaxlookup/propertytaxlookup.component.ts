import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-propertytaxlookup',
  templateUrl: './propertytaxlookup.component.html',
  styleUrls: ['propertytaxlookup.component.scss']
})
export class PropertytaxlookupComponent implements OnInit {
  message: string;

  constructor() {
    this.message = 'PropertytaxlookupComponent message';
  }

  ngOnInit(): void {}
}
