import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { DocumentRequestComponent } from './document-request.component';
import { DocumentRequestDetailComponent } from './document-request-detail.component';
import { DocumentRequestUpdateComponent } from './document-request-update.component';
import { DocumentRequestDeleteDialogComponent } from './document-request-delete-dialog.component';
import { documentRequestRoute } from './document-request.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(documentRequestRoute)],
  declarations: [
    DocumentRequestComponent,
    DocumentRequestDetailComponent,
    DocumentRequestUpdateComponent,
    DocumentRequestDeleteDialogComponent
  ],
  entryComponents: [DocumentRequestDeleteDialogComponent]
})
export class EgisexternalDocumentRequestModule {}
