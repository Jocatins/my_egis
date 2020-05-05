import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { DictionaryComponent } from './dictionary.component';
import { DictionaryDetailComponent } from './dictionary-detail.component';
import { DictionaryUpdateComponent } from './dictionary-update.component';
import { DictionaryDeleteDialogComponent } from './dictionary-delete-dialog.component';
import { dictionaryRoute } from './dictionary.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(dictionaryRoute)],
  declarations: [DictionaryComponent, DictionaryDetailComponent, DictionaryUpdateComponent, DictionaryDeleteDialogComponent],
  entryComponents: [DictionaryDeleteDialogComponent]
})
export class EgisexternalDictionaryModule {}
