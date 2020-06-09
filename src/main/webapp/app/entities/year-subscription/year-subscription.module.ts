import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { YearSubscriptionComponent } from './year-subscription.component';
import { YearSubscriptionDetailComponent } from './year-subscription-detail.component';
import { YearSubscriptionUpdateComponent } from './year-subscription-update.component';
import { YearSubscriptionDeleteDialogComponent } from './year-subscription-delete-dialog.component';
import { yearSubscriptionRoute } from './year-subscription.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(yearSubscriptionRoute)],
  declarations: [
    YearSubscriptionComponent,
    YearSubscriptionDetailComponent,
    YearSubscriptionUpdateComponent,
    YearSubscriptionDeleteDialogComponent
  ],
  entryComponents: [YearSubscriptionDeleteDialogComponent]
})
export class EgisexternalYearSubscriptionModule {}
