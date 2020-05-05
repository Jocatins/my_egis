import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from './supporting-document.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';

@Component({
  selector: 'jhi-supporting-document-update',
  templateUrl: './supporting-document-update.component.html'
})
export class SupportingDocumentUpdateComponent implements OnInit {
  isSaving: boolean;

  dictionaries: IDictionary[];

  transactions: ITransaction[];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    documentNumber: [],
    ownershipArea: [],
    pageCount: [],
    status: [],
    provided: [],
    type: [],
    name: [],
    fileSize: [],
    content: [],
    contentUrl: [],
    image: [],
    date: [],
    documentSubType: [],
    documentType: [],
    issuedBy: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected supportingDocumentService: SupportingDocumentService,
    protected dictionaryService: DictionaryService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ supportingDocument }) => {
      this.updateForm(supportingDocument);
    });
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(supportingDocument: ISupportingDocument) {
    this.editForm.patchValue({
      id: supportingDocument.id,
      documentNumber: supportingDocument.documentNumber,
      ownershipArea: supportingDocument.ownershipArea,
      pageCount: supportingDocument.pageCount,
      status: supportingDocument.status,
      provided: supportingDocument.provided,
      type: supportingDocument.type,
      name: supportingDocument.name,
      fileSize: supportingDocument.fileSize,
      content: supportingDocument.content,
      contentUrl: supportingDocument.contentUrl,
      image: supportingDocument.image,
      date: supportingDocument.date,
      documentSubType: supportingDocument.documentSubType,
      documentType: supportingDocument.documentType,
      issuedBy: supportingDocument.issuedBy
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const supportingDocument = this.createFromForm();
    if (supportingDocument.id !== undefined) {
      this.subscribeToSaveResponse(this.supportingDocumentService.update(supportingDocument));
    } else {
      this.subscribeToSaveResponse(this.supportingDocumentService.create(supportingDocument));
    }
  }

  private createFromForm(): ISupportingDocument {
    return {
      ...new SupportingDocument(),
      id: this.editForm.get(['id']).value,
      documentNumber: this.editForm.get(['documentNumber']).value,
      ownershipArea: this.editForm.get(['ownershipArea']).value,
      pageCount: this.editForm.get(['pageCount']).value,
      status: this.editForm.get(['status']).value,
      provided: this.editForm.get(['provided']).value,
      type: this.editForm.get(['type']).value,
      name: this.editForm.get(['name']).value,
      fileSize: this.editForm.get(['fileSize']).value,
      content: this.editForm.get(['content']).value,
      contentUrl: this.editForm.get(['contentUrl']).value,
      image: this.editForm.get(['image']).value,
      date: this.editForm.get(['date']).value,
      documentSubType: this.editForm.get(['documentSubType']).value,
      documentType: this.editForm.get(['documentType']).value,
      issuedBy: this.editForm.get(['issuedBy']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupportingDocument>>) {
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

  trackDictionaryById(index: number, item: IDictionary) {
    return item.id;
  }

  trackTransactionById(index: number, item: ITransaction) {
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
