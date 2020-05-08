import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMetadata, Metadata } from 'app/shared/model/metadata.model';
import { MetadataService } from './metadata.service';

@Component({
  selector: 'jhi-metadata-update',
  templateUrl: './metadata-update.component.html'
})
export class MetadataUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    hjtype: [],
    code: [],
    label: [],
    descr: [],
    category: [],
    generalTerm: [],
    sortOrder: [],
    hidden: [],
    groupName: [],
    workflow: [],
    groupCode: [],
    normalDuration: [],
    lapsedDuration: [],
    maxDuration: [],
    rightType: [],
    rightTypeMultiple: [],
    rightTypeOther: [],
    createNewRrs: [],
    modifyActiveRrrs: [],
    relatedActiveRrrs: [],
    dischargeActiveRrrs: [],
    blockedActiveRrrs: [],
    metaType: [],
    sourcePartyType: [],
    targetPartyType: [],
    otherPartyType: [],
    relatedTransactionCode: [],
    cashierTransactionCode: [],
    feePaymentCodes: [],
    mandatoryDocsCodes: [],
    mandatoryScanOutgoingDocsCodes: [],
    createMutateProperty: [],
    referencedProperties: [],
    priorRequiredTransactions: [],
    createNewParty: [],
    partyBusinessRules: [],
    reportTemplates: [],
    detachable: [],
    parentTransactionType: [],
    internalCode: [],
    version: [],
    beginLifespanVersion: [],
    endLifespanVersion: [],
    tranIndex: []
  });

  constructor(protected metadataService: MetadataService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ metadata }) => {
      this.updateForm(metadata);
    });
  }

  updateForm(metadata: IMetadata) {
    this.editForm.patchValue({
      id: metadata.id,
      hjtype: metadata.hjtype,
      code: metadata.code,
      label: metadata.label,
      descr: metadata.descr,
      category: metadata.category,
      generalTerm: metadata.generalTerm,
      sortOrder: metadata.sortOrder,
      hidden: metadata.hidden,
      groupName: metadata.groupName,
      workflow: metadata.workflow,
      groupCode: metadata.groupCode,
      normalDuration: metadata.normalDuration,
      lapsedDuration: metadata.lapsedDuration,
      maxDuration: metadata.maxDuration,
      rightType: metadata.rightType,
      rightTypeMultiple: metadata.rightTypeMultiple,
      rightTypeOther: metadata.rightTypeOther,
      createNewRrs: metadata.createNewRrs,
      modifyActiveRrrs: metadata.modifyActiveRrrs,
      relatedActiveRrrs: metadata.relatedActiveRrrs,
      dischargeActiveRrrs: metadata.dischargeActiveRrrs,
      blockedActiveRrrs: metadata.blockedActiveRrrs,
      metaType: metadata.metaType,
      sourcePartyType: metadata.sourcePartyType,
      targetPartyType: metadata.targetPartyType,
      otherPartyType: metadata.otherPartyType,
      relatedTransactionCode: metadata.relatedTransactionCode,
      cashierTransactionCode: metadata.cashierTransactionCode,
      feePaymentCodes: metadata.feePaymentCodes,
      mandatoryDocsCodes: metadata.mandatoryDocsCodes,
      mandatoryScanOutgoingDocsCodes: metadata.mandatoryScanOutgoingDocsCodes,
      createMutateProperty: metadata.createMutateProperty,
      referencedProperties: metadata.referencedProperties,
      priorRequiredTransactions: metadata.priorRequiredTransactions,
      createNewParty: metadata.createNewParty,
      partyBusinessRules: metadata.partyBusinessRules,
      reportTemplates: metadata.reportTemplates,
      detachable: metadata.detachable,
      parentTransactionType: metadata.parentTransactionType,
      internalCode: metadata.internalCode,
      version: metadata.version,
      beginLifespanVersion: metadata.beginLifespanVersion,
      endLifespanVersion: metadata.endLifespanVersion,
      tranIndex: metadata.tranIndex
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const metadata = this.createFromForm();
    if (metadata.id !== undefined) {
      this.subscribeToSaveResponse(this.metadataService.update(metadata));
    } else {
      this.subscribeToSaveResponse(this.metadataService.create(metadata));
    }
  }

  private createFromForm(): IMetadata {
    return {
      ...new Metadata(),
      id: this.editForm.get(['id']).value,
      hjtype: this.editForm.get(['hjtype']).value,
      code: this.editForm.get(['code']).value,
      label: this.editForm.get(['label']).value,
      descr: this.editForm.get(['descr']).value,
      category: this.editForm.get(['category']).value,
      generalTerm: this.editForm.get(['generalTerm']).value,
      sortOrder: this.editForm.get(['sortOrder']).value,
      hidden: this.editForm.get(['hidden']).value,
      groupName: this.editForm.get(['groupName']).value,
      workflow: this.editForm.get(['workflow']).value,
      groupCode: this.editForm.get(['groupCode']).value,
      normalDuration: this.editForm.get(['normalDuration']).value,
      lapsedDuration: this.editForm.get(['lapsedDuration']).value,
      maxDuration: this.editForm.get(['maxDuration']).value,
      rightType: this.editForm.get(['rightType']).value,
      rightTypeMultiple: this.editForm.get(['rightTypeMultiple']).value,
      rightTypeOther: this.editForm.get(['rightTypeOther']).value,
      createNewRrs: this.editForm.get(['createNewRrs']).value,
      modifyActiveRrrs: this.editForm.get(['modifyActiveRrrs']).value,
      relatedActiveRrrs: this.editForm.get(['relatedActiveRrrs']).value,
      dischargeActiveRrrs: this.editForm.get(['dischargeActiveRrrs']).value,
      blockedActiveRrrs: this.editForm.get(['blockedActiveRrrs']).value,
      metaType: this.editForm.get(['metaType']).value,
      sourcePartyType: this.editForm.get(['sourcePartyType']).value,
      targetPartyType: this.editForm.get(['targetPartyType']).value,
      otherPartyType: this.editForm.get(['otherPartyType']).value,
      relatedTransactionCode: this.editForm.get(['relatedTransactionCode']).value,
      cashierTransactionCode: this.editForm.get(['cashierTransactionCode']).value,
      feePaymentCodes: this.editForm.get(['feePaymentCodes']).value,
      mandatoryDocsCodes: this.editForm.get(['mandatoryDocsCodes']).value,
      mandatoryScanOutgoingDocsCodes: this.editForm.get(['mandatoryScanOutgoingDocsCodes']).value,
      createMutateProperty: this.editForm.get(['createMutateProperty']).value,
      referencedProperties: this.editForm.get(['referencedProperties']).value,
      priorRequiredTransactions: this.editForm.get(['priorRequiredTransactions']).value,
      createNewParty: this.editForm.get(['createNewParty']).value,
      partyBusinessRules: this.editForm.get(['partyBusinessRules']).value,
      reportTemplates: this.editForm.get(['reportTemplates']).value,
      detachable: this.editForm.get(['detachable']).value,
      parentTransactionType: this.editForm.get(['parentTransactionType']).value,
      internalCode: this.editForm.get(['internalCode']).value,
      version: this.editForm.get(['version']).value,
      beginLifespanVersion: this.editForm.get(['beginLifespanVersion']).value,
      endLifespanVersion: this.editForm.get(['endLifespanVersion']).value,
      tranIndex: this.editForm.get(['tranIndex']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMetadata>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
