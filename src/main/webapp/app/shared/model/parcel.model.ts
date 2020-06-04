import { IDictionary } from 'app/shared/model/dictionary.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface IParcel {
  id?: number;
  propertyNumber?: string;
  parcelLineage?: string;
  surveyPlanNumber?: string;
  propertyDescription?: string;
  area?: number;
  description?: string;
  propertyArea?: number;
  planNumber?: string;
  premiumValue?: number;
  coordinateN?: number;
  coordinateE?: number;
  lagosSheetNumber?: string;
  unitNumber?: string;
  valuationAmount?: number;
  comments?: string;
  streetNumber?: string;
  streetName?: string;
  blockNumber?: string;
  plotNumber?: string;
  ward?: string;
  town?: string;
  village?: string;
  upin?: string;
  comment?: string;
  location?: IDictionary;
  builtUpAreaType?: IDictionary;
  measurementUnitType?: IDictionary;
  landUseCategory?: IDictionary;
  landUseType?: IDictionary;
  developmentStatus?: IDictionary;
  governmentStatus?: IDictionary;
  propertyType?: IDictionary;
  streetType?: IDictionary;
  estateName?: IDictionary;
  schemeName?: IDictionary;
  state?: IDictionary;
  localGovernmentArea?: IDictionary;
  locationofLand?: IDictionary;
  typeOfAccommodation?: IDictionary;
  tenureType?: IDictionary;
  district?: IDictionary;
  allocationName?: IDictionary;
  transactions?: ITransaction[];
}

export class Parcel implements IParcel {
  constructor(
    public id?: number,
    public propertyNumber?: string,
    public parcelLineage?: string,
    public surveyPlanNumber?: string,
    public propertyDescription?: string,
    public area?: number,
    public description?: string,
    public propertyArea?: number,
    public planNumber?: string,
    public premiumValue?: number,
    public coordinateN?: number,
    public coordinateE?: number,
    public lagosSheetNumber?: string,
    public unitNumber?: string,
    public valuationAmount?: number,
    public comments?: string,
    public streetNumber?: string,
    public streetName?: string,
    public blockNumber?: string,
    public plotNumber?: string,
    public ward?: string,
    public town?: string,
    public village?: string,
    public upin?: string,
    public comment?: string,
    public location?: IDictionary,
    public builtUpAreaType?: IDictionary,
    public measurementUnitType?: IDictionary,
    public landUseCategory?: IDictionary,
    public landUseType?: IDictionary,
    public developmentStatus?: IDictionary,
    public governmentStatus?: IDictionary,
    public propertyType?: IDictionary,
    public streetType?: IDictionary,
    public estateName?: IDictionary,
    public schemeName?: IDictionary,
    public state?: IDictionary,
    public localGovernmentArea?: IDictionary,
    public locationofLand?: IDictionary,
    public typeOfAccommodation?: IDictionary,
    public tenureType?: IDictionary,
    public district?: IDictionary,
    public allocationName?: IDictionary,
    public transactions?: ITransaction[]
  ) {}
}
