import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DictionaryComponentsPage, DictionaryDeleteDialog, DictionaryUpdatePage } from './dictionary.page-object';

const expect = chai.expect;

describe('Dictionary e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let dictionaryComponentsPage: DictionaryComponentsPage;
  let dictionaryUpdatePage: DictionaryUpdatePage;
  let dictionaryDeleteDialog: DictionaryDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Dictionaries', async () => {
    await navBarPage.goToEntity('dictionary');
    dictionaryComponentsPage = new DictionaryComponentsPage();
    await browser.wait(ec.visibilityOf(dictionaryComponentsPage.title), 5000);
    expect(await dictionaryComponentsPage.getTitle()).to.eq('egisexternalApp.dictionary.home.title');
  });

  it('should load create Dictionary page', async () => {
    await dictionaryComponentsPage.clickOnCreateButton();
    dictionaryUpdatePage = new DictionaryUpdatePage();
    expect(await dictionaryUpdatePage.getPageTitle()).to.eq('egisexternalApp.dictionary.home.createOrEditLabel');
    await dictionaryUpdatePage.cancel();
  });

  it('should create and save Dictionaries', async () => {
    const nbButtonsBeforeCreate = await dictionaryComponentsPage.countDeleteButtons();

    await dictionaryComponentsPage.clickOnCreateButton();
    await promise.all([
      dictionaryUpdatePage.setCodeInput('code'),
      dictionaryUpdatePage.setLabelInput('label'),
      dictionaryUpdatePage.setDescrInput('descr'),
      dictionaryUpdatePage.setCategoryInput('category')
    ]);
    expect(await dictionaryUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await dictionaryUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');
    expect(await dictionaryUpdatePage.getDescrInput()).to.eq('descr', 'Expected Descr value to be equals to descr');
    expect(await dictionaryUpdatePage.getCategoryInput()).to.eq('category', 'Expected Category value to be equals to category');
    await dictionaryUpdatePage.save();
    expect(await dictionaryUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await dictionaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Dictionary', async () => {
    const nbButtonsBeforeDelete = await dictionaryComponentsPage.countDeleteButtons();
    await dictionaryComponentsPage.clickOnLastDeleteButton();

    dictionaryDeleteDialog = new DictionaryDeleteDialog();
    expect(await dictionaryDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.dictionary.delete.question');
    await dictionaryDeleteDialog.clickOnConfirmButton();

    expect(await dictionaryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
