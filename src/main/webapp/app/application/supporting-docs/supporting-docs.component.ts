import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { BatchService } from '../ext/batch/batch.service';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { MandatoryDocument } from 'app/shared/model/ext/document.model';
import { IEGISDIctionary } from '../model/egisdictionary.model';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportingDocumentDeleteDialogComponent } from '../ext/supporting-document/supporting-document-delete-dialog.component';

@Component({
  selector: 'jhi-trans-detail',
  templateUrl: './supporting-docs.component.html',
  styleUrls: ['supporting-docs.component.scss']
})
export class SupportingDocsComponent implements OnInit {
  batch: IBatch;
  message: string;
  code_: string;
  tab_: string;
  transInfo: TransInfo;
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;
  supportingDocuments: ISupportingDocument[];
  batchId: number;
  mandatoryDocs: MandatoryDocument[];
  documentTypes: IEGISDIctionary[];
  madatorySupportingDocuments: Array<IEGISDIctionary> = [];
  otherSupportingDocuments: IEGISDIctionary[];
  selectedFile: File;
  fileName: string;
  supportingDocument: ISupportingDocument;
  content: any;

  @ViewChild('fileUploader', { static: false }) fileUploader: ElementRef;

  editForm = this.fb.group({
    documentType: [],
    content: [],
    type: [],
    name: [],
    fileSize: []
  });

  constructor(
    protected transactionService: TransactionService,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private dashboardService: DashboardService,
    private supportingDocumentService: SupportingDocumentService,
    private fb: FormBuilder,
    protected modalService: NgbModal,
    protected eventManager: JhiEventManager
  ) {
    this.message = 'SupportingDocsComponent message';
  }

  linkClick() {}

  private createFromForm(): ISupportingDocument {
    return {
      ...new SupportingDocument(),
      documentType: this.editForm.get(['documentType']).value,
      // type: this.editForm.get(['type']).value,
      name: this.editForm.get(['name']).value,
      fileSize: this.editForm.get(['fileSize']).value,
      content: this.editForm.get(['content']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISupportingDocument>>) {
    result.subscribe(
      document => {
        const supDOc = document.body;
        this.batchService.find(this.batchId).subscribe(dBatch => {
          const batch = dBatch.body;

          const docs = batch.transactions[0].docs;
          if (docs === null) {
            batch.transactions[0].docs = [];
          }
          batch.transactions[0].docs.push(supDOc);
          this.transactionService.update(batch.transactions[0]).subscribe(() => {
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
  }

  resetForm() {
    this.editForm.patchValue({
      content: [],
      documentType: []
    });
    this.fileUploader.nativeElement.value = null;
  }

  protected onSaveSuccess() {
    this.resetForm();
    alert('document successfully uploaded');
  }

  protected onSaveError() {
    alert('document fialed to be uploaded');
  }

  save() {
    const supportingDocument = this.createFromForm();
    alert(JSON.stringify(supportingDocument));
    this.subscribeToSaveResponse(this.supportingDocumentService.create(supportingDocument));
  }

  // @SuppDocList
  // code_ and batchId are passed from the calling component
  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.batchId = Number(params.get('batchId'));

    // calls the batch service to set the batch and documenets objects
    // documents list is displayed by the component view page
    this.batchService.find(this.batchId).subscribe(
      data => {
        this.batch = data.body;
        this.refreshDocument(this.batch);

        this.code_ = this.batch.transactions[0].transactionCode;
        this.dashboardService.getMandatorySupportDocs(this.code_).subscribe(data1 => {
          this.mandatoryDocs = data1.body;

          this.dashboardService.fetchDictionaryValuesObj('document_type').subscribe(
            dataDocs => {
              this.documentTypes = JSON.parse(dataDocs.body.category);

              this.mandatoryDocs.forEach(mandatoryDoc => {
                this.documentTypes.forEach(documentType => {
                  if (mandatoryDoc.document_code === documentType.code) {
                    this.madatorySupportingDocuments.push(documentType);
                  }
                });
              });
              this.otherSupportingDocuments = this.documentTypes.filter(x => !this.madatorySupportingDocuments.includes(x));
            },
            err => {}
          );
        });
      },
      () => alert()
    );
  }

  // private createFromForm(): ISupportingDocument {
  //   return {
  //     ...new SupportingDocument(),
  //     id: 2222,
  //     documentType: 333,
  //     type: 222,
  //     name: 'test.pdf',
  //     content: null
  //   };
  // }

  refreshDocument(batch: Batch) {
    this.transactionService.find(batch.transactions[0].id).subscribe(
      data => {
        this.supportingDocuments = data.body.docs;
      },
      () => {
        // alert()
      }
    );
  }

  editNewDocument(newOrEdit: string, batchId: number, documentId: number) {
    const path = '/application/document';
    this.router.navigate([path, batchId, documentId, newOrEdit]);
  }

  onFileSelected1(event) {
    // alert(this.editForm.get(['documentType']).value)

    // this.supportingDocument = this.createFromForm()
    this.selectedFile = event.target.files[0] as File;

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.content = reader.result
        this.editForm.patchValue({
          content: reader.result,
          type: this.selectedFile.type,
          name: this.fileName,
          fileSize: this.selectedFile.size
        });

        this.save();
      };
    }
  }

  onChange(event) {
    this.fileUploader.nativeElement.value = null;
  }

  deleteDoc(supportingDocument: SupportingDocument, batchId: number) {
    const modalRef = this.modalService.open(SupportingDocumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supportingDocument = supportingDocument;
    this.eventManager.subscribe('supportingDocumentListModification', () => {
      this.transactionService.find(this.batch.transactions[0].id).subscribe(
        data => {
          this.supportingDocuments = data.body.docs;

          // this.refreshParty(this.batch.id);
        },
        () => alert()
      );
    });
  }
}

export class TabDisplay {
  constructor(show1: boolean) {}
}
