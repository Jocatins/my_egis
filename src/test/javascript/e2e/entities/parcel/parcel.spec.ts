import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ParcelComponentsPage, ParcelDeleteDialog, ParcelUpdatePage } from './parcel.page-object';

const expect = chai.expect;

describe('Parcel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parcelComponentsPage: ParcelComponentsPage;
  let parcelUpdatePage: ParcelUpdatePage;
  let parcelDeleteDialog: ParcelDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Parcels', async () => {
    await navBarPage.goToEntity('parcel');
    parcelComponentsPage = new ParcelComponentsPage();
    await browser.wait(ec.visibilityOf(parcelComponentsPage.title), 5000);
    expect(await parcelComponentsPage.getTitle()).to.eq('egisexternalApp.parcel.home.title');
  });

  it('should load create Parcel page', async () => {
    await parcelComponentsPage.clickOnCreateButton();
    parcelUpdatePage = new ParcelUpdatePage();
    expect(await parcelUpdatePage.getPageTitle()).to.eq('egisexternalApp.parcel.home.createOrEditLabel');
    await parcelUpdatePage.cancel();
  });

  it('should create and save Parcels', async () => {
    const nbButtonsBeforeCreate = await parcelComponentsPage.countDeleteButtons();

    await parcelComponentsPage.clickOnCreateButton();
    await promise.all([
      parcelUpdatePage.setLabelInput('label'),
      parcelUpdatePage.setAreaInput('5'),
      parcelUpdatePage.setSpatialUnitTypeInput('5'),
      parcelUpdatePage.setRegistrationOfficeDictionaryInput('registrationOfficeDictionary'),
      parcelUpdatePage.setSurveyTypeInput('surveyType'),
      parcelUpdatePage.setSurveyDateInput('2000-12-31'),
      parcelUpdatePage.setPropertyTypeInput('5'),
      parcelUpdatePage.setAccommodationInput('accommodation'),
      parcelUpdatePage.setTenureTypeInput('5'),
      parcelUpdatePage.setDescriptionInput('description'),
      parcelUpdatePage.setPropertyAreaInput('5'),
      parcelUpdatePage.setLocationInput('5'),
      parcelUpdatePage.setBuiltUpAreaTypeInput('5'),
      parcelUpdatePage.setPlanNumberInput('planNumber'),
      parcelUpdatePage.setMeasurementUnitTypeInput('5'),
      parcelUpdatePage.setPremiumValueInput('premiumValue'),
      parcelUpdatePage.setLandUseCategoryInput('5'),
      parcelUpdatePage.setLandUseTypeInput('5'),
      parcelUpdatePage.setDevelopmentStatusInput('5'),
      parcelUpdatePage.setCoordinateNInput('5'),
      parcelUpdatePage.setCoordinateSInput('5'),
      parcelUpdatePage.setLagosSheetNumberInput('lagosSheetNumber'),
      parcelUpdatePage.setAllocationInput('allocation'),
      parcelUpdatePage.setLocation1Input('5'),
      parcelUpdatePage.setUnitNumberInput('unitNumber'),
      parcelUpdatePage.setNameInput('name'),
      parcelUpdatePage.setRegisterTypeInput('5'),
      parcelUpdatePage.setValuationInput('valuation'),
      parcelUpdatePage.setCommentsInput('comments'),
      parcelUpdatePage.setLegalDescriptionInput('legalDescription'),
      parcelUpdatePage.setMeansOfAcqInput('5'),
      parcelUpdatePage.addressSelectLastOption()
    ]);
    expect(await parcelUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');
    expect(await parcelUpdatePage.getAreaInput()).to.eq('5', 'Expected area value to be equals to 5');
    expect(await parcelUpdatePage.getSpatialUnitTypeInput()).to.eq('5', 'Expected spatialUnitType value to be equals to 5');
    expect(await parcelUpdatePage.getRegistrationOfficeDictionaryInput()).to.eq(
      'registrationOfficeDictionary',
      'Expected RegistrationOfficeDictionary value to be equals to registrationOfficeDictionary'
    );
    expect(await parcelUpdatePage.getSurveyTypeInput()).to.eq('surveyType', 'Expected SurveyType value to be equals to surveyType');
    expect(await parcelUpdatePage.getSurveyDateInput()).to.eq('2000-12-31', 'Expected surveyDate value to be equals to 2000-12-31');
    expect(await parcelUpdatePage.getPropertyTypeInput()).to.eq('5', 'Expected propertyType value to be equals to 5');
    expect(await parcelUpdatePage.getAccommodationInput()).to.eq(
      'accommodation',
      'Expected Accommodation value to be equals to accommodation'
    );
    expect(await parcelUpdatePage.getTenureTypeInput()).to.eq('5', 'Expected tenureType value to be equals to 5');
    expect(await parcelUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await parcelUpdatePage.getPropertyAreaInput()).to.eq('5', 'Expected propertyArea value to be equals to 5');
    expect(await parcelUpdatePage.getLocationInput()).to.eq('5', 'Expected location value to be equals to 5');
    expect(await parcelUpdatePage.getBuiltUpAreaTypeInput()).to.eq('5', 'Expected builtUpAreaType value to be equals to 5');
    expect(await parcelUpdatePage.getPlanNumberInput()).to.eq('planNumber', 'Expected PlanNumber value to be equals to planNumber');
    expect(await parcelUpdatePage.getMeasurementUnitTypeInput()).to.eq('5', 'Expected measurementUnitType value to be equals to 5');
    expect(await parcelUpdatePage.getPremiumValueInput()).to.eq('premiumValue', 'Expected PremiumValue value to be equals to premiumValue');
    expect(await parcelUpdatePage.getLandUseCategoryInput()).to.eq('5', 'Expected landUseCategory value to be equals to 5');
    expect(await parcelUpdatePage.getLandUseTypeInput()).to.eq('5', 'Expected landUseType value to be equals to 5');
    expect(await parcelUpdatePage.getDevelopmentStatusInput()).to.eq('5', 'Expected developmentStatus value to be equals to 5');
    expect(await parcelUpdatePage.getCoordinateNInput()).to.eq('5', 'Expected coordinateN value to be equals to 5');
    expect(await parcelUpdatePage.getCoordinateSInput()).to.eq('5', 'Expected coordinateS value to be equals to 5');
    expect(await parcelUpdatePage.getLagosSheetNumberInput()).to.eq(
      'lagosSheetNumber',
      'Expected LagosSheetNumber value to be equals to lagosSheetNumber'
    );
    expect(await parcelUpdatePage.getAllocationInput()).to.eq('allocation', 'Expected Allocation value to be equals to allocation');
    expect(await parcelUpdatePage.getLocation1Input()).to.eq('5', 'Expected location1 value to be equals to 5');
    expect(await parcelUpdatePage.getUnitNumberInput()).to.eq('unitNumber', 'Expected UnitNumber value to be equals to unitNumber');
    expect(await parcelUpdatePage.getNameInput()).to.eq('name', 'Expected Name value to be equals to name');
    expect(await parcelUpdatePage.getRegisterTypeInput()).to.eq('5', 'Expected registerType value to be equals to 5');
    expect(await parcelUpdatePage.getValuationInput()).to.eq('valuation', 'Expected Valuation value to be equals to valuation');
    expect(await parcelUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await parcelUpdatePage.getLegalDescriptionInput()).to.eq(
      'legalDescription',
      'Expected LegalDescription value to be equals to legalDescription'
    );
    expect(await parcelUpdatePage.getMeansOfAcqInput()).to.eq('5', 'Expected meansOfAcq value to be equals to 5');
    await parcelUpdatePage.save();
    expect(await parcelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await parcelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Parcel', async () => {
    const nbButtonsBeforeDelete = await parcelComponentsPage.countDeleteButtons();
    await parcelComponentsPage.clickOnLastDeleteButton();

    parcelDeleteDialog = new ParcelDeleteDialog();
    expect(await parcelDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.parcel.delete.question');
    await parcelDeleteDialog.clickOnConfirmButton();

    expect(await parcelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
