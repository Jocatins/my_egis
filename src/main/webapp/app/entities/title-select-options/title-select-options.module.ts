import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { TitleSelectOptionsComponent } from './title-select-options.component';
import { TitleSelectOptionsDetailComponent } from './title-select-options-detail.component';
import { TitleSelectOptionsUpdateComponent } from './title-select-options-update.component';
import { TitleSelectOptionsDeleteDialogComponent } from './title-select-options-delete-dialog.component';
import { titleSelectOptionsRoute } from './title-select-options.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(titleSelectOptionsRoute)],
  declarations: [
    TitleSelectOptionsComponent,
    TitleSelectOptionsDetailComponent,
    TitleSelectOptionsUpdateComponent,
    TitleSelectOptionsDeleteDialogComponent
  ],
  entryComponents: [TitleSelectOptionsDeleteDialogComponent]
})
export class EgisexternalTitleSelectOptionsModule {}
