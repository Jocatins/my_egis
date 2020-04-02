import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
import { IParty, Party } from 'app/shared/model/party.model';
import { PartyService } from './party.service';
import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';
import { IBatch } from 'app/shared/model/batch.model';
import { BatchService } from 'app/entities/batch/batch.service';
import { ITransaction } from 'app/shared/model/transaction.model';
import { TransactionService } from 'app/entities/transaction/transaction.service';
import { IEGISDIctionary } from 'app/application/model/egisdictionary.model';
import { DashboardService } from 'app/dashboard/dashboard.service';

@Component({
  selector: 'jhi-party-update',
  templateUrl: './party-update.component.html'
})
export class PartyExtUpdateComponent implements OnInit {
  isSaving: boolean;

  addresses: IAddress[];

  batches: IBatch[];
  batchId: number;
  newOrEdit: string;

  transactions: ITransaction[];
  personIdDateDp: any;
  personIdExpirationDateDp: any;
  birthDateDp: any;

  states: IEGISDIctionary[];
  partyTypes: IEGISDIctionary[];
  partyRoleTypes: IEGISDIctionary[];
  partySubRoleTypes: IEGISDIctionary[];
  deliveryTypes: IEGISDIctionary[];
  personIdTypes: IEGISDIctionary[];
  personTypes: IEGISDIctionary[];
  emailTypes: IEGISDIctionary[];
  issued_bys: IEGISDIctionary[];
  issuedBys: IEGISDIctionary[];
  personTitles: IEGISDIctionary[];
  genders: IEGISDIctionary[];
  natureOfBuss: IEGISDIctionary[];
  legalRoles: IEGISDIctionary[];
  d: IEGISDIctionary[];
  e: IEGISDIctionary[];

  editForm = this.fb.group({
    id: [],
    partyType: [null, [Validators.required]],
    partyRoleType: [null, [Validators.required]],
    partySubRoleType: [],
    deliveryType: [],
    partyName: [],
    shareNominator: [],
    shareDenominator: [],
    taxExempt: [],
    primaryParty: [],
    otherName: [],
    personIdType: [],
    personType: [],
    fax: [],
    email: [],
    emailType: [],
    phoneNumber: [],
    payerId: [],
    taxPayerNumber: [],
    comments: [],
    personIdIssuedBy: [],
    personIdDate: [],
    personIdExpirationDate: [],
    rcNumber: [],
    organization: [],
    businessNature: [],
    birthPlace: [],
    birthDate: [],
    personTitle: [],
    gender: [],
    firstName: [],
    middleName: [],
    lastName: [],
    civilState: [],
    driverLicenseRegion: [],
    driverLicence: [],
    representativeId: [],
    professionRegNo: [],
    occupation: [],

    address: [],
    addressId: [],
    addressAreaName: [],
    streetName: [],
    buildingName: [],
    buildingNumber: [],
    postalCode: [],
    city: [],
    country: [],
    region: [],
    district: [],
    village: [],
    state: [],
    estateName: [],
    localGovernmentArea: [],
    localCouncilArea: [],
    streetNumber: [],
    streetType: [],
    town: [],
    ward: [],
    category: [],
    stateOfOrigin: [],
    schemeName: [],
    blockNumber: [],
    plotNumber: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partyService: PartyService,
    protected addressService: AddressService,
    protected batchService: BatchService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    protected dashboardService: DashboardService,
    private fb: FormBuilder,
    protected eventManager: JhiEventManager,
    private router: Router
  ) {
    this.batchId = activatedRoute.snapshot.params['batchId'];
    this.newOrEdit = activatedRoute.snapshot.params['newOrEdit'];
  }

  ngOnInit() {
    this.isSaving = false;
    // alert(this.batchId)
    this.activatedRoute.data.subscribe(({ party }) => {
      this.updateForm(party);
      this.updateAddressForm(party.address);
    });
    this.addressService.query({ filter: 'party-is-null' }).subscribe(
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
    this.batchService
      .query()
      .subscribe((res: HttpResponse<IBatch[]>) => (this.batches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );

    this.dashboardService.fetchDictionaryValuesObj('state').subscribe(
      data => {
        this.states = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('party_type').subscribe(
      data => {
        this.partyTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('party_role_type').subscribe(
      data => {
        this.partyRoleTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('party_sub_role_type').subscribe(
      data => {
        this.partySubRoleTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('delivery_type').subscribe(
      data => {
        this.deliveryTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('person_id_type').subscribe(
      data => {
        this.personIdTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('person_type').subscribe(
      data => {
        this.personTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('email_category').subscribe(
      data => {
        this.emailTypes = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('issued_by').subscribe(
      data => {
        this.issuedBys = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('person_title').subscribe(
      data => {
        this.personTitles = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('gender').subscribe(
      data => {
        this.genders = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('nature_of_business').subscribe(
      data => {
        this.natureOfBuss = JSON.parse(data.body.category);
      },
      err => {}
    );

    this.dashboardService.fetchDictionaryValuesObj('legal_role').subscribe(
      data => {
        this.legalRoles = JSON.parse(data.body.category);
      },
      err => {}
    );
  }

  updateForm(party: IParty) {
    this.editForm.patchValue({
      id: party.id,
      partyType: party.partyType,
      partyRoleType: party.partyRoleType,
      partySubRoleType: party.partySubRoleType,
      deliveryType: party.deliveryType,
      partyName: party.partyName,
      shareNominator: party.shareNominator,
      shareDenominator: party.shareDenominator,
      taxExempt: party.taxExempt,
      primaryParty: party.primaryParty,
      otherName: party.otherName,
      personIdType: party.personIdType,
      personType: party.personType,
      fax: party.fax,
      email: party.email,
      emailType: party.emailType,
      phoneNumber: party.phoneNumber,
      payerId: party.payerId,
      taxPayerNumber: party.taxPayerNumber,
      comments: party.comments,
      personIdIssuedBy: party.personIdIssuedBy,
      personIdDate: party.personIdDate,
      personIdExpirationDate: party.personIdExpirationDate,
      rcNumber: party.rcNumber,
      organization: party.organization,
      businessNature: party.businessNature,
      birthPlace: party.birthPlace,
      birthDate: party.birthDate,
      personTitle: party.personTitle,
      gender: party.gender,
      firstName: party.firstName,
      middleName: party.middleName,
      lastName: party.lastName,
      civilState: party.civilState,
      driverLicenseRegion: party.driverLicenseRegion,
      driverLicence: party.driverLicence,
      representativeId: party.representativeId,
      professionRegNo: party.professionRegNo,
      occupation: party.occupation,
      address: party.address
    });
  }

  updateAddressForm(address: IAddress) {
    this.editForm.patchValue({
      addressId: address.id,
      addressAreaName: address.addressAreaName,
      streetName: address.streetName,
      buildingName: address.buildingName,
      buildingNumber: address.buildingNumber,
      postalCode: address.postalCode,
      city: address.city,
      country: address.country,
      region: address.region,
      district: address.district,
      village: address.village,
      state: address.state,
      estateName: address.estateName,
      localGovernmentArea: address.localGovernmentArea,
      localCouncilArea: address.localCouncilArea,
      streetNumber: address.streetNumber,
      streetType: address.streetType,
      town: address.town,
      ward: address.ward,
      category: address.category,
      stateOfOrigin: address.stateOfOrigin,
      schemeName: address.schemeName,
      blockNumber: address.blockNumber,
      plotNumber: address.plotNumber
    });
  }

  private createAddressFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['addressId']).value,
      addressAreaName: this.editForm.get(['addressAreaName']).value,
      streetName: this.editForm.get(['streetName']).value,
      buildingName: this.editForm.get(['buildingName']).value,
      buildingNumber: this.editForm.get(['buildingNumber']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      city: this.editForm.get(['city']).value,
      country: this.editForm.get(['country']).value,
      region: this.editForm.get(['region']).value,
      district: this.editForm.get(['district']).value,
      village: this.editForm.get(['village']).value,
      state: this.editForm.get(['state']).value,
      estateName: this.editForm.get(['estateName']).value,
      localGovernmentArea: this.editForm.get(['localGovernmentArea']).value,
      localCouncilArea: this.editForm.get(['localCouncilArea']).value,
      streetNumber: this.editForm.get(['streetNumber']).value,
      streetType: this.editForm.get(['streetType']).value,
      town: this.editForm.get(['town']).value,
      ward: this.editForm.get(['ward']).value,
      category: this.editForm.get(['category']).value,
      stateOfOrigin: this.editForm.get(['stateOfOrigin']).value,
      schemeName: this.editForm.get(['schemeName']).value,
      blockNumber: this.editForm.get(['blockNumber']).value,
      plotNumber: this.editForm.get(['plotNumber']).value
    };
  }

  previousState() {
    // window.history.back();
    this.router.navigate(['/application/translanding', this.batchId]);
  }

  save() {
    this.isSaving = true;
    const party = this.createFromForm();
    alert(party.businessNature);
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
      partyType: this.editForm.get(['partyType']).value,
      partyRoleType: this.editForm.get(['partyRoleType']).value,
      partySubRoleType: this.editForm.get(['partySubRoleType']).value,
      deliveryType: this.editForm.get(['deliveryType']).value,
      partyName: this.editForm.get(['partyName']).value,
      shareNominator: this.editForm.get(['shareNominator']).value,
      shareDenominator: this.editForm.get(['shareDenominator']).value,
      taxExempt: this.editForm.get(['taxExempt']).value,
      primaryParty: this.editForm.get(['primaryParty']).value,
      otherName: this.editForm.get(['otherName']).value,
      personIdType: this.editForm.get(['personIdType']).value,
      personType: this.editForm.get(['personType']).value,
      fax: this.editForm.get(['fax']).value,
      email: this.editForm.get(['email']).value,
      emailType: this.editForm.get(['emailType']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      payerId: this.editForm.get(['payerId']).value,
      taxPayerNumber: this.editForm.get(['taxPayerNumber']).value,
      comments: this.editForm.get(['comments']).value,
      personIdIssuedBy: this.editForm.get(['personIdIssuedBy']).value,
      personIdDate: this.editForm.get(['personIdDate']).value,
      personIdExpirationDate: this.editForm.get(['personIdExpirationDate']).value,
      rcNumber: this.editForm.get(['rcNumber']).value,
      organization: this.editForm.get(['organization']).value,
      businessNature: this.editForm.get(['businessNature']).value,
      birthPlace: this.editForm.get(['birthPlace']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      personTitle: this.editForm.get(['personTitle']).value,
      gender: this.editForm.get(['gender']).value,
      firstName: this.editForm.get(['firstName']).value,
      middleName: this.editForm.get(['middleName']).value,
      lastName: this.editForm.get(['lastName']).value,
      civilState: this.editForm.get(['civilState']).value,
      driverLicenseRegion: this.editForm.get(['driverLicenseRegion']).value,
      driverLicence: this.editForm.get(['driverLicence']).value,
      representativeId: this.editForm.get(['representativeId']).value,
      professionRegNo: this.editForm.get(['professionRegNo']).value,
      occupation: this.editForm.get(['occupation']).value,
      address: this.editForm.get(['address']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IParty>>) {
    if (this.newOrEdit === 'new') {
      result.subscribe(
        party => {
          this.batchService.find(this.batchId).subscribe(dBatch => {
            const ddBatch = dBatch.body;
            const parties = ddBatch.parties;
            if (parties === null) {
              ddBatch.parties = [];
            }
            ddBatch.parties.push(party.body);
            this.batchService.update(ddBatch).subscribe(
              () => {
                this.eventManager.broadcast({
                  name: 'partyListModification',
                  content: 'Updated/Created an party'
                });

                // alert('new party successfully updated ...')
              },
              () => {
                // alert('new party update failed ...')
              }
            );
            this.onSaveSuccess();
          });
        },
        () => this.onSaveError()
      );
    } else {
      result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
    }
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
