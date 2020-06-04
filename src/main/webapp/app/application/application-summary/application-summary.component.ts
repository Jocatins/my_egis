// import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { timeout, catchError } from 'rxjs/operators';
// import { Observable } from 'rxjs';
// import { Trans } from '../model/trans.model';
import { IBatch } from 'app/shared/model/batch.model';
import { IParcel } from 'app/shared/model/parcel.model';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { IParty } from 'app/shared/model/party.model';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';

@Component({
  selector: 'jhi-trans-detail',
  templateUrl: './application-summary.component.html',
  styleUrls: ['application-summary.component.scss']
})
export class ApplicationSummaryComponent implements OnInit {
  message: string;
  batch: IBatch;
  parcel: IParcel;
  parties: IParty[];
  supportingDocuments: ISupportingDocument[];
  supportingDocumentsOthers: ISupportingDocument[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected dashboardService: DashboardService,
    private httpClient: HttpClient
  ) {
    this.message = 'ApplicationSummaryComponent message';
  }

  linkClick() {}

  ngOnInit() {
    this.route.data.subscribe(({ batch }) => {
      this.batch = batch;
      this.parcel = this.batch.transactions[0].parcels[0];
      this.parties = this.batch.parties;
      const allDocs = this.batch.transactions[0].docs;

      this.supportingDocumentsOthers = allDocs.filter(x => x.provided !== 'Y');
      this.supportingDocuments = allDocs.filter(x => x.provided === 'Y');
    });
  }
}

export class TabDisplay {
  // constructor(show1: boolean) {}
}
