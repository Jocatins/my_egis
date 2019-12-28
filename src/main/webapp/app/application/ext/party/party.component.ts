import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParty } from 'app/shared/model/party.model';
import { PartyService } from './party.service';
import { PartyDeleteDialogComponent } from './party-delete-dialog.component';

@Component({
  selector: 'jhi-party',
  templateUrl: './party.component.html'
})
export class PartyComponent implements OnInit, OnDestroy {
  parties: IParty[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected partyService: PartyService,
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
      this.partyService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IParty[]>) => (this.parties = res.body));
      return;
    }
    this.partyService.query().subscribe((res: HttpResponse<IParty[]>) => {
      this.parties = res.body;
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
    this.registerChangeInParties();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IParty) {
    return item.id;
  }

  registerChangeInParties() {
    this.eventSubscriber = this.eventManager.subscribe('partyListModification', () => this.loadAll());
  }

  delete(party: IParty) {
    const modalRef = this.modalService.open(PartyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.party = party;
  }
}
