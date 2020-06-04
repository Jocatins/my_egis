import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { IParty, Party } from 'app/shared/model/party.model';
import { PartyService } from './party.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from 'app/entities/batch/batch.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';

@Component({
  selector: 'jhi-party-update',
  templateUrl: './party-update.component.html'
})
export class PartyUpdateComponent implements OnInit {
  isSaving: boolean;

  dictionaries: IDictionary[];

  batches: IBatch[];

  transactions: ITransaction[];
  personIdDateDp: any;
  personIdExpirationDateDp: any;
  birthDateDp: any;
  iDDocumentIssuedDateDp: any;
  iDDocumentExpirationDateDp: any;

  editForm = this.fb.group({
    id: [],
    primaryParty: [],
    emailAddress: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    payerId: [],
    taxPayerNumber: [],
    payeNumber: [],
    comments: [],
    personIdDate: [],
    personIdExpirationDate: [],
    rcNumber: [],
    organization: [],
    birthPlace: [],
    birthDate: [],
    firstName: [],
    middleName: [],
    lastName: [],
    occupation: [],
    unitNumber: [],
    blockNumber: [],
    plotNumber: [],
    streetNumber: [],
    streetName: [],
    buildingName: [],
    buildingNumber: [],
    postalCode: [],
    city: [],
    village: [],
    longAddress: [],
    town: [],
    ward: [],
    nextOfKinPhone: [],
    iDDocumentIssuedDate: [],
    iDDocumentExpirationDate: [],
    iDDocumentNumber: [],
    partyType: [null, Validators.required],
    partyRoleType: [null, Validators.required],
    personType: [],
    emailType: [null, Validators.required],
    personIdIssuedBy: [],
    personTitle: [],
    gender: [],
    civilState: [],
    driverLicenseRegion: [],
    businessNature: [],
    phoneCategory: [null, Validators.required],
    nextOfKinPhoneCategory: [],
    emailCategory: [],
    addressCategory: [],
    iDDocumentType: [],
    iDDocumentIssuedBy: [],
    suffixTitle: [],
    stateofOrigin: [],
    maritalStatus: [],
    streetType: [],
    estateName: [],
    schemeName: [],
    district: [],
    localGovernmentArea: [],
    country: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partyService: PartyService,
    protected dictionaryService: DictionaryService,
    protected batchService: BatchService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ party }) => {
      this.updateForm(party);
    });
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.batchService
      .query()
      .subscribe((res: HttpResponse<IBatch[]>) => (this.batches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(party: IParty) {
    this.editForm.patchValue({
      id: party.id,
      primaryParty: party.primaryParty,
      emailAddress: party.emailAddress,
      phoneNumber: party.phoneNumber,
      payerId: party.payerId,
      taxPayerNumber: party.taxPayerNumber,
      payeNumber: party.payeNumber,
      comments: party.comments,
      personIdDate: party.personIdDate,
      personIdExpirationDate: party.personIdExpirationDate,
      rcNumber: party.rcNumber,
      organization: party.organization,
      birthPlace: party.birthPlace,
      birthDate: party.birthDate,
      firstName: party.firstName,
      middleName: party.middleName,
      lastName: party.lastName,
      occupation: party.occupation,
      unitNumber: party.unitNumber,
      blockNumber: party.blockNumber,
      plotNumber: party.plotNumber,
      streetNumber: party.streetNumber,
      streetName: party.streetName,
      buildingName: party.buildingName,
      buildingNumber: party.buildingNumber,
      postalCode: party.postalCode,
      city: party.city,
      village: party.village,
      longAddress: party.longAddress,
      town: party.town,
      ward: party.ward,
      nextOfKinPhone: party.nextOfKinPhone,
      iDDocumentIssuedDate: party.iDDocumentIssuedDate,
      iDDocumentExpirationDate: party.iDDocumentExpirationDate,
      iDDocumentNumber: party.iDDocumentNumber,
      partyType: party.partyType,
      partyRoleType: party.partyRoleType,
      personType: party.personType,
      emailType: party.emailType,
      personIdIssuedBy: party.personIdIssuedBy,
      personTitle: party.personTitle,
      gender: party.gender,
      civilState: party.civilState,
      driverLicenseRegion: party.driverLicenseRegion,
      businessNature: party.businessNature,
      phoneCategory: party.phoneCategory,
      nextOfKinPhoneCategory: party.nextOfKinPhoneCategory,
      emailCategory: party.emailCategory,
      addressCategory: party.addressCategory,
      iDDocumentType: party.iDDocumentType,
      iDDocumentIssuedBy: party.iDDocumentIssuedBy,
      suffixTitle: party.suffixTitle,
      stateofOrigin: party.stateofOrigin,
      maritalStatus: party.maritalStatus,
      streetType: party.streetType,
      estateName: party.estateName,
      schemeName: party.schemeName,
      district: party.district,
      localGovernmentArea: party.localGovernmentArea,
      country: party.country
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const party = this.createFromForm();
    if (party.id !== undefined) {
      this.subscribeToSaveResponse(this.partyService.update(party));
    } else {
      this.subscribeToSaveResponse(this.partyService.create(party));
    }
  }

  private createFromForm(): IParty {
    return {
      ...new Party(),
      id: this.editForm.get(['id']).value,
      primaryParty: this.editForm.get(['primaryParty']).value,
      emailAddress: this.editForm.get(['emailAddress']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      payerId: this.editForm.get(['payerId']).value,
      taxPayerNumber: this.editForm.get(['taxPayerNumber']).value,
      payeNumber: this.editForm.get(['payeNumber']).value,
      comments: this.editForm.get(['comments']).value,
      personIdDate: this.editForm.get(['personIdDate']).value,
      personIdExpirationDate: this.editForm.get(['personIdExpirationDate']).value,
      rcNumber: this.editForm.get(['rcNumber']).value,
      organization: this.editForm.get(['organization']).value,
      birthPlace: this.editForm.get(['birthPlace']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      firstName: this.editForm.get(['firstName']).value,
      middleName: this.editForm.get(['middleName']).value,
      lastName: this.editForm.get(['lastName']).value,
      occupation: this.editForm.get(['occupation']).value,
      unitNumber: this.editForm.get(['unitNumber']).value,
      blockNumber: this.editForm.get(['blockNumber']).value,
      plotNumber: this.editForm.get(['plotNumber']).value,
      streetNumber: this.editForm.get(['streetNumber']).value,
      streetName: this.editForm.get(['streetName']).value,
      buildingName: this.editForm.get(['buildingName']).value,
      buildingNumber: this.editForm.get(['buildingNumber']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      city: this.editForm.get(['city']).value,
      village: this.editForm.get(['village']).value,
      longAddress: this.editForm.get(['longAddress']).value,
      town: this.editForm.get(['town']).value,
      ward: this.editForm.get(['ward']).value,
      nextOfKinPhone: this.editForm.get(['nextOfKinPhone']).value,
      iDDocumentIssuedDate: this.editForm.get(['iDDocumentIssuedDate']).value,
      iDDocumentExpirationDate: this.editForm.get(['iDDocumentExpirationDate']).value,
      iDDocumentNumber: this.editForm.get(['iDDocumentNumber']).value,
      partyType: this.editForm.get(['partyType']).value,
      partyRoleType: this.editForm.get(['partyRoleType']).value,
      personType: this.editForm.get(['personType']).value,
      emailType: this.editForm.get(['emailType']).value,
      personIdIssuedBy: this.editForm.get(['personIdIssuedBy']).value,
      personTitle: this.editForm.get(['personTitle']).value,
      gender: this.editForm.get(['gender']).value,
      civilState: this.editForm.get(['civilState']).value,
      driverLicenseRegion: this.editForm.get(['driverLicenseRegion']).value,
      businessNature: this.editForm.get(['businessNature']).value,
      phoneCategory: this.editForm.get(['phoneCategory']).value,
      nextOfKinPhoneCategory: this.editForm.get(['nextOfKinPhoneCategory']).value,
      emailCategory: this.editForm.get(['emailCategory']).value,
      addressCategory: this.editForm.get(['addressCategory']).value,
      iDDocumentType: this.editForm.get(['iDDocumentType']).value,
      iDDocumentIssuedBy: this.editForm.get(['iDDocumentIssuedBy']).value,
      suffixTitle: this.editForm.get(['suffixTitle']).value,
      stateofOrigin: this.editForm.get(['stateofOrigin']).value,
      maritalStatus: this.editForm.get(['maritalStatus']).value,
      streetType: this.editForm.get(['streetType']).value,
      estateName: this.editForm.get(['estateName']).value,
      schemeName: this.editForm.get(['schemeName']).value,
      district: this.editForm.get(['district']).value,
      localGovernmentArea: this.editForm.get(['localGovernmentArea']).value,
      country: this.editForm.get(['country']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParty>>) {
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

  trackBatchById(index: number, item: IBatch) {
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
