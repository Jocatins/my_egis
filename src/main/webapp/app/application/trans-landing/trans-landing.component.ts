import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { IParty, Party } from 'app/shared/model/party.model';
import { ISupportingDocument, SupportingDocument } from 'app/shared/model/supporting-document.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { IParcel } from 'app/shared/model/parcel.model';
import { SupportingDocumentService } from '../ext/supporting-document/supporting-document.service';
import { SupportingDocumentDeleteDialogComponent } from '../ext/supporting-document/supporting-document-delete-dialog.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';
import { PartyDeleteDialogComponent } from '../party/party-delete-dialog.component';
import { BatchService } from '../ext/batch-old/batch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jhi-overview',
  templateUrl: './trans-landing.component.html',
  styleUrls: ['trans-landing.component.scss']
})
export class TranslandingComponent implements OnInit, OnDestroy {
  batch: IBatch;
  parties: IParty[];
  supportingDocuments: ISupportingDocument[];
  parcels: IParcel[];
  eventSubscriber: Subscription;
  eventSubscriberDocs: Subscription;

  // parcelid: number;

  constructor(
    private router: Router,
    protected activatedRoute: ActivatedRoute,
    protected transactionService: TransactionService,
    private suppoDocService: SupportingDocumentService,
    protected modalService: NgbModal,
    private eventManager: JhiEventManager,
    private batchService: BatchService
  ) {}

  ngOnInit(): void {
    this.registerChangeInParties();
    this.registerChangeInDocs();

    this.activatedRoute.data.subscribe(({ batch }) => {
      this.batch = batch;
      // alert(this.batch.parties.length)
      this.refreshParty(this.batch.id);
    });
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
    this.eventManager.destroy(this.eventSubscriberDocs);
  }

  editNewApplicant(newOrEdit: string, batchId: number, partyId: number) {
    this.router.navigate(['/application/applicant', batchId, partyId, newOrEdit]);
  }

  editNewDocument(newOrEdit: string, batchId: number, documentId: number) {
    const path = '/application/document';

    this.router.navigate([path, batchId, documentId, newOrEdit]);
  }

  editNewProperty(newOrEdit: string, parcelId: number, batchId: number) {
    const path = '/application/property'; // '/application/document/new';

    this.router.navigate([path, batchId, parcelId, newOrEdit]);
    // this.router.navigate([path]);
  }

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

  deleteDoc(supportingDocument: SupportingDocument, batchId: number) {
    const modalRef = this.modalService.open(SupportingDocumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supportingDocument = supportingDocument;
    this.eventManager.subscribe('supportingDocumentListModification', () => {
      this.transactionService.find(this.batch.transactions[0].id).subscribe(
        data => {
          this.supportingDocuments = data.body.docs;

          this.refreshParty(this.batch.id);
        },
        () => alert()
      );
    });
  }

  deleteParty(party: Party, batchId: number) {
    const modalRef = this.modalService.open(PartyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.party = party;
    this.eventManager.subscribe('partyListModification', () => {
      this.batchService.find(batchId).subscribe(
        data => {
          this.parties = data.body.parties;

          this.refreshDocument(this.batch);
        },
        () => alert()
      );
    });
  }

  refreshParty(batchId: number) {
    this.batchService.find(batchId).subscribe(
      data => {
        this.parties = data.body.parties;

        this.refreshDocument(this.batch);
      },
      () => alert()
    );
  }

  registerChangeInParties() {
    this.eventSubscriber = this.eventManager.subscribe('partyListModification', () => {
      // alert('I am in partyListModification ')
      this.refreshParty(this.batch.id);
    });
  }

  registerChangeInDocs() {
    this.eventSubscriberDocs = this.eventManager.subscribe('supportingDocumentListModification', () => this.refreshDocument(this.batch));
  }

  refreshDocument(batch: Batch) {
    this.transactionService.find(batch.transactions[0].id).subscribe(
      data => {
        this.supportingDocuments = data.body.docs;

        if (data.body.parcels.length === 0) {
          this.parcels = undefined;
        } else {
          this.parcels = data.body.parcels;
        }
      },
      () => alert()
    );
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
}
