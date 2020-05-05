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
  partyNameInput = element(by.id('field_partyName'));
  shareNominatorInput = element(by.id('field_shareNominator'));
  shareDenominatorInput = element(by.id('field_shareDenominator'));
  taxExemptInput = element(by.id('field_taxExempt'));
  otherNameInput = element(by.id('field_otherName'));
  faxInput = element(by.id('field_fax'));
  emailInput = element(by.id('field_email'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  payerIdInput = element(by.id('field_payerId'));
  taxPayerNumberInput = element(by.id('field_taxPayerNumber'));
  commentsInput = element(by.id('field_comments'));
  personIdDateInput = element(by.id('field_personIdDate'));
  personIdExpirationDateInput = element(by.id('field_personIdExpirationDate'));
  rcNumberInput = element(by.id('field_rcNumber'));
  organizationInput = element(by.id('field_organization'));
  businessNatureInput = element(by.id('field_businessNature'));
  birthPlaceInput = element(by.id('field_birthPlace'));
  birthDateInput = element(by.id('field_birthDate'));
  firstNameInput = element(by.id('field_firstName'));
  middleNameInput = element(by.id('field_middleName'));
  lastNameInput = element(by.id('field_lastName'));
  driverLicenceInput = element(by.id('field_driverLicence'));
  professionRegNoInput = element(by.id('field_professionRegNo'));
  occupationInput = element(by.id('field_occupation'));
  addressSelect = element(by.id('field_address'));
  partyTypeSelect = element(by.id('field_partyType'));
  partyRoleTypeSelect = element(by.id('field_partyRoleType'));
  partySubRoleTypeSelect = element(by.id('field_partySubRoleType'));
  deliveryTypeSelect = element(by.id('field_deliveryType'));
  primaryPartySelect = element(by.id('field_primaryParty'));
  personIdTypeSelect = element(by.id('field_personIdType'));
  personTypeSelect = element(by.id('field_personType'));
  emailTypeSelect = element(by.id('field_emailType'));
  personIdIssuedBySelect = element(by.id('field_personIdIssuedBy'));
  personTitleSelect = element(by.id('field_personTitle'));
  genderSelect = element(by.id('field_gender'));
  civilStateSelect = element(by.id('field_civilState'));
  driverLicenseRegionSelect = element(by.id('field_driverLicenseRegion'));
  representativeIdSelect = element(by.id('field_representativeId'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPartyNameInput(partyName) {
    await this.partyNameInput.sendKeys(partyName);
  }

  async getPartyNameInput() {
    return await this.partyNameInput.getAttribute('value');
  }

  async setShareNominatorInput(shareNominator) {
    await this.shareNominatorInput.sendKeys(shareNominator);
  }

  async getShareNominatorInput() {
    return await this.shareNominatorInput.getAttribute('value');
  }

  async setShareDenominatorInput(shareDenominator) {
    await this.shareDenominatorInput.sendKeys(shareDenominator);
  }

  async getShareDenominatorInput() {
    return await this.shareDenominatorInput.getAttribute('value');
  }

  async setTaxExemptInput(taxExempt) {
    await this.taxExemptInput.sendKeys(taxExempt);
  }

  async getTaxExemptInput() {
    return await this.taxExemptInput.getAttribute('value');
  }

  async setOtherNameInput(otherName) {
    await this.otherNameInput.sendKeys(otherName);
  }

  async getOtherNameInput() {
    return await this.otherNameInput.getAttribute('value');
  }

  async setFaxInput(fax) {
    await this.faxInput.sendKeys(fax);
  }

  async getFaxInput() {
    return await this.faxInput.getAttribute('value');
  }

  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return await this.emailInput.getAttribute('value');
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

  async setBusinessNatureInput(businessNature) {
    await this.businessNatureInput.sendKeys(businessNature);
  }

  async getBusinessNatureInput() {
    return await this.businessNatureInput.getAttribute('value');
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

  async setDriverLicenceInput(driverLicence) {
    await this.driverLicenceInput.sendKeys(driverLicence);
  }

  async getDriverLicenceInput() {
    return await this.driverLicenceInput.getAttribute('value');
  }

  async setProfessionRegNoInput(professionRegNo) {
    await this.professionRegNoInput.sendKeys(professionRegNo);
  }

  async getProfessionRegNoInput() {
    return await this.professionRegNoInput.getAttribute('value');
  }

  async setOccupationInput(occupation) {
    await this.occupationInput.sendKeys(occupation);
  }

  async getOccupationInput() {
    return await this.occupationInput.getAttribute('value');
  }

  async addressSelectLastOption() {
    await this.addressSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async addressSelectOption(option) {
    await this.addressSelect.sendKeys(option);
  }

  getAddressSelect(): ElementFinder {
    return this.addressSelect;
  }

  async getAddressSelectedOption() {
    return await this.addressSelect.element(by.css('option:checked')).getText();
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

  async partySubRoleTypeSelectLastOption() {
    await this.partySubRoleTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async partySubRoleTypeSelectOption(option) {
    await this.partySubRoleTypeSelect.sendKeys(option);
  }

  getPartySubRoleTypeSelect(): ElementFinder {
    return this.partySubRoleTypeSelect;
  }

  async getPartySubRoleTypeSelectedOption() {
    return await this.partySubRoleTypeSelect.element(by.css('option:checked')).getText();
  }

  async deliveryTypeSelectLastOption() {
    await this.deliveryTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async deliveryTypeSelectOption(option) {
    await this.deliveryTypeSelect.sendKeys(option);
  }

  getDeliveryTypeSelect(): ElementFinder {
    return this.deliveryTypeSelect;
  }

  async getDeliveryTypeSelectedOption() {
    return await this.deliveryTypeSelect.element(by.css('option:checked')).getText();
  }

  async primaryPartySelectLastOption() {
    await this.primaryPartySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async primaryPartySelectOption(option) {
    await this.primaryPartySelect.sendKeys(option);
  }

  getPrimaryPartySelect(): ElementFinder {
    return this.primaryPartySelect;
  }

  async getPrimaryPartySelectedOption() {
    return await this.primaryPartySelect.element(by.css('option:checked')).getText();
  }

  async personIdTypeSelectLastOption() {
    await this.personIdTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async personIdTypeSelectOption(option) {
    await this.personIdTypeSelect.sendKeys(option);
  }

  getPersonIdTypeSelect(): ElementFinder {
    return this.personIdTypeSelect;
  }

  async getPersonIdTypeSelectedOption() {
    return await this.personIdTypeSelect.element(by.css('option:checked')).getText();
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

  async representativeIdSelectLastOption() {
    await this.representativeIdSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async representativeIdSelectOption(option) {
    await this.representativeIdSelect.sendKeys(option);
  }

  getRepresentativeIdSelect(): ElementFinder {
    return this.representativeIdSelect;
  }

  async getRepresentativeIdSelectedOption() {
    return await this.representativeIdSelect.element(by.css('option:checked')).getText();
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
