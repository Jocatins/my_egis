import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransactionExt } from 'app/shared/model/transaction-ext.model';

@Component({
  selector: 'jhi-transaction-ext-detail',
  templateUrl: './transaction-ext-detail.component.html'
})
export class TransactionExtDetailComponent implements OnInit {
  transactionExt: ITransactionExt;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transactionExt }) => {
      this.transactionExt = transactionExt;
    });
  }

  previousState() {
    window.history.back();
  }
}
