import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from './dictionary.service';
import { DictionaryDeleteDialogComponent } from './dictionary-delete-dialog.component';

@Component({
  selector: 'jhi-dictionary',
  templateUrl: './dictionary.component.html'
})
export class DictionaryComponent implements OnInit, OnDestroy {
  dictionaries: IDictionary[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected dictionaryService: DictionaryService,
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
      this.dictionaryService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body));
      return;
    }
    this.dictionaryService.query().subscribe((res: HttpResponse<IDictionary[]>) => {
      this.dictionaries = res.body;
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
    this.registerChangeInDictionaries();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDictionary) {
    return item.id;
  }

  registerChangeInDictionaries() {
    this.eventSubscriber = this.eventManager.subscribe('dictionaryListModification', () => this.loadAll());
  }

  delete(dictionary: IDictionary) {
    const modalRef = this.modalService.open(DictionaryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.dictionary = dictionary;
  }
}
