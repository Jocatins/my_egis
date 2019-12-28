import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { ParcelComponent } from './parcel.component';
import { ParcelDetailComponent } from './parcel-detail.component';
import { ParcelExtUpdateComponent } from './parcel-update.component';
import { ParcelDeleteDialogComponent } from './parcel-delete-dialog.component';
import { parcelRoute } from './parcel.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(parcelRoute)],
  declarations: [ParcelComponent, ParcelDetailComponent, ParcelExtUpdateComponent, ParcelDeleteDialogComponent],
  entryComponents: [ParcelDeleteDialogComponent]
})
export class EgisexternalParcelModule {}
