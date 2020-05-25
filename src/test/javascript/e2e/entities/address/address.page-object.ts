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
