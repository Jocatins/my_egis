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
      partyUpdatePage.setPartyTypeInput('5'),
      partyUpdatePage.setPartyRoleTypeInput('5'),
      partyUpdatePage.setPartySubRoleTypeInput('5'),
      partyUpdatePage.setDeliveryTypeInput('5'),
      partyUpdatePage.setPartyNameInput('partyName'),
      partyUpdatePage.setShareNominatorInput('shareNominator'),
      partyUpdatePage.setShareDenominatorInput('shareDenominator'),
      partyUpdatePage.setTaxExemptInput('taxExempt'),
      partyUpdatePage.setPrimaryPartyInput('primaryParty'),
      partyUpdatePage.setOtherNameInput('otherName'),
      partyUpdatePage.setPersonIdTypeInput('5'),
      partyUpdatePage.setPersonTypeInput('5'),
      partyUpdatePage.setFaxInput('fax'),
      partyUpdatePage.setEmailInput('email'),
      partyUpdatePage.setEmailTypeInput('5'),
      partyUpdatePage.setPhoneNumberInput('phoneNumber'),
      partyUpdatePage.setPayerIdInput('payerId'),
      partyUpdatePage.setTaxPayerNumberInput('taxPayerNumber'),
      partyUpdatePage.setCommentsInput('comments'),
      partyUpdatePage.setPersonIdIssuedByInput('5'),
      partyUpdatePage.setPersonIdDateInput('2000-12-31'),
      partyUpdatePage.setPersonIdExpirationDateInput('2000-12-31'),
      partyUpdatePage.setRcNumberInput('rcNumber'),
      partyUpdatePage.setOrganizationInput('organization'),
      partyUpdatePage.setBusinessNatureInput('businessNature'),
      partyUpdatePage.setBirthPlaceInput('birthPlace'),
      partyUpdatePage.setBirthDateInput('2000-12-31'),
      partyUpdatePage.setPersonTitleInput('5'),
      partyUpdatePage.setGenderInput('5'),
      partyUpdatePage.setFirstNameInput('firstName'),
      partyUpdatePage.setMiddleNameInput('middleName'),
      partyUpdatePage.setLastNameInput('lastName'),
      partyUpdatePage.setCivilStateInput('5'),
      partyUpdatePage.setDriverLicenseRegionInput('5'),
      partyUpdatePage.setDriverLicenceInput('driverLicence'),
      partyUpdatePage.setRepresentativeIdInput('5'),
      partyUpdatePage.setProfessionRegNoInput('professionRegNo'),
      partyUpdatePage.setOccupationInput('occupation'),
      partyUpdatePage.addressSelectLastOption()
    ]);
    expect(await partyUpdatePage.getPartyTypeInput()).to.eq('5', 'Expected partyType value to be equals to 5');
    expect(await partyUpdatePage.getPartyRoleTypeInput()).to.eq('5', 'Expected partyRoleType value to be equals to 5');
    expect(await partyUpdatePage.getPartySubRoleTypeInput()).to.eq('5', 'Expected partySubRoleType value to be equals to 5');
    expect(await partyUpdatePage.getDeliveryTypeInput()).to.eq('5', 'Expected deliveryType value to be equals to 5');
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
    expect(await partyUpdatePage.getPrimaryPartyInput()).to.eq('primaryParty', 'Expected PrimaryParty value to be equals to primaryParty');
    expect(await partyUpdatePage.getOtherNameInput()).to.eq('otherName', 'Expected OtherName value to be equals to otherName');
    expect(await partyUpdatePage.getPersonIdTypeInput()).to.eq('5', 'Expected personIdType value to be equals to 5');
    expect(await partyUpdatePage.getPersonTypeInput()).to.eq('5', 'Expected personType value to be equals to 5');
    expect(await partyUpdatePage.getFaxInput()).to.eq('fax', 'Expected Fax value to be equals to fax');
    expect(await partyUpdatePage.getEmailInput()).to.eq('email', 'Expected Email value to be equals to email');
    expect(await partyUpdatePage.getEmailTypeInput()).to.eq('5', 'Expected emailType value to be equals to 5');
    expect(await partyUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
    expect(await partyUpdatePage.getPayerIdInput()).to.eq('payerId', 'Expected PayerId value to be equals to payerId');
    expect(await partyUpdatePage.getTaxPayerNumberInput()).to.eq(
      'taxPayerNumber',
      'Expected TaxPayerNumber value to be equals to taxPayerNumber'
    );
    expect(await partyUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await partyUpdatePage.getPersonIdIssuedByInput()).to.eq('5', 'Expected personIdIssuedBy value to be equals to 5');
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
    expect(await partyUpdatePage.getPersonTitleInput()).to.eq('5', 'Expected personTitle value to be equals to 5');
    expect(await partyUpdatePage.getGenderInput()).to.eq('5', 'Expected gender value to be equals to 5');
    expect(await partyUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
    expect(await partyUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
    expect(await partyUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
    expect(await partyUpdatePage.getCivilStateInput()).to.eq('5', 'Expected civilState value to be equals to 5');
    expect(await partyUpdatePage.getDriverLicenseRegionInput()).to.eq('5', 'Expected driverLicenseRegion value to be equals to 5');
    expect(await partyUpdatePage.getDriverLicenceInput()).to.eq(
      'driverLicence',
      'Expected DriverLicence value to be equals to driverLicence'
    );
    expect(await partyUpdatePage.getRepresentativeIdInput()).to.eq('5', 'Expected representativeId value to be equals to 5');
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
