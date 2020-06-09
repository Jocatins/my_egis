import { element, by, ElementFinder } from 'protractor';

export class SubscriptionDocsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-subscription-docs div table .btn-danger'));
  title = element.all(by.css('jhi-subscription-docs div h2#page-heading span')).first();

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

export class SubscriptionDocsUpdatePage {
  pageTitle = element(by.id('jhi-subscription-docs-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contentInput = element(by.id('field_content'));
  typeInput = element(by.id('field_type'));
  filenameInput = element(by.id('field_filename'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContentInput(content) {
    await this.contentInput.sendKeys(content);
  }

  async getContentInput() {
    return await this.contentInput.getAttribute('value');
  }

  async setTypeInput(type) {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput() {
    return await this.typeInput.getAttribute('value');
  }

  async setFilenameInput(filename) {
    await this.filenameInput.sendKeys(filename);
  }

  async getFilenameInput() {
    return await this.filenameInput.getAttribute('value');
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

export class SubscriptionDocsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-subscriptionDocs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-subscriptionDocs'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
