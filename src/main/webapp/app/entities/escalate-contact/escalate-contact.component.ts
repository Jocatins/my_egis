import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEscalateContact } from 'app/shared/model/escalate-contact.model';
import { EscalateContactService } from './escalate-contact.service';
import { EscalateContactDeleteDialogComponent } from './escalate-contact-delete-dialog.component';

@Component({
  selector: 'jhi-escalate-contact',
  templateUrl: './escalate-contact.component.html'
})
export class EscalateContactComponent implements OnInit, OnDestroy {
  escalateContacts: IEscalateContact[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected escalateContactService: EscalateContactService,
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
      this.escalateContactService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IEscalateContact[]>) => (this.escalateContacts = res.body));
      return;
    }
    this.escalateContactService.query().subscribe((res: HttpResponse<IEscalateContact[]>) => {
      this.escalateContacts = res.body;
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
    this.registerChangeInEscalateContacts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEscalateContact) {
    return item.id;
  }

  registerChangeInEscalateContacts() {
    this.eventSubscriber = this.eventManager.subscribe('escalateContactListModification', () => this.loadAll());
  }

  delete(escalateContact: IEscalateContact) {
    const modalRef = this.modalService.open(EscalateContactDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.escalateContact = escalateContact;
  }
}
