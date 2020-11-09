import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { TRACKAPPLICATION_ROUTE, TrackapplicationComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([TRACKAPPLICATION_ROUTE], { useHash: true })],
  declarations: [TrackapplicationComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppTrackapplicationModule {}
