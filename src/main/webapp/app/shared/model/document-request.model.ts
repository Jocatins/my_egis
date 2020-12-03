export interface IDocumentRequest {
  id?: number;
  transactionId?: string;
  documentId?: string;
  documentType?: string;
  documentSubType?: string;
  documentNumber?: string;
  surveyPlanNumber?: string;
  propertyDescription?: string;
  titleNumber?: string;
}

export class DocumentRequest implements IDocumentRequest {
  constructor(
    public id?: number,
    public transactionId?: string,
    public documentId?: string,
    public documentType?: string,
    public documentSubType?: string,
    public documentNumber?: string,
    public surveyPlanNumber?: string,
    public propertyDescription?: string,
    public titleNumber?: string
  ) {}
}
