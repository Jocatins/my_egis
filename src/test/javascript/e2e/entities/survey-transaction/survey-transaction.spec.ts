import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  SurveyTransactionComponentsPage,
  SurveyTransactionDeleteDialog,
  SurveyTransactionUpdatePage
} from './survey-transaction.page-object';

const expect = chai.expect;

describe('SurveyTransaction e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let surveyTransactionComponentsPage: SurveyTransactionComponentsPage;
  let surveyTransactionUpdatePage: SurveyTransactionUpdatePage;
  let surveyTransactionDeleteDialog: SurveyTransactionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SurveyTransactions', async () => {
    await navBarPage.goToEntity('survey-transaction');
    surveyTransactionComponentsPage = new SurveyTransactionComponentsPage();
    await browser.wait(ec.visibilityOf(surveyTransactionComponentsPage.title), 5000);
    expect(await surveyTransactionComponentsPage.getTitle()).to.eq('egisexternalApp.surveyTransaction.home.title');
  });

  it('should load create SurveyTransaction page', async () => {
    await surveyTransactionComponentsPage.clickOnCreateButton();
    surveyTransactionUpdatePage = new SurveyTransactionUpdatePage();
    expect(await surveyTransactionUpdatePage.getPageTitle()).to.eq('egisexternalApp.surveyTransaction.home.createOrEditLabel');
    await surveyTransactionUpdatePage.cancel();
  });

  it('should create and save SurveyTransactions', async () => {
    const nbButtonsBeforeCreate = await surveyTransactionComponentsPage.countDeleteButtons();

    await surveyTransactionComponentsPage.clickOnCreateButton();
    await promise.all([surveyTransactionUpdatePage.setTransCodeInput('transCode'), surveyTransactionUpdatePage.setCommentInput('comment')]);
    expect(await surveyTransactionUpdatePage.getTransCodeInput()).to.eq('transCode', 'Expected TransCode value to be equals to transCode');
    expect(await surveyTransactionUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
    await surveyTransactionUpdatePage.save();
    expect(await surveyTransactionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await surveyTransactionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SurveyTransaction', async () => {
    const nbButtonsBeforeDelete = await surveyTransactionComponentsPage.countDeleteButtons();
    await surveyTransactionComponentsPage.clickOnLastDeleteButton();

    surveyTransactionDeleteDialog = new SurveyTransactionDeleteDialog();
    expect(await surveyTransactionDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.surveyTransaction.delete.question');
    await surveyTransactionDeleteDialog.clickOnConfirmButton();

    expect(await surveyTransactionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
