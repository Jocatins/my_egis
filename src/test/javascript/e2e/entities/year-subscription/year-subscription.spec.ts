import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { YearSubscriptionComponentsPage, YearSubscriptionDeleteDialog, YearSubscriptionUpdatePage } from './year-subscription.page-object';

const expect = chai.expect;

describe('YearSubscription e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let yearSubscriptionComponentsPage: YearSubscriptionComponentsPage;
  let yearSubscriptionUpdatePage: YearSubscriptionUpdatePage;
  let yearSubscriptionDeleteDialog: YearSubscriptionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load YearSubscriptions', async () => {
    await navBarPage.goToEntity('year-subscription');
    yearSubscriptionComponentsPage = new YearSubscriptionComponentsPage();
    await browser.wait(ec.visibilityOf(yearSubscriptionComponentsPage.title), 5000);
    expect(await yearSubscriptionComponentsPage.getTitle()).to.eq('egisexternalApp.yearSubscription.home.title');
  });

  it('should load create YearSubscription page', async () => {
    await yearSubscriptionComponentsPage.clickOnCreateButton();
    yearSubscriptionUpdatePage = new YearSubscriptionUpdatePage();
    expect(await yearSubscriptionUpdatePage.getPageTitle()).to.eq('egisexternalApp.yearSubscription.home.createOrEditLabel');
    await yearSubscriptionUpdatePage.cancel();
  });

  it('should create and save YearSubscriptions', async () => {
    const nbButtonsBeforeCreate = await yearSubscriptionComponentsPage.countDeleteButtons();

    await yearSubscriptionComponentsPage.clickOnCreateButton();
    await promise.all([
      yearSubscriptionUpdatePage.setYearInput('5'),
      yearSubscriptionUpdatePage.setStatusInput('status'),
      yearSubscriptionUpdatePage.setRequestDateInput('2000-12-31'),
      yearSubscriptionUpdatePage.setProcessedDateInput('2000-12-31')
      // yearSubscriptionUpdatePage.surveyorSelectLastOption(),
      // yearSubscriptionUpdatePage.subscriptionDocsSelectLastOption(),
    ]);
    expect(await yearSubscriptionUpdatePage.getYearInput()).to.eq('5', 'Expected year value to be equals to 5');
    expect(await yearSubscriptionUpdatePage.getStatusInput()).to.eq('status', 'Expected Status value to be equals to status');
    expect(await yearSubscriptionUpdatePage.getRequestDateInput()).to.eq(
      '2000-12-31',
      'Expected requestDate value to be equals to 2000-12-31'
    );
    expect(await yearSubscriptionUpdatePage.getProcessedDateInput()).to.eq(
      '2000-12-31',
      'Expected processedDate value to be equals to 2000-12-31'
    );
    await yearSubscriptionUpdatePage.save();
    expect(await yearSubscriptionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await yearSubscriptionComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last YearSubscription', async () => {
    const nbButtonsBeforeDelete = await yearSubscriptionComponentsPage.countDeleteButtons();
    await yearSubscriptionComponentsPage.clickOnLastDeleteButton();

    yearSubscriptionDeleteDialog = new YearSubscriptionDeleteDialog();
    expect(await yearSubscriptionDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.yearSubscription.delete.question');
    await yearSubscriptionDeleteDialog.clickOnConfirmButton();

    expect(await yearSubscriptionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
