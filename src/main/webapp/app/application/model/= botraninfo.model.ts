export interface IBOTranInfo {
  metadata?: string;
  responseCode?: string;
}

export class BOTranInfo implements IBOTranInfo {
  constructor(
    public metadata?: string,
    public responseCode?: string
  ) {
    this.metadata = metadata ? metadata : null;
    this.responseCode = responseCode ? metadata : null;
  }
}
