import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { ISubscriptionDocs, SubscriptionDocs } from 'app/shared/model/subscription-docs.model';
import { SubscriptionDocsService } from './subscription-docs.service';
import { IYearSubscription } from 'app/shared/model/year-subscription.model';
import { YearSubscriptionService } from 'app/entities/year-subscription/year-subscription.service';

@Component({
  selector: 'jhi-subscription-docs-update',
  templateUrl: './subscription-docs-update.component.html'
})
export class SubscriptionDocsUpdateComponent implements OnInit {
  isSaving: boolean;

  yearsubscriptions: IYearSubscription[];

  editForm = this.fb.group({
    id: [],
    content: [],
    type: [],
    filename: []
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected jhiAlertService: JhiAlertService,
    protected subscriptionDocsService: SubscriptionDocsService,
    protected yearSubscriptionService: YearSubscriptionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ subscriptionDocs }) => {
      this.updateForm(subscriptionDocs);
    });
    this.yearSubscriptionService
      .query()
      .subscribe(
        (res: HttpResponse<IYearSubscription[]>) => (this.yearsubscriptions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(subscriptionDocs: ISubscriptionDocs) {
    this.editForm.patchValue({
      id: subscriptionDocs.id,
      content: subscriptionDocs.content,
      type: subscriptionDocs.type,
      filename: subscriptionDocs.filename
    });
  }

  byteSize(field) {
    return this.dataUtils.byteSize(field);
  }

  openFile(contentType, field) {
    return this.dataUtils.openFile(contentType, field);
  }

  setFileData(event, field: string, isImage) {
    return new Promise((resolve, reject) => {
      if (event && event.target && event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        if (isImage && !file.type.startsWith('image/')) {
          reject(`File was expected to be an image but was found to be ${file.type}`);
        } else {
          const filedContentType: string = field + 'ContentType';
          this.dataUtils.toBase64(file, base64Data => {
            this.editForm.patchValue({
              [field]: base64Data,
              [filedContentType]: file.type
            });
          });
        }
      } else {
        reject(`Base64 data was not set as file could not be extracted from passed parameter: ${event}`);
      }
    }).then(
      // eslint-disable-next-line no-console
      () => console.log('blob added'), // success
      this.onError
    );
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const subscriptionDocs = this.createFromForm();
    if (subscriptionDocs.id !== undefined) {
      this.subscribeToSaveResponse(this.subscriptionDocsService.update(subscriptionDocs));
    } else {
      this.subscribeToSaveResponse(this.subscriptionDocsService.create(subscriptionDocs));
    }
  }

  private createFromForm(): ISubscriptionDocs {
    return {
      ...new SubscriptionDocs(),
      id: this.editForm.get(['id']).value,
      content: this.editForm.get(['content']).value,
      type: this.editForm.get(['type']).value,
      filename: this.editForm.get(['filename']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubscriptionDocs>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackYearSubscriptionById(index: number, item: IYearSubscription) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
