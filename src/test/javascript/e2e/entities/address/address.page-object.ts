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
  villageInput = element(by.id('field_village'));
  streetNumberInput = element(by.id('field_streetNumber'));
  townInput = element(by.id('field_town'));
  wardInput = element(by.id('field_ward'));
  blockNumberInput = element(by.id('field_blockNumber'));
  plotNumberInput = element(by.id('field_plotNumber'));
  countrySelect = element(by.id('field_country'));
  regionSelect = element(by.id('field_region'));
  districtSelect = element(by.id('field_district'));
  stateSelect = element(by.id('field_state'));
  estateNameSelect = element(by.id('field_estateName'));
  localGovernmentAreaSelect = element(by.id('field_localGovernmentArea'));
  localCouncilAreaSelect = element(by.id('field_localCouncilArea'));
  streetTypeSelect = element(by.id('field_streetType'));
  stateOfOriginSelect = element(by.id('field_stateOfOrigin'));
  schemeNameSelect = element(by.id('field_schemeName'));
  categorySelect = element(by.id('field_category'));

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

  async setVillageInput(village) {
    await this.villageInput.sendKeys(village);
  }

  async getVillageInput() {
    return await this.villageInput.getAttribute('value');
  }

  async setStreetNumberInput(streetNumber) {
    await this.streetNumberInput.sendKeys(streetNumber);
  }

  async getStreetNumberInput() {
    return await this.streetNumberInput.getAttribute('value');
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

  async countrySelectLastOption() {
    await this.countrySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async countrySelectOption(option) {
    await this.countrySelect.sendKeys(option);
  }

  getCountrySelect(): ElementFinder {
    return this.countrySelect;
  }

  async getCountrySelectedOption() {
    return await this.countrySelect.element(by.css('option:checked')).getText();
  }

  async regionSelectLastOption() {
    await this.regionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async regionSelectOption(option) {
    await this.regionSelect.sendKeys(option);
  }

  getRegionSelect(): ElementFinder {
    return this.regionSelect;
  }

  async getRegionSelectedOption() {
    return await this.regionSelect.element(by.css('option:checked')).getText();
  }

  async districtSelectLastOption() {
    await this.districtSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async districtSelectOption(option) {
    await this.districtSelect.sendKeys(option);
  }

  getDistrictSelect(): ElementFinder {
    return this.districtSelect;
  }

  async getDistrictSelectedOption() {
    return await this.districtSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stateSelectOption(option) {
    await this.stateSelect.sendKeys(option);
  }

  getStateSelect(): ElementFinder {
    return this.stateSelect;
  }

  async getStateSelectedOption() {
    return await this.stateSelect.element(by.css('option:checked')).getText();
  }

  async estateNameSelectLastOption() {
    await this.estateNameSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async estateNameSelectOption(option) {
    await this.estateNameSelect.sendKeys(option);
  }

  getEstateNameSelect(): ElementFinder {
    return this.estateNameSelect;
  }

  async getEstateNameSelectedOption() {
    return await this.estateNameSelect.element(by.css('option:checked')).getText();
  }

  async localGovernmentAreaSelectLastOption() {
    await this.localGovernmentAreaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async localGovernmentAreaSelectOption(option) {
    await this.localGovernmentAreaSelect.sendKeys(option);
  }

  getLocalGovernmentAreaSelect(): ElementFinder {
    return this.localGovernmentAreaSelect;
  }

  async getLocalGovernmentAreaSelectedOption() {
    return await this.localGovernmentAreaSelect.element(by.css('option:checked')).getText();
  }

  async localCouncilAreaSelectLastOption() {
    await this.localCouncilAreaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async localCouncilAreaSelectOption(option) {
    await this.localCouncilAreaSelect.sendKeys(option);
  }

  getLocalCouncilAreaSelect(): ElementFinder {
    return this.localCouncilAreaSelect;
  }

  async getLocalCouncilAreaSelectedOption() {
    return await this.localCouncilAreaSelect.element(by.css('option:checked')).getText();
  }

  async streetTypeSelectLastOption() {
    await this.streetTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async streetTypeSelectOption(option) {
    await this.streetTypeSelect.sendKeys(option);
  }

  getStreetTypeSelect(): ElementFinder {
    return this.streetTypeSelect;
  }

  async getStreetTypeSelectedOption() {
    return await this.streetTypeSelect.element(by.css('option:checked')).getText();
  }

  async stateOfOriginSelectLastOption() {
    await this.stateOfOriginSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stateOfOriginSelectOption(option) {
    await this.stateOfOriginSelect.sendKeys(option);
  }

  getStateOfOriginSelect(): ElementFinder {
    return this.stateOfOriginSelect;
  }

  async getStateOfOriginSelectedOption() {
    return await this.stateOfOriginSelect.element(by.css('option:checked')).getText();
  }

  async schemeNameSelectLastOption() {
    await this.schemeNameSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async schemeNameSelectOption(option) {
    await this.schemeNameSelect.sendKeys(option);
  }

  getSchemeNameSelect(): ElementFinder {
    return this.schemeNameSelect;
  }

  async getSchemeNameSelectedOption() {
    return await this.schemeNameSelect.element(by.css('option:checked')).getText();
  }

  async categorySelectLastOption() {
    await this.categorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async categorySelectOption(option) {
    await this.categorySelect.sendKeys(option);
  }

  getCategorySelect(): ElementFinder {
    return this.categorySelect;
  }

  async getCategorySelectedOption() {
    return await this.categorySelect.element(by.css('option:checked')).getText();
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
