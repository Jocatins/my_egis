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
  propertyNumberInput = element(by.id('field_propertyNumber'));
  parcelLineageInput = element(by.id('field_parcelLineage'));
  surveyPlanNumberInput = element(by.id('field_surveyPlanNumber'));
  propertyDescriptionInput = element(by.id('field_propertyDescription'));
  areaInput = element(by.id('field_area'));
  descriptionInput = element(by.id('field_description'));
  propertyAreaInput = element(by.id('field_propertyArea'));
  planNumberInput = element(by.id('field_planNumber'));
  premiumValueInput = element(by.id('field_premiumValue'));
  coordinateNInput = element(by.id('field_coordinateN'));
  coordinateEInput = element(by.id('field_coordinateE'));
  lagosSheetNumberInput = element(by.id('field_lagosSheetNumber'));
  unitNumberInput = element(by.id('field_unitNumber'));
  valuationAmountInput = element(by.id('field_valuationAmount'));
  commentsInput = element(by.id('field_comments'));
  streetNumberInput = element(by.id('field_streetNumber'));
  streetNameInput = element(by.id('field_streetName'));
  blockNumberInput = element(by.id('field_blockNumber'));
  plotNumberInput = element(by.id('field_plotNumber'));
  wardInput = element(by.id('field_ward'));
  townInput = element(by.id('field_town'));
  districtInput = element(by.id('field_district'));
  villageInput = element(by.id('field_village'));
  upinInput = element(by.id('field_upin'));
  commentInput = element(by.id('field_comment'));
  locationSelect = element(by.id('field_location'));
  builtUpAreaTypeSelect = element(by.id('field_builtUpAreaType'));
  measurementUnitTypeSelect = element(by.id('field_measurementUnitType'));
  landUseCategorySelect = element(by.id('field_landUseCategory'));
  landUseTypeSelect = element(by.id('field_landUseType'));
  developmentStatusSelect = element(by.id('field_developmentStatus'));
  governmentStatusSelect = element(by.id('field_governmentStatus'));
  propertyTypeSelect = element(by.id('field_propertyType'));
  streetTypeSelect = element(by.id('field_streetType'));
  estateNameSelect = element(by.id('field_estateName'));
  schemeNameSelect = element(by.id('field_schemeName'));
  stateSelect = element(by.id('field_state'));
  localGovernmentAreaSelect = element(by.id('field_localGovernmentArea'));
  locationofLandSelect = element(by.id('field_locationofLand'));
  typeOfAccommodationSelect = element(by.id('field_typeOfAccommodation'));
  tenureTypeSelect = element(by.id('field_tenureType'));
  districtSelect = element(by.id('field_district'));
  allocationNameSelect = element(by.id('field_allocationName'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setPropertyNumberInput(propertyNumber) {
    await this.propertyNumberInput.sendKeys(propertyNumber);
  }

  async getPropertyNumberInput() {
    return await this.propertyNumberInput.getAttribute('value');
  }

  async setParcelLineageInput(parcelLineage) {
    await this.parcelLineageInput.sendKeys(parcelLineage);
  }

  async getParcelLineageInput() {
    return await this.parcelLineageInput.getAttribute('value');
  }

  async setSurveyPlanNumberInput(surveyPlanNumber) {
    await this.surveyPlanNumberInput.sendKeys(surveyPlanNumber);
  }

  async getSurveyPlanNumberInput() {
    return await this.surveyPlanNumberInput.getAttribute('value');
  }

  async setPropertyDescriptionInput(propertyDescription) {
    await this.propertyDescriptionInput.sendKeys(propertyDescription);
  }

  async getPropertyDescriptionInput() {
    return await this.propertyDescriptionInput.getAttribute('value');
  }

  async setAreaInput(area) {
    await this.areaInput.sendKeys(area);
  }

  async getAreaInput() {
    return await this.areaInput.getAttribute('value');
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

  async setCoordinateEInput(coordinateE) {
    await this.coordinateEInput.sendKeys(coordinateE);
  }

  async getCoordinateEInput() {
    return await this.coordinateEInput.getAttribute('value');
  }

  async setLagosSheetNumberInput(lagosSheetNumber) {
    await this.lagosSheetNumberInput.sendKeys(lagosSheetNumber);
  }

  async getLagosSheetNumberInput() {
    return await this.lagosSheetNumberInput.getAttribute('value');
  }

  async setUnitNumberInput(unitNumber) {
    await this.unitNumberInput.sendKeys(unitNumber);
  }

  async getUnitNumberInput() {
    return await this.unitNumberInput.getAttribute('value');
  }

  async setValuationAmountInput(valuationAmount) {
    await this.valuationAmountInput.sendKeys(valuationAmount);
  }

  async getValuationAmountInput() {
    return await this.valuationAmountInput.getAttribute('value');
  }

  async setCommentsInput(comments) {
    await this.commentsInput.sendKeys(comments);
  }

  async getCommentsInput() {
    return await this.commentsInput.getAttribute('value');
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

  async setWardInput(ward) {
    await this.wardInput.sendKeys(ward);
  }

  async getWardInput() {
    return await this.wardInput.getAttribute('value');
  }

  async setTownInput(town) {
    await this.townInput.sendKeys(town);
  }

  async getTownInput() {
    return await this.townInput.getAttribute('value');
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

  async setUpinInput(upin) {
    await this.upinInput.sendKeys(upin);
  }

  async getUpinInput() {
    return await this.upinInput.getAttribute('value');
  }

  async setCommentInput(comment) {
    await this.commentInput.sendKeys(comment);
  }

  async getCommentInput() {
    return await this.commentInput.getAttribute('value');
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

  async governmentStatusSelectLastOption() {
    await this.governmentStatusSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async governmentStatusSelectOption(option) {
    await this.governmentStatusSelect.sendKeys(option);
  }

  getGovernmentStatusSelect(): ElementFinder {
    return this.governmentStatusSelect;
  }

  async getGovernmentStatusSelectedOption() {
    return await this.governmentStatusSelect.element(by.css('option:checked')).getText();
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

  async locationofLandSelectLastOption() {
    await this.locationofLandSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async locationofLandSelectOption(option) {
    await this.locationofLandSelect.sendKeys(option);
  }

  getLocationofLandSelect(): ElementFinder {
    return this.locationofLandSelect;
  }

  async getLocationofLandSelectedOption() {
    return await this.locationofLandSelect.element(by.css('option:checked')).getText();
  }

  async typeOfAccommodationSelectLastOption() {
    await this.typeOfAccommodationSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async typeOfAccommodationSelectOption(option) {
    await this.typeOfAccommodationSelect.sendKeys(option);
  }

  getTypeOfAccommodationSelect(): ElementFinder {
    return this.typeOfAccommodationSelect;
  }

  async getTypeOfAccommodationSelectedOption() {
    return await this.typeOfAccommodationSelect.element(by.css('option:checked')).getText();
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

  async allocationNameSelectLastOption() {
    await this.allocationNameSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async allocationNameSelectOption(option) {
    await this.allocationNameSelect.sendKeys(option);
  }

  getAllocationNameSelect(): ElementFinder {
    return this.allocationNameSelect;
  }

  async getAllocationNameSelectedOption() {
    return await this.allocationNameSelect.element(by.css('option:checked')).getText();
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
