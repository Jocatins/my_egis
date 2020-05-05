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
  ownershipAreaInput = element(by.id('field_ownershipArea'));
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
  documentSubTypeSelect = element(by.id('field_documentSubType'));
  documentTypeSelect = element(by.id('field_documentType'));
  issuedBySelect = element(by.id('field_issuedBy'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setDocumentNumberInput(documentNumber) {
    await this.documentNumberInput.sendKeys(documentNumber);
  }

  async getDocumentNumberInput() {
    return await this.documentNumberInput.getAttribute('value');
  }

  async setOwnershipAreaInput(ownershipArea) {
    await this.ownershipAreaInput.sendKeys(ownershipArea);
  }

  async getOwnershipAreaInput() {
    return await this.ownershipAreaInput.getAttribute('value');
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

  async documentSubTypeSelectLastOption() {
    await this.documentSubTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async documentSubTypeSelectOption(option) {
    await this.documentSubTypeSelect.sendKeys(option);
  }

  getDocumentSubTypeSelect(): ElementFinder {
    return this.documentSubTypeSelect;
  }

  async getDocumentSubTypeSelectedOption() {
    return await this.documentSubTypeSelect.element(by.css('option:checked')).getText();
  }

  async documentTypeSelectLastOption() {
    await this.documentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async documentTypeSelectOption(option) {
    await this.documentTypeSelect.sendKeys(option);
  }

  getDocumentTypeSelect(): ElementFinder {
    return this.documentTypeSelect;
  }

  async getDocumentTypeSelectedOption() {
    return await this.documentTypeSelect.element(by.css('option:checked')).getText();
  }

  async issuedBySelectLastOption() {
    await this.issuedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async issuedBySelectOption(option) {
    await this.issuedBySelect.sendKeys(option);
  }

  getIssuedBySelect(): ElementFinder {
    return this.issuedBySelect;
  }

  async getIssuedBySelectedOption() {
    return await this.issuedBySelect.element(by.css('option:checked')).getText();
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
