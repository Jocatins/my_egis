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
      parcelUpdatePage.setRegistrationOfficeDictionaryInput('registrationOfficeDictionary'),
      parcelUpdatePage.setSurveyDateInput('2000-12-31'),
      parcelUpdatePage.setAccommodationInput('accommodation'),
      parcelUpdatePage.setDescriptionInput('description'),
      parcelUpdatePage.setPropertyAreaInput('5'),
      parcelUpdatePage.setPlanNumberInput('planNumber'),
      parcelUpdatePage.setPremiumValueInput('premiumValue'),
      parcelUpdatePage.setCoordinateNInput('5'),
      parcelUpdatePage.setCoordinateSInput('5'),
      parcelUpdatePage.setLagosSheetNumberInput('lagosSheetNumber'),
      parcelUpdatePage.setAllocationInput('allocation'),
      parcelUpdatePage.setLocation1Input('5'),
      parcelUpdatePage.setUnitNumberInput('unitNumber'),
      parcelUpdatePage.setNameInput('name'),
      parcelUpdatePage.setValuationInput('valuation'),
      parcelUpdatePage.setCommentsInput('comments'),
      parcelUpdatePage.setLegalDescriptionInput('legalDescription'),
      parcelUpdatePage.addressSelectLastOption(),
      parcelUpdatePage.spatialUnitTypeSelectLastOption(),
      parcelUpdatePage.surveyTypeSelectLastOption(),
      parcelUpdatePage.propertyTypeSelectLastOption(),
      parcelUpdatePage.tenureTypeSelectLastOption(),
      parcelUpdatePage.locationSelectLastOption(),
      parcelUpdatePage.builtUpAreaTypeSelectLastOption(),
      parcelUpdatePage.measurementUnitTypeSelectLastOption(),
      parcelUpdatePage.landUseCategorySelectLastOption(),
      parcelUpdatePage.landUseTypeSelectLastOption(),
      parcelUpdatePage.developmentStatusSelectLastOption(),
      parcelUpdatePage.registerTypeSelectLastOption(),
      parcelUpdatePage.meansOfAcqSelectLastOption(),
      parcelUpdatePage.regionSelectLastOption()
    ]);
    expect(await parcelUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');
    expect(await parcelUpdatePage.getAreaInput()).to.eq('5', 'Expected area value to be equals to 5');
    expect(await parcelUpdatePage.getRegistrationOfficeDictionaryInput()).to.eq(
      'registrationOfficeDictionary',
      'Expected RegistrationOfficeDictionary value to be equals to registrationOfficeDictionary'
    );
    expect(await parcelUpdatePage.getSurveyDateInput()).to.eq('2000-12-31', 'Expected surveyDate value to be equals to 2000-12-31');
    expect(await parcelUpdatePage.getAccommodationInput()).to.eq(
      'accommodation',
      'Expected Accommodation value to be equals to accommodation'
    );
    expect(await parcelUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
    expect(await parcelUpdatePage.getPropertyAreaInput()).to.eq('5', 'Expected propertyArea value to be equals to 5');
    expect(await parcelUpdatePage.getPlanNumberInput()).to.eq('planNumber', 'Expected PlanNumber value to be equals to planNumber');
    expect(await parcelUpdatePage.getPremiumValueInput()).to.eq('premiumValue', 'Expected PremiumValue value to be equals to premiumValue');
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
    expect(await parcelUpdatePage.getValuationInput()).to.eq('valuation', 'Expected Valuation value to be equals to valuation');
    expect(await parcelUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
    expect(await parcelUpdatePage.getLegalDescriptionInput()).to.eq(
      'legalDescription',
      'Expected LegalDescription value to be equals to legalDescription'
    );
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
