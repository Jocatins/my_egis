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
  governmentStatuses: IDictionary[];
  developmentStatus: IDictionary[];
  tenureTypes: IDictionary[];
  streetTypes: IDictionary[];
  typeOfAccomodations: IDictionary[];
  surveyPlanTypes: IDictionary[];
  estates: IDictionary[];
  schemes: IDictionary[];
  accommodationTypes: IDictionary[];
  districts: IDictionary[];
  lgas: IDictionary[];
  states: IDictionary[];



  batchId: number;
  parcelId: number;
  newOrEdit: string;


  editForm = this.fb.group({
    id: [],
    propertyNumber: [],
    parcelLineage: [],
    surveyPlanNumber: [],
    propertyDescription: [],
    area:  [null, [Validators.required]],
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
    district: [],
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
    allocationName: []  });

  constructor(
    private router: Router,
    protected jhiAlertService: JhiAlertService,
    protected parcelService: ParcelService,
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

    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => {
          this.dictionaries = res.body

          this.spatialUnitLinkTypes = this.dictionaries.filter(x => x.category === 'spatial_unit_link_type')
          this.landUseCategorys = this.dictionaries.filter(x => x.category === 'land_use_category')
          this.propertyTypes = this.dictionaries.filter(x => x.category === 'property_type')
          this.streetTypes = this.dictionaries.filter(x => x.category === 'street_type')
          this.locationOfLands = this.dictionaries.filter(x => x.category === 'location_of_land')
          this.builtUpAreaTypes = this.dictionaries.filter(x => x.category === 'built_up_area_type')
          this.measurementTypes = this.dictionaries.filter(x => x.category === 'measurement_type')
          this.landUseTypes = this.dictionaries.filter(x => x.category === 'land_use_type')
          this.governmentStatuses = this.dictionaries.filter(x => x.category === 'government_status')
          this.developmentStatus = this.dictionaries.filter(x => x.category === 'development_status')
          this.tenureTypes = this.dictionaries.filter(x => x.category === 'tenure_type')
          this.typeOfAccomodations = this.dictionaries.filter(x => x.category === 'type_of_accomodation')
          this.surveyPlanTypes = this.dictionaries.filter(x => x.category === 'survey_plan_type')
          this.estates= this.dictionaries.filter(x => x.category === 'estate_name')
          this.schemes= this.dictionaries.filter(x => x.category === 'scheme_name')
          this.accommodationTypes= this.dictionaries.filter(x => x.category === 'type_of_accomodation')
          this.districts= this.dictionaries.filter(x => x.category === 'district')
          this.lgas= this.dictionaries.filter(x => x.category === 'local_government_area')
          this.states= this.dictionaries.filter(x => x.category === 'state')




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
      district: parcel.district,
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
      district: this.editForm.get(['district']).value,
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
      allocationName: this.editForm.get(['allocationName']).value
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
