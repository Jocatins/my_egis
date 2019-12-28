import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { SupportingDocumentComponent } from './supporting-document.component';
import { SupportingDocumentDetailComponent } from './supporting-document-detail.component';
import { SupportingExtDocumentUpdateComponent } from './supporting-document-update.component';
import { SupportingDocumentDeleteDialogComponent } from './supporting-document-delete-dialog.component';
import { supportingDocumentRoute } from './supporting-document.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(supportingDocumentRoute)],
  declarations: [
    SupportingDocumentComponent,
    SupportingDocumentDetailComponent,
    SupportingExtDocumentUpdateComponent,
    SupportingDocumentDeleteDialogComponent
  ],
  entryComponents: [SupportingDocumentDeleteDialogComponent]
})
export class EgisexternalSupportingDocumentModule {}
