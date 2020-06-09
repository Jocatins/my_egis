import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEscalateContact } from 'app/shared/model/escalate-contact.model';
import { EscalateContactService } from './escalate-contact.service';

@Component({
  templateUrl: './escalate-contact-delete-dialog.component.html'
})
export class EscalateContactDeleteDialogComponent {
  escalateContact: IEscalateContact;

  constructor(
    protected escalateContactService: EscalateContactService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.escalateContactService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'escalateContactListModification',
        content: 'Deleted an escalateContact'
      });
      this.activeModal.dismiss(true);
    });
  }
}
