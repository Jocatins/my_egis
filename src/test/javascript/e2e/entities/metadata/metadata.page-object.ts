import { element, by, ElementFinder } from 'protractor';

export class MetadataComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-metadata div table .btn-danger'));
  title = element.all(by.css('jhi-metadata div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class MetadataUpdatePage {
  pageTitle = element(by.id('jhi-metadata-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  hjtypeInput = element(by.id('field_hjtype'));
  codeInput = element(by.id('field_code'));
  labelInput = element(by.id('field_label'));
  descrInput = element(by.id('field_descr'));
  categoryInput = element(by.id('field_category'));
  generalTermInput = element(by.id('field_generalTerm'));
  sortOrderInput = element(by.id('field_sortOrder'));
  hiddenInput = element(by.id('field_hidden'));
  groupNameInput = element(by.id('field_groupName'));
  workflowInput = element(by.id('field_workflow'));
  groupCodeInput = element(by.id('field_groupCode'));
  normalDurationInput = element(by.id('field_normalDuration'));
  lapsedDurationInput = element(by.id('field_lapsedDuration'));
  maxDurationInput = element(by.id('field_maxDuration'));
  rightTypeInput = element(by.id('field_rightType'));
  rightTypeMultipleInput = element(by.id('field_rightTypeMultiple'));
  rightTypeOtherInput = element(by.id('field_rightTypeOther'));
  createNewRrsInput = element(by.id('field_createNewRrs'));
  modifyActiveRrrsInput = element(by.id('field_modifyActiveRrrs'));
  relatedActiveRrrsInput = element(by.id('field_relatedActiveRrrs'));
  dischargeActiveRrrsInput = element(by.id('field_dischargeActiveRrrs'));
  blockedActiveRrrsInput = element(by.id('field_blockedActiveRrrs'));
  metaTypeInput = element(by.id('field_metaType'));
  sourcePartyTypeInput = element(by.id('field_sourcePartyType'));
  targetPartyTypeInput = element(by.id('field_targetPartyType'));
  otherPartyTypeInput = element(by.id('field_otherPartyType'));
  relatedTransactionCodeInput = element(by.id('field_relatedTransactionCode'));
  cashierTransactionCodeInput = element(by.id('field_cashierTransactionCode'));
  feePaymentCodesInput = element(by.id('field_feePaymentCodes'));
  mandatoryDocsCodesInput = element(by.id('field_mandatoryDocsCodes'));
  mandatoryScanOutgoingDocsCodesInput = element(by.id('field_mandatoryScanOutgoingDocsCodes'));
  createMutatePropertyInput = element(by.id('field_createMutateProperty'));
  referencedPropertiesInput = element(by.id('field_referencedProperties'));
  priorRequiredTransactionsInput = element(by.id('field_priorRequiredTransactions'));
  createNewPartyInput = element(by.id('field_createNewParty'));
  partyBusinessRulesInput = element(by.id('field_partyBusinessRules'));
  reportTemplatesInput = element(by.id('field_reportTemplates'));
  detachableInput = element(by.id('field_detachable'));
  parentTransactionTypeInput = element(by.id('field_parentTransactionType'));
  internalCodeInput = element(by.id('field_internalCode'));
  versionInput = element(by.id('field_version'));
  beginLifespanVersionInput = element(by.id('field_beginLifespanVersion'));
  endLifespanVersionInput = element(by.id('field_endLifespanVersion'));
  tranIndexInput = element(by.id('field_tranIndex'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setHjtypeInput(hjtype) {
    await this.hjtypeInput.sendKeys(hjtype);
  }

  async getHjtypeInput() {
    return await this.hjtypeInput.getAttribute('value');
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return await this.codeInput.getAttribute('value');
  }

  async setLabelInput(label) {
    await this.labelInput.sendKeys(label);
  }

  async getLabelInput() {
    return await this.labelInput.getAttribute('value');
  }

  async setDescrInput(descr) {
    await this.descrInput.sendKeys(descr);
  }

  async getDescrInput() {
    return await this.descrInput.getAttribute('value');
  }

  async setCategoryInput(category) {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput() {
    return await this.categoryInput.getAttribute('value');
  }

  async setGeneralTermInput(generalTerm) {
    await this.generalTermInput.sendKeys(generalTerm);
  }

  async getGeneralTermInput() {
    return await this.generalTermInput.getAttribute('value');
  }

  async setSortOrderInput(sortOrder) {
    await this.sortOrderInput.sendKeys(sortOrder);
  }

  async getSortOrderInput() {
    return await this.sortOrderInput.getAttribute('value');
  }

  async setHiddenInput(hidden) {
    await this.hiddenInput.sendKeys(hidden);
  }

  async getHiddenInput() {
    return await this.hiddenInput.getAttribute('value');
  }

  async setGroupNameInput(groupName) {
    await this.groupNameInput.sendKeys(groupName);
  }

  async getGroupNameInput() {
    return await this.groupNameInput.getAttribute('value');
  }

  async setWorkflowInput(workflow) {
    await this.workflowInput.sendKeys(workflow);
  }

  async getWorkflowInput() {
    return await this.workflowInput.getAttribute('value');
  }

  async setGroupCodeInput(groupCode) {
    await this.groupCodeInput.sendKeys(groupCode);
  }

  async getGroupCodeInput() {
    return await this.groupCodeInput.getAttribute('value');
  }

  async setNormalDurationInput(normalDuration) {
    await this.normalDurationInput.sendKeys(normalDuration);
  }

  async getNormalDurationInput() {
    return await this.normalDurationInput.getAttribute('value');
  }

  async setLapsedDurationInput(lapsedDuration) {
    await this.lapsedDurationInput.sendKeys(lapsedDuration);
  }

  async getLapsedDurationInput() {
    return await this.lapsedDurationInput.getAttribute('value');
  }

  async setMaxDurationInput(maxDuration) {
    await this.maxDurationInput.sendKeys(maxDuration);
  }

  async getMaxDurationInput() {
    return await this.maxDurationInput.getAttribute('value');
  }

  async setRightTypeInput(rightType) {
    await this.rightTypeInput.sendKeys(rightType);
  }

  async getRightTypeInput() {
    return await this.rightTypeInput.getAttribute('value');
  }

  async setRightTypeMultipleInput(rightTypeMultiple) {
    await this.rightTypeMultipleInput.sendKeys(rightTypeMultiple);
  }

  async getRightTypeMultipleInput() {
    return await this.rightTypeMultipleInput.getAttribute('value');
  }

  async setRightTypeOtherInput(rightTypeOther) {
    await this.rightTypeOtherInput.sendKeys(rightTypeOther);
  }

  async getRightTypeOtherInput() {
    return await this.rightTypeOtherInput.getAttribute('value');
  }

  async setCreateNewRrsInput(createNewRrs) {
    await this.createNewRrsInput.sendKeys(createNewRrs);
  }

  async getCreateNewRrsInput() {
    return await this.createNewRrsInput.getAttribute('value');
  }

  async setModifyActiveRrrsInput(modifyActiveRrrs) {
    await this.modifyActiveRrrsInput.sendKeys(modifyActiveRrrs);
  }

  async getModifyActiveRrrsInput() {
    return await this.modifyActiveRrrsInput.getAttribute('value');
  }

  async setRelatedActiveRrrsInput(relatedActiveRrrs) {
    await this.relatedActiveRrrsInput.sendKeys(relatedActiveRrrs);
  }

  async getRelatedActiveRrrsInput() {
    return await this.relatedActiveRrrsInput.getAttribute('value');
  }

  async setDischargeActiveRrrsInput(dischargeActiveRrrs) {
    await this.dischargeActiveRrrsInput.sendKeys(dischargeActiveRrrs);
  }

  async getDischargeActiveRrrsInput() {
    return await this.dischargeActiveRrrsInput.getAttribute('value');
  }

  async setBlockedActiveRrrsInput(blockedActiveRrrs) {
    await this.blockedActiveRrrsInput.sendKeys(blockedActiveRrrs);
  }

  async getBlockedActiveRrrsInput() {
    return await this.blockedActiveRrrsInput.getAttribute('value');
  }

  async setMetaTypeInput(metaType) {
    await this.metaTypeInput.sendKeys(metaType);
  }

  async getMetaTypeInput() {
    return await this.metaTypeInput.getAttribute('value');
  }

  async setSourcePartyTypeInput(sourcePartyType) {
    await this.sourcePartyTypeInput.sendKeys(sourcePartyType);
  }

  async getSourcePartyTypeInput() {
    return await this.sourcePartyTypeInput.getAttribute('value');
  }

  async setTargetPartyTypeInput(targetPartyType) {
    await this.targetPartyTypeInput.sendKeys(targetPartyType);
  }

  async getTargetPartyTypeInput() {
    return await this.targetPartyTypeInput.getAttribute('value');
  }

  async setOtherPartyTypeInput(otherPartyType) {
    await this.otherPartyTypeInput.sendKeys(otherPartyType);
  }

  async getOtherPartyTypeInput() {
    return await this.otherPartyTypeInput.getAttribute('value');
  }

  async setRelatedTransactionCodeInput(relatedTransactionCode) {
    await this.relatedTransactionCodeInput.sendKeys(relatedTransactionCode);
  }

  async getRelatedTransactionCodeInput() {
    return await this.relatedTransactionCodeInput.getAttribute('value');
  }

  async setCashierTransactionCodeInput(cashierTransactionCode) {
    await this.cashierTransactionCodeInput.sendKeys(cashierTransactionCode);
  }

  async getCashierTransactionCodeInput() {
    return await this.cashierTransactionCodeInput.getAttribute('value');
  }

  async setFeePaymentCodesInput(feePaymentCodes) {
    await this.feePaymentCodesInput.sendKeys(feePaymentCodes);
  }

  async getFeePaymentCodesInput() {
    return await this.feePaymentCodesInput.getAttribute('value');
  }

  async setMandatoryDocsCodesInput(mandatoryDocsCodes) {
    await this.mandatoryDocsCodesInput.sendKeys(mandatoryDocsCodes);
  }

  async getMandatoryDocsCodesInput() {
    return await this.mandatoryDocsCodesInput.getAttribute('value');
  }

  async setMandatoryScanOutgoingDocsCodesInput(mandatoryScanOutgoingDocsCodes) {
    await this.mandatoryScanOutgoingDocsCodesInput.sendKeys(mandatoryScanOutgoingDocsCodes);
  }

  async getMandatoryScanOutgoingDocsCodesInput() {
    return await this.mandatoryScanOutgoingDocsCodesInput.getAttribute('value');
  }

  async setCreateMutatePropertyInput(createMutateProperty) {
    await this.createMutatePropertyInput.sendKeys(createMutateProperty);
  }

  async getCreateMutatePropertyInput() {
    return await this.createMutatePropertyInput.getAttribute('value');
  }

  async setReferencedPropertiesInput(referencedProperties) {
    await this.referencedPropertiesInput.sendKeys(referencedProperties);
  }

  async getReferencedPropertiesInput() {
    return await this.referencedPropertiesInput.getAttribute('value');
  }

  async setPriorRequiredTransactionsInput(priorRequiredTransactions) {
    await this.priorRequiredTransactionsInput.sendKeys(priorRequiredTransactions);
  }

  async getPriorRequiredTransactionsInput() {
    return await this.priorRequiredTransactionsInput.getAttribute('value');
  }

  async setCreateNewPartyInput(createNewParty) {
    await this.createNewPartyInput.sendKeys(createNewParty);
  }

  async getCreateNewPartyInput() {
    return await this.createNewPartyInput.getAttribute('value');
  }

  async setPartyBusinessRulesInput(partyBusinessRules) {
    await this.partyBusinessRulesInput.sendKeys(partyBusinessRules);
  }

  async getPartyBusinessRulesInput() {
    return await this.partyBusinessRulesInput.getAttribute('value');
  }

  async setReportTemplatesInput(reportTemplates) {
    await this.reportTemplatesInput.sendKeys(reportTemplates);
  }

  async getReportTemplatesInput() {
    return await this.reportTemplatesInput.getAttribute('value');
  }

  async setDetachableInput(detachable) {
    await this.detachableInput.sendKeys(detachable);
  }

  async getDetachableInput() {
    return await this.detachableInput.getAttribute('value');
  }

  async setParentTransactionTypeInput(parentTransactionType) {
    await this.parentTransactionTypeInput.sendKeys(parentTransactionType);
  }

  async getParentTransactionTypeInput() {
    return await this.parentTransactionTypeInput.getAttribute('value');
  }

  async setInternalCodeInput(internalCode) {
    await this.internalCodeInput.sendKeys(internalCode);
  }

  async getInternalCodeInput() {
    return await this.internalCodeInput.getAttribute('value');
  }

  async setVersionInput(version) {
    await this.versionInput.sendKeys(version);
  }

  async getVersionInput() {
    return await this.versionInput.getAttribute('value');
  }

  async setBeginLifespanVersionInput(beginLifespanVersion) {
    await this.beginLifespanVersionInput.sendKeys(beginLifespanVersion);
  }

  async getBeginLifespanVersionInput() {
    return await this.beginLifespanVersionInput.getAttribute('value');
  }

  async setEndLifespanVersionInput(endLifespanVersion) {
    await this.endLifespanVersionInput.sendKeys(endLifespanVersion);
  }

  async getEndLifespanVersionInput() {
    return await this.endLifespanVersionInput.getAttribute('value');
  }

  async setTranIndexInput(tranIndex) {
    await this.tranIndexInput.sendKeys(tranIndex);
  }

  async getTranIndexInput() {
    return await this.tranIndexInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class MetadataDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-metadata-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-metadata'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
