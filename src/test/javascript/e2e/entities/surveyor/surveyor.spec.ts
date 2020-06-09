import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SurveyorComponentsPage, SurveyorDeleteDialog, SurveyorUpdatePage } from './surveyor.page-object';

const expect = chai.expect;

describe('Surveyor e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let surveyorComponentsPage: SurveyorComponentsPage;
  let surveyorUpdatePage: SurveyorUpdatePage;
  let surveyorDeleteDialog: SurveyorDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Surveyors', async () => {
    await navBarPage.goToEntity('surveyor');
    surveyorComponentsPage = new SurveyorComponentsPage();
    await browser.wait(ec.visibilityOf(surveyorComponentsPage.title), 5000);
    expect(await surveyorComponentsPage.getTitle()).to.eq('egisexternalApp.surveyor.home.title');
  });

  it('should load create Surveyor page', async () => {
    await surveyorComponentsPage.clickOnCreateButton();
    surveyorUpdatePage = new SurveyorUpdatePage();
    expect(await surveyorUpdatePage.getPageTitle()).to.eq('egisexternalApp.surveyor.home.createOrEditLabel');
    await surveyorUpdatePage.cancel();
  });

  it('should create and save Surveyors', async () => {
    const nbButtonsBeforeCreate = await surveyorComponentsPage.countDeleteButtons();

    await surveyorComponentsPage.clickOnCreateButton();
    await promise.all([
      surveyorUpdatePage.setEmailInput('email'),
      surveyorUpdatePage.setSurconNumberInput('surconNumber'),
      surveyorUpdatePage.setRegistrationNumberInput('registrationNumber'),
      surveyorUpdatePage.setPhoneInput('phone'),
      surveyorUpdatePage.setStatusInput('status'),
      surveyorUpdatePage.setRequestDateInput('2000-12-31'),
      surveyorUpdatePage.setProcessedDateInput('2000-12-31')
    ]);
    expect(await surveyorUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await surveyorUpdatePage.getSurconNumberInput()).to.eq(
      'surconNumber',
      'Expected SurconNumber value to be equals to surconNumber'
    );
    expect(await surveyorUpdatePage.getRegistrationNumberInput()).to.eq(
      'registrationNumber',
      'Expected RegistrationNumber value to be equals to registrationNumber'
    );
    expect(await surveyorUpdatePage.getPhoneInput()).to.eq('phone', 'Expected Phone value to be equals to phone');
    expect(await surveyorUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await surveyorUpdatePage.getRequestDateInput()).to.eq('2000-12-31', 'Expected requestDate value to be equals to 2000-12-31');
    expect(await surveyorUpdatePage.getProcessedDateInput()).to.eq('2000-12-31', 'Expected processedDate value to be equals to 2000-12-31');
    await surveyorUpdatePage.save();
    expect(await surveyorUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await surveyorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Surveyor', async () => {
    const nbButtonsBeforeDelete = await surveyorComponentsPage.countDeleteButtons();
    await surveyorComponentsPage.clickOnLastDeleteButton();

    surveyorDeleteDialog = new SurveyorDeleteDialog();
    expect(await surveyorDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.surveyor.delete.question');
    await surveyorDeleteDialog.clickOnConfirmButton();

    expect(await surveyorComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
