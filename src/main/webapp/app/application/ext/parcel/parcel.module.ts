import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { ParcelComponent } from './parcel.component';
import { ParcelDetailComponent } from './parcel-detail.component';
import { ParcelUpdateComponent } from './parcel-update.component';
import { ParcelDeleteDialogComponent } from './parcel-delete-dialog.component';
import { parcelRoute } from './parcel.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(parcelRoute)],
  declarations: [ParcelComponent, ParcelDetailComponent, ParcelUpdateComponent, ParcelDeleteDialogComponent],
  entryComponents: [ParcelDeleteDialogComponent]
})
export class EgisexternalParcelModule {}
