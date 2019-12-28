import {Component, OnInit} from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { timeout, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trans } from '../model/trans.model';



@Component({
  selector: 'jhi-landing',
  templateUrl: './landing.component.html',
  styleUrls: [
    'landing.component.scss'
  ]
})
export class LandingComponent implements OnInit {

  transacations = [
    {GroupName:"Land Use Allocation Committee", code:"LUAC"},
    {GroupName:"Directorate of Land Regularisation ", code:"DLR"},
    {GroupName:"Directorate of Land Services ", code:"DL"},
    {GroupName:"Directorate of Land Transactions ", code:"DLT"},
    {GroupName:"Directorate of Land Registry", code:" "},
    {GroupName:"Survey Unit", code:""},
    {GroupName:"Commissioner of Stamp Duty ", code:"CoSD"},
    {GroupName:"New Towns Development Authority ", code:"NTDA"},
    {GroupName:"Lagos State Public Works Corporation ", code:"LSPWC"}
  ]
  message: string;
  trans: Trans[];

  public resourceUrl = 'http://localhost:7777' + '/transinfoWithGroup/';

  constructor(private httpClient: HttpClient) {
    this.message = 'LandingComponent message';

    const callResp = this.find('REGISTRY');
    if ( callResp != null ){
      callResp
      .pipe( timeout(2000),
          catchError (e => {
            alert("Request time out" + e);
            return null;
          })
      )
      .subscribe((data : Trans[])=>{
        this.trans = data;
      })
      ;
    }else{
      return;
    }

  }


  ngOnInit() {

  }

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
