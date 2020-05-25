import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';
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

  statesOfOrigin: IDictionary[];
  civilStates: IDictionary[];
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
  documentTypes: IDictionary[];
  maritalStatuses: IDictionary[];
  phoneCategories: IDictionary[];
  lgas: IDictionary[];
  estates: IDictionary[];
  schemes: IDictionary[];
  streetTypes: IDictionary[];
  districts: IDictionary[];
  countries: IDictionary[];
  newOrEdit: string;
  batchId: number;

  editForm = this.fb.group({
    id: [],
    primaryParty: [null, [Validators.required]],
    emailAddress: [null, [Validators.required]],
    phoneNumber: [null, [Validators.required]],
    partyRoleType: [null, Validators.required],
    emailType: [null, Validators.required],
    phoneCategory: [null, Validators.required],
    country: [null, Validators.required],
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
    personType: [],
    personIdIssuedBy: [],
    personTitle: [],
    gender: [],
    civilState: [],
    driverLicenseRegion: [],
    businessNature: [],
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
    partyType: [null, Validators.required],
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected partyService: PartyService,
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

    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => {
          this.dictionaries = res.body
          this.civilStates = this.dictionaries.filter(x => x.category === 'state')
          this.statesOfOrigin = this.dictionaries.filter(x => x.category === 'state')
          this.partyTypes= this.dictionaries.filter(x => x.category === 'party_type')
          this.partyRoleTypes= this.dictionaries.filter(x => x.category === 'party_role_type')
          this.districts= this.dictionaries.filter(x => x.category === 'district')
          this.streetTypes= this.dictionaries.filter(x => x.category === 'street_type')
          this.issuedBys= this.dictionaries.filter(x => x.category === 'issued_by')
          this.personTitles= this.dictionaries.filter(x => x.category === 'person_title')
          this.genders= this.dictionaries.filter(x => x.category === 'gender')
          this.natureOfBuss= this.dictionaries.filter(x => x.category === 'nature_of_business')
          this.maritalStatuses= this.dictionaries.filter(x => x.category === 'marital_status')
          this.documentTypes= this.dictionaries.filter(x => x.category === 'document_type')
          this.estates= this.dictionaries.filter(x => x.category === 'estate_name')
          this.schemes= this.dictionaries.filter(x => x.category === 'scheme_name')
          this.lgas= this.dictionaries.filter(x => x.category === 'local_government_area')
          this.countries= this.dictionaries.filter(x => x.category === 'country')
          this.emailTypes= this.dictionaries.filter(x => x.category === 'email_category')
          this.phoneCategories= this.dictionaries.filter(x => x.category === 'phone_category')

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
    // window.history.back();
    this.router.navigate(['/application/applicants', this.batchId]);
  }

  save() {
    this.isSaving = true;
    const party = this.createFromForm();
    const priParty = party.primaryParty;
    if (party.id !== undefined) {
      this.subscribeToSaveResponse(this.partyService.update(party));
    } else {
      this.newOrEdit = "new"
      this.subscribeToSaveResponse(this.partyService.create(party));
    }
  }

  private createFromForm(): IParty {
    // alert(this.editForm.get(['primaryParty']).get("label"))
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
