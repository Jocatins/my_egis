import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { TableFilterPipe } from './table-filter.pipe';

@Component({
  selector: 'jhi-propertytaxlookup',
  templateUrl: './propertytaxlookup.component.html',
  styleUrls: ['propertytaxlookup.component.scss']
})
export class PropertytaxlookupComponent implements OnInit {
  message: string;

  cities = {};
  titans = {};

  countries = [
    {
      id: 1,
      name: 'Title Number',
      cities: ['545454', '676767', '989898'],
      titans: ['Gypsy', 'Joca', 'Angelo']
    },
    {
      id: 2,
      name: 'Germany',
      cities: ['Hamburg', 'Berlin', 'Munich'],
      titans: ['Philip', 'Joca', 'Angelo']
    },
    {
      id: 3,
      name: 'Italy',
      cities: ['Roma', 'Milan', 'Napoli'],
      titans: ['Gypsy', 'Joca', 'Angelo']
    }
  ];

  constructor() {
    this.message = 'PropertytaxlookupComponent message';
  }

  ngOnInit() {
    this.cities = this.countries.filter(x => x.id == 1)[0].cities;
    this.titans = this.countries.filter(x => x.id == 1)[0].titans;
  }
  onChange(deviceValue) {
    this.cities = this.countries.filter(x => x.id == deviceValue)[0].cities;
    this.titans = this.countries.filter(x => x.id == deviceValue)[0].titans;
  }
}
