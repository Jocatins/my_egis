import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core/auth/account.service';
import { Account } from 'app/core/user/account.model';

@Component({
  selector: 'jhi-application',
  templateUrl: './application.component.html',
  styleUrls: ['application.component.scss']
})
export class ApplicationComponent implements OnInit {
  message: string;
  account: Account;

  constructor(private accountService: AccountService) {
    this.message = 'ApplicationComponent message';
  }

  ngOnInit() {
    this.accountService.identity().subscribe(account => {
      //  alert(JSON.stringify(account));
      this.account = account;
    });
  }
}
