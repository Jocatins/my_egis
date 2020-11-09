import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { USER_REGISTERATION_ROUTE, UserRegisterationComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([USER_REGISTERATION_ROUTE], { useHash: true })],
  declarations: [UserRegisterationComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppUserRegisterationModule {}
