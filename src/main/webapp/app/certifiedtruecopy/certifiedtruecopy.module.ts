import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from '../shared/shared.module';

import { CERTIFIEDTRUECOPY_ROUTE, CertifiedtruecopyComponent } from './';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([CERTIFIEDTRUECOPY_ROUTE], { useHash: true })],
  declarations: [CertifiedtruecopyComponent],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalAppCertifiedtruecopyModule {}
