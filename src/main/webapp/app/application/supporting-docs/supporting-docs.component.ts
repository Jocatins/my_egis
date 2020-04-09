import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { IBatch, Batch } from 'app/shared/model/batch.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { BatchService } from '../ext/batch/batch.service';

@Component({
  selector: 'jhi-trans-detail',
  templateUrl: './supporting-docs.component.html',
  styleUrls: ['supporting-docs.component.scss']
})
export class SupportingDocsComponent implements OnInit {
  batch: IBatch;
  message: string;
  code_: string;
  tab_: string;
  transInfo: TransInfo;
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;
  supportingDocuments: ISupportingDocument[];
  batchId: number;

  constructor(
    protected transactionService: TransactionService,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.message = 'SupportingDocsComponent message';
  }

  linkClick() {}

  // @SuppDocList
  // code_ and batchId are passed from the calling component
  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.code_ = params.get('code_');
    this.batchId = Number(params.get('batchId'));

    // calls the batch service to set the batch and documenets objects
    // documents list is displayed by the component view page
    this.batchService.find(this.batchId).subscribe(
      data => {
        this.batch = data.body;
        this.refreshDocument(this.batch);
      },
      () => alert()
    );
  }

  refreshDocument(batch: Batch) {
    this.transactionService.find(batch.transactions[0].id).subscribe(
      data => {
        this.supportingDocuments = data.body.docs;
      },
      () => {
        // alert()
      }
    );
  }

  editNewDocument(newOrEdit: string, batchId: number, documentId: number) {
    const path = '/application/document';
    this.router.navigate([path, batchId, documentId, newOrEdit]);
  }
}

export class TabDisplay {
  constructor(show1: boolean) {}
}
