import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ISurveyor, Surveyor } from 'app/shared/model/surveyor.model';
import { SurveyorService } from './surveyor.service';
import { IYearSubscription } from 'app/shared/model/year-subscription.model';
import { YearSubscriptionService } from 'app/entities/year-subscription/year-subscription.service';

@Component({
  selector: 'jhi-surveyor-update',
  templateUrl: './surveyor-update.component.html'
})
export class SurveyorUpdateComponent implements OnInit {
  isSaving: boolean;

  yearsubscriptions: IYearSubscription[];
  requestDateDp: any;
  processedDateDp: any;

  editForm = this.fb.group({
    id: [],
    email: [],
    surconNumber: [],
    registrationNumber: [],
    phone: [],
    status: [],
    requestDate: [],
    processedDate: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected surveyorService: SurveyorService,
    protected yearSubscriptionService: YearSubscriptionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ surveyor }) => {
      this.updateForm(surveyor);
    });
    this.yearSubscriptionService
      .query()
      .subscribe(
        (res: HttpResponse<IYearSubscription[]>) => (this.yearsubscriptions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(surveyor: ISurveyor) {
    this.editForm.patchValue({
      id: surveyor.id,
      email: surveyor.email,
      surconNumber: surveyor.surconNumber,
      registrationNumber: surveyor.registrationNumber,
      phone: surveyor.phone,
      status: surveyor.status,
      requestDate: surveyor.requestDate,
      processedDate: surveyor.processedDate
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const surveyor = this.createFromForm();
    if (surveyor.id !== undefined) {
      this.subscribeToSaveResponse(this.surveyorService.update(surveyor));
    } else {
      this.subscribeToSaveResponse(this.surveyorService.create(surveyor));
    }
  }

  private createFromForm(): ISurveyor {
    return {
      ...new Surveyor(),
      id: this.editForm.get(['id']).value,
      email: this.editForm.get(['email']).value,
      surconNumber: this.editForm.get(['surconNumber']).value,
      registrationNumber: this.editForm.get(['registrationNumber']).value,
      phone: this.editForm.get(['phone']).value,
      status: this.editForm.get(['status']).value,
      requestDate: this.editForm.get(['requestDate']).value,
      processedDate: this.editForm.get(['processedDate']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISurveyor>>) {
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
