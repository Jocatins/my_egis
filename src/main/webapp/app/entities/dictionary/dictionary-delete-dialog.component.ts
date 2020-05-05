import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';

@Component({
  templateUrl: './dictionary-delete-dialog.component.html'
})
export class DictionaryDeleteDialogComponent {
  dictionary: IDictionary;

  constructor(
    protected dictionaryService: DictionaryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.dictionaryService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'dictionaryListModification',
        content: 'Deleted an dictionary'
      });
      this.activeModal.dismiss(true);
    });
  }
}
