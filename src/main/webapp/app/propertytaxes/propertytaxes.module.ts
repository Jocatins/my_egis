import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { PROPERTYTAXES_ROUTE, PropertytaxesComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([PROPERTYTAXES_ROUTE], { useHash: true })],
  declarations: [PropertytaxesComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppPropertytaxesModule {}
