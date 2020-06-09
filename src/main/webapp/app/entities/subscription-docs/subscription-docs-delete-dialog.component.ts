import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';
import { SubscriptionDocsService } from './subscription-docs.service';

@Component({
  templateUrl: './subscription-docs-delete-dialog.component.html'
})
export class SubscriptionDocsDeleteDialogComponent {
  subscriptionDocs: ISubscriptionDocs;

  constructor(
    protected subscriptionDocsService: SubscriptionDocsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.subscriptionDocsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'subscriptionDocsListModification',
        content: 'Deleted an subscriptionDocs'
      });
      this.activeModal.dismiss(true);
    });
  }
}
