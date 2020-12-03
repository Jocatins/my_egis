import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentRequest } from 'app/shared/model/document-request.model';
import { DocumentRequestService } from './document-request.service';

@Component({
  templateUrl: './document-request-delete-dialog.component.html'
})
export class DocumentRequestDeleteDialogComponent {
  documentRequest: IDocumentRequest;

  constructor(
    protected documentRequestService: DocumentRequestService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.documentRequestService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'documentRequestListModification',
        content: 'Deleted an documentRequest'
      });
      this.activeModal.dismiss(true);
    });
  }
}
