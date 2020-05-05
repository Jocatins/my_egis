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
import { IAddress } from 'app/shared/model/address.model';
import { AddressService } from 'app/entities/address/address.service';
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

  addresses: IAddress[];

  dictionaries: IDictionary[];

  batches: IBatch[];

  transactions: ITransaction[];
  personIdDateDp: any;
  personIdExpirationDateDp: any;
  birthDateDp: any;

  states: IDictionary[];
  partyTypes: IDictionary[];
  partyRoleTypes: IDictionary[];
  partySubRoleTypes: IDictionary[];
  deliveryTypes: IDictionary[];
  personIdTypes: IDictionary[];
  personTypes: IDictionary[];
  emailTypes: IDictionary[];
  issued_bys: IDictionary[];
  issuedBys: IDictionary[];
  personTitles: IDictionary[];
  genders: IDictionary[];
  natureOfBuss: IDictionary[];
  legalRoles: IDictionary[];
  primaryPartys: IDictionary[];
  newOrEdit: string;
  batchId: number;

  editForm = this.fb.group({
    id: [],
    partyName: [],
    shareNominator: [],
    shareDenominator: [],
    taxExempt: [],
    otherName: [],
    fax: [],
    email: [],
    phoneNumber: [],
    payerId: [],
    taxPayerNumber: [],
    comments: [],
    personIdDate: [],
    personIdExpirationDate: [],
    rcNumber: [],
    organization: [],
    businessNature: [],
    birthPlace: [],
    birthDate: [],
    firstName: [],
    middleName: [],
    lastName: [],
    driverLicence: [],
    professionRegNo: [],
    occupation: [],
    address: [],
    partyType: [],
    partyRoleType: [],
    partySubRoleType: [],
    deliveryType: [],
    primaryParty: [],
    personIdType: [],
    personType: [],
    emailType: [],
    personIdIssuedBy: [],
    personTitle: [],
    gender: [],
    civilState: [],
    driverLicenseRegion: [],
    representativeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partyService: PartyService,
    protected addressService: AddressService,
    protected dictionaryService: DictionaryService,
    protected batchService: BatchService,
    protected transactionService: TransactionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    protected eventManager: JhiEventManager,
    private router: Router
  ) {
    this.batchId = activatedRoute.snapshot.params['batchId'];
  }

  ngOnInit() {

    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ party }) => {
      this.updateForm(party);
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
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => {
          this.dictionaries = res.body
          this.states = this.dictionaries.filter(x => x.category === 'state')
          this.partyTypes= this.dictionaries.filter(x => x.category === 'party_type')
          this.partyRoleTypes= this.dictionaries.filter(x => x.category === 'party_role_type')
          this.partySubRoleTypes= this.dictionaries.filter(x => x.category === 'party_sub_role_type')
          this.deliveryTypes= this.dictionaries.filter(x => x.category === 'delivery_type')
          this.personIdTypes= this.dictionaries.filter(x => x.category === 'person_id_type')
          this.personTypes= this.dictionaries.filter(x => x.category === 'person_type')
          this.emailTypes= this.dictionaries.filter(x => x.category === 'email_category')
          // this.issued_bys= this.dictionaries.filter(x => x.category === 'party_type')
          this.issuedBys= this.dictionaries.filter(x => x.category === 'issued_by')
          this.personTitles= this.dictionaries.filter(x => x.category === 'person_title')
          this.genders= this.dictionaries.filter(x => x.category === 'gender')
          this.natureOfBuss= this.dictionaries.filter(x => x.category === 'nature_of_business')
          this.legalRoles= this.dictionaries.filter(x => x.category === 'legal_role')
          this.primaryPartys= this.dictionaries.filter(x => x.category === 'primary_party')
        }
        ,
        (res: HttpErrorResponse) => this.onError(res.message)
      );




    this.batchService
      .query()
      .subscribe((res: HttpResponse<IBatch[]>) => (this.batches = res.body), (res: HttpErrorResponse) => this.onError(res.message));
    this.transactionService
      .query()
      .subscribe(
        (res: HttpResponse<ITransaction[]>) => (this.transactions = res.body

          ),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(party: IParty) {
    this.editForm.patchValue({
      id: party.id,
      partyName: party.partyName,
      shareNominator: party.shareNominator,
      shareDenominator: party.shareDenominator,
      taxExempt: party.taxExempt,
      otherName: party.otherName,
      fax: party.fax,
      email: party.email,
      phoneNumber: party.phoneNumber,
      payerId: party.payerId,
      taxPayerNumber: party.taxPayerNumber,
      comments: party.comments,
      personIdDate: party.personIdDate,
      personIdExpirationDate: party.personIdExpirationDate,
      rcNumber: party.rcNumber,
      organization: party.organization,
      businessNature: party.businessNature,
      birthPlace: party.birthPlace,
      birthDate: party.birthDate,
      firstName: party.firstName,
      middleName: party.middleName,
      lastName: party.lastName,
      driverLicence: party.driverLicence,
      professionRegNo: party.professionRegNo,
      occupation: party.occupation,
      address: party.address,
      partyType: party.partyType,
      partyRoleType: party.partyRoleType,
      partySubRoleType: party.partySubRoleType,
      deliveryType: party.deliveryType,
      primaryParty: party.primaryParty,
      personIdType: party.personIdType,
      personType: party.personType,
      emailType: party.emailType,
      personIdIssuedBy: party.personIdIssuedBy,
      personTitle: party.personTitle,
      gender: party.gender,
      civilState: party.civilState,
      driverLicenseRegion: party.driverLicenseRegion,
      representativeId: party.representativeId
    });
  }

  previousState() {
    // window.history.back();
    this.router.navigate(['/application/applicants', this.batchId]);
  }

  save() {
    this.isSaving = true;
    const party = this.createFromForm();
    if (party.id !== undefined) {
      this.subscribeToSaveResponse(this.partyService.update(party));
    } else {
      this.newOrEdit = "new"
      this.subscribeToSaveResponse(this.partyService.create(party));
    }
  }

  private createFromForm(): IParty {
    return {
      ...new Party(),
      id: this.editForm.get(['id']).value,
      partyName: this.editForm.get(['partyName']).value,
      shareNominator: this.editForm.get(['shareNominator']).value,
      shareDenominator: this.editForm.get(['shareDenominator']).value,
      taxExempt: this.editForm.get(['taxExempt']).value,
      otherName: this.editForm.get(['otherName']).value,
      fax: this.editForm.get(['fax']).value,
      email: this.editForm.get(['email']).value,
      phoneNumber: this.editForm.get(['phoneNumber']).value,
      payerId: this.editForm.get(['payerId']).value,
      taxPayerNumber: this.editForm.get(['taxPayerNumber']).value,
      comments: this.editForm.get(['comments']).value,
      personIdDate: this.editForm.get(['personIdDate']).value,
      personIdExpirationDate: this.editForm.get(['personIdExpirationDate']).value,
      rcNumber: this.editForm.get(['rcNumber']).value,
      organization: this.editForm.get(['organization']).value,
      businessNature: this.editForm.get(['businessNature']).value,
      birthPlace: this.editForm.get(['birthPlace']).value,
      birthDate: this.editForm.get(['birthDate']).value,
      firstName: this.editForm.get(['firstName']).value,
      middleName: this.editForm.get(['middleName']).value,
      lastName: this.editForm.get(['lastName']).value,
      driverLicence: this.editForm.get(['driverLicence']).value,
      professionRegNo: this.editForm.get(['professionRegNo']).value,
      occupation: this.editForm.get(['occupation']).value,
      address: this.editForm.get(['address']).value,
      partyType: this.editForm.get(['partyType']).value,
      partyRoleType: this.editForm.get(['partyRoleType']).value,
      partySubRoleType: this.editForm.get(['partySubRoleType']).value,
      deliveryType: this.editForm.get(['deliveryType']).value,
      primaryParty: this.editForm.get(['primaryParty']).value,
      personIdType: this.editForm.get(['personIdType']).value,
      personType: this.editForm.get(['personType']).value,
      emailType: this.editForm.get(['emailType']).value,
      personIdIssuedBy: this.editForm.get(['personIdIssuedBy']).value,
      personTitle: this.editForm.get(['personTitle']).value,
      gender: this.editForm.get(['gender']).value,
      civilState: this.editForm.get(['civilState']).value,
      driverLicenseRegion: this.editForm.get(['driverLicenseRegion']).value,
      representativeId: this.editForm.get(['representativeId']).value
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
