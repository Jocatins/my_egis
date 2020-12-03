import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDocumentRequest, DocumentRequest } from 'app/shared/model/document-request.model';
import { DocumentRequestService } from './document-request.service';

@Component({
  selector: 'jhi-document-request-update',
  templateUrl: './document-request-update.component.html'
})
export class DocumentRequestUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    transactionId: [],
    documentId: [],
    documentType: [],
    documentSubType: [],
    documentNumber: [],
    surveyPlanNumber: [],
    propertyDescription: [],
    titleNumber: []
  });

  constructor(
    protected documentRequestService: DocumentRequestService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documentRequest }) => {
      this.updateForm(documentRequest);
    });
  }

  updateForm(documentRequest: IDocumentRequest) {
    this.editForm.patchValue({
      id: documentRequest.id,
      transactionId: documentRequest.transactionId,
      documentId: documentRequest.documentId,
      documentType: documentRequest.documentType,
      documentSubType: documentRequest.documentSubType,
      documentNumber: documentRequest.documentNumber,
      surveyPlanNumber: documentRequest.surveyPlanNumber,
      propertyDescription: documentRequest.propertyDescription,
      titleNumber: documentRequest.titleNumber
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const documentRequest = this.createFromForm();
    if (documentRequest.id !== undefined) {
      this.subscribeToSaveResponse(this.documentRequestService.update(documentRequest));
    } else {
      this.subscribeToSaveResponse(this.documentRequestService.create(documentRequest));
    }
  }

  private createFromForm(): IDocumentRequest {
    return {
      ...new DocumentRequest(),
      id: this.editForm.get(['id']).value,
      transactionId: this.editForm.get(['transactionId']).value,
      documentId: this.editForm.get(['documentId']).value,
      documentType: this.editForm.get(['documentType']).value,
      documentSubType: this.editForm.get(['documentSubType']).value,
      documentNumber: this.editForm.get(['documentNumber']).value,
      surveyPlanNumber: this.editForm.get(['surveyPlanNumber']).value,
      propertyDescription: this.editForm.get(['propertyDescription']).value,
      titleNumber: this.editForm.get(['titleNumber']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentRequest>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
