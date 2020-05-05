import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { BatchService } from '../ext/batch-old/batch.service';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { MandatoryDocument } from 'app/shared/model/ext/document.model';
import { IEGISDIctionary } from '../model/egisdictionary.model';
import { SupportingDocumentService } from 'app/entities/supporting-document/supporting-document.service';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupportingDocumentDeleteDialogComponent } from '../ext/supporting-document/supporting-document-delete-dialog.component';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { IDictionary } from 'app/shared/model/dictionary.model';

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
  supportingDocumentsOthers: ISupportingDocument[];
  batchId: number;
  mandatoryDocs: MandatoryDocument[];
  documentTypes: IEGISDIctionary[];
  madatorySupportingDocuments: Array<IEGISDIctionary> = [];
  otherSupportingDocuments: IEGISDIctionary[];
  selectedFile: File;
  fileName: string;
  fileNameOthers: string;
  supportingDocument: ISupportingDocument;
  content: any;
  map = new Map();
  typeOfDoc: string;

  @ViewChild('fileUploader', { static: false }) fileUploader: ElementRef;
  @ViewChild('fileUploaderOthers', { static: false }) fileUploaderOthers: ElementRef;

  editForm = this.fb.group({
    documentType: [],
    content: [],
    type: [],
    name: [],
    fileSize: [],
    provided: []
  });

  editFormOthers = this.fb.group({
    documentType: [],
    content: [],
    type: [],
    name: [],
    fileSize: [],
    provided: []
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
    protected eventManager: JhiEventManager,
    protected dictionaryService: DictionaryService
  ) {
    this.message = 'SupportingDocsComponent message';
  }

  linkClick() {}

  private createFromForm(type: IDictionary): ISupportingDocument {
    if (this.typeOfDoc === 'mandatory') {
      return {
        ...new SupportingDocument(),
        documentType: type,
        // type: this.editForm.get(['type']).value,
        name: this.editForm.get(['name']).value,
        fileSize: this.editForm.get(['fileSize']).value,
        content: this.editForm.get(['content']).value,
        provided: this.editForm.get(['provided']).value
      };
    } else {
      return {
        ...new SupportingDocument(),
        documentType: type,
        // type: this.editForm.get(['type']).value,
        name: this.editFormOthers.get(['name']).value,
        fileSize: this.editFormOthers.get(['fileSize']).value,
        content: this.editFormOthers.get(['content']).value,
        provided: this.editFormOthers.get(['provided']).value
      };
    }
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
              content: 'Added an supportingDocument'
            });
            this.refreshDocument(this.batch);
          });
        });

        this.onSaveSuccess();
      },
      () => this.onSaveError()
    );
  }

  resetForm() {
    if (this.typeOfDoc === 'mandatory') {
      this.editForm.patchValue({
        content: null,
        documentType: null
      });
      this.fileUploader.nativeElement.value = null;
    } else {
      this.editFormOthers.patchValue({
        content: null,
        documentType: null
      });
      this.fileUploaderOthers.nativeElement.value = null;
    }
  }

  protected onSaveSuccess() {
    this.resetForm();
  }

  protected onSaveError() {
    alert('document fialed to be uploaded');
  }

  save() {
    this.dictionaryService.find(this.editForm.get(['documentType']).value).subscribe(
      data =>{
        const supportingDocument = this.createFromForm(data.body);
        this.subscribeToSaveResponse(this.supportingDocumentService.create(supportingDocument));
      }
    )
  }

  saveOthers() {
    this.dictionaryService.find(this.editFormOthers.get(['documentType']).value).subscribe(
      data =>{
        const supportingDocument = this.createFromForm(data.body);
        this.subscribeToSaveResponse(this.supportingDocumentService.create(supportingDocument));
      }
    )


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

        this.code_ = this.batch.transactions[0].transactionCode;
        this.dashboardService.getMandatorySupportDocs(this.code_).subscribe(data1 => {
          this.mandatoryDocs = data1.body;

          // Get the list of all the support docs
          this.dashboardService.fetchDictionaryValuesObj('document_type').subscribe(
            dataDocs => {
              this.documentTypes = JSON.parse(dataDocs.body.category);

              this.documentTypes.forEach(x => {
                this.map.set(x.id, x);
              });
              this.mandatoryDocs.forEach(mandatoryDoc => {
                this.documentTypes.forEach(documentType => {
                  if (mandatoryDoc.document_code === documentType.code) {
                    this.madatorySupportingDocuments.push(documentType);
                  }
                });
              });
              this.otherSupportingDocuments = this.documentTypes.filter(x => !this.madatorySupportingDocuments.includes(x));
              this.refreshDocument(this.batch);
            },
            err => {}
          );
        });
      },
      () => alert()
    );
  }

  refreshDocument(batch: Batch) {
    this.batchService.find(batch.id).subscribe(
      data => {
        const allDocs = data.body.transactions[0].docs;
        this.supportingDocuments = allDocs.filter(x => x.provided === 'Y');
        this.supportingDocumentsOthers = allDocs.filter(x => x.provided !== 'Y');

        //this.addMoreDetailDocument();
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

  onFileSelectedOthers(event) {
    this.typeOfDoc = 'others';

    this.selectedFile = event.target.files[0] as File;

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      this.fileNameOthers = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        // this.content = reader.result
        this.editFormOthers.patchValue({
          content: reader.result,
          type: this.selectedFile.type,
          name: this.fileNameOthers,
          fileSize: this.selectedFile.size,
          provided: 'N'
        });

        this.saveOthers();
      };
    }
  }

  onFileSelected(event) {
    this.typeOfDoc = 'mandatory';
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
          fileSize: this.selectedFile.size,
          provided: 'Y'
        });

        this.save();
      };
    }
  }

  onChange(event) {
    this.fileUploader.nativeElement.value = null;
  }

  onChangeOthers() {
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
          this.refreshDocument(this.batch);
        },
        () => alert()
      );
    });
  }

  // addMoreDetailDocument() {
  //   this.supportingDocuments.forEach(value => {
  //     const dict = this.map.get(value.documentType) as IEGISDIctionary;
  //     value.description = dict.label;
  //   });

  //   this.supportingDocumentsOthers.forEach(value => {
  //     const dict = this.map.get(value.documentType) as IEGISDIctionary;
  //     value.description = dict.label;
  //   });
  // }

  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  getFile(documentId: number, content: string, filename: string) {
    const index = content.indexOf('base64') + 7;

    const blob = this.b64toBlob(content.substring(index), content.substr(0, index - 8), 512);
    const downloadURL = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadURL;
    link.download = filename;
    link.click();
  }

  goToSummary(batchId: number) {
    this.router.navigate(['/application/application-summary', batchId]);
  }
}

export class TabDisplay {
  constructor(show1: boolean) {}
}
