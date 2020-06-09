import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EscalateContactComponentsPage, EscalateContactDeleteDialog, EscalateContactUpdatePage } from './escalate-contact.page-object';

const expect = chai.expect;

describe('EscalateContact e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let escalateContactComponentsPage: EscalateContactComponentsPage;
  let escalateContactUpdatePage: EscalateContactUpdatePage;
  let escalateContactDeleteDialog: EscalateContactDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EscalateContacts', async () => {
    await navBarPage.goToEntity('escalate-contact');
    escalateContactComponentsPage = new EscalateContactComponentsPage();
    await browser.wait(ec.visibilityOf(escalateContactComponentsPage.title), 5000);
    expect(await escalateContactComponentsPage.getTitle()).to.eq('egisexternalApp.escalateContact.home.title');
  });

  it('should load create EscalateContact page', async () => {
    await escalateContactComponentsPage.clickOnCreateButton();
    escalateContactUpdatePage = new EscalateContactUpdatePage();
    expect(await escalateContactUpdatePage.getPageTitle()).to.eq('egisexternalApp.escalateContact.home.createOrEditLabel');
    await escalateContactUpdatePage.cancel();
  });

  it('should create and save EscalateContacts', async () => {
    const nbButtonsBeforeCreate = await escalateContactComponentsPage.countDeleteButtons();

    await escalateContactComponentsPage.clickOnCreateButton();
    await promise.all([escalateContactUpdatePage.setContactInput('contact')]);
    expect(await escalateContactUpdatePage.getContactInput()).to.eq('contact', 'Expected Contact value to be equals to contact');
    await escalateContactUpdatePage.save();
    expect(await escalateContactUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await escalateContactComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last EscalateContact', async () => {
    const nbButtonsBeforeDelete = await escalateContactComponentsPage.countDeleteButtons();
    await escalateContactComponentsPage.clickOnLastDeleteButton();

    escalateContactDeleteDialog = new EscalateContactDeleteDialog();
    expect(await escalateContactDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.escalateContact.delete.question');
    await escalateContactDeleteDialog.clickOnConfirmButton();

    expect(await escalateContactComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
