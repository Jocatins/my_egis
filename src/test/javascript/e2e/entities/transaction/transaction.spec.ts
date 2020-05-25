import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { TransactionComponentsPage, TransactionDeleteDialog, TransactionUpdatePage } from './transaction.page-object';

const expect = chai.expect;

describe('Transaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transactionComponentsPage: TransactionComponentsPage;
  let transactionUpdatePage: TransactionUpdatePage;
  let transactionDeleteDialog: TransactionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Transactions', async () => {
    await navBarPage.goToEntity('transaction');
    transactionComponentsPage = new TransactionComponentsPage();
    await browser.wait(ec.visibilityOf(transactionComponentsPage.title), 5000);
    expect(await transactionComponentsPage.getTitle()).to.eq('egisexternalApp.transaction.home.title');
  });

  it('should load create Transaction page', async () => {
    await transactionComponentsPage.clickOnCreateButton();
    transactionUpdatePage = new TransactionUpdatePage();
    expect(await transactionUpdatePage.getPageTitle()).to.eq('egisexternalApp.transaction.home.createOrEditLabel');
    await transactionUpdatePage.cancel();
  });

  it('should create and save Transactions', async () => {
    const nbButtonsBeforeCreate = await transactionComponentsPage.countDeleteButtons();

    await transactionComponentsPage.clickOnCreateButton();
    await promise.all([
      transactionUpdatePage.setTransactionNumberInput('transactionNumber'),
      transactionUpdatePage.setApplicationDateInput('2000-12-31'),
      transactionUpdatePage.setTransactionStartDateInput('2000-12-31'),
      transactionUpdatePage.setCommentsInput('comments'),
      transactionUpdatePage.setCreateDateInput('2000-12-31'),
      transactionUpdatePage.setStartDateInput('2000-12-31'),
      transactionUpdatePage.setCompleteDateInput('2000-12-31'),
      transactionUpdatePage.setBatchIdInput('5'),
      transactionUpdatePage.extSelectLastOption(),
      transactionUpdatePage.transactionTypeSelectLastOption(),
      transactionUpdatePage.transactionSubTypeSelectLastOption(),
      transactionUpdatePage.ownershipTypeSelectLastOption(),
      transactionUpdatePage.tenureTypeSelectLastOption(),
      transactionUpdatePage.transactionCodeSelectLastOption()
      // transactionUpdatePage.partySelectLastOption(),
      // transactionUpdatePage.parcelSelectLastOption(),
      // transactionUpdatePage.docsSelectLastOption(),
    ]);
    expect(await transactionUpdatePage.getTransactionNumberInput()).to.eq(
      'transactionNumber',
      'Expected TransactionNumber value to be equals to transactionNumber'
    );
    expect(await transactionUpdatePage.getApplicationDateInput()).to.eq(
      '2000-12-31',
      'Expected applicationDate value to be equals to 2000-12-31'
    );
    expect(await transactionUpdatePage.getTransactionStartDateInput()).to.eq(
      '2000-12-31',
      'Expected transactionStartDate value to be equals to 2000-12-31'
    );
    expect(await transactionUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await transactionUpdatePage.getCreateDateInput()).to.eq('2000-12-31', 'Expected createDate value to be equals to 2000-12-31');
    expect(await transactionUpdatePage.getStartDateInput()).to.eq('2000-12-31', 'Expected startDate value to be equals to 2000-12-31');
    expect(await transactionUpdatePage.getCompleteDateInput()).to.eq(
      '2000-12-31',
      'Expected completeDate value to be equals to 2000-12-31'
    );
    expect(await transactionUpdatePage.getBatchIdInput()).to.eq('5', 'Expected batchId value to be equals to 5');
    await transactionUpdatePage.save();
    expect(await transactionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Transaction', async () => {
    const nbButtonsBeforeDelete = await transactionComponentsPage.countDeleteButtons();
    await transactionComponentsPage.clickOnLastDeleteButton();

    transactionDeleteDialog = new TransactionDeleteDialog();
    expect(await transactionDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.transaction.delete.question');
    await transactionDeleteDialog.clickOnConfirmButton();

    expect(await transactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
