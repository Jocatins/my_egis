import { IEGISDIctionary } from './egisdictionary.model';

export interface IDIctionaryWrap {
  category?: IEGISDIctionary[];
  responseCode?: string;
}

export class DIctionaryWrap implements IDIctionaryWrap {
  constructor(
    public category: IEGISDIctionary[],
    public responseCode?: string
  ) {
    this.responseCode = responseCode ? responseCode : null;
    this.category = category ? category : null;

  }
}
