import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { ONLINECALCULATOR_ROUTE, OnlinecalculatorComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([ONLINECALCULATOR_ROUTE], { useHash: true })],
  declarations: [OnlinecalculatorComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppOnlinecalculatorModule {}
