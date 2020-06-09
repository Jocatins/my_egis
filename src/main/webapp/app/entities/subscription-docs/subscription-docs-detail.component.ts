import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';

@Component({
  selector: 'jhi-subscription-docs-detail',
  templateUrl: './subscription-docs-detail.component.html'
})
export class SubscriptionDocsDetailComponent implements OnInit {
  subscriptionDocs: ISubscriptionDocs;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ subscriptionDocs }) => {
      this.subscriptionDocs = subscriptionDocs;
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }
  previousState() {
    window.history.back();
  }
}
