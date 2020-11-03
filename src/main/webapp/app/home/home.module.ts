import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
import { PropertyTaxLookupComponent } from './property-tax-lookup/property-tax-lookup.component';
import { PropertyTaxesComponent } from './property-taxes/property-taxes.component';
import { OnlineCalculatorComponent } from './online-calculator/online-calculator.component';
import { CertifiedTrueCopyComponent } from './certified-true-copy/certified-true-copy.component';
import { UserRegisterationComponent } from './user-registeration/user-registeration.component';
import { TrackApplicationComponent } from './track-application/track-application.component';
import { YourPropertyComponent } from './your-property/your-property.component';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [
    HomeComponent,
    PropertyTaxLookupComponent,
    PropertyTaxesComponent,
    OnlineCalculatorComponent,
    CertifiedTrueCopyComponent,
    UserRegisterationComponent,
    TrackApplicationComponent,
    YourPropertyComponent
  ]
})
export class EgisexternalHomeModule {}
