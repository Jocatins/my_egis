import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { CREATE_ACCOUNT_ROUTE, CreateAccountComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([CREATE_ACCOUNT_ROUTE], { useHash: true })],
  declarations: [CreateAccountComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppCreateAccountModule {}
