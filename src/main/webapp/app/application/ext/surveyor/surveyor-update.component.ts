import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { ISurveyor, Surveyor } from 'app/shared/model/surveyor.model';
import { SurveyorService } from './surveyor.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';

@Component({
  selector: 'jhi-surveyor-update',
  templateUrl: './surveyor-update.component.html'
})
export class SurveyorUpdateComponent implements OnInit {
  isSaving: boolean;

  addresses: IAddress[];

  editForm = this.fb.group({
    id: [],
    email: [],
    surconNumber: [],
    registrationNumber: [],
    phone: [],
    status: [],
    address: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected surveyorService: SurveyorService,
    protected addressService: AddressService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ surveyor }) => {
      this.updateForm(surveyor);
    });
    this.addressService.query({ filter: 'surveyor-is-null' }).subscribe(
      (res: HttpResponse<IAddress[]>) => {
        if (!this.editForm.get('address').value || !this.editForm.get('address').value.id) {
          this.addresses = res.body;
        } else {
          this.addressService
            .find(this.editForm.get('address').value.id)
            .subscribe(
              (subRes: HttpResponse<IAddress>) => (this.addresses = [subRes.body].concat(res.body)),
              (subRes: HttpErrorResponse) => this.onError(subRes.message)
            );
        }
      },
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
      address: surveyor.address
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
      address: this.editForm.get(['address']).value
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

  trackAddressById(index: number, item: IAddress) {
    return item.id;
  }
}
