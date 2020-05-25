import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ITransaction, Transaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';
import { ITransactionExt } from 'app/shared/model/transaction-ext.model';
import { TransactionExtService } from 'app/entities/transaction-ext/transaction-ext.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { IMetadata } from 'app/shared/model/metadata.model';
import { MetadataService } from 'app/entities/metadata/metadata.service';
import { IParty } from 'app/shared/model/party.model';
import { PartyService } from 'app/entities/party/party.service';
import { IParcel } from 'app/shared/model/parcel.model';
import { ParcelService } from 'app/entities/parcel/parcel.service';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from 'app/entities/batch/batch.service';

@Component({
  selector: 'jhi-transaction-update',
  templateUrl: './transaction-update.component.html'
})
export class TransactionUpdateComponent implements OnInit {
  isSaving: boolean;

  exts: ITransactionExt[];

  dictionaries: IDictionary[];

  metadata: IMetadata[];

  parties: IParty[];

  parcels: IParcel[];

  supportingdocuments: ISupportingDocument[];

  batches: IBatch[];
  applicationDateDp: any;
  transactionStartDateDp: any;
  createDateDp: any;
  startDateDp: any;
  completeDateDp: any;

  editForm = this.fb.group({
    id: [],
    transactionNumber: [],
    applicationDate: [],
    transactionStartDate: [],
    comments: [],
    createDate: [],
    startDate: [],
    completeDate: [],
    batchId: [],
    ext: [],
    transactionType: [],
    transactionSubType: [],
    ownershipType: [],
    tenureType: [],
    transactionCode: [],
    parties: [],
    parcels: [],
    docs: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected transactionService: TransactionService,
    protected transactionExtService: TransactionExtService,
    protected dictionaryService: DictionaryService,
    protected metadataService: MetadataService,
    protected partyService: PartyService,
    protected parcelService: ParcelService,
    protected supportingDocumentService: SupportingDocumentService,
    protected batchService: BatchService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transaction }) => {
      this.updateForm(transaction);
    });
    this.transactionExtService.query({ filter: 'transaction-is-null' }).subscribe(
      (res: HttpResponse<ITransactionExt[]>) => {
        if (!this.editForm.get('ext').value || !this.editForm.get('ext').value.id) {
          this.exts = res.body;
        } else {
          this.transactionExtService
            .find(this.editForm.get('ext').value.id)
            .subscribe(
              (subRes: HttpResponse<ITransactionExt>) => (this.exts = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
      (res: HttpErrorResponse) => this.onError(res.message)
    );
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.metadataService
      .query()
      .subscribe((res: HttpResponse<IMetadata[]>) => (this.metadata = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.partyService
      .query()
      .subscribe((res: HttpResponse<IParty[]>) => (this.parties = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.parcelService
      .query()
      .subscribe((res: HttpResponse<IParcel[]>) => (this.parcels = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.supportingDocumentService
      .query()
      .subscribe(
        (res: HttpResponse<ISupportingDocument[]>) => (this.supportingdocuments = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.batchService
      .query()
      .subscribe((res: HttpResponse<IBatch[]>) => (this.batches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(transaction: ITransaction) {
    this.editForm.patchValue({
      id: transaction.id,
      transactionNumber: transaction.transactionNumber,
      applicationDate: transaction.applicationDate,
      transactionStartDate: transaction.transactionStartDate,
      comments: transaction.comments,
      createDate: transaction.createDate,
      startDate: transaction.startDate,
      completeDate: transaction.completeDate,
      batchId: transaction.batchId,
      ext: transaction.ext,
      transactionType: transaction.transactionType,
      transactionSubType: transaction.transactionSubType,
      ownershipType: transaction.ownershipType,
      tenureType: transaction.tenureType,
      transactionCode: transaction.transactionCode,
      parties: transaction.parties,
      parcels: transaction.parcels,
      docs: transaction.docs
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transaction = this.createFromForm();
    if (transaction.id !== undefined) {
      this.subscribeToSaveResponse(this.transactionService.update(transaction));
    } else {
      this.subscribeToSaveResponse(this.transactionService.create(transaction));
    }
  }

  private createFromForm(): ITransaction {
    return {
      ...new Transaction(),
      id: this.editForm.get(['id']).value,
      transactionNumber: this.editForm.get(['transactionNumber']).value,
      applicationDate: this.editForm.get(['applicationDate']).value,
      transactionStartDate: this.editForm.get(['transactionStartDate']).value,
      comments: this.editForm.get(['comments']).value,
      createDate: this.editForm.get(['createDate']).value,
      startDate: this.editForm.get(['startDate']).value,
      completeDate: this.editForm.get(['completeDate']).value,
      batchId: this.editForm.get(['batchId']).value,
      ext: this.editForm.get(['ext']).value,
      transactionType: this.editForm.get(['transactionType']).value,
      transactionSubType: this.editForm.get(['transactionSubType']).value,
      ownershipType: this.editForm.get(['ownershipType']).value,
      tenureType: this.editForm.get(['tenureType']).value,
      transactionCode: this.editForm.get(['transactionCode']).value,
      parties: this.editForm.get(['parties']).value,
      parcels: this.editForm.get(['parcels']).value,
      docs: this.editForm.get(['docs']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaction>>) {
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

  trackTransactionExtById(index: number, item: ITransactionExt) {
    return item.id;
  }

  trackDictionaryById(index: number, item: IDictionary) {
    return item.id;
  }

  trackMetadataById(index: number, item: IMetadata) {
    return item.id;
  }

  trackPartyById(index: number, item: IParty) {
    return item.id;
  }

  trackParcelById(index: number, item: IParcel) {
    return item.id;
  }

  trackSupportingDocumentById(index: number, item: ISupportingDocument) {
    return item.id;
  }

  trackBatchById(index: number, item: IBatch) {
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
