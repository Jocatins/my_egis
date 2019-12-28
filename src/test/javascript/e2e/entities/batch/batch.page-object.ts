import { element, by, ElementFinder } from 'protractor';

export class BatchComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-batch div table .btn-danger'));
  title = element.all(by.css('jhi-batch div h2#page-heading span')).first();

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

export class BatchUpdatePage {
  pageTitle = element(by.id('jhi-batch-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  batchNumberInput = element(by.id('field_batchNumber'));
  batchStatusInput = element(by.id('field_batchStatus'));
  invoiceNumberInput = element(by.id('field_invoiceNumber'));
  createDateInput = element(by.id('field_createDate'));
  deliveryDateInput = element(by.id('field_deliveryDate'));
  officeIdInput = element(by.id('field_officeId'));
  userSelect = element(by.id('field_user'));
  transactionSelect = element(by.id('field_transaction'));
  partySelect = element(by.id('field_party'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setBatchNumberInput(batchNumber) {
    await this.batchNumberInput.sendKeys(batchNumber);
  }

  async getBatchNumberInput() {
    return await this.batchNumberInput.getAttribute('value');
  }

  async setBatchStatusInput(batchStatus) {
    await this.batchStatusInput.sendKeys(batchStatus);
  }

  async getBatchStatusInput() {
    return await this.batchStatusInput.getAttribute('value');
  }

  async setInvoiceNumberInput(invoiceNumber) {
    await this.invoiceNumberInput.sendKeys(invoiceNumber);
  }

  async getInvoiceNumberInput() {
    return await this.invoiceNumberInput.getAttribute('value');
  }

  async setCreateDateInput(createDate) {
    await this.createDateInput.sendKeys(createDate);
  }

  async getCreateDateInput() {
    return await this.createDateInput.getAttribute('value');
  }

  async setDeliveryDateInput(deliveryDate) {
    await this.deliveryDateInput.sendKeys(deliveryDate);
  }

  async getDeliveryDateInput() {
    return await this.deliveryDateInput.getAttribute('value');
  }

  async setOfficeIdInput(officeId) {
    await this.officeIdInput.sendKeys(officeId);
  }

  async getOfficeIdInput() {
    return await this.officeIdInput.getAttribute('value');
  }

  async userSelectLastOption() {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return await this.userSelect.element(by.css('option:checked')).getText();
  }

  async transactionSelectLastOption() {
    await this.transactionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async transactionSelectOption(option) {
    await this.transactionSelect.sendKeys(option);
  }

  getTransactionSelect(): ElementFinder {
    return this.transactionSelect;
  }

  async getTransactionSelectedOption() {
    return await this.transactionSelect.element(by.css('option:checked')).getText();
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

export class BatchDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-batch-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-batch'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
