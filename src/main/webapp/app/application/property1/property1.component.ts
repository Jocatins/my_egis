import { BrowserModule } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TransInfo } from '../model/transinfo.model';
import { timeout, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Trans } from '../model/trans.model';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';

@Component({
  selector: 'jhi-property',
  templateUrl: './property1.component.html',
  styleUrls: ['property1.component.scss']
})
export class Property1Component implements OnInit {
  messageTest: string;

  code_: string;
  tab_: string;
  transInfo: TransInfo;
  docsreceived: boolean;
  prerequisite: boolean;
  procedure: boolean;
  associated: boolean;
  form: boolean;
  idoc: ISupportingDocument;

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.messageTest = 'Property1Component message';
  }

  linkClick() {}

  ngOnInit() {
    // const params = this.route.snapshot.paramMap;

    this.route.data.subscribe(({ doc }) => {
      this.idoc = doc;
    });
  }
}

export class TabDisplay {
  constructor(show1: boolean) {}
}
