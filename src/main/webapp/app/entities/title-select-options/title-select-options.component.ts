import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITitleSelectOptions } from 'app/shared/model/title-select-options.model';
import { TitleSelectOptionsService } from './title-select-options.service';
import { TitleSelectOptionsDeleteDialogComponent } from './title-select-options-delete-dialog.component';

@Component({
  selector: 'jhi-title-select-options',
  templateUrl: './title-select-options.component.html'
})
export class TitleSelectOptionsComponent implements OnInit, OnDestroy {
  titleSelectOptions: ITitleSelectOptions[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected titleSelectOptionsService: TitleSelectOptionsService,
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
      this.titleSelectOptionsService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ITitleSelectOptions[]>) => (this.titleSelectOptions = res.body));
      return;
    }
    this.titleSelectOptionsService.query().subscribe((res: HttpResponse<ITitleSelectOptions[]>) => {
      this.titleSelectOptions = res.body;
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
    this.registerChangeInTitleSelectOptions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITitleSelectOptions) {
    return item.id;
  }

  registerChangeInTitleSelectOptions() {
    this.eventSubscriber = this.eventManager.subscribe('titleSelectOptionsListModification', () => this.loadAll());
  }

  delete(titleSelectOptions: ITitleSelectOptions) {
    const modalRef = this.modalService.open(TitleSelectOptionsDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.titleSelectOptions = titleSelectOptions;
  }
}
