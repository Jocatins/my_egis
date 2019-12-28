import { BrowserModule } from '@angular/platform-browser';
import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {TransInfo} from '../model/transinfo.model';
import { timeout, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Trans } from '../model/trans.model';

@Component({
  selector: 'jhi-trans-detail',
  templateUrl: './supporting-docs.component.html',
  styleUrls: [
    'supporting-docs.component.scss'
  ]
})
export class SupportingDocsComponent implements OnInit {

  message: string;

  code_: string;
  tab_:string;
  transInfo: TransInfo;
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private httpClient: HttpClient) {
    this.message = 'SupportingDocsComponent message';



  }

  linkClick(){

  }


  ngOnInit() {
    const params = this.route.snapshot.paramMap;
    this.code_ = params.get('code_');
    //alert(this.code_);


  }



}


export class TabDisplay{

  constructor (show1:boolean){

  }
}
