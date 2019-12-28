import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITransactionExt, TransactionExt } from 'app/shared/model/transaction-ext.model';
import { TransactionExtService } from './transaction-ext.service';

@Component({
  selector: 'jhi-transaction-ext-update',
  templateUrl: './transaction-ext-update.component.html'
})
export class TransactionExtUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    extensionKey: [],
    extensionValue: []
  });

  constructor(protected transactionExtService: TransactionExtService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transactionExt }) => {
      this.updateForm(transactionExt);
    });
  }

  updateForm(transactionExt: ITransactionExt) {
    this.editForm.patchValue({
      id: transactionExt.id,
      extensionKey: transactionExt.extensionKey,
      extensionValue: transactionExt.extensionValue
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transactionExt = this.createFromForm();
    if (transactionExt.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionExtService.update(transactionExt));
    } else {
      this.subscribeToSaveResponse(this.transactionExtService.create(transactionExt));
    }
  }

  private createFromForm(): ITransactionExt {
    return {
      ...new TransactionExt(),
      id: this.editForm.get(['id']).value,
      extensionKey: this.editForm.get(['extensionKey']).value,
      extensionValue: this.editForm.get(['extensionValue']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransactionExt>>) {
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
