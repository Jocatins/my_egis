export interface IMandatoryDocument {
  id?: string;
  code_?: string;
  document_code?: string;
}

export class MandatoryDocument implements IMandatoryDocument {
  constructor(public id?: string, public code_?: string, public document_code?: string) {}
}
