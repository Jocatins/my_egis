import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface IParcel {
  id?: number;
  label?: string;
  area?: number;
  registrationOfficeDictionary?: string;
  surveyDate?: Moment;
  accommodation?: string;
  description?: string;
  propertyArea?: number;
  planNumber?: string;
  premiumValue?: string;
  coordinateN?: number;
  coordinateS?: number;
  lagosSheetNumber?: string;
  allocation?: string;
  location1?: number;
  unitNumber?: string;
  name?: string;
  valuation?: string;
  comments?: string;
  legalDescription?: string;
  address?: IAddress;
  spatialUnitType?: IDictionary;
  surveyType?: IDictionary;
  propertyType?: IDictionary;
  tenureType?: IDictionary;
  location?: IDictionary;
  builtUpAreaType?: IDictionary;
  measurementUnitType?: IDictionary;
  landUseCategory?: IDictionary;
  landUseType?: IDictionary;
  developmentStatus?: IDictionary;
  registerType?: IDictionary;
  meansOfAcq?: IDictionary;
  region?: IDictionary;
  transactions?: ITransaction[];
}

export class Parcel implements IParcel {
  constructor(
    public id?: number,
    public label?: string,
    public area?: number,
    public registrationOfficeDictionary?: string,
    public surveyDate?: Moment,
    public accommodation?: string,
    public description?: string,
    public propertyArea?: number,
    public planNumber?: string,
    public premiumValue?: string,
    public coordinateN?: number,
    public coordinateS?: number,
    public lagosSheetNumber?: string,
    public allocation?: string,
    public location1?: number,
    public unitNumber?: string,
    public name?: string,
    public valuation?: string,
    public comments?: string,
    public legalDescription?: string,
    public address?: IAddress,
    public spatialUnitType?: IDictionary,
    public surveyType?: IDictionary,
    public propertyType?: IDictionary,
    public tenureType?: IDictionary,
    public location?: IDictionary,
    public builtUpAreaType?: IDictionary,
    public measurementUnitType?: IDictionary,
    public landUseCategory?: IDictionary,
    public landUseType?: IDictionary,
    public developmentStatus?: IDictionary,
    public registerType?: IDictionary,
    public meansOfAcq?: IDictionary,
    public region?: IDictionary,
    public transactions?: ITransaction[]
  ) {}
}
