import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISurveyTransaction } from 'app/shared/model/survey-transaction.model';

@Component({
  selector: 'jhi-survey-transaction-detail',
  templateUrl: './survey-transaction-detail.component.html'
})
export class SurveyTransactionDetailComponent implements OnInit {
  surveyTransaction: ISurveyTransaction;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ surveyTransaction }) => {
      this.surveyTransaction = surveyTransaction;
    });
  }

  previousState() {
    window.history.back();
  }
}
