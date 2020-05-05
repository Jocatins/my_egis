import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISurveyTransaction, SurveyTransaction } from 'app/shared/model/survey-transaction.model';
import { SurveyTransactionService } from './survey-transaction.service';

@Component({
  selector: 'jhi-survey-transaction-update',
  templateUrl: './survey-transaction-update.component.html'
})
export class SurveyTransactionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    transCode: [],
    comment: []
  });

  constructor(
    protected surveyTransactionService: SurveyTransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ surveyTransaction }) => {
      this.updateForm(surveyTransaction);
    });
  }

  updateForm(surveyTransaction: ISurveyTransaction) {
    this.editForm.patchValue({
      id: surveyTransaction.id,
      transCode: surveyTransaction.transCode,
      comment: surveyTransaction.comment
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const surveyTransaction = this.createFromForm();
    if (surveyTransaction.id !== undefined) {
      this.subscribeToSaveResponse(this.surveyTransactionService.update(surveyTransaction));
    } else {
      this.subscribeToSaveResponse(this.surveyTransactionService.create(surveyTransaction));
    }
  }

  private createFromForm(): ISurveyTransaction {
    return {
      ...new SurveyTransaction(),
      id: this.editForm.get(['id']).value,
      transCode: this.editForm.get(['transCode']).value,
      comment: this.editForm.get(['comment']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISurveyTransaction>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
