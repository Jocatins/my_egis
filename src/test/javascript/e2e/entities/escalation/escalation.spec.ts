import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EscalationComponentsPage, EscalationDeleteDialog, EscalationUpdatePage } from './escalation.page-object';

const expect = chai.expect;

describe('Escalation e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let escalationComponentsPage: EscalationComponentsPage;
  let escalationUpdatePage: EscalationUpdatePage;
  let escalationDeleteDialog: EscalationDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Escalations', async () => {
    await navBarPage.goToEntity('escalation');
    escalationComponentsPage = new EscalationComponentsPage();
    await browser.wait(ec.visibilityOf(escalationComponentsPage.title), 5000);
    expect(await escalationComponentsPage.getTitle()).to.eq('egisexternalApp.escalation.home.title');
  });

  it('should load create Escalation page', async () => {
    await escalationComponentsPage.clickOnCreateButton();
    escalationUpdatePage = new EscalationUpdatePage();
    expect(await escalationUpdatePage.getPageTitle()).to.eq('egisexternalApp.escalation.home.createOrEditLabel');
    await escalationUpdatePage.cancel();
  });

  it('should create and save Escalations', async () => {
    const nbButtonsBeforeCreate = await escalationComponentsPage.countDeleteButtons();

    await escalationComponentsPage.clickOnCreateButton();
    await promise.all([escalationUpdatePage.setEscalateDateInput('2000-12-31')]);
    expect(await escalationUpdatePage.getEscalateDateInput()).to.eq('2000-12-31', 'Expected escalateDate value to be equals to 2000-12-31');
    await escalationUpdatePage.save();
    expect(await escalationUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await escalationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Escalation', async () => {
    const nbButtonsBeforeDelete = await escalationComponentsPage.countDeleteButtons();
    await escalationComponentsPage.clickOnLastDeleteButton();

    escalationDeleteDialog = new EscalationDeleteDialog();
    expect(await escalationDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.escalation.delete.question');
    await escalationDeleteDialog.clickOnConfirmButton();

    expect(await escalationComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
