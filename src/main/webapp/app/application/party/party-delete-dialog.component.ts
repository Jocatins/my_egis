import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParty } from 'app/shared/model/party.model';
import { PartyService } from './party.service';

@Component({
  templateUrl: './party-delete-dialog.component.html'
})
export class PartyDeleteDialogComponent {
  party: IParty;

  constructor(protected partyService: PartyService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.partyService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'partyListModification',
        content: 'Deleted an party'
      });
      this.activeModal.dismiss(true);
    });
  }
}
