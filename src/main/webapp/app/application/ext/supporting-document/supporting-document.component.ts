import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { SupportingDocumentService } from './supporting-document.service';
import { SupportingDocumentDeleteDialogComponent } from './supporting-document-delete-dialog.component';

@Component({
  selector: 'jhi-supporting-document',
  templateUrl: './supporting-document.component.html'
})
export class SupportingDocumentComponent implements OnInit, OnDestroy {
  supportingDocuments: ISupportingDocument[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected supportingDocumentService: SupportingDocumentService,
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
      this.supportingDocumentService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<ISupportingDocument[]>) => (this.supportingDocuments = res.body));
      return;
    }
    this.supportingDocumentService.query().subscribe((res: HttpResponse<ISupportingDocument[]>) => {
      this.supportingDocuments = res.body;
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
    this.registerChangeInSupportingDocuments();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ISupportingDocument) {
    return item.id;
  }

  registerChangeInSupportingDocuments() {
    this.eventSubscriber = this.eventManager.subscribe('supportingDocumentListModification', () => this.loadAll());
  }

  delete(supportingDocument: ISupportingDocument) {
    const modalRef = this.modalService.open(SupportingDocumentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supportingDocument = supportingDocument;
  }
}
