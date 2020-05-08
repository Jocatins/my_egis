import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { MetadataComponent } from './metadata.component';
import { MetadataDetailComponent } from './metadata-detail.component';
import { MetadataUpdateComponent } from './metadata-update.component';
import { MetadataDeleteDialogComponent } from './metadata-delete-dialog.component';
import { metadataRoute } from './metadata.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(metadataRoute)],
  declarations: [MetadataComponent, MetadataDetailComponent, MetadataUpdateComponent, MetadataDeleteDialogComponent],
  entryComponents: [MetadataDeleteDialogComponent]
})
export class EgisexternalMetadataModule {}
