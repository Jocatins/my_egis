import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SubscriptionDocsComponentsPage, SubscriptionDocsDeleteDialog, SubscriptionDocsUpdatePage } from './subscription-docs.page-object';

const expect = chai.expect;

describe('SubscriptionDocs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let subscriptionDocsComponentsPage: SubscriptionDocsComponentsPage;
  let subscriptionDocsUpdatePage: SubscriptionDocsUpdatePage;
  let subscriptionDocsDeleteDialog: SubscriptionDocsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SubscriptionDocs', async () => {
    await navBarPage.goToEntity('subscription-docs');
    subscriptionDocsComponentsPage = new SubscriptionDocsComponentsPage();
    await browser.wait(ec.visibilityOf(subscriptionDocsComponentsPage.title), 5000);
    expect(await subscriptionDocsComponentsPage.getTitle()).to.eq('egisexternalApp.subscriptionDocs.home.title');
  });

  it('should load create SubscriptionDocs page', async () => {
    await subscriptionDocsComponentsPage.clickOnCreateButton();
    subscriptionDocsUpdatePage = new SubscriptionDocsUpdatePage();
    expect(await subscriptionDocsUpdatePage.getPageTitle()).to.eq('egisexternalApp.subscriptionDocs.home.createOrEditLabel');
    await subscriptionDocsUpdatePage.cancel();
  });

  it('should create and save SubscriptionDocs', async () => {
    const nbButtonsBeforeCreate = await subscriptionDocsComponentsPage.countDeleteButtons();

    await subscriptionDocsComponentsPage.clickOnCreateButton();
    await promise.all([
      subscriptionDocsUpdatePage.setContentInput('content'),
      subscriptionDocsUpdatePage.setTypeInput('type'),
      subscriptionDocsUpdatePage.setFilenameInput('filename')
    ]);
    expect(await subscriptionDocsUpdatePage.getContentInput()).to.eq('content', 'Expected Content value to be equals to content');
    expect(await subscriptionDocsUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
    expect(await subscriptionDocsUpdatePage.getFilenameInput()).to.eq('filename', 'Expected Filename value to be equals to filename');
    await subscriptionDocsUpdatePage.save();
    expect(await subscriptionDocsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await subscriptionDocsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last SubscriptionDocs', async () => {
    const nbButtonsBeforeDelete = await subscriptionDocsComponentsPage.countDeleteButtons();
    await subscriptionDocsComponentsPage.clickOnLastDeleteButton();

    subscriptionDocsDeleteDialog = new SubscriptionDocsDeleteDialog();
    expect(await subscriptionDocsDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.subscriptionDocs.delete.question');
    await subscriptionDocsDeleteDialog.clickOnConfirmButton();

    expect(await subscriptionDocsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
