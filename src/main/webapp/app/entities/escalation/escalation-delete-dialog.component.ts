import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEscalation } from 'app/shared/model/escalation.model';
import { EscalationService } from './escalation.service';

@Component({
  templateUrl: './escalation-delete-dialog.component.html'
})
export class EscalationDeleteDialogComponent {
  escalation: IEscalation;

  constructor(
    protected escalationService: EscalationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.escalationService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'escalationListModification',
        content: 'Deleted an escalation'
      });
      this.activeModal.dismiss(true);
    });
  }
}
