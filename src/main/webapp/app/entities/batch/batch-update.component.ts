import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { IParty } from 'app/shared/model/party.model';
import { PartyService } from 'app/entities/party/party.service';

@Component({
  selector: 'jhi-batch-update',
  templateUrl: './batch-update.component.html'
})
export class BatchUpdateComponent implements OnInit {
  isSaving: boolean;

  users: IUser[];

  transactions: ITransaction[];

  parties: IParty[];
  createDateDp: any;
  deliveryDateDp: any;

  editForm = this.fb.group({
    id: [],
    batchNumber: [],
    batchStatus: [],
    invoiceNumber: [],
    createDate: [],
    deliveryDate: [],
    officeId: [],
    user: [],
    transactions: [],
    parties: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected batchService: BatchService,
    protected userService: UserService,
    protected transactionService: TransactionService,
    protected partyService: PartyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ batch }) => {
      this.updateForm(batch);
    });
    this.userService
      .query()
      .subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.partyService
      .query()
      .subscribe((res: HttpResponse<IParty[]>) => (this.parties = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(batch: IBatch) {
    this.editForm.patchValue({
      id: batch.id,
      batchNumber: batch.batchNumber,
      batchStatus: batch.batchStatus,
      invoiceNumber: batch.invoiceNumber,
      createDate: batch.createDate,
      deliveryDate: batch.deliveryDate,
      officeId: batch.officeId,
      user: batch.user,
      transactions: batch.transactions,
      parties: batch.parties
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const batch = this.createFromForm();
    if (batch.id !== undefined) {
      this.subscribeToSaveResponse(this.batchService.update(batch));
    } else {
      this.subscribeToSaveResponse(this.batchService.create(batch));
    }
  }

  private createFromForm(): IBatch {
    return {
      ...new Batch(),
      id: this.editForm.get(['id']).value,
      batchNumber: this.editForm.get(['batchNumber']).value,
      batchStatus: this.editForm.get(['batchStatus']).value,
      invoiceNumber: this.editForm.get(['invoiceNumber']).value,
      createDate: this.editForm.get(['createDate']).value,
      deliveryDate: this.editForm.get(['deliveryDate']).value,
      officeId: this.editForm.get(['officeId']).value,
      user: this.editForm.get(['user']).value,
      transactions: this.editForm.get(['transactions']).value,
      parties: this.editForm.get(['parties']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBatch>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }

  trackTransactionById(index: number, item: ITransaction) {
    return item.id;
  }

  trackPartyById(index: number, item: IParty) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
