import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransactionExt } from 'app/shared/model/transaction-ext.model';
import { TransactionExtService } from './transaction-ext.service';

@Component({
  templateUrl: './transaction-ext-delete-dialog.component.html'
})
export class TransactionExtDeleteDialogComponent {
  transactionExt: ITransactionExt;

  constructor(
    protected transactionExtService: TransactionExtService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transactionExtService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'transactionExtListModification',
        content: 'Deleted an transactionExt'
      });
      this.activeModal.dismiss(true);
    });
  }
}
