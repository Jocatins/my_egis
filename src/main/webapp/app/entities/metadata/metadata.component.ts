import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IMetadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';
import { MetadataDeleteDialogComponent } from './metadata-delete-dialog.component';

@Component({
  selector: 'jhi-metadata',
  templateUrl: './metadata.component.html'
})
export class MetadataComponent implements OnInit, OnDestroy {
  metadata: IMetadata[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected metadataService: MetadataService,
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
      this.metadataService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IMetadata[]>) => (this.metadata = res.body));
      return;
    }
    this.metadataService.query().subscribe((res: HttpResponse<IMetadata[]>) => {
      this.metadata = res.body;
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
    this.registerChangeInMetadata();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMetadata) {
    return item.id;
  }

  registerChangeInMetadata() {
    this.eventSubscriber = this.eventManager.subscribe('metadataListModification', () => this.loadAll());
  }

  delete(metadata: IMetadata) {
    const modalRef = this.modalService.open(MetadataDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.metadata = metadata;
  }
}
