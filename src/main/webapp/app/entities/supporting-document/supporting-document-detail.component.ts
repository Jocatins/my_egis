import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupportingDocument } from 'app/shared/model/supporting-document.model';

@Component({
  selector: 'jhi-supporting-document-detail',
  templateUrl: './supporting-document-detail.component.html'
})
export class SupportingDocumentDetailComponent implements OnInit {
  supportingDocument: ISupportingDocument;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ supportingDocument }) => {
      this.supportingDocument = supportingDocument;
    });
  }

  previousState() {
    window.history.back();
  }
}
