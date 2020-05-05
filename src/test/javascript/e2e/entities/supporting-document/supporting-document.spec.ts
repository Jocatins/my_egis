import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SupportingDocumentComponentsPage,
  SupportingDocumentDeleteDialog,
  SupportingDocumentUpdatePage
} from './supporting-document.page-object';

const expect = chai.expect;

describe('SupportingDocument e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let supportingDocumentComponentsPage: SupportingDocumentComponentsPage;
  let supportingDocumentUpdatePage: SupportingDocumentUpdatePage;
  let supportingDocumentDeleteDialog: SupportingDocumentDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SupportingDocuments', async () => {
    await navBarPage.goToEntity('supporting-document');
    supportingDocumentComponentsPage = new SupportingDocumentComponentsPage();
    await browser.wait(ec.visibilityOf(supportingDocumentComponentsPage.title), 5000);
    expect(await supportingDocumentComponentsPage.getTitle()).to.eq('egisexternalApp.supportingDocument.home.title');
  });

  it('should load create SupportingDocument page', async () => {
    await supportingDocumentComponentsPage.clickOnCreateButton();
    supportingDocumentUpdatePage = new SupportingDocumentUpdatePage();
    expect(await supportingDocumentUpdatePage.getPageTitle()).to.eq('egisexternalApp.supportingDocument.home.createOrEditLabel');
    await supportingDocumentUpdatePage.cancel();
  });

  it('should create and save SupportingDocuments', async () => {
    const nbButtonsBeforeCreate = await supportingDocumentComponentsPage.countDeleteButtons();

    await supportingDocumentComponentsPage.clickOnCreateButton();
    await promise.all([
      supportingDocumentUpdatePage.setDocumentNumberInput('documentNumber'),
      supportingDocumentUpdatePage.setOwnershipAreaInput('ownershipArea'),
      supportingDocumentUpdatePage.setPageCountInput('5'),
      supportingDocumentUpdatePage.setStatusInput('status'),
      supportingDocumentUpdatePage.setProvidedInput('provided'),
      supportingDocumentUpdatePage.setTypeInput('5'),
      supportingDocumentUpdatePage.setNameInput('name'),
      supportingDocumentUpdatePage.setFileSizeInput('5'),
      supportingDocumentUpdatePage.setContentInput('content'),
      supportingDocumentUpdatePage.setContentUrlInput('contentUrl'),
      supportingDocumentUpdatePage.setImageInput('image'),
      supportingDocumentUpdatePage.setDateInput('2000-12-31'),
      supportingDocumentUpdatePage.documentSubTypeSelectLastOption(),
      supportingDocumentUpdatePage.documentTypeSelectLastOption(),
      supportingDocumentUpdatePage.issuedBySelectLastOption()
    ]);
    expect(await supportingDocumentUpdatePage.getDocumentNumberInput()).to.eq(
      'documentNumber',
      'Expected DocumentNumber value to be equals to documentNumber'
    );
    expect(await supportingDocumentUpdatePage.getOwnershipAreaInput()).to.eq(
      'ownershipArea',
      'Expected OwnershipArea value to be equals to ownershipArea'
    );
    expect(await supportingDocumentUpdatePage.getPageCountInput()).to.eq('5', 'Expected pageCount value to be equals to 5');
    expect(await supportingDocumentUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await supportingDocumentUpdatePage.getProvidedInput()).to.eq('provided', 'Expected Provided value to be equals to provided');
    expect(await supportingDocumentUpdatePage.getTypeInput()).to.eq('5', 'Expected type value to be equals to 5');
    expect(await supportingDocumentUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await supportingDocumentUpdatePage.getFileSizeInput()).to.eq('5', 'Expected fileSize value to be equals to 5');
    expect(await supportingDocumentUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await supportingDocumentUpdatePage.getContentUrlInput()).to.eq(
      'contentUrl',
      'Expected ContentUrl value to be equals to contentUrl'
    );
    expect(await supportingDocumentUpdatePage.getImageInput()).to.eq('image', 'Expected Image value to be equals to image');
    expect(await supportingDocumentUpdatePage.getDateInput()).to.eq('2000-12-31', 'Expected date value to be equals to 2000-12-31');
    await supportingDocumentUpdatePage.save();
    expect(await supportingDocumentUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await supportingDocumentComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SupportingDocument', async () => {
    const nbButtonsBeforeDelete = await supportingDocumentComponentsPage.countDeleteButtons();
    await supportingDocumentComponentsPage.clickOnLastDeleteButton();

    supportingDocumentDeleteDialog = new SupportingDocumentDeleteDialog();
    expect(await supportingDocumentDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.supportingDocument.delete.question');
    await supportingDocumentDeleteDialog.clickOnConfirmButton();

    expect(await supportingDocumentComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
