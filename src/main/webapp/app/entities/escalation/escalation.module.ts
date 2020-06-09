import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { EscalationComponent } from './escalation.component';
import { EscalationDetailComponent } from './escalation-detail.component';
import { EscalationUpdateComponent } from './escalation-update.component';
import { EscalationDeleteDialogComponent } from './escalation-delete-dialog.component';
import { escalationRoute } from './escalation.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(escalationRoute)],
  declarations: [EscalationComponent, EscalationDetailComponent, EscalationUpdateComponent, EscalationDeleteDialogComponent],
  entryComponents: [EscalationDeleteDialogComponent]
})
export class EgisexternalEscalationModule {}
