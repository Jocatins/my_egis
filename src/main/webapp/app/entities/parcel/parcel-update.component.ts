import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IParcel, Parcel } from 'app/shared/model/parcel.model';
import { ParcelService } from './parcel.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';

@Component({
  selector: 'jhi-parcel-update',
  templateUrl: './parcel-update.component.html'
})
export class ParcelUpdateComponent implements OnInit {
  isSaving: boolean;

  dictionaries: IDictionary[];

  transactions: ITransaction[];

  editForm = this.fb.group({
    id: [],
    propertyNumber: [],
    parcelLineage: [],
    surveyPlanNumber: [],
    propertyDescription: [],
    area: [],
    description: [],
    propertyArea: [],
    planNumber: [],
    premiumValue: [],
    coordinateN: [],
    coordinateE: [],
    lagosSheetNumber: [],
    unitNumber: [],
    valuationAmount: [],
    comments: [],
    streetNumber: [],
    streetName: [],
    blockNumber: [null, [Validators.required]],
    plotNumber: [null, [Validators.required]],
    ward: [],
    town: [],
    village: [],
    upin: [],
    comment: [],
    location: [],
    builtUpAreaType: [],
    measurementUnitType: [null, Validators.required],
    landUseCategory: [],
    landUseType: [],
    developmentStatus: [],
    governmentStatus: [],
    propertyType: [null, Validators.required],
    streetType: [],
    estateName: [],
    schemeName: [],
    state: [],
    localGovernmentArea: [null, Validators.required],
    locationofLand: [],
    typeOfAccommodation: [],
    tenureType: [],
    district: [],
    allocationName: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected parcelService: ParcelService,
    protected dictionaryService: DictionaryService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ parcel }) => {
      this.updateForm(parcel);
    });
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body),
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
      propertyNumber: parcel.propertyNumber,
      parcelLineage: parcel.parcelLineage,
      surveyPlanNumber: parcel.surveyPlanNumber,
      propertyDescription: parcel.propertyDescription,
      area: parcel.area,
      description: parcel.description,
      propertyArea: parcel.propertyArea,
      planNumber: parcel.planNumber,
      premiumValue: parcel.premiumValue,
      coordinateN: parcel.coordinateN,
      coordinateE: parcel.coordinateE,
      lagosSheetNumber: parcel.lagosSheetNumber,
      unitNumber: parcel.unitNumber,
      valuationAmount: parcel.valuationAmount,
      comments: parcel.comments,
      streetNumber: parcel.streetNumber,
      streetName: parcel.streetName,
      blockNumber: parcel.blockNumber,
      plotNumber: parcel.plotNumber,
      ward: parcel.ward,
      town: parcel.town,
      village: parcel.village,
      upin: parcel.upin,
      comment: parcel.comment,
      location: parcel.location,
      builtUpAreaType: parcel.builtUpAreaType,
      measurementUnitType: parcel.measurementUnitType,
      landUseCategory: parcel.landUseCategory,
      landUseType: parcel.landUseType,
      developmentStatus: parcel.developmentStatus,
      governmentStatus: parcel.governmentStatus,
      propertyType: parcel.propertyType,
      streetType: parcel.streetType,
      estateName: parcel.estateName,
      schemeName: parcel.schemeName,
      state: parcel.state,
      localGovernmentArea: parcel.localGovernmentArea,
      locationofLand: parcel.locationofLand,
      typeOfAccommodation: parcel.typeOfAccommodation,
      tenureType: parcel.tenureType,
      district: parcel.district,
      allocationName: parcel.allocationName
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
      propertyNumber: this.editForm.get(['propertyNumber']).value,
      parcelLineage: this.editForm.get(['parcelLineage']).value,
      surveyPlanNumber: this.editForm.get(['surveyPlanNumber']).value,
      propertyDescription: this.editForm.get(['propertyDescription']).value,
      area: this.editForm.get(['area']).value,
      description: this.editForm.get(['description']).value,
      propertyArea: this.editForm.get(['propertyArea']).value,
      planNumber: this.editForm.get(['planNumber']).value,
      premiumValue: this.editForm.get(['premiumValue']).value,
      coordinateN: this.editForm.get(['coordinateN']).value,
      coordinateE: this.editForm.get(['coordinateE']).value,
      lagosSheetNumber: this.editForm.get(['lagosSheetNumber']).value,
      unitNumber: this.editForm.get(['unitNumber']).value,
      valuationAmount: this.editForm.get(['valuationAmount']).value,
      comments: this.editForm.get(['comments']).value,
      streetNumber: this.editForm.get(['streetNumber']).value,
      streetName: this.editForm.get(['streetName']).value,
      blockNumber: this.editForm.get(['blockNumber']).value,
      plotNumber: this.editForm.get(['plotNumber']).value,
      ward: this.editForm.get(['ward']).value,
      town: this.editForm.get(['town']).value,
      village: this.editForm.get(['village']).value,
      upin: this.editForm.get(['upin']).value,
      comment: this.editForm.get(['comment']).value,
      location: this.editForm.get(['location']).value,
      builtUpAreaType: this.editForm.get(['builtUpAreaType']).value,
      measurementUnitType: this.editForm.get(['measurementUnitType']).value,
      landUseCategory: this.editForm.get(['landUseCategory']).value,
      landUseType: this.editForm.get(['landUseType']).value,
      developmentStatus: this.editForm.get(['developmentStatus']).value,
      governmentStatus: this.editForm.get(['governmentStatus']).value,
      propertyType: this.editForm.get(['propertyType']).value,
      streetType: this.editForm.get(['streetType']).value,
      estateName: this.editForm.get(['estateName']).value,
      schemeName: this.editForm.get(['schemeName']).value,
      state: this.editForm.get(['state']).value,
      localGovernmentArea: this.editForm.get(['localGovernmentArea']).value,
      locationofLand: this.editForm.get(['locationofLand']).value,
      typeOfAccommodation: this.editForm.get(['typeOfAccommodation']).value,
      tenureType: this.editForm.get(['tenureType']).value,
      district: this.editForm.get(['district']).value,
      allocationName: this.editForm.get(['allocationName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParcel>>) {
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
