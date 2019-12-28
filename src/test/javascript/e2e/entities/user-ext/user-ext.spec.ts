import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { UserExtComponentsPage, UserExtDeleteDialog, UserExtUpdatePage } from './user-ext.page-object';

const expect = chai.expect;

describe('UserExt e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let userExtComponentsPage: UserExtComponentsPage;
  let userExtUpdatePage: UserExtUpdatePage;
  let userExtDeleteDialog: UserExtDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load UserExts', async () => {
    await navBarPage.goToEntity('user-ext');
    userExtComponentsPage = new UserExtComponentsPage();
    await browser.wait(ec.visibilityOf(userExtComponentsPage.title), 5000);
    expect(await userExtComponentsPage.getTitle()).to.eq('egisexternalApp.userExt.home.title');
  });

  it('should load create UserExt page', async () => {
    await userExtComponentsPage.clickOnCreateButton();
    userExtUpdatePage = new UserExtUpdatePage();
    expect(await userExtUpdatePage.getPageTitle()).to.eq('egisexternalApp.userExt.home.createOrEditLabel');
    await userExtUpdatePage.cancel();
  });

  it('should create and save UserExts', async () => {
    const nbButtonsBeforeCreate = await userExtComponentsPage.countDeleteButtons();

    await userExtComponentsPage.clickOnCreateButton();
    await promise.all([
      userExtUpdatePage.setPayerIdInput('payerId'),
      userExtUpdatePage.setPhoneNumberInput('phoneNumber'),
      userExtUpdatePage.userSelectLastOption()
    ]);
    expect(await userExtUpdatePage.getPayerIdInput()).to.eq('payerId', 'Expected PayerId value to be equals to payerId');
    expect(await userExtUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    await userExtUpdatePage.save();
    expect(await userExtUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await userExtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last UserExt', async () => {
    const nbButtonsBeforeDelete = await userExtComponentsPage.countDeleteButtons();
    await userExtComponentsPage.clickOnLastDeleteButton();

    userExtDeleteDialog = new UserExtDeleteDialog();
    expect(await userExtDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.userExt.delete.question');
    await userExtDeleteDialog.clickOnConfirmButton();

    expect(await userExtComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
