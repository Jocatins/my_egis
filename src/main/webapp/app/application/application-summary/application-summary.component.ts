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
import { BatchService } from 'app/entities/batch/batch.service';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';

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
  canPush: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    protected dashboardService: DashboardService,
    private httpClient: HttpClient,
    protected batchService: BatchService,
    protected dictionaryService: DictionaryService
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

      if (this.batch.batchStatus.label === 'new'){
        this.canPush = true
      }else{
        this.canPush = false;
      }
    });
  }

  submitTransaction(batchId: number): void {
    this.batchService.find(batchId).subscribe(data =>{
      this.batch = data.body;
      this.dictionaryService.query({ 'category.equals': 'application_status', 'code.equals': 'application_submitted' }).subscribe(data1 => {
        this.batch.batchStatus = data1.body[0];
        this.batchService.update(this.batch).subscribe(() => {
          alert('Application successfully submitted');
        });
      });
    })
  }
}

export class TabDisplay {
  // constructor(show1: boolean) {}
}
