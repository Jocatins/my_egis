export interface ITitleSelectOptions {
  id?: number;
  transactionId?: string;
  queryField?: string;
  queryValue?: string;
}

export class TitleSelectOptions implements ITitleSelectOptions {
  constructor(public id?: number, public transactionId?: string, public queryField?: string, public queryValue?: string) {}
}
