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
import { MetadataService } from 'app/entities/metadata/metadata.service';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['overview.component.scss']
})
export class OverviewComponent implements OnInit {
  transDescSub: Subscription;
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
  batchId: number;
  description: string;;
  batch: Batch

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
    private dictionaryService: DictionaryService,
    private metadata: MetadataService,
    protected eventManager: JhiEventManager,
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
    this.showContinue = false;
    this.showActivate = true;

    this.batchService.find( Number(this.transCode)).subscribe(

      data=>{
        if ( data.body !== null && data.body !== undefined){
          this.showContinue = true;
          this.showActivate = false;
          this.batchId = data.body.id;
          this.batch = data.body

         this.eventManager.broadcast({
            name: 'transactionDescription',
            content: this.batch.transactions[0].transactionCode.code + " - " + this.batch.transactions[0].transactionCode.label
          });
        }
      }

    )



    this.accountService.identity().subscribe(acct => {
      this.userService.find(acct.login).subscribe(
        userData => {
          this.currentUser = userData;
        },
        () => alert('Error retrieving current user')
      );
    });

    this.transInfo = new TransInfo();
    this.transInfo.associatedfees = 'Associated Fees here ... ';
    this.restrictions = 'Restriction Restrinction here ... ';

  }

  pupulateTransInfo() {}

  continueTransaction(batchId: number) {
    this.router.navigate(['/application/applicants', batchId]);
  }

  initiateTransaction(transCode: string) {
    this.predicate = 'id';
    this.reverse = true;

    const batchStatus = new Dictionary();
    this.dictionaryService.find(9900).subscribe(
      data1 =>{

        const batch = new Batch();
        batch.officeId = 1;
        batch.batchStatus = batchStatus
        batch.user = this.currentUser;
        batch.transactions = [];
        this.metadata.getByCode(transCode).subscribe(
          data =>{

            const tran = new Transaction();
            tran.transactionCode = data.body[0]

            batch.transactions.push(tran);
            batch.batchStatus = data1.body
            batch.user =this.currentUser;

            this.batchService.create(batch).subscribe(
              (data2: HttpResponse<IBatch>) => {
                this.eventManager.broadcast({
                  name: 'transactionDescription',
                  content: data2.body.transactions[0].transactionCode.code + " - " + data2.body.transactions[0].transactionCode.label
                });

                this.router.navigate(['/application/applicants', data2.body.id]);
              },
              () => alert('Error creating batch')
            );
          }

        )
      }

    )

  }


  getTransactionInfo(param: string) {
    const resourceUrl = 'http://localhost:7777' + '/transinfo/';
    const callResp = this.httpClient.get<TransInfo>(
      `${
        resourceUrl // this.httpClient.get('http://jsonplaceholder.typicode.com/posts');
      }/${this.transCode}/${param}`
    );

    if (callResp != null) {
      callResp .subscribe((data: any) => {
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
  constructor( ) {}
}
