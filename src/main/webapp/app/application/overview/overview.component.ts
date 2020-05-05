import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { BatchService } from 'app/entities/batch/batch.service';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { Batch, IBatch } from 'app/shared/model/batch.model';
import { AccountService } from 'app/core/auth/account.service';
import { UserService } from 'app/core/user/user.service';
import { Transaction } from 'app/shared/model/transaction.model';
import { IUser } from 'app/core/user/user.model';
import { Dictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';

@Component({
  selector: 'jhi-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['overview.component.scss']
})
export class OverviewComponent implements OnInit {
  message: string;

  transCode: string;
  tab_: string;
  transInfo: TransInfo = {};
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;
  currentUser: IUser;
  batch: Batch;
  description: string;

  restrictions: string;
  posts: any[];
  showActivate: boolean;
  showContinue: boolean;

  predicate: any;
  reverse: any;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient,
    private batchService: BatchService,
    private transService: TransactionService,
    private accountService: AccountService,
    private userService: UserService,
    private dictionaryService: DictionaryService
  ) {
    this.message = 'TransDetailComponent message';
  }

  linkClick() {}

  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.transCode = params.get('transCode');
    this.getTransactionInfo('SS_APPLICATION_NAME'),
      this.getTransactionInfo('SS_DESCRIPTION'),
      this.getTransactionInfo('SS_RESTRICTIONS'),
      this.getTransactionInfo('SS_EXPIRATION'),
      this.getTransactionInfo('SS_DOCUMENT_RECEIVED'),
      this.getTransactionInfo('SS_PREREQUISITE_DOCUMENTS'),
      this.getTransactionInfo('SS_PREREQUISITE_TRANSACTIONS'),
      this.getTransactionInfo('SS_PROCEDURE'),
      this.getTransactionInfo('SS_ASSOCIATED_FEES');

    this.accountService.identity().subscribe(acct => {
      this.userService.find(acct.login).subscribe(
        userData => {
          this.currentUser = userData;
        },
        () => alert('Error retrieving current user')
      );
    });

    this.transInfo = new TransInfo();
    this.transInfo.associatedfees = 'Testing ';
    this.restrictions = 'uwjewj ehjwejew ehjwekjejke ';

    this.showContinue = false;
    this.showActivate = true;

    this.route.data.subscribe(({ batch }) => {
      this.batch = batch;
      if (batch !== undefined && this.batch.id !== null) {
        this.showContinue = true;
        this.showActivate = false;
      }
    });
  }

  pupulateTransInfo() {}

  continueTransaction(batchId: number) {
    this.router.navigate(['/application/applicants', batchId]);
  }

  initiateTransaction(transCode: string) {
    const criteria =    [
    {key: 'category.equals', value: 'application_status'},
    {key: 'code.equals', value: 'application_lodged'}
    ];

   this.predicate = 'id';
   this.reverse = true;

    let batchStatus = new Dictionary();
    this.dictionaryService.query({
      page: 1,
      size: 2,
      sort: this.sort(),
      criteria
    }).subscribe(
      data =>{
        batchStatus =  data.body.filter(x => x.category === 'application_status')
        .filter(x1 =>x1.code === 'application_lodged')[0]
        this.batch = new Batch();
        this.batch.officeId = 1;
        this.batch.batchStatus = batchStatus
        this.batch.user = this.currentUser;
        this.batch.transactions = [];

        const tran = new Transaction();

        tran.transactionCode = transCode;
        this.batch.transactions.push(tran);

        this.batchService.create(this.batch).subscribe(
          (data1: HttpResponse<IBatch>) => {
            this.batch = data1.body;
            this.router.navigate(['/application/applicants', this.batch.id]);
          },
          () => alert('Error creating batch')
        );
      }
    )

  }

  createTransaction(batch: IBatch, transCode: string) {
    const tran = new Transaction();
    tran.batches = [batch];
    tran.transactionCode = transCode;
    // tran.transactionType = 1;
    this.transService.create(tran).subscribe(
      (data: HttpResponse<Transaction>) => {
        batch.transactions = [data.body];
        this.batchService.update(batch).subscribe(uBatch => {}, () => alert('problem updating batch after creation'));
      },
      () => alert('Error creating transaction')
    );
  }

  // initiateTransactionOLD() {
  //   this.batch = new Batch();
  //   this.batch.officeId = 1;
  //   this.batch.batchStatus = 0;
  //   this.batch.user = this.currentUser;
  //   this.batchService.create(this.batch).subscribe(
  //     (data: HttpResponse<IBatch>) => {
  //       this.createTransaction(data.body, this.transCode);
  //       this.batch = data.body;
  //       this.router.navigate(['/application/translanding', this.batch.id]);
  //     },
  //     () => alert('Error creating batch')
  //   );
  // }

  getTransactionInfo(param: string) {
    const resourceUrl = 'http://localhost:7777' + '/transinfo/';
    const callResp = this.httpClient.get<TransInfo>(
      `${
        resourceUrl //this.httpClient.get('http://jsonplaceholder.typicode.com/posts');
      }/${this.transCode}/${param}`
    );

    if (callResp != null) {
      callResp
        // .pipe(
        //   timeout(2000),
        //   catchError(e => {
        //      alert("Request time out" + e);
        //     return null;
        //   })
        // )0
        .subscribe((data: any) => {
          if ('SS_DESCRIPTION' === param) {
            this.transInfo.description = data.param_value;
          }
          if ('SS_APPLICATION_NAME' === param) {
            this.transInfo.applicationname = data.param_value;
          }
          if ('SS_RESTRICTIONS' === param) {
            this.transInfo.restrictions = data.param_value;
          }
          if ('SS_DOCUMENT_RECEIVED' === param) {
            this.transInfo.docsreceived = data.param_value;
          }
          if ('SS_PREREQUISITE_DOCUMENTS' === param) {
            this.transInfo.prerequisitedocs = data.param_value;
          }
          if ('SS_PREREQUISITE_TRANSACTIONS' === param) {
            this.transInfo.prerequisitetrans = data.param_value;
          }
          if ('SS_PROCEDURE' === param) {
            this.transInfo.procedure = data.param_value;
          }
          if ('SS_ASSOCIATED_FEES' === param) {
            this.transInfo.associatedfees = data.param_value;
          }
          if ('SS_EXPIRATION' === param) {
            this.transInfo.expiration = data.param_value;
          }
        });
    } else {
      return;
    }
    return;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }
}

export class TabDisplay {
  constructor(show1: boolean) {}
}
