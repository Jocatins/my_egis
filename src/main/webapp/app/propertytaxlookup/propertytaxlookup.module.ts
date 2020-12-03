import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { TableFilterPipe } from './table-filter.pipe';
import { EgisexternalSharedModule } from '../shared/shared.module';

import { PROPERTYTAXLOOKUP_ROUTE, PropertytaxlookupComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, BrowserModule, FormsModule, RouterModule.forRoot([PROPERTYTAXLOOKUP_ROUTE], { useHash: true })],
  declarations: [PropertytaxlookupComponent, TableFilterPipe],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppPropertytaxlookupModule {}
