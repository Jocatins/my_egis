import { element, by, ElementFinder } from 'protractor';

export class SupportingDocumentComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-supporting-document div table .btn-danger'));
  title = element.all(by.css('jhi-supporting-document div h2#page-heading span')).first();

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

export class SupportingDocumentUpdatePage {
  pageTitle = element(by.id('jhi-supporting-document-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  documentNumberInput = element(by.id('field_documentNumber'));
  documentTypeInput = element(by.id('field_documentType'));
  ownershipAreaInput = element(by.id('field_ownershipArea'));
  documentSubTypeInput = element(by.id('field_documentSubType'));
  issuedByInput = element(by.id('field_issuedBy'));
  pageCountInput = element(by.id('field_pageCount'));
  statusInput = element(by.id('field_status'));
  providedInput = element(by.id('field_provided'));
  typeInput = element(by.id('field_type'));
  nameInput = element(by.id('field_name'));
  fileSizeInput = element(by.id('field_fileSize'));
  contentInput = element(by.id('field_content'));
  contentUrlInput = element(by.id('field_contentUrl'));
  imageInput = element(by.id('field_image'));
  dateInput = element(by.id('field_date'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDocumentNumberInput(documentNumber) {
    await this.documentNumberInput.sendKeys(documentNumber);
  }

  async getDocumentNumberInput() {
    return await this.documentNumberInput.getAttribute('value');
  }

  async setDocumentTypeInput(documentType) {
    await this.documentTypeInput.sendKeys(documentType);
  }

  async getDocumentTypeInput() {
    return await this.documentTypeInput.getAttribute('value');
  }

  async setOwnershipAreaInput(ownershipArea) {
    await this.ownershipAreaInput.sendKeys(ownershipArea);
  }

  async getOwnershipAreaInput() {
    return await this.ownershipAreaInput.getAttribute('value');
  }

  async setDocumentSubTypeInput(documentSubType) {
    await this.documentSubTypeInput.sendKeys(documentSubType);
  }

  async getDocumentSubTypeInput() {
    return await this.documentSubTypeInput.getAttribute('value');
  }

  async setIssuedByInput(issuedBy) {
    await this.issuedByInput.sendKeys(issuedBy);
  }

  async getIssuedByInput() {
    return await this.issuedByInput.getAttribute('value');
  }

  async setPageCountInput(pageCount) {
    await this.pageCountInput.sendKeys(pageCount);
  }

  async getPageCountInput() {
    return await this.pageCountInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return await this.statusInput.getAttribute('value');
  }

  async setProvidedInput(provided) {
    await this.providedInput.sendKeys(provided);
  }

  async getProvidedInput() {
    return await this.providedInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return await this.typeInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setFileSizeInput(fileSize) {
    await this.fileSizeInput.sendKeys(fileSize);
  }

  async getFileSizeInput() {
    return await this.fileSizeInput.getAttribute('value');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
  }

  async setContentUrlInput(contentUrl) {
    await this.contentUrlInput.sendKeys(contentUrl);
  }

  async getContentUrlInput() {
    return await this.contentUrlInput.getAttribute('value');
  }

  async setImageInput(image) {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput() {
    return await this.imageInput.getAttribute('value');
  }

  async setDateInput(date) {
    await this.dateInput.sendKeys(date);
  }

  async getDateInput() {
    return await this.dateInput.getAttribute('value');
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

export class SupportingDocumentDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-supportingDocument-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-supportingDocument'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
