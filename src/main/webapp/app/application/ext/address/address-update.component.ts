import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';
import { IAddress, Address } from 'app/shared/model/address.model';
import { AddressService } from './address.service';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { DictionaryService } from 'app/entities/dictionary/dictionary.service';

@Component({
  selector: 'jhi-address-update',
  templateUrl: './address-update.component.html'
})
export class AddressUpdateComponent implements OnInit {
  isSaving: boolean;

  dictionaries: IDictionary[];

  editForm = this.fb.group({
    id: [],
    addressAreaName: [],
    streetName: [],
    buildingName: [],
    buildingNumber: [],
    postalCode: [],
    city: [],
    village: [],
    streetNumber: [],
    town: [],
    ward: [],
    blockNumber: [],
    plotNumber: [],
    country: [],
    region: [],
    district: [],
    state: [],
    estateName: [],
    localGovernmentArea: [],
    localCouncilArea: [],
    streetType: [],
    stateOfOrigin: [],
    schemeName: [],
    category: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected addressService: AddressService,
    protected dictionaryService: DictionaryService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ address }) => {
      this.updateForm(address);
    });
    this.dictionaryService
      .query()
      .subscribe(
        (res: HttpResponse<IDictionary[]>) => (this.dictionaries = res.body),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(address: IAddress) {
    this.editForm.patchValue({
      id: address.id,
      addressAreaName: address.addressAreaName,
      streetName: address.streetName,
      buildingName: address.buildingName,
      buildingNumber: address.buildingNumber,
      postalCode: address.postalCode,
      city: address.city,
      village: address.village,
      streetNumber: address.streetNumber,
      town: address.town,
      ward: address.ward,
      blockNumber: address.blockNumber,
      plotNumber: address.plotNumber,
      country: address.country,
      region: address.region,
      district: address.district,
      state: address.state,
      estateName: address.estateName,
      localGovernmentArea: address.localGovernmentArea,
      localCouncilArea: address.localCouncilArea,
      streetType: address.streetType,
      stateOfOrigin: address.stateOfOrigin,
      schemeName: address.schemeName,
      category: address.category
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const address = this.createFromForm();
    if (address.id !== undefined) {
      this.subscribeToSaveResponse(this.addressService.update(address));
    } else {
      this.subscribeToSaveResponse(this.addressService.create(address));
    }
  }

  private createFromForm(): IAddress {
    return {
      ...new Address(),
      id: this.editForm.get(['id']).value,
      addressAreaName: this.editForm.get(['addressAreaName']).value,
      streetName: this.editForm.get(['streetName']).value,
      buildingName: this.editForm.get(['buildingName']).value,
      buildingNumber: this.editForm.get(['buildingNumber']).value,
      postalCode: this.editForm.get(['postalCode']).value,
      city: this.editForm.get(['city']).value,
      village: this.editForm.get(['village']).value,
      streetNumber: this.editForm.get(['streetNumber']).value,
      town: this.editForm.get(['town']).value,
      ward: this.editForm.get(['ward']).value,
      blockNumber: this.editForm.get(['blockNumber']).value,
      plotNumber: this.editForm.get(['plotNumber']).value,
      country: this.editForm.get(['country']).value,
      region: this.editForm.get(['region']).value,
      district: this.editForm.get(['district']).value,
      state: this.editForm.get(['state']).value,
      estateName: this.editForm.get(['estateName']).value,
      localGovernmentArea: this.editForm.get(['localGovernmentArea']).value,
      localCouncilArea: this.editForm.get(['localCouncilArea']).value,
      streetType: this.editForm.get(['streetType']).value,
      stateOfOrigin: this.editForm.get(['stateOfOrigin']).value,
      schemeName: this.editForm.get(['schemeName']).value,
      category: this.editForm.get(['category']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAddress>>) {
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
}
