import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITitleSelectOptions } from 'app/shared/model/title-select-options.model';
import { TitleSelectOptionsService } from './title-select-options.service';

@Component({
  templateUrl: './title-select-options-delete-dialog.component.html'
})
export class TitleSelectOptionsDeleteDialogComponent {
  titleSelectOptions: ITitleSelectOptions;

  constructor(
    protected titleSelectOptionsService: TitleSelectOptionsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.titleSelectOptionsService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'titleSelectOptionsListModification',
        content: 'Deleted an titleSelectOptions'
      });
      this.activeModal.dismiss(true);
    });
  }
}
