import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IYearSubscription } from 'app/shared/model/year-subscription.model';
import { YearSubscriptionService } from './year-subscription.service';

@Component({
  templateUrl: './year-subscription-delete-dialog.component.html'
})
export class YearSubscriptionDeleteDialogComponent {
  yearSubscription: IYearSubscription;

  constructor(
    protected yearSubscriptionService: YearSubscriptionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.yearSubscriptionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'yearSubscriptionListModification',
        content: 'Deleted an yearSubscription'
      });
      this.activeModal.dismiss(true);
    });
  }
}
