import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from './transaction.service';
import { TransactionDeleteDialogComponent } from './transaction-delete-dialog.component';

@Component({
  selector: 'jhi-transaction',
  templateUrl: './transaction.component.html'
})
export class TransactionComponent implements OnInit, OnDestroy {
  transactions: ITransaction[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected transactionService: TransactionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.transactionService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITransaction[]>) => (this.transactions = res.body));
      return;
    }
    this.transactionService.query().subscribe((res: HttpResponse<ITransaction[]>) => {
      this.transactions = res.body;
      this.currentSearch = '';
    });
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.currentSearch = query;
    this.loadAll();
  }

  clear() {
    this.currentSearch = '';
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInTransactions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransaction) {
    return item.id;
  }

  registerChangeInTransactions() {
    this.eventSubscriber = this.eventManager.subscribe('transactionListModification', () => this.loadAll());
  }

  delete(transaction: ITransaction) {
    const modalRef = this.modalService.open(TransactionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transaction = transaction;
  }
}
