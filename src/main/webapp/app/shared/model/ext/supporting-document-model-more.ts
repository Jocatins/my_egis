import { SupportingDocument, ISupportingDocument } from '../supporting-document.model';

export interface ISupportingDocumentMore extends ISupportingDocument {
  documentTypeStr?: string;
}

export class SupportingDocumentMore extends SupportingDocument implements ISupportingDocumentMore {
  constructor(public documentTypeStr?: string) {
    super();
  }
}
