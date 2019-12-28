import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TransactionExtComponentsPage, TransactionExtDeleteDialog, TransactionExtUpdatePage } from './transaction-ext.page-object';

const expect = chai.expect;

describe('TransactionExt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionExtComponentsPage: TransactionExtComponentsPage;
  let transactionExtUpdatePage: TransactionExtUpdatePage;
  let transactionExtDeleteDialog: TransactionExtDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TransactionExts', async () => {
    await navBarPage.goToEntity('transaction-ext');
    transactionExtComponentsPage = new TransactionExtComponentsPage();
    await browser.wait(ec.visibilityOf(transactionExtComponentsPage.title), 5000);
    expect(await transactionExtComponentsPage.getTitle()).to.eq('egisexternalApp.transactionExt.home.title');
  });

  it('should load create TransactionExt page', async () => {
    await transactionExtComponentsPage.clickOnCreateButton();
    transactionExtUpdatePage = new TransactionExtUpdatePage();
    expect(await transactionExtUpdatePage.getPageTitle()).to.eq('egisexternalApp.transactionExt.home.createOrEditLabel');
    await transactionExtUpdatePage.cancel();
  });

  it('should create and save TransactionExts', async () => {
    const nbButtonsBeforeCreate = await transactionExtComponentsPage.countDeleteButtons();

    await transactionExtComponentsPage.clickOnCreateButton();
    await promise.all([
      transactionExtUpdatePage.setExtensionKeyInput('extensionKey'),
      transactionExtUpdatePage.setExtensionValueInput('extensionValue')
    ]);
    expect(await transactionExtUpdatePage.getExtensionKeyInput()).to.eq(
      'extensionKey',
      'Expected ExtensionKey value to be equals to extensionKey'
    );
    expect(await transactionExtUpdatePage.getExtensionValueInput()).to.eq(
      'extensionValue',
      'Expected ExtensionValue value to be equals to extensionValue'
    );
    await transactionExtUpdatePage.save();
    expect(await transactionExtUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transactionExtComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TransactionExt', async () => {
    const nbButtonsBeforeDelete = await transactionExtComponentsPage.countDeleteButtons();
    await transactionExtComponentsPage.clickOnLastDeleteButton();

    transactionExtDeleteDialog = new TransactionExtDeleteDialog();
    expect(await transactionExtDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.transactionExt.delete.question');
    await transactionExtDeleteDialog.clickOnConfirmButton();

    expect(await transactionExtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
