import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from './supporting-document.service';

@Component({
  templateUrl: './supporting-document-delete-dialog.component.html'
})
export class SupportingDocumentDeleteDialogComponent {
  supportingDocument: ISupportingDocument;

  constructor(
    protected supportingDocumentService: SupportingDocumentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.supportingDocumentService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'supportingDocumentListModification',
        content: 'Deleted an supportingDocument'
      });
      this.activeModal.dismiss(true);
    });
  }
}
