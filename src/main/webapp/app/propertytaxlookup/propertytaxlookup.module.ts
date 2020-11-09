import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { PROPERTYTAXLOOKUP_ROUTE, PropertytaxlookupComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([PROPERTYTAXLOOKUP_ROUTE], { useHash: true })],
  declarations: [PropertytaxlookupComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppPropertytaxlookupModule {}
