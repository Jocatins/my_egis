export interface IMetadata {
  id?: number;
  hjtype?: string;
  code?: string;
  label?: string;
  descr?: string;
  category?: string;
  generalTerm?: string;
  sortOrder?: string;
  hidden?: string;
  groupName?: string;
  workflow?: string;
  groupCode?: string;
  normalDuration?: string;
  lapsedDuration?: string;
  maxDuration?: string;
  rightType?: string;
  rightTypeMultiple?: string;
  rightTypeOther?: string;
  createNewRrs?: string;
  modifyActiveRrrs?: string;
  relatedActiveRrrs?: string;
  dischargeActiveRrrs?: string;
  blockedActiveRrrs?: string;
  metaType?: string;
  sourcePartyType?: string;
  targetPartyType?: string;
  otherPartyType?: string;
  relatedTransactionCode?: string;
  cashierTransactionCode?: string;
  feePaymentCodes?: string;
  mandatoryDocsCodes?: string;
  mandatoryScanOutgoingDocsCodes?: string;
  createMutateProperty?: string;
  referencedProperties?: string;
  priorRequiredTransactions?: string;
  createNewParty?: string;
  partyBusinessRules?: string;
  reportTemplates?: string;
  detachable?: string;
  parentTransactionType?: string;
  internalCode?: string;
  version?: string;
  beginLifespanVersion?: string;
  endLifespanVersion?: string;
  tranIndex?: string;
}

export class Metadata implements IMetadata {
  constructor(
    public id?: number,
    public hjtype?: string,
    public code?: string,
    public label?: string,
    public descr?: string,
    public category?: string,
    public generalTerm?: string,
    public sortOrder?: string,
    public hidden?: string,
    public groupName?: string,
    public workflow?: string,
    public groupCode?: string,
    public normalDuration?: string,
    public lapsedDuration?: string,
    public maxDuration?: string,
    public rightType?: string,
    public rightTypeMultiple?: string,
    public rightTypeOther?: string,
    public createNewRrs?: string,
    public modifyActiveRrrs?: string,
    public relatedActiveRrrs?: string,
    public dischargeActiveRrrs?: string,
    public blockedActiveRrrs?: string,
    public metaType?: string,
    public sourcePartyType?: string,
    public targetPartyType?: string,
    public otherPartyType?: string,
    public relatedTransactionCode?: string,
    public cashierTransactionCode?: string,
    public feePaymentCodes?: string,
    public mandatoryDocsCodes?: string,
    public mandatoryScanOutgoingDocsCodes?: string,
    public createMutateProperty?: string,
    public referencedProperties?: string,
    public priorRequiredTransactions?: string,
    public createNewParty?: string,
    public partyBusinessRules?: string,
    public reportTemplates?: string,
    public detachable?: string,
    public parentTransactionType?: string,
    public internalCode?: string,
    public version?: string,
    public beginLifespanVersion?: string,
    public endLifespanVersion?: string,
    public tranIndex?: string
  ) {}
}
