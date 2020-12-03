import { element, by, ElementFinder } from 'protractor';

export class DocumentRequestComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-document-request div table .btn-danger'));
  title = element.all(by.css('jhi-document-request div h2#page-heading span')).first();

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

export class DocumentRequestUpdatePage {
  pageTitle = element(by.id('jhi-document-request-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  transactionIdInput = element(by.id('field_transactionId'));
  documentIdInput = element(by.id('field_documentId'));
  documentTypeInput = element(by.id('field_documentType'));
  documentSubTypeInput = element(by.id('field_documentSubType'));
  documentNumberInput = element(by.id('field_documentNumber'));
  surveyPlanNumberInput = element(by.id('field_surveyPlanNumber'));
  propertyDescriptionInput = element(by.id('field_propertyDescription'));
  titleNumberInput = element(by.id('field_titleNumber'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTransactionIdInput(transactionId) {
    await this.transactionIdInput.sendKeys(transactionId);
  }

  async getTransactionIdInput() {
    return await this.transactionIdInput.getAttribute('value');
  }

  async setDocumentIdInput(documentId) {
    await this.documentIdInput.sendKeys(documentId);
  }

  async getDocumentIdInput() {
    return await this.documentIdInput.getAttribute('value');
  }

  async setDocumentTypeInput(documentType) {
    await this.documentTypeInput.sendKeys(documentType);
  }

  async getDocumentTypeInput() {
    return await this.documentTypeInput.getAttribute('value');
  }

  async setDocumentSubTypeInput(documentSubType) {
    await this.documentSubTypeInput.sendKeys(documentSubType);
  }

  async getDocumentSubTypeInput() {
    return await this.documentSubTypeInput.getAttribute('value');
  }

  async setDocumentNumberInput(documentNumber) {
    await this.documentNumberInput.sendKeys(documentNumber);
  }

  async getDocumentNumberInput() {
    return await this.documentNumberInput.getAttribute('value');
  }

  async setSurveyPlanNumberInput(surveyPlanNumber) {
    await this.surveyPlanNumberInput.sendKeys(surveyPlanNumber);
  }

  async getSurveyPlanNumberInput() {
    return await this.surveyPlanNumberInput.getAttribute('value');
  }

  async setPropertyDescriptionInput(propertyDescription) {
    await this.propertyDescriptionInput.sendKeys(propertyDescription);
  }

  async getPropertyDescriptionInput() {
    return await this.propertyDescriptionInput.getAttribute('value');
  }

  async setTitleNumberInput(titleNumber) {
    await this.titleNumberInput.sendKeys(titleNumber);
  }

  async getTitleNumberInput() {
    return await this.titleNumberInput.getAttribute('value');
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

export class DocumentRequestDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-documentRequest-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-documentRequest'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
