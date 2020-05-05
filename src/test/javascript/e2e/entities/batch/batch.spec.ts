import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BatchComponentsPage, BatchDeleteDialog, BatchUpdatePage } from './batch.page-object';

const expect = chai.expect;

describe('Batch e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let batchComponentsPage: BatchComponentsPage;
  let batchUpdatePage: BatchUpdatePage;
  let batchDeleteDialog: BatchDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Batches', async () => {
    await navBarPage.goToEntity('batch');
    batchComponentsPage = new BatchComponentsPage();
    await browser.wait(ec.visibilityOf(batchComponentsPage.title), 5000);
    expect(await batchComponentsPage.getTitle()).to.eq('egisexternalApp.batch.home.title');
  });

  it('should load create Batch page', async () => {
    await batchComponentsPage.clickOnCreateButton();
    batchUpdatePage = new BatchUpdatePage();
    expect(await batchUpdatePage.getPageTitle()).to.eq('egisexternalApp.batch.home.createOrEditLabel');
    await batchUpdatePage.cancel();
  });

  it('should create and save Batches', async () => {
    const nbButtonsBeforeCreate = await batchComponentsPage.countDeleteButtons();

    await batchComponentsPage.clickOnCreateButton();
    await promise.all([
      batchUpdatePage.setBatchNumberInput('5'),
      batchUpdatePage.setInvoiceNumberInput('invoiceNumber'),
      batchUpdatePage.setCreateDateInput('2000-12-31'),
      batchUpdatePage.setDeliveryDateInput('2000-12-31'),
      batchUpdatePage.setOfficeIdInput('5'),
      batchUpdatePage.userSelectLastOption(),
      batchUpdatePage.batchStatusSelectLastOption()
      // batchUpdatePage.transactionSelectLastOption(),
      // batchUpdatePage.partySelectLastOption(),
    ]);
    expect(await batchUpdatePage.getBatchNumberInput()).to.eq('5', 'Expected batchNumber value to be equals to 5');
    expect(await batchUpdatePage.getInvoiceNumberInput()).to.eq(
      'invoiceNumber',
      'Expected InvoiceNumber value to be equals to invoiceNumber'
    );
    expect(await batchUpdatePage.getCreateDateInput()).to.eq('2000-12-31', 'Expected createDate value to be equals to 2000-12-31');
    expect(await batchUpdatePage.getDeliveryDateInput()).to.eq('2000-12-31', 'Expected deliveryDate value to be equals to 2000-12-31');
    expect(await batchUpdatePage.getOfficeIdInput()).to.eq('5', 'Expected officeId value to be equals to 5');
    await batchUpdatePage.save();
    expect(await batchUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await batchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Batch', async () => {
    const nbButtonsBeforeDelete = await batchComponentsPage.countDeleteButtons();
    await batchComponentsPage.clickOnLastDeleteButton();

    batchDeleteDialog = new BatchDeleteDialog();
    expect(await batchDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.batch.delete.question');
    await batchDeleteDialog.clickOnConfirmButton();

    expect(await batchComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
