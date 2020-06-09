import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEscalation } from 'app/shared/model/escalation.model';
import { EscalationService } from './escalation.service';
import { EscalationDeleteDialogComponent } from './escalation-delete-dialog.component';

@Component({
  selector: 'jhi-escalation',
  templateUrl: './escalation.component.html'
})
export class EscalationComponent implements OnInit, OnDestroy {
  escalations: IEscalation[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected escalationService: EscalationService,
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
      this.escalationService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IEscalation[]>) => (this.escalations = res.body));
      return;
    }
    this.escalationService.query().subscribe((res: HttpResponse<IEscalation[]>) => {
      this.escalations = res.body;
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
    this.registerChangeInEscalations();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IEscalation) {
    return item.id;
  }

  registerChangeInEscalations() {
    this.eventSubscriber = this.eventManager.subscribe('escalationListModification', () => this.loadAll());
  }

  delete(escalation: IEscalation) {
    const modalRef = this.modalService.open(EscalationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.escalation = escalation;
  }
}
