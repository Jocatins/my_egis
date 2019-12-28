import { element, by, ElementFinder } from 'protractor';

export class SurveyTransactionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-survey-transaction div table .btn-danger'));
  title = element.all(by.css('jhi-survey-transaction div h2#page-heading span')).first();

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

export class SurveyTransactionUpdatePage {
  pageTitle = element(by.id('jhi-survey-transaction-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  transCodeInput = element(by.id('field_transCode'));
  commentInput = element(by.id('field_comment'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTransCodeInput(transCode) {
    await this.transCodeInput.sendKeys(transCode);
  }

  async getTransCodeInput() {
    return await this.transCodeInput.getAttribute('value');
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return await this.commentInput.getAttribute('value');
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

export class SurveyTransactionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-surveyTransaction-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-surveyTransaction'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
