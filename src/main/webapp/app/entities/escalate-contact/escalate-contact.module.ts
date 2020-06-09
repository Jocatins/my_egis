import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { EscalateContactComponent } from './escalate-contact.component';
import { EscalateContactDetailComponent } from './escalate-contact-detail.component';
import { EscalateContactUpdateComponent } from './escalate-contact-update.component';
import { EscalateContactDeleteDialogComponent } from './escalate-contact-delete-dialog.component';
import { escalateContactRoute } from './escalate-contact.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(escalateContactRoute)],
  declarations: [
    EscalateContactComponent,
    EscalateContactDetailComponent,
    EscalateContactUpdateComponent,
    EscalateContactDeleteDialogComponent
  ],
  entryComponents: [EscalateContactDeleteDialogComponent]
})
export class EgisexternalEscalateContactModule {}
