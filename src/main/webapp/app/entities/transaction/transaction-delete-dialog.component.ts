import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';

@Component({
  templateUrl: './transaction-delete-dialog.component.html'
})
export class TransactionDeleteDialogComponent {
  transaction: ITransaction;

  constructor(
    protected transactionService: TransactionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transactionService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'transactionListModification',
        content: 'Deleted an transaction'
      });
      this.activeModal.dismiss(true);
    });
  }
}
