export interface ITransactionExt {
  id?: number;
  extensionKey?: string;
  extensionValue?: string;
}

export class TransactionExt implements ITransactionExt {
  constructor(public id?: number, public extensionKey?: string, public extensionValue?: string) {}
}
