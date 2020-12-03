import { element, by, ElementFinder } from 'protractor';

export class TitleSelectOptionsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-title-select-options div table .btn-danger'));
  title = element.all(by.css('jhi-title-select-options div h2#page-heading span')).first();

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

export class TitleSelectOptionsUpdatePage {
  pageTitle = element(by.id('jhi-title-select-options-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  transactionIdInput = element(by.id('field_transactionId'));
  queryFieldInput = element(by.id('field_queryField'));
  queryValueInput = element(by.id('field_queryValue'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTransactionIdInput(transactionId) {
    await this.transactionIdInput.sendKeys(transactionId);
  }

  async getTransactionIdInput() {
    return await this.transactionIdInput.getAttribute('value');
  }

  async setQueryFieldInput(queryField) {
    await this.queryFieldInput.sendKeys(queryField);
  }

  async getQueryFieldInput() {
    return await this.queryFieldInput.getAttribute('value');
  }

  async setQueryValueInput(queryValue) {
    await this.queryValueInput.sendKeys(queryValue);
  }

  async getQueryValueInput() {
    return await this.queryValueInput.getAttribute('value');
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

export class TitleSelectOptionsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-titleSelectOptions-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-titleSelectOptions'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
