import { element, by, ElementFinder } from 'protractor';

export class SurveyorComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-surveyor div table .btn-danger'));
  title = element.all(by.css('jhi-surveyor div h2#page-heading span')).first();

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

export class SurveyorUpdatePage {
  pageTitle = element(by.id('jhi-surveyor-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  emailInput = element(by.id('field_email'));
  surconNumberInput = element(by.id('field_surconNumber'));
  registrationNumberInput = element(by.id('field_registrationNumber'));
  phoneInput = element(by.id('field_phone'));
  statusInput = element(by.id('field_status'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
  }

  async setSurconNumberInput(surconNumber) {
    await this.surconNumberInput.sendKeys(surconNumber);
  }

  async getSurconNumberInput() {
    return await this.surconNumberInput.getAttribute('value');
  }

  async setRegistrationNumberInput(registrationNumber) {
    await this.registrationNumberInput.sendKeys(registrationNumber);
  }

  async getRegistrationNumberInput() {
    return await this.registrationNumberInput.getAttribute('value');
  }

  async setPhoneInput(phone) {
    await this.phoneInput.sendKeys(phone);
  }

  async getPhoneInput() {
    return await this.phoneInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return await this.statusInput.getAttribute('value');
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

export class SurveyorDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-surveyor-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-surveyor'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
