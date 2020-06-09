import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ParcelComponentsPage,
  /* ParcelDeleteDialog,
   */ ParcelUpdatePage
} from './parcel.page-object';

const expect = chai.expect;

describe('Parcel e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let parcelComponentsPage: ParcelComponentsPage;
  let parcelUpdatePage: ParcelUpdatePage;
  /* let parcelDeleteDialog: ParcelDeleteDialog; */

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

  /*  it('should create and save Parcels', async () => {
        const nbButtonsBeforeCreate = await parcelComponentsPage.countDeleteButtons();

        await parcelComponentsPage.clickOnCreateButton();
        await promise.all([
            parcelUpdatePage.setPropertyNumberInput('propertyNumber'),
            parcelUpdatePage.setParcelLineageInput('parcelLineage'),
            parcelUpdatePage.setSurveyPlanNumberInput('surveyPlanNumber'),
            parcelUpdatePage.setPropertyDescriptionInput('propertyDescription'),
            parcelUpdatePage.setAreaInput('5'),
            parcelUpdatePage.setDescriptionInput('description'),
            parcelUpdatePage.setPlanNumberInput('planNumber'),
            parcelUpdatePage.setPremiumValueInput('5'),
            parcelUpdatePage.setCoordinateNInput('5'),
            parcelUpdatePage.setCoordinateEInput('5'),
            parcelUpdatePage.setLagosSheetNumberInput('lagosSheetNumber'),
            parcelUpdatePage.setUnitNumberInput('unitNumber'),
            parcelUpdatePage.setValuationAmountInput('5'),
            parcelUpdatePage.setCommentsInput('comments'),
            parcelUpdatePage.setStreetNumberInput('streetNumber'),
            parcelUpdatePage.setStreetNameInput('streetName'),
            parcelUpdatePage.setBlockNumberInput('blockNumber'),
            parcelUpdatePage.setPlotNumberInput('plotNumber'),
            parcelUpdatePage.setWardInput('ward'),
            parcelUpdatePage.setTownInput('town'),
            parcelUpdatePage.setPropertyAreaInput('5'),
            parcelUpdatePage.setVillageInput('village'),
            parcelUpdatePage.setUpinInput('upin'),
            parcelUpdatePage.setCommentInput('comment'),
            parcelUpdatePage.locationSelectLastOption(),
            parcelUpdatePage.builtUpAreaTypeSelectLastOption(),
            parcelUpdatePage.measurementUnitTypeSelectLastOption(),
            parcelUpdatePage.landUseCategorySelectLastOption(),
            parcelUpdatePage.landUseTypeSelectLastOption(),
            parcelUpdatePage.developmentStatusSelectLastOption(),
            parcelUpdatePage.governmentStatusSelectLastOption(),
            parcelUpdatePage.propertyTypeSelectLastOption(),
            parcelUpdatePage.streetTypeSelectLastOption(),
            parcelUpdatePage.estateNameSelectLastOption(),
            parcelUpdatePage.schemeNameSelectLastOption(),
            parcelUpdatePage.stateSelectLastOption(),
            parcelUpdatePage.localGovernmentAreaSelectLastOption(),
            parcelUpdatePage.locationofLandSelectLastOption(),
            parcelUpdatePage.typeOfAccommodationSelectLastOption(),
            parcelUpdatePage.tenureTypeSelectLastOption(),
            parcelUpdatePage.districtSelectLastOption(),
            parcelUpdatePage.allocationNameSelectLastOption(),
        ]);
        expect(await parcelUpdatePage.getPropertyNumberInput()).to.eq('propertyNumber', 'Expected PropertyNumber value to be equals to propertyNumber');
        expect(await parcelUpdatePage.getParcelLineageInput()).to.eq('parcelLineage', 'Expected ParcelLineage value to be equals to parcelLineage');
        expect(await parcelUpdatePage.getSurveyPlanNumberInput()).to.eq('surveyPlanNumber', 'Expected SurveyPlanNumber value to be equals to surveyPlanNumber');
        expect(await parcelUpdatePage.getPropertyDescriptionInput()).to.eq('propertyDescription', 'Expected PropertyDescription value to be equals to propertyDescription');
        expect(await parcelUpdatePage.getAreaInput()).to.eq('5', 'Expected area value to be equals to 5');
        expect(await parcelUpdatePage.getDescriptionInput()).to.eq('description', 'Expected Description value to be equals to description');
        expect(await parcelUpdatePage.getPlanNumberInput()).to.eq('planNumber', 'Expected PlanNumber value to be equals to planNumber');
        expect(await parcelUpdatePage.getPremiumValueInput()).to.eq('5', 'Expected premiumValue value to be equals to 5');
        expect(await parcelUpdatePage.getCoordinateNInput()).to.eq('5', 'Expected coordinateN value to be equals to 5');
        expect(await parcelUpdatePage.getCoordinateEInput()).to.eq('5', 'Expected coordinateE value to be equals to 5');
        expect(await parcelUpdatePage.getLagosSheetNumberInput()).to.eq('lagosSheetNumber', 'Expected LagosSheetNumber value to be equals to lagosSheetNumber');
        expect(await parcelUpdatePage.getUnitNumberInput()).to.eq('unitNumber', 'Expected UnitNumber value to be equals to unitNumber');
        expect(await parcelUpdatePage.getValuationAmountInput()).to.eq('5', 'Expected valuationAmount value to be equals to 5');
        expect(await parcelUpdatePage.getCommentsInput()).to.eq('comments', 'Expected Comments value to be equals to comments');
        expect(await parcelUpdatePage.getStreetNumberInput()).to.eq('streetNumber', 'Expected StreetNumber value to be equals to streetNumber');
        expect(await parcelUpdatePage.getStreetNameInput()).to.eq('streetName', 'Expected StreetName value to be equals to streetName');
        expect(await parcelUpdatePage.getBlockNumberInput()).to.eq('blockNumber', 'Expected BlockNumber value to be equals to blockNumber');
        expect(await parcelUpdatePage.getPlotNumberInput()).to.eq('plotNumber', 'Expected PlotNumber value to be equals to plotNumber');
        expect(await parcelUpdatePage.getWardInput()).to.eq('ward', 'Expected Ward value to be equals to ward');
        expect(await parcelUpdatePage.getTownInput()).to.eq('town', 'Expected Town value to be equals to town');
        expect(await parcelUpdatePage.getPropertyAreaInput()).to.eq('5', 'Expected propertyArea value to be equals to 5');
        expect(await parcelUpdatePage.getVillageInput()).to.eq('village', 'Expected Village value to be equals to village');
        expect(await parcelUpdatePage.getUpinInput()).to.eq('upin', 'Expected Upin value to be equals to upin');
        expect(await parcelUpdatePage.getCommentInput()).to.eq('comment', 'Expected Comment value to be equals to comment');
        await parcelUpdatePage.save();
        expect(await parcelUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await parcelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /*  it('should delete last Parcel', async () => {
        const nbButtonsBeforeDelete = await parcelComponentsPage.countDeleteButtons();
        await parcelComponentsPage.clickOnLastDeleteButton();

        parcelDeleteDialog = new ParcelDeleteDialog();
        expect(await parcelDeleteDialog.getDialogTitle())
            .to.eq('egisexternalApp.parcel.delete.question');
        await parcelDeleteDialog.clickOnConfirmButton();

        expect(await parcelComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
