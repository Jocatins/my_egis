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
    public plotNumber?: string
  ) {}
}
