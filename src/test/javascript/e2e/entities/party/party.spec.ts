import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PartyComponentsPage,
  /* PartyDeleteDialog,
   */ PartyUpdatePage
} from './party.page-object';

const expect = chai.expect;

describe('Party e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let partyComponentsPage: PartyComponentsPage;
  let partyUpdatePage: PartyUpdatePage;
  /* let partyDeleteDialog: PartyDeleteDialog; */

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

  /*  it('should create and save Parties', async () => {
        const nbButtonsBeforeCreate = await partyComponentsPage.countDeleteButtons();

        await partyComponentsPage.clickOnCreateButton();
        await promise.all([
            partyUpdatePage.setEmailAddressInput('emailAddress'),
            partyUpdatePage.setPhoneNumberInput('phoneNumber'),
            partyUpdatePage.setPayerIdInput('payerId'),
            partyUpdatePage.setTaxPayerNumberInput('taxPayerNumber'),
            partyUpdatePage.setPayeNumberInput('payeNumber'),
            partyUpdatePage.setCommentsInput('comments'),
            partyUpdatePage.setPersonIdDateInput('2000-12-31'),
            partyUpdatePage.setPersonIdExpirationDateInput('2000-12-31'),
            partyUpdatePage.setRcNumberInput('rcNumber'),
            partyUpdatePage.setOrganizationInput('organization'),
            partyUpdatePage.setBirthPlaceInput('birthPlace'),
            partyUpdatePage.setBirthDateInput('2000-12-31'),
            partyUpdatePage.setFirstNameInput('firstName'),
            partyUpdatePage.setMiddleNameInput('middleName'),
            partyUpdatePage.setLastNameInput('lastName'),
            partyUpdatePage.setOccupationInput('occupation'),
            partyUpdatePage.setUnitNumberInput('unitNumber'),
            partyUpdatePage.setBlockNumberInput('blockNumber'),
            partyUpdatePage.setPlotNumberInput('plotNumber'),
            partyUpdatePage.setStreetNumberInput('streetNumber'),
            partyUpdatePage.setStreetNameInput('streetName'),
            partyUpdatePage.setBuildingNameInput('buildingName'),
            partyUpdatePage.setBuildingNumberInput('buildingNumber'),
            partyUpdatePage.setPostalCodeInput('postalCode'),
            partyUpdatePage.setCityInput('city'),
            partyUpdatePage.setVillageInput('village'),
            partyUpdatePage.setLongAddressInput('longAddress'),
            partyUpdatePage.setTownInput('town'),
            partyUpdatePage.setWardInput('ward'),
            partyUpdatePage.setNextOfKinPhoneInput('nextOfKinPhone'),
            partyUpdatePage.setIDDocumentIssuedDateInput('2000-12-31'),
            partyUpdatePage.setIDDocumentExpirationDateInput('2000-12-31'),
            partyUpdatePage.setIDDocumentNumberInput('iDDocumentNumber'),
            partyUpdatePage.primaryPartySelectLastOption(),
            partyUpdatePage.partyTypeSelectLastOption(),
            partyUpdatePage.partyRoleTypeSelectLastOption(),
            partyUpdatePage.personTypeSelectLastOption(),
            partyUpdatePage.emailTypeSelectLastOption(),
            partyUpdatePage.personIdIssuedBySelectLastOption(),
            partyUpdatePage.personTitleSelectLastOption(),
            partyUpdatePage.genderSelectLastOption(),
            partyUpdatePage.civilStateSelectLastOption(),
            partyUpdatePage.driverLicenseRegionSelectLastOption(),
            partyUpdatePage.businessNatureSelectLastOption(),
            partyUpdatePage.phoneCategorySelectLastOption(),
            partyUpdatePage.nextOfKinPhoneCategorySelectLastOption(),
            partyUpdatePage.emailCategorySelectLastOption(),
            partyUpdatePage.addressCategorySelectLastOption(),
            partyUpdatePage.iDDocumentTypeSelectLastOption(),
            partyUpdatePage.iDDocumentIssuedBySelectLastOption(),
            partyUpdatePage.suffixTitleSelectLastOption(),
            partyUpdatePage.stateofOriginSelectLastOption(),
            partyUpdatePage.maritalStatusSelectLastOption(),
            partyUpdatePage.streetTypeSelectLastOption(),
            partyUpdatePage.estateNameSelectLastOption(),
            partyUpdatePage.schemeNameSelectLastOption(),
            partyUpdatePage.districtSelectLastOption(),
            partyUpdatePage.localGovernmentAreaSelectLastOption(),
            partyUpdatePage.countrySelectLastOption(),
        ]);
        expect(await partyUpdatePage.getEmailAddressInput()).to.eq('emailAddress', 'Expected EmailAddress value to be equals to emailAddress');
        expect(await partyUpdatePage.getPhoneNumberInput()).to.eq('phoneNumber', 'Expected PhoneNumber value to be equals to phoneNumber');
        expect(await partyUpdatePage.getPayerIdInput()).to.eq('payerId', 'Expected PayerId value to be equals to payerId');
        expect(await partyUpdatePage.getTaxPayerNumberInput()).to.eq('taxPayerNumber', 'Expected TaxPayerNumber value to be equals to taxPayerNumber');
        expect(await partyUpdatePage.getPayeNumberInput()).to.eq('payeNumber', 'Expected PayeNumber value to be equals to payeNumber');
        expect(await partyUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
        expect(await partyUpdatePage.getPersonIdDateInput()).to.eq('2000-12-31', 'Expected personIdDate value to be equals to 2000-12-31');
        expect(await partyUpdatePage.getPersonIdExpirationDateInput()).to.eq('2000-12-31', 'Expected personIdExpirationDate value to be equals to 2000-12-31');
        expect(await partyUpdatePage.getRcNumberInput()).to.eq('rcNumber', 'Expected RcNumber value to be equals to rcNumber');
        expect(await partyUpdatePage.getOrganizationInput()).to.eq('organization', 'Expected Organization value to be equals to organization');
        expect(await partyUpdatePage.getBirthPlaceInput()).to.eq('birthPlace', 'Expected BirthPlace value to be equals to birthPlace');
        expect(await partyUpdatePage.getBirthDateInput()).to.eq('2000-12-31', 'Expected birthDate value to be equals to 2000-12-31');
        expect(await partyUpdatePage.getFirstNameInput()).to.eq('firstName', 'Expected FirstName value to be equals to firstName');
        expect(await partyUpdatePage.getMiddleNameInput()).to.eq('middleName', 'Expected MiddleName value to be equals to middleName');
        expect(await partyUpdatePage.getLastNameInput()).to.eq('lastName', 'Expected LastName value to be equals to lastName');
        expect(await partyUpdatePage.getOccupationInput()).to.eq('occupation', 'Expected Occupation value to be equals to occupation');
        expect(await partyUpdatePage.getUnitNumberInput()).to.eq('unitNumber', 'Expected UnitNumber value to be equals to unitNumber');
        expect(await partyUpdatePage.getBlockNumberInput()).to.eq('blockNumber', 'Expected BlockNumber value to be equals to blockNumber');
        expect(await partyUpdatePage.getPlotNumberInput()).to.eq('plotNumber', 'Expected PlotNumber value to be equals to plotNumber');
        expect(await partyUpdatePage.getStreetNumberInput()).to.eq('streetNumber', 'Expected StreetNumber value to be equals to streetNumber');
        expect(await partyUpdatePage.getStreetNameInput()).to.eq('streetName', 'Expected StreetName value to be equals to streetName');
        expect(await partyUpdatePage.getBuildingNameInput()).to.eq('buildingName', 'Expected BuildingName value to be equals to buildingName');
        expect(await partyUpdatePage.getBuildingNumberInput()).to.eq('buildingNumber', 'Expected BuildingNumber value to be equals to buildingNumber');
        expect(await partyUpdatePage.getPostalCodeInput()).to.eq('postalCode', 'Expected PostalCode value to be equals to postalCode');
        expect(await partyUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
        expect(await partyUpdatePage.getVillageInput()).to.eq('village', 'Expected Village value to be equals to village');
        expect(await partyUpdatePage.getLongAddressInput()).to.eq('longAddress', 'Expected LongAddress value to be equals to longAddress');
        expect(await partyUpdatePage.getTownInput()).to.eq('town', 'Expected Town value to be equals to town');
        expect(await partyUpdatePage.getWardInput()).to.eq('ward', 'Expected Ward value to be equals to ward');
        expect(await partyUpdatePage.getNextOfKinPhoneInput()).to.eq('nextOfKinPhone', 'Expected NextOfKinPhone value to be equals to nextOfKinPhone');
        expect(await partyUpdatePage.getIDDocumentIssuedDateInput()).to.eq('2000-12-31', 'Expected iDDocumentIssuedDate value to be equals to 2000-12-31');
        expect(await partyUpdatePage.getIDDocumentExpirationDateInput()).to.eq('2000-12-31', 'Expected iDDocumentExpirationDate value to be equals to 2000-12-31');
        expect(await partyUpdatePage.getIDDocumentNumberInput()).to.eq('iDDocumentNumber', 'Expected IDDocumentNumber value to be equals to iDDocumentNumber');
        await partyUpdatePage.save();
        expect(await partyUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await partyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Party', async () => {
        const nbButtonsBeforeDelete = await partyComponentsPage.countDeleteButtons();
        await partyComponentsPage.clickOnLastDeleteButton();

        partyDeleteDialog = new PartyDeleteDialog();
        expect(await partyDeleteDialog.getDialogTitle())
            .to.eq('egisexternalApp.party.delete.question');
        await partyDeleteDialog.clickOnConfirmButton();

        expect(await partyComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
