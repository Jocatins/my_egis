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
  partyTypeInput = element(by.id('field_partyType'));
  partyRoleTypeInput = element(by.id('field_partyRoleType'));
  partySubRoleTypeInput = element(by.id('field_partySubRoleType'));
  deliveryTypeInput = element(by.id('field_deliveryType'));
  partyNameInput = element(by.id('field_partyName'));
  shareNominatorInput = element(by.id('field_shareNominator'));
  shareDenominatorInput = element(by.id('field_shareDenominator'));
  taxExemptInput = element(by.id('field_taxExempt'));
  primaryPartyInput = element(by.id('field_primaryParty'));
  otherNameInput = element(by.id('field_otherName'));
  personIdTypeInput = element(by.id('field_personIdType'));
  personTypeInput = element(by.id('field_personType'));
  faxInput = element(by.id('field_fax'));
  emailInput = element(by.id('field_email'));
  emailTypeInput = element(by.id('field_emailType'));
  phoneNumberInput = element(by.id('field_phoneNumber'));
  payerIdInput = element(by.id('field_payerId'));
  taxPayerNumberInput = element(by.id('field_taxPayerNumber'));
  commentsInput = element(by.id('field_comments'));
  personIdIssuedByInput = element(by.id('field_personIdIssuedBy'));
  personIdDateInput = element(by.id('field_personIdDate'));
  personIdExpirationDateInput = element(by.id('field_personIdExpirationDate'));
  rcNumberInput = element(by.id('field_rcNumber'));
  organizationInput = element(by.id('field_organization'));
  businessNatureInput = element(by.id('field_businessNature'));
  birthPlaceInput = element(by.id('field_birthPlace'));
  birthDateInput = element(by.id('field_birthDate'));
  personTitleInput = element(by.id('field_personTitle'));
  genderInput = element(by.id('field_gender'));
  firstNameInput = element(by.id('field_firstName'));
  middleNameInput = element(by.id('field_middleName'));
  lastNameInput = element(by.id('field_lastName'));
  civilStateInput = element(by.id('field_civilState'));
  driverLicenseRegionInput = element(by.id('field_driverLicenseRegion'));
  driverLicenceInput = element(by.id('field_driverLicence'));
  representativeIdInput = element(by.id('field_representativeId'));
  professionRegNoInput = element(by.id('field_professionRegNo'));
  occupationInput = element(by.id('field_occupation'));
  addressSelect = element(by.id('field_address'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPartyTypeInput(partyType) {
    await this.partyTypeInput.sendKeys(partyType);
  }

  async getPartyTypeInput() {
    return await this.partyTypeInput.getAttribute('value');
  }

  async setPartyRoleTypeInput(partyRoleType) {
    await this.partyRoleTypeInput.sendKeys(partyRoleType);
  }

  async getPartyRoleTypeInput() {
    return await this.partyRoleTypeInput.getAttribute('value');
  }

  async setPartySubRoleTypeInput(partySubRoleType) {
    await this.partySubRoleTypeInput.sendKeys(partySubRoleType);
  }

  async getPartySubRoleTypeInput() {
    return await this.partySubRoleTypeInput.getAttribute('value');
  }

  async setDeliveryTypeInput(deliveryType) {
    await this.deliveryTypeInput.sendKeys(deliveryType);
  }

  async getDeliveryTypeInput() {
    return await this.deliveryTypeInput.getAttribute('value');
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

  async setPrimaryPartyInput(primaryParty) {
    await this.primaryPartyInput.sendKeys(primaryParty);
  }

  async getPrimaryPartyInput() {
    return await this.primaryPartyInput.getAttribute('value');
  }

  async setOtherNameInput(otherName) {
    await this.otherNameInput.sendKeys(otherName);
  }

  async getOtherNameInput() {
    return await this.otherNameInput.getAttribute('value');
  }

  async setPersonIdTypeInput(personIdType) {
    await this.personIdTypeInput.sendKeys(personIdType);
  }

  async getPersonIdTypeInput() {
    return await this.personIdTypeInput.getAttribute('value');
  }

  async setPersonTypeInput(personType) {
    await this.personTypeInput.sendKeys(personType);
  }

  async getPersonTypeInput() {
    return await this.personTypeInput.getAttribute('value');
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

  async setEmailTypeInput(emailType) {
    await this.emailTypeInput.sendKeys(emailType);
  }

  async getEmailTypeInput() {
    return await this.emailTypeInput.getAttribute('value');
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

  async setPersonIdIssuedByInput(personIdIssuedBy) {
    await this.personIdIssuedByInput.sendKeys(personIdIssuedBy);
  }

  async getPersonIdIssuedByInput() {
    return await this.personIdIssuedByInput.getAttribute('value');
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

  async setPersonTitleInput(personTitle) {
    await this.personTitleInput.sendKeys(personTitle);
  }

  async getPersonTitleInput() {
    return await this.personTitleInput.getAttribute('value');
  }

  async setGenderInput(gender) {
    await this.genderInput.sendKeys(gender);
  }

  async getGenderInput() {
    return await this.genderInput.getAttribute('value');
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

  async setCivilStateInput(civilState) {
    await this.civilStateInput.sendKeys(civilState);
  }

  async getCivilStateInput() {
    return await this.civilStateInput.getAttribute('value');
  }

  async setDriverLicenseRegionInput(driverLicenseRegion) {
    await this.driverLicenseRegionInput.sendKeys(driverLicenseRegion);
  }

  async getDriverLicenseRegionInput() {
    return await this.driverLicenseRegionInput.getAttribute('value');
  }

  async setDriverLicenceInput(driverLicence) {
    await this.driverLicenceInput.sendKeys(driverLicence);
  }

  async getDriverLicenceInput() {
    return await this.driverLicenceInput.getAttribute('value');
  }

  async setRepresentativeIdInput(representativeId) {
    await this.representativeIdInput.sendKeys(representativeId);
  }

  async getRepresentativeIdInput() {
    return await this.representativeIdInput.getAttribute('value');
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
