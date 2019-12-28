import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IParcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';

@Component({
  templateUrl: './parcel-delete-dialog.component.html'
})
export class ParcelDeleteDialogComponent {
  parcel: IParcel;

  constructor(protected parcelService: ParcelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.parcelService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'parcelListModification',
        content: 'Deleted an parcel'
      });
      this.activeModal.dismiss(true);
    });
  }
}
