import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from './supporting-document.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { BatchService } from 'app/entities/batch/batch.service';

@Component({
  selector: 'jhi-supporting-document-update',
  templateUrl: './supporting-document-update.component.html'
})
export class SupportingExtDocumentUpdateComponent implements OnInit {
  isSaving: boolean;

  transactions: ITransaction[];
  dateDp: any;
  selectedFile: File;
  fileName: string;

  editForm = this.fb.group({
    id: [],
    documentNumber: [],
    documentType: [],
    ownershipArea: [],
    documentSubType: [],
    issuedBy: [],
    pageCount: [],
    status: [],
    provided: [],
    type: [],
    name: [],
    fileSize: [],
    content: [],
    contentUrl: [],
    image: [],
    date: []
  });

  batchId: number;
  supportingDocumentId: number;
  newOrEdit: string;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected supportingDocumentService: SupportingDocumentService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    protected batchServcice: BatchService,
    private fb: FormBuilder,
    protected eventManager: JhiEventManager,
    private router: Router
  ) {
    this.batchId = activatedRoute.snapshot.params['batchId'];
    this.newOrEdit = activatedRoute.snapshot.params['newOrEdit'];
  }

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ supportingDoc }) => {
      this.updateForm(supportingDoc);
    });
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(supportingDocument: ISupportingDocument) {
    if (supportingDocument !== undefined) {
      this.editForm.patchValue({
        id: supportingDocument.id,
        documentNumber: supportingDocument.documentNumber,
        documentType: supportingDocument.documentType,
        ownershipArea: supportingDocument.ownershipArea,
        documentSubType: supportingDocument.documentSubType,
        issuedBy: supportingDocument.issuedBy,
        pageCount: supportingDocument.pageCount,
        status: supportingDocument.status,
        provided: supportingDocument.provided,
        type: supportingDocument.type,
        name: supportingDocument.name,
        fileSize: supportingDocument.fileSize,
        content: supportingDocument.content,
        contentUrl: supportingDocument.contentUrl,
        image: supportingDocument.image,
        date: supportingDocument.date
      });
    }
  }

  previousState() {
    this.router.navigate(['/application/translanding', this.batchId]);
    //window.history.back();
  }

  save() {
    this.isSaving = true;
    const supportingDocument = this.createFromForm();
    if (supportingDocument.id !== undefined && supportingDocument.id !== null) {
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
      documentType: this.editForm.get(['documentType']).value,
      ownershipArea: this.editForm.get(['ownershipArea']).value,
      documentSubType: this.editForm.get(['documentSubType']).value,
      issuedBy: this.editForm.get(['issuedBy']).value,
      pageCount: this.editForm.get(['pageCount']).value,
      status: this.editForm.get(['status']).value,
      provided: this.editForm.get(['provided']).value,
      type: this.editForm.get(['type']).value,
      name: this.editForm.get(['name']).value,
      fileSize: this.editForm.get(['fileSize']).value,
      content: this.editForm.get(['content']).value,
      contentUrl: this.editForm.get(['contentUrl']).value,
      image: this.editForm.get(['image']).value,
      date: this.editForm.get(['date']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupportingDocument>>) {
    if (this.newOrEdit === 'new') {
      result.subscribe(
        document => {
          const supDOc = document.body;
          this.batchServcice.find(this.batchId).subscribe(dBatch => {
            const batch = dBatch.body;

            const docs = batch.transactions[0].docs;
            if (docs === null) {
              batch.transactions[0].docs = [];
            }
            batch.transactions[0].docs.push(supDOc);
            this.transactionService.update(batch.transactions[0]).subscribe(() => {
              //alert('Transaction successfully updated ...')
              this.eventManager.broadcast({
                name: 'supportingDocumentListModification',
                content: 'Deleted an supportingDocument'
              });
            });
          });
          this.onSaveSuccess();
        },
        () => this.onSaveError()
      );
    } else {
      result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }
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

  private onUpload(imageFor) {
    const fd = new FormData();
    fd.append('imageFile', this.selectedFile, this.selectedFile.name);
    alert(JSON.stringify(fd));
    // this.http.post('https://localhost:3443/products/upload', fd)
    //   .subscribe(res => imageFor === 'FRONT' ? this.imgFront = res : this.imgBack = res);
  }

  onFileSelected1(event) {
    this.selectedFile = event.target.files[0] as File;

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.editForm.patchValue({
          content: reader.result
        });

        //alert('done')
      };
    }
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    this.onUpload('imageFor');
  }
}
