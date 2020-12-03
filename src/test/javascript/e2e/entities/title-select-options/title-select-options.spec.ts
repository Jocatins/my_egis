import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  TitleSelectOptionsComponentsPage,
  TitleSelectOptionsDeleteDialog,
  TitleSelectOptionsUpdatePage
} from './title-select-options.page-object';

const expect = chai.expect;

describe('TitleSelectOptions e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let titleSelectOptionsComponentsPage: TitleSelectOptionsComponentsPage;
  let titleSelectOptionsUpdatePage: TitleSelectOptionsUpdatePage;
  let titleSelectOptionsDeleteDialog: TitleSelectOptionsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load TitleSelectOptions', async () => {
    await navBarPage.goToEntity('title-select-options');
    titleSelectOptionsComponentsPage = new TitleSelectOptionsComponentsPage();
    await browser.wait(ec.visibilityOf(titleSelectOptionsComponentsPage.title), 5000);
    expect(await titleSelectOptionsComponentsPage.getTitle()).to.eq('egisexternalApp.titleSelectOptions.home.title');
  });

  it('should load create TitleSelectOptions page', async () => {
    await titleSelectOptionsComponentsPage.clickOnCreateButton();
    titleSelectOptionsUpdatePage = new TitleSelectOptionsUpdatePage();
    expect(await titleSelectOptionsUpdatePage.getPageTitle()).to.eq('egisexternalApp.titleSelectOptions.home.createOrEditLabel');
    await titleSelectOptionsUpdatePage.cancel();
  });

  it('should create and save TitleSelectOptions', async () => {
    const nbButtonsBeforeCreate = await titleSelectOptionsComponentsPage.countDeleteButtons();

    await titleSelectOptionsComponentsPage.clickOnCreateButton();
    await promise.all([
      titleSelectOptionsUpdatePage.setTransactionIdInput('transactionId'),
      titleSelectOptionsUpdatePage.setQueryFieldInput('queryField'),
      titleSelectOptionsUpdatePage.setQueryValueInput('queryValue')
    ]);
    expect(await titleSelectOptionsUpdatePage.getTransactionIdInput()).to.eq(
      'transactionId',
      'Expected TransactionId value to be equals to transactionId'
    );
    expect(await titleSelectOptionsUpdatePage.getQueryFieldInput()).to.eq(
      'queryField',
      'Expected QueryField value to be equals to queryField'
    );
    expect(await titleSelectOptionsUpdatePage.getQueryValueInput()).to.eq(
      'queryValue',
      'Expected QueryValue value to be equals to queryValue'
    );
    await titleSelectOptionsUpdatePage.save();
    expect(await titleSelectOptionsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await titleSelectOptionsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last TitleSelectOptions', async () => {
    const nbButtonsBeforeDelete = await titleSelectOptionsComponentsPage.countDeleteButtons();
    await titleSelectOptionsComponentsPage.clickOnLastDeleteButton();

    titleSelectOptionsDeleteDialog = new TitleSelectOptionsDeleteDialog();
    expect(await titleSelectOptionsDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.titleSelectOptions.delete.question');
    await titleSelectOptionsDeleteDialog.clickOnConfirmButton();

    expect(await titleSelectOptionsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
