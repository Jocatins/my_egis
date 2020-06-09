import { element, by, ElementFinder } from 'protractor';

export class YearSubscriptionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-year-subscription div table .btn-danger'));
  title = element.all(by.css('jhi-year-subscription div h2#page-heading span')).first();

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

export class YearSubscriptionUpdatePage {
  pageTitle = element(by.id('jhi-year-subscription-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  yearInput = element(by.id('field_year'));
  statusInput = element(by.id('field_status'));
  requestDateInput = element(by.id('field_requestDate'));
  processedDateInput = element(by.id('field_processedDate'));
  surveyorSelect = element(by.id('field_surveyor'));
  subscriptionDocsSelect = element(by.id('field_subscriptionDocs'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setYearInput(year) {
    await this.yearInput.sendKeys(year);
  }

  async getYearInput() {
    return await this.yearInput.getAttribute('value');
  }

  async setStatusInput(status) {
    await this.statusInput.sendKeys(status);
  }

  async getStatusInput() {
    return await this.statusInput.getAttribute('value');
  }

  async setRequestDateInput(requestDate) {
    await this.requestDateInput.sendKeys(requestDate);
  }

  async getRequestDateInput() {
    return await this.requestDateInput.getAttribute('value');
  }

  async setProcessedDateInput(processedDate) {
    await this.processedDateInput.sendKeys(processedDate);
  }

  async getProcessedDateInput() {
    return await this.processedDateInput.getAttribute('value');
  }

  async surveyorSelectLastOption() {
    await this.surveyorSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async surveyorSelectOption(option) {
    await this.surveyorSelect.sendKeys(option);
  }

  getSurveyorSelect(): ElementFinder {
    return this.surveyorSelect;
  }

  async getSurveyorSelectedOption() {
    return await this.surveyorSelect.element(by.css('option:checked')).getText();
  }

  async subscriptionDocsSelectLastOption() {
    await this.subscriptionDocsSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async subscriptionDocsSelectOption(option) {
    await this.subscriptionDocsSelect.sendKeys(option);
  }

  getSubscriptionDocsSelect(): ElementFinder {
    return this.subscriptionDocsSelect;
  }

  async getSubscriptionDocsSelectedOption() {
    return await this.subscriptionDocsSelect.element(by.css('option:checked')).getText();
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

export class YearSubscriptionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-yearSubscription-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-yearSubscription'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
