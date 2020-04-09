import { Component, OnInit, OnDestroy, Injectable } from '@angular/core';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBatch } from 'app/shared/model/batch.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BatchService } from '../application/ext/batch/batch.service';
import { BatchDeleteDialogComponent } from '../entities/batch/batch-delete-dialog.component';
import { SERVER_API_URL } from 'app/app.constants';
import { timeout, catchError } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';

@Injectable({ providedIn: 'root' })
@Component({
  selector: 'jhi-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  batches: IBatch[];
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;
  currentSearch: string;
  batch: IBatch;

  constructor(
    private router: Router,
    protected batchService: BatchService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected http: HttpClient,
    protected dashboardService: DashboardService
  ) {
    this.batches = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.batchService
        .search({
          query: this.currentSearch,
          page: this.page,
          size: this.itemsPerPage,
          sort: this.sort()
        })
        .subscribe((res: HttpResponse<IBatch[]>) => {
          this.batches = res.body;
        });
      return;
    }
    this.batchService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe((res: HttpResponse<IBatch[]>) => {
        this.batches = res.body;
        this.batches.forEach((batch: IBatch) => {
          const code = batch.transactions[0].transactionCode;
          // const simpleresourceUrl = BatchService.serverApiURL + 'api/backoffice/transmeatada?code=' + code;
          this.dashboardService.getTransMetadata(code);

          const callMetadata = this.dashboardService.getTransMetadata(code);
          if (callMetadata !== null) {
            callMetadata
              .pipe(
                timeout(2000),
                catchError(ee => {
                  //  alert(JSON.stringify(ee))
                  return null;
                })
              )
              .subscribe((dataMeta: any) => {
                batch.moreData = code + ' - ' + JSON.parse(dataMeta.body.metadata).descr;
              });
          }
        });
      });
  }

  reset() {
    this.page = 0;
    this.batches = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  clear() {
    this.batches = [];
    this.links = {
      last: 0
    };
    this.page = 0;
    this.predicate = 'id';
    this.reverse = true;
    this.currentSearch = '';
    this.loadAll();
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.batches = [];
    this.links = {
      last: 0
    };
    this.page = 0;
    this.predicate = '_score';
    this.reverse = false;
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.registerChangeInBatches();
  }

  editBatch(batchId: number) {
    this.batchService.find(batchId).subscribe(
      (data: HttpResponse<IBatch>) => {
        this.batch = data.body;
        this.router.navigate(['/application/overview', this.batch.transactions[0].transactionCode, batchId]);
      },
      () => alert('Error creating batch')
    );
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IBatch) {
    return item.id;
  }

  registerChangeInBatches() {
    this.eventSubscriber = this.eventManager.subscribe('batchListModification', () => this.reset());
  }

  delete(batch: IBatch) {
    const modalRef = this.modalService.open(BatchDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.batch = batch;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  // protected paginateBatches(data: IBatch[], headers: HttpHeaders) {
  //   this.links = this.parseLinks.parse(headers.get('link'));
  //   this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
  //   for (let i = 0; i < data.length; i++) {
  //     this.batches.push(data[i]);
  //   }
  // }
}
