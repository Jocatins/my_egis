import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

import { EgisexternalSharedModule } from 'app/shared/shared.module';

import { HOMEADDONS_ROUTE } from './home-addons.route';
import { HomeAddonsComponent } from './home-addons.component';
import { PropertyTaxLookupComponent } from './property-tax-lookup/property-tax-lookup.component';
import { PropertyTaxesComponent } from './property-taxes/property-taxes.component';
import { OnlineCalculatorComponent } from './online-calculator/online-calculator.component';
import { CertifiedTrueCopyComponent } from './certified-true-copy/certified-true-copy.component';
import { UserRegisterationComponent } from './user-registeration/user-registeration.component';
import { TrackApplicationComponent } from './track-application/track-application.component';
import { YourPropertyComponent } from './your-property/your-property.component';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forRoot([HOMEADDONS_ROUTE], { useHash: true })],

  declarations: [
    HomeAddonsComponent,
    PropertyTaxLookupComponent,
    PropertyTaxesComponent,
    OnlineCalculatorComponent,
    CertifiedTrueCopyComponent,
    UserRegisterationComponent,
    TrackApplicationComponent,
    YourPropertyComponent
  ],
  exports: [
    HomeAddonsComponent,
    PropertyTaxLookupComponent,
    PropertyTaxesComponent,
    OnlineCalculatorComponent,
    CertifiedTrueCopyComponent,
    UserRegisterationComponent,
    TrackApplicationComponent,
    YourPropertyComponent
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EgisexternalHomeAddonsModule {}
