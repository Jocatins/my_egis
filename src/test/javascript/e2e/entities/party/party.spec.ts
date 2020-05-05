import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { PartyComponentsPage, PartyDeleteDialog, PartyUpdatePage } from './party.page-object';

const expect = chai.expect;

describe('Party e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyComponentsPage: PartyComponentsPage;
  let partyUpdatePage: PartyUpdatePage;
  let partyDeleteDialog: PartyDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parties', async () => {
    await navBarPage.goToEntity('party');
    partyComponentsPage = new PartyComponentsPage();
    await browser.wait(ec.visibilityOf(partyComponentsPage.title), 5000);
    expect(await partyComponentsPage.getTitle()).to.eq('egisexternalApp.party.home.title');
  });

  it('should load create Party page', async () => {
    await partyComponentsPage.clickOnCreateButton();
    partyUpdatePage = new PartyUpdatePage();
    expect(await partyUpdatePage.getPageTitle()).to.eq('egisexternalApp.party.home.createOrEditLabel');
    await partyUpdatePage.cancel();
  });

  it('should create and save Parties', async () => {
    const nbButtonsBeforeCreate = await partyComponentsPage.countDeleteButtons();

    await partyComponentsPage.clickOnCreateButton();
    await promise.all([
      partyUpdatePage.setPartyNameInput('partyName'),
      partyUpdatePage.setShareNominatorInput('shareNominator'),
      partyUpdatePage.setShareDenominatorInput('shareDenominator'),
      partyUpdatePage.setTaxExemptInput('taxExempt'),
      partyUpdatePage.setOtherNameInput('otherName'),
      partyUpdatePage.setFaxInput('fax'),
      partyUpdatePage.setEmailInput('email'),
      partyUpdatePage.setPhoneNumberInput('phoneNumber'),
      partyUpdatePage.setPayerIdInput('payerId'),
      partyUpdatePage.setTaxPayerNumberInput('taxPayerNumber'),
      partyUpdatePage.setCommentsInput('comments'),
      partyUpdatePage.setPersonIdDateInput('2000-12-31'),
      partyUpdatePage.setPersonIdExpirationDateInput('2000-12-31'),
      partyUpdatePage.setRcNumberInput('rcNumber'),
      partyUpdatePage.setOrganizationInput('organization'),
      partyUpdatePage.setBusinessNatureInput('businessNature'),
      partyUpdatePage.setBirthPlaceInput('birthPlace'),
      partyUpdatePage.setBirthDateInput('2000-12-31'),
      partyUpdatePage.setFirstNameInput('firstName'),
      partyUpdatePage.setMiddleNameInput('middleName'),
      partyUpdatePage.setLastNameInput('lastName'),
      partyUpdatePage.setDriverLicenceInput('driverLicence'),
      partyUpdatePage.setProfessionRegNoInput('professionRegNo'),
      partyUpdatePage.setOccupationInput('occupation'),
      partyUpdatePage.addressSelectLastOption(),
      partyUpdatePage.partyTypeSelectLastOption(),
      partyUpdatePage.partyRoleTypeSelectLastOption(),
      partyUpdatePage.partySubRoleTypeSelectLastOption(),
      partyUpdatePage.deliveryTypeSelectLastOption(),
      partyUpdatePage.primaryPartySelectLastOption(),
      partyUpdatePage.personIdTypeSelectLastOption(),
      partyUpdatePage.personTypeSelectLastOption(),
      partyUpdatePage.emailTypeSelectLastOption(),
      partyUpdatePage.personIdIssuedBySelectLastOption(),
      partyUpdatePage.personTitleSelectLastOption(),
      partyUpdatePage.genderSelectLastOption(),
      partyUpdatePage.civilStateSelectLastOption(),
      partyUpdatePage.driverLicenseRegionSelectLastOption(),
      partyUpdatePage.representativeIdSelectLastOption()
    ]);
    expect(await partyUpdatePage.getPartyNameInput()).to.eq('partyName', 'Expected PartyName value to be equals to partyName');
    expect(await partyUpdatePage.getShareNominatorInput()).to.eq(
      'shareNominator',
      'Expected ShareNominator value to be equals to shareNominator'
    );
    expect(await partyUpdatePage.getShareDenominatorInput()).to.eq(
      'shareDenominator',
      'Expected ShareDenominator value to be equals to shareDenominator'
    );
    expect(await partyUpdatePage.getTaxExemptInput()).to.eq('taxExempt', 'Expected TaxExempt value to be equals to taxExempt');
    expect(await partyUpdatePage.getOtherNameInput()).to.eq('otherName', 'Expected OtherName value to be equals to otherName');
    expect(await partyUpdatePage.getFaxInput()).to.eq('fax', 'Expected Fax value to be equals to fax');
    expect(await partyUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await partyUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await partyUpdatePage.getPayerIdInput()).to.eq('payerId', 'Expected PayerId value to be equals to payerId');
    expect(await partyUpdatePage.getTaxPayerNumberInput()).to.eq(
      'taxPayerNumber',
      'Expected TaxPayerNumber value to be equals to taxPayerNumber'
    );
    expect(await partyUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await partyUpdatePage.getPersonIdDateInput()).to.eq('2000-12-31', 'Expected personIdDate value to be equals to 2000-12-31');
    expect(await partyUpdatePage.getPersonIdExpirationDateInput()).to.eq(
      '2000-12-31',
      'Expected personIdExpirationDate value to be equals to 2000-12-31'
    );
    expect(await partyUpdatePage.getRcNumberInput()).to.eq('rcNumber', 'Expected RcNumber value to be equals to rcNumber');
    expect(await partyUpdatePage.getOrganizationInput()).to.eq('organization', 'Expected Organization value to be equals to organization');
    expect(await partyUpdatePage.getBusinessNatureInput()).to.eq(
      'businessNature',
      'Expected BusinessNature value to be equals to businessNature'
    );
    expect(await partyUpdatePage.getBirthPlaceInput()).to.eq('birthPlace', 'Expected BirthPlace value to be equals to birthPlace');
    expect(await partyUpdatePage.getBirthDateInput()).to.eq('2000-12-31', 'Expected birthDate value to be equals to 2000-12-31');
    expect(await partyUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await partyUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
    expect(await partyUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await partyUpdatePage.getDriverLicenceInput()).to.eq(
      'driverLicence',
      'Expected DriverLicence value to be equals to driverLicence'
    );
    expect(await partyUpdatePage.getProfessionRegNoInput()).to.eq(
      'professionRegNo',
      'Expected ProfessionRegNo value to be equals to professionRegNo'
    );
    expect(await partyUpdatePage.getOccupationInput()).to.eq('occupation', 'Expected Occupation value to be equals to occupation');
    await partyUpdatePage.save();
    expect(await partyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await partyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Party', async () => {
    const nbButtonsBeforeDelete = await partyComponentsPage.countDeleteButtons();
    await partyComponentsPage.clickOnLastDeleteButton();

    partyDeleteDialog = new PartyDeleteDialog();
    expect(await partyDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.party.delete.question');
    await partyDeleteDialog.clickOnConfirmButton();

    expect(await partyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
