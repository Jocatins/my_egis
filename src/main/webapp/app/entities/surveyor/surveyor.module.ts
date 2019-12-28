import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { SurveyorComponent } from './surveyor.component';
import { SurveyorDetailComponent } from './surveyor-detail.component';
import { SurveyorUpdateComponent } from './surveyor-update.component';
import { SurveyorDeleteDialogComponent } from './surveyor-delete-dialog.component';
import { surveyorRoute } from './surveyor.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(surveyorRoute)],
  declarations: [SurveyorComponent, SurveyorDetailComponent, SurveyorUpdateComponent, SurveyorDeleteDialogComponent],
  entryComponents: [SurveyorDeleteDialogComponent]
})
export class EgisexternalSurveyorModule {}
