import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';
import { JhiEventManager } from 'ng-jhipster';

@Component({
  selector: 'jhi-home-addons',
  templateUrl: './home-addons.component.html',
  styleUrls: ['./home-addons.component.scss']
})
export class HomeAddonsComponent implements OnInit, OnDestroy {
  message: string;
  account: Account;
  transactionDescription: string;

  constructor(private accountService: AccountService, protected eventManager: JhiEventManager) {
    this.message = 'ApplicationComponent message';
  }

  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });

    this.eventManager.subscribe('transactionDescription', data => {
      this.transactionDescription = data.content;
    });
  }

  ngOnDestroy() {}
}
