import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DocumentRequestComponentsPage, DocumentRequestDeleteDialog, DocumentRequestUpdatePage } from './document-request.page-object';

const expect = chai.expect;

describe('DocumentRequest e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let documentRequestComponentsPage: DocumentRequestComponentsPage;
  let documentRequestUpdatePage: DocumentRequestUpdatePage;
  let documentRequestDeleteDialog: DocumentRequestDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load DocumentRequests', async () => {
    await navBarPage.goToEntity('document-request');
    documentRequestComponentsPage = new DocumentRequestComponentsPage();
    await browser.wait(ec.visibilityOf(documentRequestComponentsPage.title), 5000);
    expect(await documentRequestComponentsPage.getTitle()).to.eq('egisexternalApp.documentRequest.home.title');
  });

  it('should load create DocumentRequest page', async () => {
    await documentRequestComponentsPage.clickOnCreateButton();
    documentRequestUpdatePage = new DocumentRequestUpdatePage();
    expect(await documentRequestUpdatePage.getPageTitle()).to.eq('egisexternalApp.documentRequest.home.createOrEditLabel');
    await documentRequestUpdatePage.cancel();
  });

  it('should create and save DocumentRequests', async () => {
    const nbButtonsBeforeCreate = await documentRequestComponentsPage.countDeleteButtons();

    await documentRequestComponentsPage.clickOnCreateButton();
    await promise.all([
      documentRequestUpdatePage.setTransactionIdInput('transactionId'),
      documentRequestUpdatePage.setDocumentIdInput('documentId'),
      documentRequestUpdatePage.setDocumentTypeInput('documentType'),
      documentRequestUpdatePage.setDocumentSubTypeInput('documentSubType'),
      documentRequestUpdatePage.setDocumentNumberInput('documentNumber'),
      documentRequestUpdatePage.setSurveyPlanNumberInput('surveyPlanNumber'),
      documentRequestUpdatePage.setPropertyDescriptionInput('propertyDescription'),
      documentRequestUpdatePage.setTitleNumberInput('titleNumber')
    ]);
    expect(await documentRequestUpdatePage.getTransactionIdInput()).to.eq(
      'transactionId',
      'Expected TransactionId value to be equals to transactionId'
    );
    expect(await documentRequestUpdatePage.getDocumentIdInput()).to.eq(
      'documentId',
      'Expected DocumentId value to be equals to documentId'
    );
    expect(await documentRequestUpdatePage.getDocumentTypeInput()).to.eq(
      'documentType',
      'Expected DocumentType value to be equals to documentType'
    );
    expect(await documentRequestUpdatePage.getDocumentSubTypeInput()).to.eq(
      'documentSubType',
      'Expected DocumentSubType value to be equals to documentSubType'
    );
    expect(await documentRequestUpdatePage.getDocumentNumberInput()).to.eq(
      'documentNumber',
      'Expected DocumentNumber value to be equals to documentNumber'
    );
    expect(await documentRequestUpdatePage.getSurveyPlanNumberInput()).to.eq(
      'surveyPlanNumber',
      'Expected SurveyPlanNumber value to be equals to surveyPlanNumber'
    );
    expect(await documentRequestUpdatePage.getPropertyDescriptionInput()).to.eq(
      'propertyDescription',
      'Expected PropertyDescription value to be equals to propertyDescription'
    );
    expect(await documentRequestUpdatePage.getTitleNumberInput()).to.eq(
      'titleNumber',
      'Expected TitleNumber value to be equals to titleNumber'
    );
    await documentRequestUpdatePage.save();
    expect(await documentRequestUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await documentRequestComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last DocumentRequest', async () => {
    const nbButtonsBeforeDelete = await documentRequestComponentsPage.countDeleteButtons();
    await documentRequestComponentsPage.clickOnLastDeleteButton();

    documentRequestDeleteDialog = new DocumentRequestDeleteDialog();
    expect(await documentRequestDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.documentRequest.delete.question');
    await documentRequestDeleteDialog.clickOnConfirmButton();

    expect(await documentRequestComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
