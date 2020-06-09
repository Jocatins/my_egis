import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';
import { SubscriptionDocsService } from './subscription-docs.service';
import { SubscriptionDocsDeleteDialogComponent } from './subscription-docs-delete-dialog.component';

@Component({
  selector: 'jhi-subscription-docs',
  templateUrl: './subscription-docs.component.html'
})
export class SubscriptionDocsComponent implements OnInit, OnDestroy {
  subscriptionDocs: ISubscriptionDocs[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected subscriptionDocsService: SubscriptionDocsService,
    protected dataUtils: JhiDataUtils,
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
      this.subscriptionDocsService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ISubscriptionDocs[]>) => (this.subscriptionDocs = res.body));
      return;
    }
    this.subscriptionDocsService.query().subscribe((res: HttpResponse<ISubscriptionDocs[]>) => {
      this.subscriptionDocs = res.body;
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
    this.registerChangeInSubscriptionDocs();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISubscriptionDocs) {
    return item.id;
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  registerChangeInSubscriptionDocs() {
    this.eventSubscriber = this.eventManager.subscribe('subscriptionDocsListModification', () => this.loadAll());
  }

  delete(subscriptionDocs: ISubscriptionDocs) {
    const modalRef = this.modalService.open(SubscriptionDocsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subscriptionDocs = subscriptionDocs;
  }
}
