import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IUserExt } from 'app/shared/model/user-ext.model';
import { UserExtService } from './user-ext.service';

@Component({
  templateUrl: './user-ext-delete-dialog.component.html'
})
export class UserExtDeleteDialogComponent {
  userExt: IUserExt;

  constructor(protected userExtService: UserExtService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.userExtService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'userExtListModification',
        content: 'Deleted an userExt'
      });
      this.activeModal.dismiss(true);
    });
  }
}
