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

  instrumentnumber: number;
  instrunum: number[] = [9328372, 92920283, 938544336, 93735432453, 937382737382];

  titlenumber: number;
  titlenum: number[] = [44334, 44334, 544336, 5432453, 2737382];

  address: string;

  addre: string[] = ['Oyingbo, Lagos', 'Ikorodu, Lagos', 'Alausa, ikeja Lagos', 'Mile-12, Lagos', 'Maryland, Anthony way, Lagos'];

  users: any[] = [
    { name: 'Afolabi Samuel', titlenumber: '44334', instrumentnumber: '9328372', address: 'Oyingbo, Lagos' },
    { name: 'Emmanuel Matthews', titlenumber: '44334', instrumentnumber: '92920283', address: 'Ikorodu, Lagos' },
    { name: 'Titilayo Racheal', titlenumber: '544336', instrumentnumber: '938544336', address: 'Alausa, ikeja Lagos' },
    { name: 'Tolulope Ajayi', titlenumber: '5432453', instrumentnumber: '93735432453', address: 'Mile-12, Lagos' },
    { name: 'Anawana Stephen', titlenumber: '2737382', instrumentnumber: '937382737382', address: 'Maryland, Anthony way, Lagos' }
  ];

  constructor() {
    this.message = 'PropertytaxlookupComponent message';
  }

  ngOnInit(): void {}
}
