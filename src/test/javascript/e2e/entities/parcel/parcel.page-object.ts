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
  registrationOfficeDictionaryInput = element(by.id('field_registrationOfficeDictionary'));
  surveyDateInput = element(by.id('field_surveyDate'));
  accommodationInput = element(by.id('field_accommodation'));
  descriptionInput = element(by.id('field_description'));
  propertyAreaInput = element(by.id('field_propertyArea'));
  planNumberInput = element(by.id('field_planNumber'));
  premiumValueInput = element(by.id('field_premiumValue'));
  coordinateNInput = element(by.id('field_coordinateN'));
  coordinateSInput = element(by.id('field_coordinateS'));
  lagosSheetNumberInput = element(by.id('field_lagosSheetNumber'));
  allocationInput = element(by.id('field_allocation'));
  location1Input = element(by.id('field_location1'));
  unitNumberInput = element(by.id('field_unitNumber'));
  nameInput = element(by.id('field_name'));
  valuationInput = element(by.id('field_valuation'));
  commentsInput = element(by.id('field_comments'));
  legalDescriptionInput = element(by.id('field_legalDescription'));
  addressSelect = element(by.id('field_address'));
  spatialUnitTypeSelect = element(by.id('field_spatialUnitType'));
  surveyTypeSelect = element(by.id('field_surveyType'));
  propertyTypeSelect = element(by.id('field_propertyType'));
  tenureTypeSelect = element(by.id('field_tenureType'));
  locationSelect = element(by.id('field_location'));
  builtUpAreaTypeSelect = element(by.id('field_builtUpAreaType'));
  measurementUnitTypeSelect = element(by.id('field_measurementUnitType'));
  landUseCategorySelect = element(by.id('field_landUseCategory'));
  landUseTypeSelect = element(by.id('field_landUseType'));
  developmentStatusSelect = element(by.id('field_developmentStatus'));
  registerTypeSelect = element(by.id('field_registerType'));
  meansOfAcqSelect = element(by.id('field_meansOfAcq'));
  regionSelect = element(by.id('field_region'));

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

  async setRegistrationOfficeDictionaryInput(registrationOfficeDictionary) {
    await this.registrationOfficeDictionaryInput.sendKeys(registrationOfficeDictionary);
  }

  async getRegistrationOfficeDictionaryInput() {
    return await this.registrationOfficeDictionaryInput.getAttribute('value');
  }

  async setSurveyDateInput(surveyDate) {
    await this.surveyDateInput.sendKeys(surveyDate);
  }

  async getSurveyDateInput() {
    return await this.surveyDateInput.getAttribute('value');
  }

  async setAccommodationInput(accommodation) {
    await this.accommodationInput.sendKeys(accommodation);
  }

  async getAccommodationInput() {
    return await this.accommodationInput.getAttribute('value');
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

  async setPlanNumberInput(planNumber) {
    await this.planNumberInput.sendKeys(planNumber);
  }

  async getPlanNumberInput() {
    return await this.planNumberInput.getAttribute('value');
  }

  async setPremiumValueInput(premiumValue) {
    await this.premiumValueInput.sendKeys(premiumValue);
  }

  async getPremiumValueInput() {
    return await this.premiumValueInput.getAttribute('value');
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

  async spatialUnitTypeSelectLastOption() {
    await this.spatialUnitTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async spatialUnitTypeSelectOption(option) {
    await this.spatialUnitTypeSelect.sendKeys(option);
  }

  getSpatialUnitTypeSelect(): ElementFinder {
    return this.spatialUnitTypeSelect;
  }

  async getSpatialUnitTypeSelectedOption() {
    return await this.spatialUnitTypeSelect.element(by.css('option:checked')).getText();
  }

  async surveyTypeSelectLastOption() {
    await this.surveyTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async surveyTypeSelectOption(option) {
    await this.surveyTypeSelect.sendKeys(option);
  }

  getSurveyTypeSelect(): ElementFinder {
    return this.surveyTypeSelect;
  }

  async getSurveyTypeSelectedOption() {
    return await this.surveyTypeSelect.element(by.css('option:checked')).getText();
  }

  async propertyTypeSelectLastOption() {
    await this.propertyTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async propertyTypeSelectOption(option) {
    await this.propertyTypeSelect.sendKeys(option);
  }

  getPropertyTypeSelect(): ElementFinder {
    return this.propertyTypeSelect;
  }

  async getPropertyTypeSelectedOption() {
    return await this.propertyTypeSelect.element(by.css('option:checked')).getText();
  }

  async tenureTypeSelectLastOption() {
    await this.tenureTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async tenureTypeSelectOption(option) {
    await this.tenureTypeSelect.sendKeys(option);
  }

  getTenureTypeSelect(): ElementFinder {
    return this.tenureTypeSelect;
  }

  async getTenureTypeSelectedOption() {
    return await this.tenureTypeSelect.element(by.css('option:checked')).getText();
  }

  async locationSelectLastOption() {
    await this.locationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locationSelectOption(option) {
    await this.locationSelect.sendKeys(option);
  }

  getLocationSelect(): ElementFinder {
    return this.locationSelect;
  }

  async getLocationSelectedOption() {
    return await this.locationSelect.element(by.css('option:checked')).getText();
  }

  async builtUpAreaTypeSelectLastOption() {
    await this.builtUpAreaTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async builtUpAreaTypeSelectOption(option) {
    await this.builtUpAreaTypeSelect.sendKeys(option);
  }

  getBuiltUpAreaTypeSelect(): ElementFinder {
    return this.builtUpAreaTypeSelect;
  }

  async getBuiltUpAreaTypeSelectedOption() {
    return await this.builtUpAreaTypeSelect.element(by.css('option:checked')).getText();
  }

  async measurementUnitTypeSelectLastOption() {
    await this.measurementUnitTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async measurementUnitTypeSelectOption(option) {
    await this.measurementUnitTypeSelect.sendKeys(option);
  }

  getMeasurementUnitTypeSelect(): ElementFinder {
    return this.measurementUnitTypeSelect;
  }

  async getMeasurementUnitTypeSelectedOption() {
    return await this.measurementUnitTypeSelect.element(by.css('option:checked')).getText();
  }

  async landUseCategorySelectLastOption() {
    await this.landUseCategorySelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async landUseCategorySelectOption(option) {
    await this.landUseCategorySelect.sendKeys(option);
  }

  getLandUseCategorySelect(): ElementFinder {
    return this.landUseCategorySelect;
  }

  async getLandUseCategorySelectedOption() {
    return await this.landUseCategorySelect.element(by.css('option:checked')).getText();
  }

  async landUseTypeSelectLastOption() {
    await this.landUseTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async landUseTypeSelectOption(option) {
    await this.landUseTypeSelect.sendKeys(option);
  }

  getLandUseTypeSelect(): ElementFinder {
    return this.landUseTypeSelect;
  }

  async getLandUseTypeSelectedOption() {
    return await this.landUseTypeSelect.element(by.css('option:checked')).getText();
  }

  async developmentStatusSelectLastOption() {
    await this.developmentStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async developmentStatusSelectOption(option) {
    await this.developmentStatusSelect.sendKeys(option);
  }

  getDevelopmentStatusSelect(): ElementFinder {
    return this.developmentStatusSelect;
  }

  async getDevelopmentStatusSelectedOption() {
    return await this.developmentStatusSelect.element(by.css('option:checked')).getText();
  }

  async registerTypeSelectLastOption() {
    await this.registerTypeSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async registerTypeSelectOption(option) {
    await this.registerTypeSelect.sendKeys(option);
  }

  getRegisterTypeSelect(): ElementFinder {
    return this.registerTypeSelect;
  }

  async getRegisterTypeSelectedOption() {
    return await this.registerTypeSelect.element(by.css('option:checked')).getText();
  }

  async meansOfAcqSelectLastOption() {
    await this.meansOfAcqSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async meansOfAcqSelectOption(option) {
    await this.meansOfAcqSelect.sendKeys(option);
  }

  getMeansOfAcqSelect(): ElementFinder {
    return this.meansOfAcqSelect;
  }

  async getMeansOfAcqSelectedOption() {
    return await this.meansOfAcqSelect.element(by.css('option:checked')).getText();
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
