import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDocumentRequest } from 'app/shared/model/document-request.model';

@Component({
  selector: 'jhi-document-request-detail',
  templateUrl: './document-request-detail.component.html'
})
export class DocumentRequestDetailComponent implements OnInit {
  documentRequest: IDocumentRequest;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ documentRequest }) => {
      this.documentRequest = documentRequest;
    });
  }

  previousState() {
    window.history.back();
  }
}
