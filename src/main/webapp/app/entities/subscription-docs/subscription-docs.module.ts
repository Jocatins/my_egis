import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { SubscriptionDocsComponent } from './subscription-docs.component';
import { SubscriptionDocsDetailComponent } from './subscription-docs-detail.component';
import { SubscriptionDocsUpdateComponent } from './subscription-docs-update.component';
import { SubscriptionDocsDeleteDialogComponent } from './subscription-docs-delete-dialog.component';
import { subscriptionDocsRoute } from './subscription-docs.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(subscriptionDocsRoute)],
  declarations: [
    SubscriptionDocsComponent,
    SubscriptionDocsDetailComponent,
    SubscriptionDocsUpdateComponent,
    SubscriptionDocsDeleteDialogComponent
  ],
  entryComponents: [SubscriptionDocsDeleteDialogComponent]
})
export class EgisexternalSubscriptionDocsModule {}
