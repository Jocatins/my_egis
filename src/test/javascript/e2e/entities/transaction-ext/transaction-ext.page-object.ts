import { element, by, ElementFinder } from 'protractor';

export class TransactionExtComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transaction-ext div table .btn-danger'));
  title = element.all(by.css('jhi-transaction-ext div h2#page-heading span')).first();

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

export class TransactionExtUpdatePage {
  pageTitle = element(by.id('jhi-transaction-ext-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  extensionKeyInput = element(by.id('field_extensionKey'));
  extensionValueInput = element(by.id('field_extensionValue'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setExtensionKeyInput(extensionKey) {
    await this.extensionKeyInput.sendKeys(extensionKey);
  }

  async getExtensionKeyInput() {
    return await this.extensionKeyInput.getAttribute('value');
  }

  async setExtensionValueInput(extensionValue) {
    await this.extensionValueInput.sendKeys(extensionValue);
  }

  async getExtensionValueInput() {
    return await this.extensionValueInput.getAttribute('value');
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

export class TransactionExtDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transactionExt-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transactionExt'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
