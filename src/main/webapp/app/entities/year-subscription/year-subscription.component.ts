import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IYearSubscription } from 'app/shared/model/year-subscription.model';
import { YearSubscriptionService } from './year-subscription.service';
import { YearSubscriptionDeleteDialogComponent } from './year-subscription-delete-dialog.component';

@Component({
  selector: 'jhi-year-subscription',
  templateUrl: './year-subscription.component.html'
})
export class YearSubscriptionComponent implements OnInit, OnDestroy {
  yearSubscriptions: IYearSubscription[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected yearSubscriptionService: YearSubscriptionService,
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
      this.yearSubscriptionService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IYearSubscription[]>) => (this.yearSubscriptions = res.body));
      return;
    }
    this.yearSubscriptionService.query().subscribe((res: HttpResponse<IYearSubscription[]>) => {
      this.yearSubscriptions = res.body;
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
    this.registerChangeInYearSubscriptions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IYearSubscription) {
    return item.id;
  }

  registerChangeInYearSubscriptions() {
    this.eventSubscriber = this.eventManager.subscribe('yearSubscriptionListModification', () => this.loadAll());
  }

  delete(yearSubscription: IYearSubscription) {
    const modalRef = this.modalService.open(YearSubscriptionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.yearSubscription = yearSubscription;
  }
}
