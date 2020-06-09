import { element, by, ElementFinder } from 'protractor';

export class EscalationComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-escalation div table .btn-danger'));
  title = element.all(by.css('jhi-escalation div h2#page-heading span')).first();

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

export class EscalationUpdatePage {
  pageTitle = element(by.id('jhi-escalation-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  escalateDateInput = element(by.id('field_escalateDate'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEscalateDateInput(escalateDate) {
    await this.escalateDateInput.sendKeys(escalateDate);
  }

  async getEscalateDateInput() {
    return await this.escalateDateInput.getAttribute('value');
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

export class EscalationDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-escalation-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-escalation'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
