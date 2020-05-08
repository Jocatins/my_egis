import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { MetadataComponentsPage, MetadataDeleteDialog, MetadataUpdatePage } from './metadata.page-object';

const expect = chai.expect;

describe('Metadata e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let metadataComponentsPage: MetadataComponentsPage;
  let metadataUpdatePage: MetadataUpdatePage;
  let metadataDeleteDialog: MetadataDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Metadata', async () => {
    await navBarPage.goToEntity('metadata');
    metadataComponentsPage = new MetadataComponentsPage();
    await browser.wait(ec.visibilityOf(metadataComponentsPage.title), 5000);
    expect(await metadataComponentsPage.getTitle()).to.eq('egisexternalApp.metadata.home.title');
  });

  it('should load create Metadata page', async () => {
    await metadataComponentsPage.clickOnCreateButton();
    metadataUpdatePage = new MetadataUpdatePage();
    expect(await metadataUpdatePage.getPageTitle()).to.eq('egisexternalApp.metadata.home.createOrEditLabel');
    await metadataUpdatePage.cancel();
  });

  it('should create and save Metadata', async () => {
    const nbButtonsBeforeCreate = await metadataComponentsPage.countDeleteButtons();

    await metadataComponentsPage.clickOnCreateButton();
    await promise.all([
      metadataUpdatePage.setHjtypeInput('hjtype'),
      metadataUpdatePage.setCodeInput('code'),
      metadataUpdatePage.setLabelInput('label'),
      metadataUpdatePage.setDescrInput('descr'),
      metadataUpdatePage.setCategoryInput('category'),
      metadataUpdatePage.setGeneralTermInput('generalTerm'),
      metadataUpdatePage.setSortOrderInput('sortOrder'),
      metadataUpdatePage.setHiddenInput('hidden'),
      metadataUpdatePage.setGroupNameInput('groupName'),
      metadataUpdatePage.setWorkflowInput('workflow'),
      metadataUpdatePage.setGroupCodeInput('groupCode'),
      metadataUpdatePage.setNormalDurationInput('normalDuration'),
      metadataUpdatePage.setLapsedDurationInput('lapsedDuration'),
      metadataUpdatePage.setMaxDurationInput('maxDuration'),
      metadataUpdatePage.setRightTypeInput('rightType'),
      metadataUpdatePage.setRightTypeMultipleInput('rightTypeMultiple'),
      metadataUpdatePage.setRightTypeOtherInput('rightTypeOther'),
      metadataUpdatePage.setCreateNewRrsInput('createNewRrs'),
      metadataUpdatePage.setModifyActiveRrrsInput('modifyActiveRrrs'),
      metadataUpdatePage.setRelatedActiveRrrsInput('relatedActiveRrrs'),
      metadataUpdatePage.setDischargeActiveRrrsInput('dischargeActiveRrrs'),
      metadataUpdatePage.setBlockedActiveRrrsInput('blockedActiveRrrs'),
      metadataUpdatePage.setMetaTypeInput('metaType'),
      metadataUpdatePage.setSourcePartyTypeInput('sourcePartyType'),
      metadataUpdatePage.setTargetPartyTypeInput('targetPartyType'),
      metadataUpdatePage.setOtherPartyTypeInput('otherPartyType'),
      metadataUpdatePage.setRelatedTransactionCodeInput('relatedTransactionCode'),
      metadataUpdatePage.setCashierTransactionCodeInput('cashierTransactionCode'),
      metadataUpdatePage.setFeePaymentCodesInput('feePaymentCodes'),
      metadataUpdatePage.setMandatoryDocsCodesInput('mandatoryDocsCodes'),
      metadataUpdatePage.setMandatoryScanOutgoingDocsCodesInput('mandatoryScanOutgoingDocsCodes'),
      metadataUpdatePage.setCreateMutatePropertyInput('createMutateProperty'),
      metadataUpdatePage.setReferencedPropertiesInput('referencedProperties'),
      metadataUpdatePage.setPriorRequiredTransactionsInput('priorRequiredTransactions'),
      metadataUpdatePage.setCreateNewPartyInput('createNewParty'),
      metadataUpdatePage.setPartyBusinessRulesInput('partyBusinessRules'),
      metadataUpdatePage.setReportTemplatesInput('reportTemplates'),
      metadataUpdatePage.setDetachableInput('detachable'),
      metadataUpdatePage.setParentTransactionTypeInput('parentTransactionType'),
      metadataUpdatePage.setInternalCodeInput('internalCode'),
      metadataUpdatePage.setVersionInput('version'),
      metadataUpdatePage.setBeginLifespanVersionInput('beginLifespanVersion'),
      metadataUpdatePage.setEndLifespanVersionInput('endLifespanVersion'),
      metadataUpdatePage.setTranIndexInput('tranIndex')
    ]);
    expect(await metadataUpdatePage.getHjtypeInput()).to.eq('hjtype', 'Expected Hjtype value to be equals to hjtype');
    expect(await metadataUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');
    expect(await metadataUpdatePage.getLabelInput()).to.eq('label', 'Expected Label value to be equals to label');
    expect(await metadataUpdatePage.getDescrInput()).to.eq('descr', 'Expected Descr value to be equals to descr');
    expect(await metadataUpdatePage.getCategoryInput()).to.eq('category', 'Expected Category value to be equals to category');
    expect(await metadataUpdatePage.getGeneralTermInput()).to.eq('generalTerm', 'Expected GeneralTerm value to be equals to generalTerm');
    expect(await metadataUpdatePage.getSortOrderInput()).to.eq('sortOrder', 'Expected SortOrder value to be equals to sortOrder');
    expect(await metadataUpdatePage.getHiddenInput()).to.eq('hidden', 'Expected Hidden value to be equals to hidden');
    expect(await metadataUpdatePage.getGroupNameInput()).to.eq('groupName', 'Expected GroupName value to be equals to groupName');
    expect(await metadataUpdatePage.getWorkflowInput()).to.eq('workflow', 'Expected Workflow value to be equals to workflow');
    expect(await metadataUpdatePage.getGroupCodeInput()).to.eq('groupCode', 'Expected GroupCode value to be equals to groupCode');
    expect(await metadataUpdatePage.getNormalDurationInput()).to.eq(
      'normalDuration',
      'Expected NormalDuration value to be equals to normalDuration'
    );
    expect(await metadataUpdatePage.getLapsedDurationInput()).to.eq(
      'lapsedDuration',
      'Expected LapsedDuration value to be equals to lapsedDuration'
    );
    expect(await metadataUpdatePage.getMaxDurationInput()).to.eq('maxDuration', 'Expected MaxDuration value to be equals to maxDuration');
    expect(await metadataUpdatePage.getRightTypeInput()).to.eq('rightType', 'Expected RightType value to be equals to rightType');
    expect(await metadataUpdatePage.getRightTypeMultipleInput()).to.eq(
      'rightTypeMultiple',
      'Expected RightTypeMultiple value to be equals to rightTypeMultiple'
    );
    expect(await metadataUpdatePage.getRightTypeOtherInput()).to.eq(
      'rightTypeOther',
      'Expected RightTypeOther value to be equals to rightTypeOther'
    );
    expect(await metadataUpdatePage.getCreateNewRrsInput()).to.eq(
      'createNewRrs',
      'Expected CreateNewRrs value to be equals to createNewRrs'
    );
    expect(await metadataUpdatePage.getModifyActiveRrrsInput()).to.eq(
      'modifyActiveRrrs',
      'Expected ModifyActiveRrrs value to be equals to modifyActiveRrrs'
    );
    expect(await metadataUpdatePage.getRelatedActiveRrrsInput()).to.eq(
      'relatedActiveRrrs',
      'Expected RelatedActiveRrrs value to be equals to relatedActiveRrrs'
    );
    expect(await metadataUpdatePage.getDischargeActiveRrrsInput()).to.eq(
      'dischargeActiveRrrs',
      'Expected DischargeActiveRrrs value to be equals to dischargeActiveRrrs'
    );
    expect(await metadataUpdatePage.getBlockedActiveRrrsInput()).to.eq(
      'blockedActiveRrrs',
      'Expected BlockedActiveRrrs value to be equals to blockedActiveRrrs'
    );
    expect(await metadataUpdatePage.getMetaTypeInput()).to.eq('metaType', 'Expected MetaType value to be equals to metaType');
    expect(await metadataUpdatePage.getSourcePartyTypeInput()).to.eq(
      'sourcePartyType',
      'Expected SourcePartyType value to be equals to sourcePartyType'
    );
    expect(await metadataUpdatePage.getTargetPartyTypeInput()).to.eq(
      'targetPartyType',
      'Expected TargetPartyType value to be equals to targetPartyType'
    );
    expect(await metadataUpdatePage.getOtherPartyTypeInput()).to.eq(
      'otherPartyType',
      'Expected OtherPartyType value to be equals to otherPartyType'
    );
    expect(await metadataUpdatePage.getRelatedTransactionCodeInput()).to.eq(
      'relatedTransactionCode',
      'Expected RelatedTransactionCode value to be equals to relatedTransactionCode'
    );
    expect(await metadataUpdatePage.getCashierTransactionCodeInput()).to.eq(
      'cashierTransactionCode',
      'Expected CashierTransactionCode value to be equals to cashierTransactionCode'
    );
    expect(await metadataUpdatePage.getFeePaymentCodesInput()).to.eq(
      'feePaymentCodes',
      'Expected FeePaymentCodes value to be equals to feePaymentCodes'
    );
    expect(await metadataUpdatePage.getMandatoryDocsCodesInput()).to.eq(
      'mandatoryDocsCodes',
      'Expected MandatoryDocsCodes value to be equals to mandatoryDocsCodes'
    );
    expect(await metadataUpdatePage.getMandatoryScanOutgoingDocsCodesInput()).to.eq(
      'mandatoryScanOutgoingDocsCodes',
      'Expected MandatoryScanOutgoingDocsCodes value to be equals to mandatoryScanOutgoingDocsCodes'
    );
    expect(await metadataUpdatePage.getCreateMutatePropertyInput()).to.eq(
      'createMutateProperty',
      'Expected CreateMutateProperty value to be equals to createMutateProperty'
    );
    expect(await metadataUpdatePage.getReferencedPropertiesInput()).to.eq(
      'referencedProperties',
      'Expected ReferencedProperties value to be equals to referencedProperties'
    );
    expect(await metadataUpdatePage.getPriorRequiredTransactionsInput()).to.eq(
      'priorRequiredTransactions',
      'Expected PriorRequiredTransactions value to be equals to priorRequiredTransactions'
    );
    expect(await metadataUpdatePage.getCreateNewPartyInput()).to.eq(
      'createNewParty',
      'Expected CreateNewParty value to be equals to createNewParty'
    );
    expect(await metadataUpdatePage.getPartyBusinessRulesInput()).to.eq(
      'partyBusinessRules',
      'Expected PartyBusinessRules value to be equals to partyBusinessRules'
    );
    expect(await metadataUpdatePage.getReportTemplatesInput()).to.eq(
      'reportTemplates',
      'Expected ReportTemplates value to be equals to reportTemplates'
    );
    expect(await metadataUpdatePage.getDetachableInput()).to.eq('detachable', 'Expected Detachable value to be equals to detachable');
    expect(await metadataUpdatePage.getParentTransactionTypeInput()).to.eq(
      'parentTransactionType',
      'Expected ParentTransactionType value to be equals to parentTransactionType'
    );
    expect(await metadataUpdatePage.getInternalCodeInput()).to.eq(
      'internalCode',
      'Expected InternalCode value to be equals to internalCode'
    );
    expect(await metadataUpdatePage.getVersionInput()).to.eq('version', 'Expected Version value to be equals to version');
    expect(await metadataUpdatePage.getBeginLifespanVersionInput()).to.eq(
      'beginLifespanVersion',
      'Expected BeginLifespanVersion value to be equals to beginLifespanVersion'
    );
    expect(await metadataUpdatePage.getEndLifespanVersionInput()).to.eq(
      'endLifespanVersion',
      'Expected EndLifespanVersion value to be equals to endLifespanVersion'
    );
    expect(await metadataUpdatePage.getTranIndexInput()).to.eq('tranIndex', 'Expected TranIndex value to be equals to tranIndex');
    await metadataUpdatePage.save();
    expect(await metadataUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await metadataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Metadata', async () => {
    const nbButtonsBeforeDelete = await metadataComponentsPage.countDeleteButtons();
    await metadataComponentsPage.clickOnLastDeleteButton();

    metadataDeleteDialog = new MetadataDeleteDialog();
    expect(await metadataDeleteDialog.getDialogTitle()).to.eq('egisexternalApp.metadata.delete.question');
    await metadataDeleteDialog.clickOnConfirmButton();

    expect(await metadataComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
