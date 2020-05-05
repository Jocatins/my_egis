import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from './batch.service';
import { BatchDeleteDialogComponent } from './batch-delete-dialog.component';

@Component({
  selector: 'jhi-batch',
  templateUrl: './batch.component.html'
})
export class BatchComponent implements OnInit, OnDestroy {
  batches: IBatch[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected batchService: BatchService,
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
      this.batchService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IBatch[]>) => (this.batches = res.body));
      return;
    }
    this.batchService.query().subscribe((res: HttpResponse<IBatch[]>) => {
      this.batches = res.body;
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
    this.registerChangeInBatches();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBatch) {
    return item.id;
  }

  registerChangeInBatches() {
    this.eventSubscriber = this.eventManager.subscribe('batchListModification', () => this.loadAll());
  }

  delete(batch: IBatch) {
    const modalRef = this.modalService.open(BatchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.batch = batch;
  }


}
