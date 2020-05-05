import { element, by, ElementFinder } from 'protractor';

export class TransactionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transaction div table .btn-danger'));
  title = element.all(by.css('jhi-transaction div h2#page-heading span')).first();

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

export class TransactionUpdatePage {
  pageTitle = element(by.id('jhi-transaction-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  transactionNumberInput = element(by.id('field_transactionNumber'));
  applicationDateInput = element(by.id('field_applicationDate'));
  transactionStartDateInput = element(by.id('field_transactionStartDate'));
  commentsInput = element(by.id('field_comments'));
  createDateInput = element(by.id('field_createDate'));
  startDateInput = element(by.id('field_startDate'));
  completeDateInput = element(by.id('field_completeDate'));
  batchIdInput = element(by.id('field_batchId'));
  transactionCodeInput = element(by.id('field_transactionCode'));
  extSelect = element(by.id('field_ext'));
  transactionTypeSelect = element(by.id('field_transactionType'));
  transactionSubTypeSelect = element(by.id('field_transactionSubType'));
  ownershipTypeSelect = element(by.id('field_ownershipType'));
  tenureTypeSelect = element(by.id('field_tenureType'));
  partySelect = element(by.id('field_party'));
  parcelSelect = element(by.id('field_parcel'));
  docsSelect = element(by.id('field_docs'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTransactionNumberInput(transactionNumber) {
    await this.transactionNumberInput.sendKeys(transactionNumber);
  }

  async getTransactionNumberInput() {
    return await this.transactionNumberInput.getAttribute('value');
  }

  async setApplicationDateInput(applicationDate) {
    await this.applicationDateInput.sendKeys(applicationDate);
  }

  async getApplicationDateInput() {
    return await this.applicationDateInput.getAttribute('value');
  }

  async setTransactionStartDateInput(transactionStartDate) {
    await this.transactionStartDateInput.sendKeys(transactionStartDate);
  }

  async getTransactionStartDateInput() {
    return await this.transactionStartDateInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return await this.commentsInput.getAttribute('value');
  }

  async setCreateDateInput(createDate) {
    await this.createDateInput.sendKeys(createDate);
  }

  async getCreateDateInput() {
    return await this.createDateInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return await this.startDateInput.getAttribute('value');
  }

  async setCompleteDateInput(completeDate) {
    await this.completeDateInput.sendKeys(completeDate);
  }

  async getCompleteDateInput() {
    return await this.completeDateInput.getAttribute('value');
  }

  async setBatchIdInput(batchId) {
    await this.batchIdInput.sendKeys(batchId);
  }

  async getBatchIdInput() {
    return await this.batchIdInput.getAttribute('value');
  }

  async setTransactionCodeInput(transactionCode) {
    await this.transactionCodeInput.sendKeys(transactionCode);
  }

  async getTransactionCodeInput() {
    return await this.transactionCodeInput.getAttribute('value');
  }

  async extSelectLastOption() {
    await this.extSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async extSelectOption(option) {
    await this.extSelect.sendKeys(option);
  }

  getExtSelect(): ElementFinder {
    return this.extSelect;
  }

  async getExtSelectedOption() {
    return await this.extSelect.element(by.css('option:checked')).getText();
  }

  async transactionTypeSelectLastOption() {
    await this.transactionTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async transactionTypeSelectOption(option) {
    await this.transactionTypeSelect.sendKeys(option);
  }

  getTransactionTypeSelect(): ElementFinder {
    return this.transactionTypeSelect;
  }

  async getTransactionTypeSelectedOption() {
    return await this.transactionTypeSelect.element(by.css('option:checked')).getText();
  }

  async transactionSubTypeSelectLastOption() {
    await this.transactionSubTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async transactionSubTypeSelectOption(option) {
    await this.transactionSubTypeSelect.sendKeys(option);
  }

  getTransactionSubTypeSelect(): ElementFinder {
    return this.transactionSubTypeSelect;
  }

  async getTransactionSubTypeSelectedOption() {
    return await this.transactionSubTypeSelect.element(by.css('option:checked')).getText();
  }

  async ownershipTypeSelectLastOption() {
    await this.ownershipTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async ownershipTypeSelectOption(option) {
    await this.ownershipTypeSelect.sendKeys(option);
  }

  getOwnershipTypeSelect(): ElementFinder {
    return this.ownershipTypeSelect;
  }

  async getOwnershipTypeSelectedOption() {
    return await this.ownershipTypeSelect.element(by.css('option:checked')).getText();
  }

  async tenureTypeSelectLastOption() {
    await this.tenureTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tenureTypeSelectOption(option) {
    await this.tenureTypeSelect.sendKeys(option);
  }

  getTenureTypeSelect(): ElementFinder {
    return this.tenureTypeSelect;
  }

  async getTenureTypeSelectedOption() {
    return await this.tenureTypeSelect.element(by.css('option:checked')).getText();
  }

  async partySelectLastOption() {
    await this.partySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async partySelectOption(option) {
    await this.partySelect.sendKeys(option);
  }

  getPartySelect(): ElementFinder {
    return this.partySelect;
  }

  async getPartySelectedOption() {
    return await this.partySelect.element(by.css('option:checked')).getText();
  }

  async parcelSelectLastOption() {
    await this.parcelSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async parcelSelectOption(option) {
    await this.parcelSelect.sendKeys(option);
  }

  getParcelSelect(): ElementFinder {
    return this.parcelSelect;
  }

  async getParcelSelectedOption() {
    return await this.parcelSelect.element(by.css('option:checked')).getText();
  }

  async docsSelectLastOption() {
    await this.docsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async docsSelectOption(option) {
    await this.docsSelect.sendKeys(option);
  }

  getDocsSelect(): ElementFinder {
    return this.docsSelect;
  }

  async getDocsSelectedOption() {
    return await this.docsSelect.element(by.css('option:checked')).getText();
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

export class TransactionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transaction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transaction'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
