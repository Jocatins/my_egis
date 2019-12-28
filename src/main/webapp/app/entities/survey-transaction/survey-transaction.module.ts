import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EgisexternalSharedModule } from 'app/shared/shared.module';
import { SurveyTransactionComponent } from './survey-transaction.component';
import { SurveyTransactionDetailComponent } from './survey-transaction-detail.component';
import { SurveyTransactionUpdateComponent } from './survey-transaction-update.component';
import { SurveyTransactionDeleteDialogComponent } from './survey-transaction-delete-dialog.component';
import { surveyTransactionRoute } from './survey-transaction.route';

@NgModule({
  imports: [EgisexternalSharedModule, RouterModule.forChild(surveyTransactionRoute)],
  declarations: [
    SurveyTransactionComponent,
    SurveyTransactionDetailComponent,
    SurveyTransactionUpdateComponent,
    SurveyTransactionDeleteDialogComponent
  ],
  entryComponents: [SurveyTransactionDeleteDialogComponent]
})
export class EgisexternalSurveyTransactionModule {}
