import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMetadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';

@Component({
  templateUrl: './metadata-delete-dialog.component.html'
})
export class MetadataDeleteDialogComponent {
  metadata: IMetadata;

  constructor(protected metadataService: MetadataService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.metadataService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'metadataListModification',
        content: 'Deleted an metadata'
      });
      this.activeModal.dismiss(true);
    });
  }
}
