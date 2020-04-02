import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trans } from '../model/trans.model';

@Component({
  selector: 'jhi-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['landing.component.scss']
})
export class LandingComponent implements OnInit {
  transacations = [
    { GroupName: 'Land Use Allocation Committee', code: 'LUAC' },
    { GroupName: 'Directorate of Land Regularisation ', code: 'DLR' },
    { GroupName: 'Directorate of Land Services ', code: 'DL' },
    { GroupName: 'Directorate of Land Transactions ', code: 'DLT' },
    { GroupName: 'Directorate of Land Registry', code: ' ' },
    { GroupName: 'Survey Unit', code: '' },
    { GroupName: 'Commissioner of Stamp Duty ', code: 'CoSD' },
    { GroupName: 'New Towns Development Authority ', code: 'NTDA' },
    { GroupName: 'Lagos State Public Works Corporation ', code: 'LSPWC' }
  ];
  message: string;
  transRegistry: Trans[];
  transLuac: Trans[];
  transDlr: Trans[];
  transDls: Trans[];
  transDlt: Trans[];
  // Trans[];
  //  Trans[];

  public resourceUrl = 'http://localhost:7777' + '/transinfoWithGroup/';

  constructor(private httpClient: HttpClient) {
    this.message = 'LandingComponent message';

    const callResp = this.find('REGISTRY');
    if (callResp != null) {
      callResp
        .pipe(
          timeout(2000),
          catchError(e => {
            alert('Request time out' + e);
            return null;
          })
        )
        .subscribe((data: Trans[]) => {
          this.transRegistry = data;
        });
    } else {
      return;
    }

    const callRespLuac = this.find('LUAC');
    if (callRespLuac != null) {
      callRespLuac
        .pipe(
          timeout(2000),
          catchError(e => {
            alert('Request time out' + e);
            return null;
          })
        )
        .subscribe((data: Trans[]) => {
          this.transLuac = data;
        });
    } else {
      return;
    }

    const callRespDlr = this.find('DLR');
    if (callRespDlr != null) {
      callRespDlr
        .pipe(
          timeout(2000),
          catchError(e => {
            alert('Request time out' + e);
            return null;
          })
        )
        .subscribe((data: Trans[]) => {
          this.transDlr = data;
        });
    } else {
      return;
    }

    const callRespDls = this.find('DLS');
    if (callRespDls != null) {
      callRespDls
        .pipe(
          timeout(2000),
          catchError(e => {
            alert('Request time out' + e);
            return null;
          })
        )
        .subscribe((data: Trans[]) => {
          this.transDls = data;
        });
    } else {
      return;
    }

    const callRespDlt = this.find('DLT');
    if (callRespDlt != null) {
      callRespDlt
        .pipe(
          timeout(2000),
          catchError(e => {
            alert('Request time out' + e);
            return null;
          })
        )
        .subscribe((data: Trans[]) => {
          this.transDlt = data;
        });
    } else {
      return;
    }
  }

  ngOnInit() {}

  /*
  private getTransactionInfoByGroup(group: string){
      const metaformUrl1 = 'http://localhost:7777';
      const metaFormUrl =  metaformUrl1 + "/transinfoWithGroup/" + (group).toUpperCase();
      return this.httpClient.get(encodeURI(metaFormUrl))
      .pipe( timeout(2000),
          catchError (e => {
            alert("Request time out" + e);
            return null;
          })
      );

    }
  */

  find(group: string): Observable<Trans> {
    const response = this.httpClient.get<Trans>(`${this.resourceUrl}/${group}`);

    return response;
  }
}
