import { element, by, ElementFinder } from 'protractor';

export class ParcelComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-parcel div table .btn-danger'));
  title = element.all(by.css('jhi-parcel div h2#page-heading span')).first();

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

export class ParcelUpdatePage {
  pageTitle = element(by.id('jhi-parcel-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  labelInput = element(by.id('field_label'));
  areaInput = element(by.id('field_area'));
  spatialUnitTypeInput = element(by.id('field_spatialUnitType'));
  registrationOfficeDictionaryInput = element(by.id('field_registrationOfficeDictionary'));
  surveyTypeInput = element(by.id('field_surveyType'));
  surveyDateInput = element(by.id('field_surveyDate'));
  propertyTypeInput = element(by.id('field_propertyType'));
  accommodationInput = element(by.id('field_accommodation'));
  tenureTypeInput = element(by.id('field_tenureType'));
  descriptionInput = element(by.id('field_description'));
  propertyAreaInput = element(by.id('field_propertyArea'));
  locationInput = element(by.id('field_location'));
  builtUpAreaTypeInput = element(by.id('field_builtUpAreaType'));
  planNumberInput = element(by.id('field_planNumber'));
  measurementUnitTypeInput = element(by.id('field_measurementUnitType'));
  premiumValueInput = element(by.id('field_premiumValue'));
  landUseCategoryInput = element(by.id('field_landUseCategory'));
  landUseTypeInput = element(by.id('field_landUseType'));
  developmentStatusInput = element(by.id('field_developmentStatus'));
  coordinateNInput = element(by.id('field_coordinateN'));
  coordinateSInput = element(by.id('field_coordinateS'));
  lagosSheetNumberInput = element(by.id('field_lagosSheetNumber'));
  allocationInput = element(by.id('field_allocation'));
  location1Input = element(by.id('field_location1'));
  unitNumberInput = element(by.id('field_unitNumber'));
  nameInput = element(by.id('field_name'));
  registerTypeInput = element(by.id('field_registerType'));
  valuationInput = element(by.id('field_valuation'));
  commentsInput = element(by.id('field_comments'));
  legalDescriptionInput = element(by.id('field_legalDescription'));
  meansOfAcqInput = element(by.id('field_meansOfAcq'));
  addressSelect = element(by.id('field_address'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setLabelInput(label) {
    await this.labelInput.sendKeys(label);
  }

  async getLabelInput() {
    return await this.labelInput.getAttribute('value');
  }

  async setAreaInput(area) {
    await this.areaInput.sendKeys(area);
  }

  async getAreaInput() {
    return await this.areaInput.getAttribute('value');
  }

  async setSpatialUnitTypeInput(spatialUnitType) {
    await this.spatialUnitTypeInput.sendKeys(spatialUnitType);
  }

  async getSpatialUnitTypeInput() {
    return await this.spatialUnitTypeInput.getAttribute('value');
  }

  async setRegistrationOfficeDictionaryInput(registrationOfficeDictionary) {
    await this.registrationOfficeDictionaryInput.sendKeys(registrationOfficeDictionary);
  }

  async getRegistrationOfficeDictionaryInput() {
    return await this.registrationOfficeDictionaryInput.getAttribute('value');
  }

  async setSurveyTypeInput(surveyType) {
    await this.surveyTypeInput.sendKeys(surveyType);
  }

  async getSurveyTypeInput() {
    return await this.surveyTypeInput.getAttribute('value');
  }

  async setSurveyDateInput(surveyDate) {
    await this.surveyDateInput.sendKeys(surveyDate);
  }

  async getSurveyDateInput() {
    return await this.surveyDateInput.getAttribute('value');
  }

  async setPropertyTypeInput(propertyType) {
    await this.propertyTypeInput.sendKeys(propertyType);
  }

  async getPropertyTypeInput() {
    return await this.propertyTypeInput.getAttribute('value');
  }

  async setAccommodationInput(accommodation) {
    await this.accommodationInput.sendKeys(accommodation);
  }

  async getAccommodationInput() {
    return await this.accommodationInput.getAttribute('value');
  }

  async setTenureTypeInput(tenureType) {
    await this.tenureTypeInput.sendKeys(tenureType);
  }

  async getTenureTypeInput() {
    return await this.tenureTypeInput.getAttribute('value');
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return await this.descriptionInput.getAttribute('value');
  }

  async setPropertyAreaInput(propertyArea) {
    await this.propertyAreaInput.sendKeys(propertyArea);
  }

  async getPropertyAreaInput() {
    return await this.propertyAreaInput.getAttribute('value');
  }

  async setLocationInput(location) {
    await this.locationInput.sendKeys(location);
  }

  async getLocationInput() {
    return await this.locationInput.getAttribute('value');
  }

  async setBuiltUpAreaTypeInput(builtUpAreaType) {
    await this.builtUpAreaTypeInput.sendKeys(builtUpAreaType);
  }

  async getBuiltUpAreaTypeInput() {
    return await this.builtUpAreaTypeInput.getAttribute('value');
  }

  async setPlanNumberInput(planNumber) {
    await this.planNumberInput.sendKeys(planNumber);
  }

  async getPlanNumberInput() {
    return await this.planNumberInput.getAttribute('value');
  }

  async setMeasurementUnitTypeInput(measurementUnitType) {
    await this.measurementUnitTypeInput.sendKeys(measurementUnitType);
  }

  async getMeasurementUnitTypeInput() {
    return await this.measurementUnitTypeInput.getAttribute('value');
  }

  async setPremiumValueInput(premiumValue) {
    await this.premiumValueInput.sendKeys(premiumValue);
  }

  async getPremiumValueInput() {
    return await this.premiumValueInput.getAttribute('value');
  }

  async setLandUseCategoryInput(landUseCategory) {
    await this.landUseCategoryInput.sendKeys(landUseCategory);
  }

  async getLandUseCategoryInput() {
    return await this.landUseCategoryInput.getAttribute('value');
  }

  async setLandUseTypeInput(landUseType) {
    await this.landUseTypeInput.sendKeys(landUseType);
  }

  async getLandUseTypeInput() {
    return await this.landUseTypeInput.getAttribute('value');
  }

  async setDevelopmentStatusInput(developmentStatus) {
    await this.developmentStatusInput.sendKeys(developmentStatus);
  }

  async getDevelopmentStatusInput() {
    return await this.developmentStatusInput.getAttribute('value');
  }

  async setCoordinateNInput(coordinateN) {
    await this.coordinateNInput.sendKeys(coordinateN);
  }

  async getCoordinateNInput() {
    return await this.coordinateNInput.getAttribute('value');
  }

  async setCoordinateSInput(coordinateS) {
    await this.coordinateSInput.sendKeys(coordinateS);
  }

  async getCoordinateSInput() {
    return await this.coordinateSInput.getAttribute('value');
  }

  async setLagosSheetNumberInput(lagosSheetNumber) {
    await this.lagosSheetNumberInput.sendKeys(lagosSheetNumber);
  }

  async getLagosSheetNumberInput() {
    return await this.lagosSheetNumberInput.getAttribute('value');
  }

  async setAllocationInput(allocation) {
    await this.allocationInput.sendKeys(allocation);
  }

  async getAllocationInput() {
    return await this.allocationInput.getAttribute('value');
  }

  async setLocation1Input(location1) {
    await this.location1Input.sendKeys(location1);
  }

  async getLocation1Input() {
    return await this.location1Input.getAttribute('value');
  }

  async setUnitNumberInput(unitNumber) {
    await this.unitNumberInput.sendKeys(unitNumber);
  }

  async getUnitNumberInput() {
    return await this.unitNumberInput.getAttribute('value');
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return await this.nameInput.getAttribute('value');
  }

  async setRegisterTypeInput(registerType) {
    await this.registerTypeInput.sendKeys(registerType);
  }

  async getRegisterTypeInput() {
    return await this.registerTypeInput.getAttribute('value');
  }

  async setValuationInput(valuation) {
    await this.valuationInput.sendKeys(valuation);
  }

  async getValuationInput() {
    return await this.valuationInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return await this.commentsInput.getAttribute('value');
  }

  async setLegalDescriptionInput(legalDescription) {
    await this.legalDescriptionInput.sendKeys(legalDescription);
  }

  async getLegalDescriptionInput() {
    return await this.legalDescriptionInput.getAttribute('value');
  }

  async setMeansOfAcqInput(meansOfAcq) {
    await this.meansOfAcqInput.sendKeys(meansOfAcq);
  }

  async getMeansOfAcqInput() {
    return await this.meansOfAcqInput.getAttribute('value');
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

export class ParcelDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-parcel-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-parcel'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}
