import { element, by, ElementFinder } from 'protractor';

export class EscalateContactComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-escalate-contact div table .btn-danger'));
  title = element.all(by.css('jhi-escalate-contact div h2#page-heading span')).first();

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

export class EscalateContactUpdatePage {
  pageTitle = element(by.id('jhi-escalate-contact-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  contactInput = element(by.id('field_contact'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setContactInput(contact) {
    await this.contactInput.sendKeys(contact);
  }

  async getContactInput() {
    return await this.contactInput.getAttribute('value');
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

export class EscalateContactDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-escalateContact-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-escalateContact'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
