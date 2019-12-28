export interface IAddress {
  id?: number;
  addressAreaName?: string;
  streetName?: string;
  buildingName?: string;
  buildingNumber?: string;
  postalCode?: string;
  city?: string;
  country?: number;
  region?: number;
  district?: number;
  village?: string;
  state?: string;
  estateName?: string;
  localGovernmentArea?: number;
  localCouncilArea?: number;
  streetNumber?: string;
  streetType?: number;
  town?: string;
  ward?: string;
  category?: string;
  stateOfOrigin?: number;
  schemeName?: number;
  blockNumber?: string;
  plotNumber?: string;
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
    public country?: number,
    public region?: number,
    public district?: number,
    public village?: string,
    public state?: string,
    public estateName?: string,
    public localGovernmentArea?: number,
    public localCouncilArea?: number,
    public streetNumber?: string,
    public streetType?: number,
    public town?: string,
    public ward?: string,
    public category?: string,
    public stateOfOrigin?: number,
    public schemeName?: number,
    public blockNumber?: string,
    public plotNumber?: string
  ) {}
}
