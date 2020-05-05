import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IParcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { ParcelDeleteDialogComponent } from './parcel-delete-dialog.component';

@Component({
  selector: 'jhi-parcel',
  templateUrl: './parcel.component.html'
})
export class ParcelComponent implements OnInit, OnDestroy {
  parcels: IParcel[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected parcelService: ParcelService,
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
      this.parcelService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IParcel[]>) => (this.parcels = res.body));
      return;
    }
    this.parcelService.query().subscribe((res: HttpResponse<IParcel[]>) => {
      this.parcels = res.body;
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
    this.registerChangeInParcels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IParcel) {
    return item.id;
  }

  registerChangeInParcels() {
    this.eventSubscriber = this.eventManager.subscribe('parcelListModification', () => this.loadAll());
  }

  delete(parcel: IParcel) {
    const modalRef = this.modalService.open(ParcelDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.parcel = parcel;
  }
}
