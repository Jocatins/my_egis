import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IYearSubscription, YearSubscription } from 'app/shared/model/year-subscription.model';
import { YearSubscriptionService } from './year-subscription.service';
import { ISurveyor } from 'app/shared/model/surveyor.model';
import { SurveyorService } from 'app/entities/surveyor/surveyor.service';
import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';
import { SubscriptionDocsService } from 'app/entities/subscription-docs/subscription-docs.service';

@Component({
  selector: 'jhi-year-subscription-update',
  templateUrl: './year-subscription-update.component.html'
})
export class YearSubscriptionUpdateComponent implements OnInit {
  isSaving: boolean;

  surveyors: ISurveyor[];

  subscriptiondocs: ISubscriptionDocs[];
  requestDateDp: any;
  processedDateDp: any;

  editForm = this.fb.group({
    id: [],
    year: [],
    status: [],
    requestDate: [],
    processedDate: [],
    surveyors: [],
    subscriptionDocs: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected yearSubscriptionService: YearSubscriptionService,
    protected surveyorService: SurveyorService,
    protected subscriptionDocsService: SubscriptionDocsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ yearSubscription }) => {
      this.updateForm(yearSubscription);
    });
    this.surveyorService
      .query()
      .subscribe((res: HttpResponse<ISurveyor[]>) => (this.surveyors = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.subscriptionDocsService
      .query()
      .subscribe(
        (res: HttpResponse<ISubscriptionDocs[]>) => (this.subscriptiondocs = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(yearSubscription: IYearSubscription) {
    this.editForm.patchValue({
      id: yearSubscription.id,
      year: yearSubscription.year,
      status: yearSubscription.status,
      requestDate: yearSubscription.requestDate,
      processedDate: yearSubscription.processedDate,
      surveyors: yearSubscription.surveyors,
      subscriptionDocs: yearSubscription.subscriptionDocs
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const yearSubscription = this.createFromForm();
    if (yearSubscription.id !== undefined) {
      this.subscribeToSaveResponse(this.yearSubscriptionService.update(yearSubscription));
    } else {
      this.subscribeToSaveResponse(this.yearSubscriptionService.create(yearSubscription));
    }
  }

  private createFromForm(): IYearSubscription {
    return {
      ...new YearSubscription(),
      id: this.editForm.get(['id']).value,
      year: this.editForm.get(['year']).value,
      status: this.editForm.get(['status']).value,
      requestDate: this.editForm.get(['requestDate']).value,
      processedDate: this.editForm.get(['processedDate']).value,
      surveyors: this.editForm.get(['surveyors']).value,
      subscriptionDocs: this.editForm.get(['subscriptionDocs']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IYearSubscription>>) {
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

  trackSurveyorById(index: number, item: ISurveyor) {
    return item.id;
  }

  trackSubscriptionDocsById(index: number, item: ISubscriptionDocs) {
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
