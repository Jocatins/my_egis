import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IParcel, Parcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { BatchService } from 'app/entities/batch/batch.service';
import { DashboardService } from 'app/dashboard/dashboard.service';
import { IEGISDIctionary } from 'app/application/model/egisdictionary.model';
import { IBatch } from 'app/shared/model/batch.model';

@Component({
  selector: 'jhi-parcel-update',
  templateUrl: './parcel-update.component.html'
})
export class ParcelExtUpdateComponent implements OnInit {
  isSaving: boolean;

  bSaveContinue: boolean;

  addresses: IAddress[];

  transactions: ITransaction[];
  surveyDateDp: any;

  spatialUnitLinkTypes: IEGISDIctionary[];
  landUseCategorys: IEGISDIctionary[];
  propertyTypes: IEGISDIctionary[];
  locationOfLands: IEGISDIctionary[];
  builtUpAreaTypes: IEGISDIctionary[];
  measurementTypes: IEGISDIctionary[];
  landUseTypes: IEGISDIctionary[];
  developmentStatus: IEGISDIctionary[];
  tenureTypes: IEGISDIctionary[];
  typeOfAccomodations: IEGISDIctionary[];
  c: IEGISDIctionary[];

  editForm = this.fb.group({
    id: [],
    label: [],
    area: [],
    spatialUnitType: [],
    registrationOfficeDictionary: [],
    surveyType: [],
    surveyDate: [],
    propertyType: [],
    accommodation: [],
    tenureType: [],
    description: [],
    propertyArea: [],
    location: [],
    builtUpAreaType: [],
    planNumber: [],
    measurementUnitType: [],
    premiumValue: [],
    landUseCategory: [],
    landUseType: [],
    developmentStatus: [],
    coordinateN: [],
    coordinateS: [],
    lagosSheetNumber: [],
    allocation: [],
    location1: [],
    unitNumber: [],
    name: [],
    registerType: [],
    valuation: [],
    comments: [],
    legalDescription: [],
    meansOfAcq: [],
    address: []
  });

  batchId: number;
  parcelId: number;
  newOrEdit: string;

  constructor(
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected parcelService: ParcelService,
    protected addressService: AddressService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    protected batchService: BatchService,
    protected dashboardService: DashboardService,
    private fb: FormBuilder
  ) {
    this.batchId = activatedRoute.snapshot.params['batchId'];
    this.parcelId = activatedRoute.snapshot.params['parcelId'];
    this.newOrEdit = activatedRoute.snapshot.params['newOrEdit'];
  }

  ngOnInit() {
    this.isSaving = false;
    this.bSaveContinue = false;
    this.activatedRoute.data.subscribe(({ parcel }) => {
      this.updateForm(parcel);
    });
    this.addressService.query({ filter: 'parcel-is-null' }).subscribe(
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
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.spatialUnitLinkTypes = DashboardService.spatialUnitLinkTypes;
    this.landUseCategorys = DashboardService.landUseCategorys;
    this.propertyTypes = DashboardService.propertyTypes;
    this.locationOfLands = DashboardService.locationOfLands;
    this.builtUpAreaTypes = DashboardService.builtUpAreaTypes;
    this.measurementTypes = DashboardService.measurementTypes;
    this.landUseTypes = DashboardService.landUseTypes;
    this.tenureTypes = DashboardService.tenureTypes;
    this.typeOfAccomodations = DashboardService.typeOfAccomodations;
  }

  updateForm(parcel: IParcel) {
    this.editForm.patchValue({
      id: parcel.id,
      label: parcel.label,
      area: parcel.area,
      spatialUnitType: parcel.spatialUnitType,
      registrationOfficeDictionary: parcel.registrationOfficeDictionary,
      surveyType: parcel.surveyType,
      surveyDate: parcel.surveyDate,
      propertyType: parcel.propertyType,
      accommodation: parcel.accommodation,
      tenureType: parcel.tenureType,
      description: parcel.description,
      propertyArea: parcel.propertyArea,
      location: parcel.location,
      builtUpAreaType: parcel.builtUpAreaType,
      planNumber: parcel.planNumber,
      measurementUnitType: parcel.measurementUnitType,
      premiumValue: parcel.premiumValue,
      landUseCategory: parcel.landUseCategory,
      landUseType: parcel.landUseType,
      developmentStatus: parcel.developmentStatus,
      coordinateN: parcel.coordinateN,
      coordinateS: parcel.coordinateS,
      lagosSheetNumber: parcel.lagosSheetNumber,
      allocation: parcel.allocation,
      location1: parcel.location1,
      unitNumber: parcel.unitNumber,
      name: parcel.name,
      registerType: parcel.registerType,
      valuation: parcel.valuation,
      comments: parcel.comments,
      legalDescription: parcel.legalDescription,
      meansOfAcq: parcel.meansOfAcq,
      address: parcel.address
    });
  }

  proceedToDocuments() {
    this.router.navigate(['/application/supporting-docs', this.batchId]);
  }
  previousState() {
    window.history.back();
  }

  saveAndContinue(batch: IBatch) {
    this.bSaveContinue = true;
  }

  save() {
    this.isSaving = true;
    const parcel = this.createFromForm();
    if (parcel.id !== undefined) {
      this.subscribeToSaveResponse(this.parcelService.update(parcel));
    } else {
      this.subscribeToSaveResponse(this.parcelService.create(parcel));
    }
  }

  private createFromForm(): IParcel {
    return {
      ...new Parcel(),
      id: this.editForm.get(['id']).value,
      label: this.editForm.get(['label']).value,
      area: this.editForm.get(['area']).value,
      spatialUnitType: this.editForm.get(['spatialUnitType']).value,
      registrationOfficeDictionary: this.editForm.get(['registrationOfficeDictionary']).value,
      surveyType: this.editForm.get(['surveyType']).value,
      surveyDate: this.editForm.get(['surveyDate']).value,
      propertyType: this.editForm.get(['propertyType']).value,
      accommodation: this.editForm.get(['accommodation']).value,
      tenureType: this.editForm.get(['tenureType']).value,
      description: this.editForm.get(['description']).value,
      propertyArea: this.editForm.get(['propertyArea']).value,
      location: this.editForm.get(['location']).value,
      builtUpAreaType: this.editForm.get(['builtUpAreaType']).value,
      planNumber: this.editForm.get(['planNumber']).value,
      measurementUnitType: this.editForm.get(['measurementUnitType']).value,
      premiumValue: this.editForm.get(['premiumValue']).value,
      landUseCategory: this.editForm.get(['landUseCategory']).value,
      landUseType: this.editForm.get(['landUseType']).value,
      developmentStatus: this.editForm.get(['developmentStatus']).value,
      coordinateN: this.editForm.get(['coordinateN']).value,
      coordinateS: this.editForm.get(['coordinateS']).value,
      lagosSheetNumber: this.editForm.get(['lagosSheetNumber']).value,
      allocation: this.editForm.get(['allocation']).value,
      location1: this.editForm.get(['location1']).value,
      unitNumber: this.editForm.get(['unitNumber']).value,
      name: this.editForm.get(['name']).value,
      registerType: this.editForm.get(['registerType']).value,
      valuation: this.editForm.get(['valuation']).value,
      comments: this.editForm.get(['comments']).value,
      legalDescription: this.editForm.get(['legalDescription']).value,
      meansOfAcq: this.editForm.get(['meansOfAcq']).value,
      address: this.editForm.get(['address']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcel>>) {
    // update the transsaction if this is new
    if (this.newOrEdit === 'new') {
      result.subscribe(
        data => {
          const parcel = data.body;
          this.batchService.find(this.batchId).subscribe(dBatch => {
            if (dBatch.body.transactions[0].parcels == null) {
              dBatch.body.transactions[0].parcels = [];
            }
            dBatch.body.transactions[0].parcels.push(parcel);
            this.transactionService.update(dBatch.body.transactions[0]).subscribe(
              () => {
                this.onSaveSuccess();
              },
              () => {
                this.onSaveError();
              }
            );
          });
        },
        () => this.onSaveError()
      );
    } else {
      result.subscribe(
        () => {
          alert('No transaction update required');
          this.onSaveSuccess();
        },
        () => this.onSaveError()
      );
    }
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.proceedToDocuments();
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

  trackTransactionById(index: number, item: ITransaction) {
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
