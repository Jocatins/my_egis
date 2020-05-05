import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISurveyor } from 'app/shared/model/surveyor.model';
import { SurveyorService } from './surveyor.service';

@Component({
  templateUrl: './surveyor-delete-dialog.component.html'
})
export class SurveyorDeleteDialogComponent {
  surveyor: ISurveyor;

  constructor(protected surveyorService: SurveyorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.surveyorService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'surveyorListModification',
        content: 'Deleted an surveyor'
      });
      this.activeModal.dismiss(true);
    });
  }
}
