import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-application',
  templateUrl: './application.component.html',
  styleUrls: ['application.component.scss']
})
export class ApplicationComponent implements OnInit {
  message: string;
  account: Account;
  transactionDescription: string


  constructor(private accountService: AccountService,
    protected eventManager: JhiEventManager
    ) {
    this.message = 'ApplicationComponent message';
  }

  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      this.account = account;

    });

    this.eventManager.subscribe('transactionDescription', (data) => {
      this.transactionDescription = data.content
    });
  }
}
