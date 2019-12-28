import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AddressComponentsPage, AddressDeleteDialog, AddressUpdatePage } from './address.page-object';

const expect = chai.expect;

describe('Address e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let addressComponentsPage: AddressComponentsPage;
  let addressUpdatePage: AddressUpdatePage;
  let addressDeleteDialog: AddressDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Addresses', async () => {
    await navBarPage.goToEntity('address');
    addressComponentsPage = new AddressComponentsPage();
    await browser.wait(ec.visibilityOf(addressComponentsPage.title), 5000);
    expect(await addressComponentsPage.getTitle()).to.eq('egisexternalApp.address.home.title');
  });

  it('should load create Address page', async () => {
    await addressComponentsPage.clickOnCreateButton();
    addressUpdatePage = new AddressUpdatePage();
    expect(await addressUpdatePage.getPageTitle()).to.eq('egisexternalApp.address.home.createOrEditLabel');
    await addressUpdatePage.cancel();
  });

  it('should create and save Addresses', async () => {
    const nbButtonsBeforeCreate = await addressComponentsPage.countDeleteButtons();

    await addressComponentsPage.clickOnCreateButton();
    await promise.all([
      addressUpdatePage.setAddressAreaNameInput('addressAreaName'),
      addressUpdatePage.setStreetNameInput('streetName'),
      addressUpdatePage.setBuildingNameInput('buildingName'),
      addressUpdatePage.setBuildingNumberInput('buildingNumber'),
      addressUpdatePage.setPostalCodeInput('postalCode'),
      addressUpdatePage.setCityInput('city'),
      addressUpdatePage.setCountryInput('5'),
      addressUpdatePage.setRegionInput('5'),
      addressUpdatePage.setDistrictInput('5'),
      addressUpdatePage.setVillageInput('village'),
      addressUpdatePage.setStateInput('state'),
      addressUpdatePage.setEstateNameInput('estateName'),
      addressUpdatePage.setLocalGovernmentAreaInput('5'),
      addressUpdatePage.setLocalCouncilAreaInput('5'),
      addressUpdatePage.setStreetNumberInput('streetNumber'),
      addressUpdatePage.setStreetTypeInput('5'),
      addressUpdatePage.setTownInput('town'),
      addressUpdatePage.setWardInput('ward'),
      addressUpdatePage.setCategoryInput('category'),
      addressUpdatePage.setStateOfOriginInput('5'),
      addressUpdatePage.setSchemeNameInput('5'),
      addressUpdatePage.setBlockNumberInput('blockNumber'),
      addressUpdatePage.setPlotNumberInput('plotNumber')
    ]);
    expect(await addressUpdatePage.getAddressAreaNameInput()).to.eq(
      'addressAreaName',
      'Expected AddressAreaName value to be equals to addressAreaName'
    );
    expect(await addressUpdatePage.getStreetNameInput()).to.eq('streetName', 'Expected StreetName value to be equals to streetName');
    expect(await addressUpdatePage.getBuildingNameInput()).to.eq(
      'buildingName',
      'Expected BuildingName value to be equals to buildingName'
    );
    expect(await addressUpdatePage.getBuildingNumberInput()).to.eq(
      'buildingNumber',
      'Expected BuildingNumber value to be equals to buildingNumber'
    );
    expect(await addressUpdatePage.getPostalCodeInput()).to.eq('postalCode', 'Expected PostalCode value to be equals to postalCode');
    expect(await addressUpdatePage.getCityInput()).to.eq('city', 'Expected City value to be equals to city');
    expect(await addressUpdatePage.getCountryInput()).to.eq('5', 'Expected country value to be equals to 5');
    expect(await addressUpdatePage.getRegionInput()).to.eq('5', 'Expected region value to be equals to 5');
    expect(await addressUpdatePage.getDistrictInput()).to.eq('5', 'Expected district value to be equals to 5');
    expect(await addressUpdatePage.getVillageInput()).to.eq('village', 'Expected Village value to be equals to village');
    expect(await addressUpdatePage.getStateInput()).to.eq('state', 'Expected State value to be equals to state');
    expect(await addressUpdatePage.getEstateNameInput()).to.eq('estateName', 'Expected EstateName value to be equals to estateName');
    expect(await addressUpdatePage.getLocalGovernmentAreaInput()).to.eq('5', 'Expected localGovernmentArea value to be equals to 5');
    expect(await addressUpdatePage.getLocalCouncilAreaInput()).to.eq('5', 'Expected localCouncilArea value to be equals to 5');
    expect(await addressUpdatePage.getStreetNumberInput()).to.eq(
      'streetNumber',
      'Expected StreetNumber value to be equals to streetNumber'
    );
    expect(await addressUpdatePage.getStreetTypeInput()).to.eq('5', 'Expected streetType value to be equals to 5');
    expect(await addressUpdatePage.getTownInput()).to.eq('town', 'Expected Town value to be equals to town');
    expect(await addressUpdatePage.getWardInput()).to.eq('ward', 'Expected Ward value to be equals to ward');
    expect(await addressUpdatePage.getCategoryInput()).to.eq('category', 'Expected Category value to be equals to category');
    expect(await addressUpdatePage.getStateOfOriginInput()).to.eq('5', 'Expected stateOfOrigin value to be equals to 5');
    expect(await addressUpdatePage.getSchemeNameInput()).to.eq('5', 'Expected schemeName value to be equals to 5');
    expect(await addressUpdatePage.getBlockNumberInput()).to.eq('blockNumber', 'Expected BlockNumber value to be equals to blockNumber');
    expect(await addressUpdatePage.getPlotNumberInput()).to.eq('plotNumber', 'Expected PlotNumber value to be equals to plotNumber');
    await addressUpdatePage.save();
    expect(await addressUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Address', async () => {
    const nbButtonsBeforeDelete = await addressComponentsPage.countDeleteButtons();
    await addressComponentsPage.clickOnLastDeleteButton();

    addressDeleteDialog = new AddressDeleteDialog();
    expect(await addressDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.address.delete.question');
    await addressDeleteDialog.clickOnConfirmButton();

    expect(await addressComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
