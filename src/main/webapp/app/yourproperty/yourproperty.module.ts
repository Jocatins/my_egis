import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { YOURPROPERTY_ROUTE, YourpropertyComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([YOURPROPERTY_ROUTE], { useHash: true })],
  declarations: [YourpropertyComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppYourpropertyModule {}
