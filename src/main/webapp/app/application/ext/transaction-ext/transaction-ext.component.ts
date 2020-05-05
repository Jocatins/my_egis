import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITransactionExt } from 'app/shared/model/transaction-ext.model';
import { TransactionExtService } from './transaction-ext.service';
import { TransactionExtDeleteDialogComponent } from './transaction-ext-delete-dialog.component';

@Component({
  selector: 'jhi-transaction-ext',
  templateUrl: './transaction-ext.component.html'
})
export class TransactionExtComponent implements OnInit, OnDestroy {
  transactionExts: ITransactionExt[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected transactionExtService: TransactionExtService,
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
      this.transactionExtService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITransactionExt[]>) => (this.transactionExts = res.body));
      return;
    }
    this.transactionExtService.query().subscribe((res: HttpResponse<ITransactionExt[]>) => {
      this.transactionExts = res.body;
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
    this.registerChangeInTransactionExts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITransactionExt) {
    return item.id;
  }

  registerChangeInTransactionExts() {
    this.eventSubscriber = this.eventManager.subscribe('transactionExtListModification', () => this.loadAll());
  }

  delete(transactionExt: ITransactionExt) {
    const modalRef = this.modalService.open(TransactionExtDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.transactionExt = transactionExt;
  }
}
