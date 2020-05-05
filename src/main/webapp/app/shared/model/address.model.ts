import { IDictionary } from 'app/shared/model/dictionary.model';

export interface IAddress {
  id?: number;
  addressAreaName?: string;
  streetName?: string;
  buildingName?: string;
  buildingNumber?: string;
  postalCode?: string;
  city?: string;
  village?: string;
  streetNumber?: string;
  town?: string;
  ward?: string;
  blockNumber?: string;
  plotNumber?: string;
  country?: IDictionary;
  region?: IDictionary;
  district?: IDictionary;
  state?: IDictionary;
  estateName?: IDictionary;
  localGovernmentArea?: IDictionary;
  localCouncilArea?: IDictionary;
  streetType?: IDictionary;
  stateOfOrigin?: IDictionary;
  schemeName?: IDictionary;
  category?: IDictionary;
}

export class Address implements IAddress {
  constructor(
    public id?: number,
    public addressAreaName?: string,
    public streetName?: string,
    public buildingName?: string,
    public buildingNumber?: string,
    public postalCode?: string,
    public city?: string,
    public village?: string,
    public streetNumber?: string,
    public town?: string,
    public ward?: string,
    public blockNumber?: string,
    public plotNumber?: string,
    public country?: IDictionary,
    public region?: IDictionary,
    public district?: IDictionary,
    public state?: IDictionary,
    public estateName?: IDictionary,
    public localGovernmentArea?: IDictionary,
    public localCouncilArea?: IDictionary,
    public streetType?: IDictionary,
    public stateOfOrigin?: IDictionary,
    public schemeName?: IDictionary,
    public category?: IDictionary
  ) {}
}
