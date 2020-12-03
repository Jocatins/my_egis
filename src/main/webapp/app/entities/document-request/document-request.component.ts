import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentRequest } from 'app/shared/model/document-request.model';
import { DocumentRequestService } from './document-request.service';
import { DocumentRequestDeleteDialogComponent } from './document-request-delete-dialog.component';

@Component({
  selector: 'jhi-document-request',
  templateUrl: './document-request.component.html'
})
export class DocumentRequestComponent implements OnInit, OnDestroy {
  documentRequests: IDocumentRequest[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected documentRequestService: DocumentRequestService,
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
      this.documentRequestService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IDocumentRequest[]>) => (this.documentRequests = res.body));
      return;
    }
    this.documentRequestService.query().subscribe((res: HttpResponse<IDocumentRequest[]>) => {
      this.documentRequests = res.body;
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
    this.registerChangeInDocumentRequests();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IDocumentRequest) {
    return item.id;
  }

  registerChangeInDocumentRequests() {
    this.eventSubscriber = this.eventManager.subscribe('documentRequestListModification', () => this.loadAll());
  }

  delete(documentRequest: IDocumentRequest) {
    const modalRef = this.modalService.open(DocumentRequestDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentRequest = documentRequest;
  }
}
