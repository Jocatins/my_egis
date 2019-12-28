import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISurveyTransaction } from 'app/shared/model/survey-transaction.model';
import { SurveyTransactionService } from './survey-transaction.service';

@Component({
  templateUrl: './survey-transaction-delete-dialog.component.html'
})
export class SurveyTransactionDeleteDialogComponent {
  surveyTransaction: ISurveyTransaction;

  constructor(
    protected surveyTransactionService: SurveyTransactionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.surveyTransactionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'surveyTransactionListModification',
        content: 'Deleted an surveyTransaction'
      });
      this.activeModal.dismiss(true);
    });
  }
}
