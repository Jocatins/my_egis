import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IParcel, Parcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { BatchService } from 'app/entities/batch/batch.service';

@Component({
  selector: 'jhi-parcel-update',
  templateUrl: './parcel-update.component.html'
})
export class ParcelUpdateComponent implements OnInit {
  isSaving: boolean;

  addresses: IAddress[];

  dictionaries: IDictionary[];

  transactions: ITransaction[];
  surveyDateDp: any;

  spatialUnitLinkTypes: IDictionary[];
  landUseCategorys: IDictionary[];
  propertyTypes: IDictionary[];
  locationOfLands: IDictionary[];
  builtUpAreaTypes: IDictionary[];
  measurementTypes: IDictionary[];
  landUseTypes: IDictionary[];
  developmentStatus: IDictionary[];
  tenureTypes: IDictionary[];
  typeOfAccomodations: IDictionary[];
  surveyPlanTypes: IDictionary[];

  batchId: number;
  parcelId: number;
  newOrEdit: string;


  editForm = this.fb.group({
    id: [],
    label: [],
    area: [],
    registrationOfficeDictionary: [],
    surveyDate: [],
    accommodation: [],
    description: [],
    propertyArea: [],
    planNumber: [],
    premiumValue: [],
    coordinateN: [],
    coordinateS: [],
    lagosSheetNumber: [],
    allocation: [],
    location1: [],
    unitNumber: [],
    name: [],
    valuation: [],
    comments: [],
    legalDescription: [],
    address: [],
    spatialUnitType: [],
    surveyType: [],
    propertyType: [],
    tenureType: [],
    location: [],
    builtUpAreaType: [],
    measurementUnitType: [],
    landUseCategory: [],
    landUseType: [],
    developmentStatus: [],
    registerType: [],
    meansOfAcq: [],
    region: []
  });

  constructor(
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected parcelService: ParcelService,
    protected addressService: AddressService,
    protected dictionaryService: DictionaryService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private batchService: BatchService
  ) {

    this.batchId = activatedRoute.snapshot.params['batchId'];
    this.parcelId = activatedRoute.snapshot.params['parcelId'];
    this.newOrEdit = activatedRoute.snapshot.params['newOrEdit'];
  }

  ngOnInit() {
    this.isSaving = false;
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
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => {
          this.dictionaries = res.body

          this.spatialUnitLinkTypes = this.dictionaries.filter(x => x.category === 'spatial_unit_link_type')
          this.landUseCategorys = this.dictionaries.filter(x => x.category === 'land_use_category')
          this.propertyTypes = this.dictionaries.filter(x => x.category === 'property_type')
          this.locationOfLands = this.dictionaries.filter(x => x.category === 'location_of_land')
          this.builtUpAreaTypes = this.dictionaries.filter(x => x.category === 'built_up_area_type')
          this.measurementTypes = this.dictionaries.filter(x => x.category === 'measurement_type')
          this.landUseTypes = this.dictionaries.filter(x => x.category === 'land_use_type')
          this.developmentStatus = this.dictionaries.filter(x => x.category === 'development_status')
          this.tenureTypes = this.dictionaries.filter(x => x.category === 'tenure_type')
          this.typeOfAccomodations = this.dictionaries.filter(x => x.category === 'type_of_accomodation')
          this.surveyPlanTypes = this.dictionaries.filter(x => x.category === 'survey_plan_type')



        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(parcel: IParcel) {
    this.editForm.patchValue({
      id: parcel.id,
      label: parcel.label,
      area: parcel.area,
      registrationOfficeDictionary: parcel.registrationOfficeDictionary,
      surveyDate: parcel.surveyDate,
      accommodation: parcel.accommodation,
      description: parcel.description,
      propertyArea: parcel.propertyArea,
      planNumber: parcel.planNumber,
      premiumValue: parcel.premiumValue,
      coordinateN: parcel.coordinateN,
      coordinateS: parcel.coordinateS,
      lagosSheetNumber: parcel.lagosSheetNumber,
      allocation: parcel.allocation,
      location1: parcel.location1,
      unitNumber: parcel.unitNumber,
      name: parcel.name,
      valuation: parcel.valuation,
      comments: parcel.comments,
      legalDescription: parcel.legalDescription,
      address: parcel.address,
      spatialUnitType: parcel.spatialUnitType,
      surveyType: parcel.surveyType,
      propertyType: parcel.propertyType,
      tenureType: parcel.tenureType,
      location: parcel.location,
      builtUpAreaType: parcel.builtUpAreaType,
      measurementUnitType: parcel.measurementUnitType,
      landUseCategory: parcel.landUseCategory,
      landUseType: parcel.landUseType,
      developmentStatus: parcel.developmentStatus,
      registerType: parcel.registerType,
      meansOfAcq: parcel.meansOfAcq,
      region: parcel.region
    });
  }

  previousState() {
    window.history.back();
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
      registrationOfficeDictionary: this.editForm.get(['registrationOfficeDictionary']).value,
      surveyDate: this.editForm.get(['surveyDate']).value,
      accommodation: this.editForm.get(['accommodation']).value,
      description: this.editForm.get(['description']).value,
      propertyArea: this.editForm.get(['propertyArea']).value,
      planNumber: this.editForm.get(['planNumber']).value,
      premiumValue: this.editForm.get(['premiumValue']).value,
      coordinateN: this.editForm.get(['coordinateN']).value,
      coordinateS: this.editForm.get(['coordinateS']).value,
      lagosSheetNumber: this.editForm.get(['lagosSheetNumber']).value,
      allocation: this.editForm.get(['allocation']).value,
      location1: this.editForm.get(['location1']).value,
      unitNumber: this.editForm.get(['unitNumber']).value,
      name: this.editForm.get(['name']).value,
      valuation: this.editForm.get(['valuation']).value,
      comments: this.editForm.get(['comments']).value,
      legalDescription: this.editForm.get(['legalDescription']).value,
      address: this.editForm.get(['address']).value,
      spatialUnitType: this.editForm.get(['spatialUnitType']).value,
      surveyType: this.editForm.get(['surveyType']).value,
      propertyType: this.editForm.get(['propertyType']).value,
      tenureType: this.editForm.get(['tenureType']).value,
      location: this.editForm.get(['location']).value,
      builtUpAreaType: this.editForm.get(['builtUpAreaType']).value,
      measurementUnitType: this.editForm.get(['measurementUnitType']).value,
      landUseCategory: this.editForm.get(['landUseCategory']).value,
      landUseType: this.editForm.get(['landUseType']).value,
      developmentStatus: this.editForm.get(['developmentStatus']).value,
      registerType: this.editForm.get(['registerType']).value,
      meansOfAcq: this.editForm.get(['meansOfAcq']).value,
      region: this.editForm.get(['region']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcel>>) {
    // result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());

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
          this.onSaveSuccess();
        },
        () => this.onSaveError()
      );
    }
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.router.navigate(['/application/supporting-docs', this.batchId]);
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

  trackDictionaryById(index: number, item: IDictionary) {
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
