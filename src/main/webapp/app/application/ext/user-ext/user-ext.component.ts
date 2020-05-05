import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IUserExt } from 'app/shared/model/user-ext.model';
import { UserExtService } from './user-ext.service';
import { UserExtDeleteDialogComponent } from './user-ext-delete-dialog.component';

@Component({
  selector: 'jhi-user-ext',
  templateUrl: './user-ext.component.html'
})
export class UserExtComponent implements OnInit, OnDestroy {
  userExts: IUserExt[];
  eventSubscriber: Subscription;
  currentSearch: string;

  constructor(
    protected userExtService: UserExtService,
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
      this.userExtService
        .search({
          query: this.currentSearch
        })
        .subscribe((res: HttpResponse<IUserExt[]>) => (this.userExts = res.body));
      return;
    }
    this.userExtService.query().subscribe((res: HttpResponse<IUserExt[]>) => {
      this.userExts = res.body;
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
    this.registerChangeInUserExts();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IUserExt) {
    return item.id;
  }

  registerChangeInUserExts() {
    this.eventSubscriber = this.eventManager.subscribe('userExtListModification', () => this.loadAll());
  }

  delete(userExt: IUserExt) {
    const modalRef = this.modalService.open(UserExtDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.userExt = userExt;
  }
}
