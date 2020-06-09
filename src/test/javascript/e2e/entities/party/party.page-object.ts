import { element, by, ElementFinder } from 'protractor';

export class PartyComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-party div table .btn-danger'));
  title = element.all(by.css('jhi-party div h2#page-heading span')).first();

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

export class PartyUpdatePage {
  pageTitle = element(by.id('jhi-party-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  primaryPartyInput = element(by.id('field_primaryParty'));
  emailAddressInput = element(by.id('field_emailAddress'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  payerIdInput = element(by.id('field_payerId'));
  taxPayerNumberInput = element(by.id('field_taxPayerNumber'));
  payeNumberInput = element(by.id('field_payeNumber'));
  commentsInput = element(by.id('field_comments'));
  personIdDateInput = element(by.id('field_personIdDate'));
  personIdExpirationDateInput = element(by.id('field_personIdExpirationDate'));
  rcNumberInput = element(by.id('field_rcNumber'));
  organizationInput = element(by.id('field_organization'));
  birthPlaceInput = element(by.id('field_birthPlace'));
  birthDateInput = element(by.id('field_birthDate'));
  firstNameInput = element(by.id('field_firstName'));
  middleNameInput = element(by.id('field_middleName'));
  lastNameInput = element(by.id('field_lastName'));
  occupationInput = element(by.id('field_occupation'));
  unitNumberInput = element(by.id('field_unitNumber'));
  blockNumberInput = element(by.id('field_blockNumber'));
  streetNumberInput = element(by.id('field_streetNumber'));
  streetNameInput = element(by.id('field_streetName'));
  buildingNameInput = element(by.id('field_buildingName'));
  buildingNumberInput = element(by.id('field_buildingNumber'));
  postalCodeInput = element(by.id('field_postalCode'));
  cityInput = element(by.id('field_city'));
  villageInput = element(by.id('field_village'));
  longAddressInput = element(by.id('field_longAddress'));
  townInput = element(by.id('field_town'));
  wardInput = element(by.id('field_ward'));
  plotNumberInput = element(by.id('field_plotNumber'));
  nextOfKinPhoneInput = element(by.id('field_nextOfKinPhone'));
  iDDocumentIssuedDateInput = element(by.id('field_iDDocumentIssuedDate'));
  iDDocumentExpirationDateInput = element(by.id('field_iDDocumentExpirationDate'));
  iDDocumentNumberInput = element(by.id('field_iDDocumentNumber'));
  partyTypeSelect = element(by.id('field_partyType'));
  partyRoleTypeSelect = element(by.id('field_partyRoleType'));
  personTypeSelect = element(by.id('field_personType'));
  emailTypeSelect = element(by.id('field_emailType'));
  personIdIssuedBySelect = element(by.id('field_personIdIssuedBy'));
  personTitleSelect = element(by.id('field_personTitle'));
  genderSelect = element(by.id('field_gender'));
  civilStateSelect = element(by.id('field_civilState'));
  driverLicenseRegionSelect = element(by.id('field_driverLicenseRegion'));
  businessNatureSelect = element(by.id('field_businessNature'));
  phoneCategorySelect = element(by.id('field_phoneCategory'));
  nextOfKinPhoneCategorySelect = element(by.id('field_nextOfKinPhoneCategory'));
  emailCategorySelect = element(by.id('field_emailCategory'));
  addressCategorySelect = element(by.id('field_addressCategory'));
  iDDocumentTypeSelect = element(by.id('field_iDDocumentType'));
  iDDocumentIssuedBySelect = element(by.id('field_iDDocumentIssuedBy'));
  suffixTitleSelect = element(by.id('field_suffixTitle'));
  stateofOriginSelect = element(by.id('field_stateofOrigin'));
  maritalStatusSelect = element(by.id('field_maritalStatus'));
  streetTypeSelect = element(by.id('field_streetType'));
  estateNameSelect = element(by.id('field_estateName'));
  schemeNameSelect = element(by.id('field_schemeName'));
  districtSelect = element(by.id('field_district'));
  localGovernmentAreaSelect = element(by.id('field_localGovernmentArea'));
  countrySelect = element(by.id('field_country'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPrimaryPartyInput(primaryParty) {
    await this.primaryPartyInput.sendKeys(primaryParty);
  }

  async getPrimaryPartyInput() {
    return await this.primaryPartyInput.getAttribute('value');
  }

  async setEmailAddressInput(emailAddress) {
    await this.emailAddressInput.sendKeys(emailAddress);
  }

  async getEmailAddressInput() {
    return await this.emailAddressInput.getAttribute('value');
  }

  async setPhoneNumberInput(phoneNumber) {
    await this.phoneNumberInput.sendKeys(phoneNumber);
  }

  async getPhoneNumberInput() {
    return await this.phoneNumberInput.getAttribute('value');
  }

  async setPayerIdInput(payerId) {
    await this.payerIdInput.sendKeys(payerId);
  }

  async getPayerIdInput() {
    return await this.payerIdInput.getAttribute('value');
  }

  async setTaxPayerNumberInput(taxPayerNumber) {
    await this.taxPayerNumberInput.sendKeys(taxPayerNumber);
  }

  async getTaxPayerNumberInput() {
    return await this.taxPayerNumberInput.getAttribute('value');
  }

  async setPayeNumberInput(payeNumber) {
    await this.payeNumberInput.sendKeys(payeNumber);
  }

  async getPayeNumberInput() {
    return await this.payeNumberInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return await this.commentsInput.getAttribute('value');
  }

  async setPersonIdDateInput(personIdDate) {
    await this.personIdDateInput.sendKeys(personIdDate);
  }

  async getPersonIdDateInput() {
    return await this.personIdDateInput.getAttribute('value');
  }

  async setPersonIdExpirationDateInput(personIdExpirationDate) {
    await this.personIdExpirationDateInput.sendKeys(personIdExpirationDate);
  }

  async getPersonIdExpirationDateInput() {
    return await this.personIdExpirationDateInput.getAttribute('value');
  }

  async setRcNumberInput(rcNumber) {
    await this.rcNumberInput.sendKeys(rcNumber);
  }

  async getRcNumberInput() {
    return await this.rcNumberInput.getAttribute('value');
  }

  async setOrganizationInput(organization) {
    await this.organizationInput.sendKeys(organization);
  }

  async getOrganizationInput() {
    return await this.organizationInput.getAttribute('value');
  }

  async setBirthPlaceInput(birthPlace) {
    await this.birthPlaceInput.sendKeys(birthPlace);
  }

  async getBirthPlaceInput() {
    return await this.birthPlaceInput.getAttribute('value');
  }

  async setBirthDateInput(birthDate) {
    await this.birthDateInput.sendKeys(birthDate);
  }

  async getBirthDateInput() {
    return await this.birthDateInput.getAttribute('value');
  }

  async setFirstNameInput(firstName) {
    await this.firstNameInput.sendKeys(firstName);
  }

  async getFirstNameInput() {
    return await this.firstNameInput.getAttribute('value');
  }

  async setMiddleNameInput(middleName) {
    await this.middleNameInput.sendKeys(middleName);
  }

  async getMiddleNameInput() {
    return await this.middleNameInput.getAttribute('value');
  }

  async setLastNameInput(lastName) {
    await this.lastNameInput.sendKeys(lastName);
  }

  async getLastNameInput() {
    return await this.lastNameInput.getAttribute('value');
  }

  async setOccupationInput(occupation) {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput() {
    return await this.occupationInput.getAttribute('value');
  }

  async setUnitNumberInput(unitNumber) {
    await this.unitNumberInput.sendKeys(unitNumber);
  }

  async getUnitNumberInput() {
    return await this.unitNumberInput.getAttribute('value');
  }

  async setBlockNumberInput(blockNumber) {
    await this.blockNumberInput.sendKeys(blockNumber);
  }

  async getBlockNumberInput() {
    return await this.blockNumberInput.getAttribute('value');
  }

  async setStreetNumberInput(streetNumber) {
    await this.streetNumberInput.sendKeys(streetNumber);
  }

  async getStreetNumberInput() {
    return await this.streetNumberInput.getAttribute('value');
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

  async setLongAddressInput(longAddress) {
    await this.longAddressInput.sendKeys(longAddress);
  }

  async getLongAddressInput() {
    return await this.longAddressInput.getAttribute('value');
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

  async setPlotNumberInput(plotNumber) {
    await this.plotNumberInput.sendKeys(plotNumber);
  }

  async getPlotNumberInput() {
    return await this.plotNumberInput.getAttribute('value');
  }

  async setNextOfKinPhoneInput(nextOfKinPhone) {
    await this.nextOfKinPhoneInput.sendKeys(nextOfKinPhone);
  }

  async getNextOfKinPhoneInput() {
    return await this.nextOfKinPhoneInput.getAttribute('value');
  }

  async setIDDocumentIssuedDateInput(iDDocumentIssuedDate) {
    await this.iDDocumentIssuedDateInput.sendKeys(iDDocumentIssuedDate);
  }

  async getIDDocumentIssuedDateInput() {
    return await this.iDDocumentIssuedDateInput.getAttribute('value');
  }

  async setIDDocumentExpirationDateInput(iDDocumentExpirationDate) {
    await this.iDDocumentExpirationDateInput.sendKeys(iDDocumentExpirationDate);
  }

  async getIDDocumentExpirationDateInput() {
    return await this.iDDocumentExpirationDateInput.getAttribute('value');
  }

  async setIDDocumentNumberInput(iDDocumentNumber) {
    await this.iDDocumentNumberInput.sendKeys(iDDocumentNumber);
  }

  async getIDDocumentNumberInput() {
    return await this.iDDocumentNumberInput.getAttribute('value');
  }

  async partyTypeSelectLastOption() {
    await this.partyTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async partyTypeSelectOption(option) {
    await this.partyTypeSelect.sendKeys(option);
  }

  getPartyTypeSelect(): ElementFinder {
    return this.partyTypeSelect;
  }

  async getPartyTypeSelectedOption() {
    return await this.partyTypeSelect.element(by.css('option:checked')).getText();
  }

  async partyRoleTypeSelectLastOption() {
    await this.partyRoleTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async partyRoleTypeSelectOption(option) {
    await this.partyRoleTypeSelect.sendKeys(option);
  }

  getPartyRoleTypeSelect(): ElementFinder {
    return this.partyRoleTypeSelect;
  }

  async getPartyRoleTypeSelectedOption() {
    return await this.partyRoleTypeSelect.element(by.css('option:checked')).getText();
  }

  async personTypeSelectLastOption() {
    await this.personTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personTypeSelectOption(option) {
    await this.personTypeSelect.sendKeys(option);
  }

  getPersonTypeSelect(): ElementFinder {
    return this.personTypeSelect;
  }

  async getPersonTypeSelectedOption() {
    return await this.personTypeSelect.element(by.css('option:checked')).getText();
  }

  async emailTypeSelectLastOption() {
    await this.emailTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async emailTypeSelectOption(option) {
    await this.emailTypeSelect.sendKeys(option);
  }

  getEmailTypeSelect(): ElementFinder {
    return this.emailTypeSelect;
  }

  async getEmailTypeSelectedOption() {
    return await this.emailTypeSelect.element(by.css('option:checked')).getText();
  }

  async personIdIssuedBySelectLastOption() {
    await this.personIdIssuedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personIdIssuedBySelectOption(option) {
    await this.personIdIssuedBySelect.sendKeys(option);
  }

  getPersonIdIssuedBySelect(): ElementFinder {
    return this.personIdIssuedBySelect;
  }

  async getPersonIdIssuedBySelectedOption() {
    return await this.personIdIssuedBySelect.element(by.css('option:checked')).getText();
  }

  async personTitleSelectLastOption() {
    await this.personTitleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personTitleSelectOption(option) {
    await this.personTitleSelect.sendKeys(option);
  }

  getPersonTitleSelect(): ElementFinder {
    return this.personTitleSelect;
  }

  async getPersonTitleSelectedOption() {
    return await this.personTitleSelect.element(by.css('option:checked')).getText();
  }

  async genderSelectLastOption() {
    await this.genderSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async genderSelectOption(option) {
    await this.genderSelect.sendKeys(option);
  }

  getGenderSelect(): ElementFinder {
    return this.genderSelect;
  }

  async getGenderSelectedOption() {
    return await this.genderSelect.element(by.css('option:checked')).getText();
  }

  async civilStateSelectLastOption() {
    await this.civilStateSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async civilStateSelectOption(option) {
    await this.civilStateSelect.sendKeys(option);
  }

  getCivilStateSelect(): ElementFinder {
    return this.civilStateSelect;
  }

  async getCivilStateSelectedOption() {
    return await this.civilStateSelect.element(by.css('option:checked')).getText();
  }

  async driverLicenseRegionSelectLastOption() {
    await this.driverLicenseRegionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async driverLicenseRegionSelectOption(option) {
    await this.driverLicenseRegionSelect.sendKeys(option);
  }

  getDriverLicenseRegionSelect(): ElementFinder {
    return this.driverLicenseRegionSelect;
  }

  async getDriverLicenseRegionSelectedOption() {
    return await this.driverLicenseRegionSelect.element(by.css('option:checked')).getText();
  }

  async businessNatureSelectLastOption() {
    await this.businessNatureSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async businessNatureSelectOption(option) {
    await this.businessNatureSelect.sendKeys(option);
  }

  getBusinessNatureSelect(): ElementFinder {
    return this.businessNatureSelect;
  }

  async getBusinessNatureSelectedOption() {
    return await this.businessNatureSelect.element(by.css('option:checked')).getText();
  }

  async phoneCategorySelectLastOption() {
    await this.phoneCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async phoneCategorySelectOption(option) {
    await this.phoneCategorySelect.sendKeys(option);
  }

  getPhoneCategorySelect(): ElementFinder {
    return this.phoneCategorySelect;
  }

  async getPhoneCategorySelectedOption() {
    return await this.phoneCategorySelect.element(by.css('option:checked')).getText();
  }

  async nextOfKinPhoneCategorySelectLastOption() {
    await this.nextOfKinPhoneCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async nextOfKinPhoneCategorySelectOption(option) {
    await this.nextOfKinPhoneCategorySelect.sendKeys(option);
  }

  getNextOfKinPhoneCategorySelect(): ElementFinder {
    return this.nextOfKinPhoneCategorySelect;
  }

  async getNextOfKinPhoneCategorySelectedOption() {
    return await this.nextOfKinPhoneCategorySelect.element(by.css('option:checked')).getText();
  }

  async emailCategorySelectLastOption() {
    await this.emailCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async emailCategorySelectOption(option) {
    await this.emailCategorySelect.sendKeys(option);
  }

  getEmailCategorySelect(): ElementFinder {
    return this.emailCategorySelect;
  }

  async getEmailCategorySelectedOption() {
    return await this.emailCategorySelect.element(by.css('option:checked')).getText();
  }

  async addressCategorySelectLastOption() {
    await this.addressCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async addressCategorySelectOption(option) {
    await this.addressCategorySelect.sendKeys(option);
  }

  getAddressCategorySelect(): ElementFinder {
    return this.addressCategorySelect;
  }

  async getAddressCategorySelectedOption() {
    return await this.addressCategorySelect.element(by.css('option:checked')).getText();
  }

  async iDDocumentTypeSelectLastOption() {
    await this.iDDocumentTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async iDDocumentTypeSelectOption(option) {
    await this.iDDocumentTypeSelect.sendKeys(option);
  }

  getIDDocumentTypeSelect(): ElementFinder {
    return this.iDDocumentTypeSelect;
  }

  async getIDDocumentTypeSelectedOption() {
    return await this.iDDocumentTypeSelect.element(by.css('option:checked')).getText();
  }

  async iDDocumentIssuedBySelectLastOption() {
    await this.iDDocumentIssuedBySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async iDDocumentIssuedBySelectOption(option) {
    await this.iDDocumentIssuedBySelect.sendKeys(option);
  }

  getIDDocumentIssuedBySelect(): ElementFinder {
    return this.iDDocumentIssuedBySelect;
  }

  async getIDDocumentIssuedBySelectedOption() {
    return await this.iDDocumentIssuedBySelect.element(by.css('option:checked')).getText();
  }

  async suffixTitleSelectLastOption() {
    await this.suffixTitleSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async suffixTitleSelectOption(option) {
    await this.suffixTitleSelect.sendKeys(option);
  }

  getSuffixTitleSelect(): ElementFinder {
    return this.suffixTitleSelect;
  }

  async getSuffixTitleSelectedOption() {
    return await this.suffixTitleSelect.element(by.css('option:checked')).getText();
  }

  async stateofOriginSelectLastOption() {
    await this.stateofOriginSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async stateofOriginSelectOption(option) {
    await this.stateofOriginSelect.sendKeys(option);
  }

  getStateofOriginSelect(): ElementFinder {
    return this.stateofOriginSelect;
  }

  async getStateofOriginSelectedOption() {
    return await this.stateofOriginSelect.element(by.css('option:checked')).getText();
  }

  async maritalStatusSelectLastOption() {
    await this.maritalStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async maritalStatusSelectOption(option) {
    await this.maritalStatusSelect.sendKeys(option);
  }

  getMaritalStatusSelect(): ElementFinder {
    return this.maritalStatusSelect;
  }

  async getMaritalStatusSelectedOption() {
    return await this.maritalStatusSelect.element(by.css('option:checked')).getText();
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

export class PartyDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-party-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-party'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
