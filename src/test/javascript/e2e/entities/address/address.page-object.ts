import { element, by, ElementFinder } from 'protractor';

export class AddressComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-address div table .btn-danger'));
  title = element.all(by.css('jhi-address div h2#page-heading span')).first();

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton() {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AddressUpdatePage {
  pageTitle = element(by.id('jhi-address-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  addressAreaNameInput = element(by.id('field_addressAreaName'));
  streetNameInput = element(by.id('field_streetName'));
  buildingNameInput = element(by.id('field_buildingName'));
  buildingNumberInput = element(by.id('field_buildingNumber'));
  postalCodeInput = element(by.id('field_postalCode'));
  cityInput = element(by.id('field_city'));
  countryInput = element(by.id('field_country'));
  regionInput = element(by.id('field_region'));
  districtInput = element(by.id('field_district'));
  villageInput = element(by.id('field_village'));
  stateInput = element(by.id('field_state'));
  estateNameInput = element(by.id('field_estateName'));
  localGovernmentAreaInput = element(by.id('field_localGovernmentArea'));
  localCouncilAreaInput = element(by.id('field_localCouncilArea'));
  streetNumberInput = element(by.id('field_streetNumber'));
  streetTypeInput = element(by.id('field_streetType'));
  townInput = element(by.id('field_town'));
  wardInput = element(by.id('field_ward'));
  categoryInput = element(by.id('field_category'));
  stateOfOriginInput = element(by.id('field_stateOfOrigin'));
  schemeNameInput = element(by.id('field_schemeName'));
  blockNumberInput = element(by.id('field_blockNumber'));
  plotNumberInput = element(by.id('field_plotNumber'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setAddressAreaNameInput(addressAreaName) {
    await this.addressAreaNameInput.sendKeys(addressAreaName);
  }

  async getAddressAreaNameInput() {
    return await this.addressAreaNameInput.getAttribute('value');
  }

  async setStreetNameInput(streetName) {
    await this.streetNameInput.sendKeys(streetName);
  }

  async getStreetNameInput() {
    return await this.streetNameInput.getAttribute('value');
  }

  async setBuildingNameInput(buildingName) {
    await this.buildingNameInput.sendKeys(buildingName);
  }

  async getBuildingNameInput() {
    return await this.buildingNameInput.getAttribute('value');
  }

  async setBuildingNumberInput(buildingNumber) {
    await this.buildingNumberInput.sendKeys(buildingNumber);
  }

  async getBuildingNumberInput() {
    return await this.buildingNumberInput.getAttribute('value');
  }

  async setPostalCodeInput(postalCode) {
    await this.postalCodeInput.sendKeys(postalCode);
  }

  async getPostalCodeInput() {
    return await this.postalCodeInput.getAttribute('value');
  }

  async setCityInput(city) {
    await this.cityInput.sendKeys(city);
  }

  async getCityInput() {
    return await this.cityInput.getAttribute('value');
  }

  async setCountryInput(country) {
    await this.countryInput.sendKeys(country);
  }

  async getCountryInput() {
    return await this.countryInput.getAttribute('value');
  }

  async setRegionInput(region) {
    await this.regionInput.sendKeys(region);
  }

  async getRegionInput() {
    return await this.regionInput.getAttribute('value');
  }

  async setDistrictInput(district) {
    await this.districtInput.sendKeys(district);
  }

  async getDistrictInput() {
    return await this.districtInput.getAttribute('value');
  }

  async setVillageInput(village) {
    await this.villageInput.sendKeys(village);
  }

  async getVillageInput() {
    return await this.villageInput.getAttribute('value');
  }

  async setStateInput(state) {
    await this.stateInput.sendKeys(state);
  }

  async getStateInput() {
    return await this.stateInput.getAttribute('value');
  }

  async setEstateNameInput(estateName) {
    await this.estateNameInput.sendKeys(estateName);
  }

  async getEstateNameInput() {
    return await this.estateNameInput.getAttribute('value');
  }

  async setLocalGovernmentAreaInput(localGovernmentArea) {
    await this.localGovernmentAreaInput.sendKeys(localGovernmentArea);
  }

  async getLocalGovernmentAreaInput() {
    return await this.localGovernmentAreaInput.getAttribute('value');
  }

  async setLocalCouncilAreaInput(localCouncilArea) {
    await this.localCouncilAreaInput.sendKeys(localCouncilArea);
  }

  async getLocalCouncilAreaInput() {
    return await this.localCouncilAreaInput.getAttribute('value');
  }

  async setStreetNumberInput(streetNumber) {
    await this.streetNumberInput.sendKeys(streetNumber);
  }

  async getStreetNumberInput() {
    return await this.streetNumberInput.getAttribute('value');
  }

  async setStreetTypeInput(streetType) {
    await this.streetTypeInput.sendKeys(streetType);
  }

  async getStreetTypeInput() {
    return await this.streetTypeInput.getAttribute('value');
  }

  async setTownInput(town) {
    await this.townInput.sendKeys(town);
  }

  async getTownInput() {
    return await this.townInput.getAttribute('value');
  }

  async setWardInput(ward) {
    await this.wardInput.sendKeys(ward);
  }

  async getWardInput() {
    return await this.wardInput.getAttribute('value');
  }

  async setCategoryInput(category) {
    await this.categoryInput.sendKeys(category);
  }

  async getCategoryInput() {
    return await this.categoryInput.getAttribute('value');
  }

  async setStateOfOriginInput(stateOfOrigin) {
    await this.stateOfOriginInput.sendKeys(stateOfOrigin);
  }

  async getStateOfOriginInput() {
    return await this.stateOfOriginInput.getAttribute('value');
  }

  async setSchemeNameInput(schemeName) {
    await this.schemeNameInput.sendKeys(schemeName);
  }

  async getSchemeNameInput() {
    return await this.schemeNameInput.getAttribute('value');
  }

  async setBlockNumberInput(blockNumber) {
    await this.blockNumberInput.sendKeys(blockNumber);
  }

  async getBlockNumberInput() {
    return await this.blockNumberInput.getAttribute('value');
  }

  async setPlotNumberInput(plotNumber) {
    await this.plotNumberInput.sendKeys(plotNumber);
  }

  async getPlotNumberInput() {
    return await this.plotNumberInput.getAttribute('value');
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AddressDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-address-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-address'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
