import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { UserExtComponent } from './user-ext.component';
import { UserExtDetailComponent } from './user-ext-detail.component';
import { UserExtUpdateComponent } from './user-ext-update.component';
import { UserExtDeleteDialogComponent } from './user-ext-delete-dialog.component';
import { userExtRoute } from './user-ext.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(userExtRoute)],
  declarations: [UserExtComponent, UserExtDetailComponent, UserExtUpdateComponent, UserExtDeleteDialogComponent],
  entryComponents: [UserExtDeleteDialogComponent]
})
export class EgisexternalUserExtModule {}
