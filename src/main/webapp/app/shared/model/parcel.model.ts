import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface IParcel {
  id?: number;
  label?: string;
  area?: number;
  spatialUnitType?: number;
  registrationOfficeDictionary?: string;
  surveyType?: string;
  surveyDate?: Moment;
  propertyType?: number;
  accommodation?: string;
  tenureType?: number;
  description?: string;
  propertyArea?: number;
  location?: number;
  builtUpAreaType?: number;
  planNumber?: string;
  measurementUnitType?: number;
  premiumValue?: string;
  landUseCategory?: number;
  landUseType?: number;
  developmentStatus?: number;
  coordinateN?: number;
  coordinateS?: number;
  lagosSheetNumber?: string;
  allocation?: string;
  location1?: number;
  unitNumber?: string;
  name?: string;
  registerType?: number;
  valuation?: string;
  comments?: string;
  legalDescription?: string;
  meansOfAcq?: number;
  address?: IAddress;
  transactions?: ITransaction[];
}

export class Parcel implements IParcel {
  constructor(
    public id?: number,
    public label?: string,
    public area?: number,
    public spatialUnitType?: number,
    public registrationOfficeDictionary?: string,
    public surveyType?: string,
    public surveyDate?: Moment,
    public propertyType?: number,
    public accommodation?: string,
    public tenureType?: number,
    public description?: string,
    public propertyArea?: number,
    public location?: number,
    public builtUpAreaType?: number,
    public planNumber?: string,
    public measurementUnitType?: number,
    public premiumValue?: string,
    public landUseCategory?: number,
    public landUseType?: number,
    public developmentStatus?: number,
    public coordinateN?: number,
    public coordinateS?: number,
    public lagosSheetNumber?: string,
    public allocation?: string,
    public location1?: number,
    public unitNumber?: string,
    public name?: string,
    public registerType?: number,
    public valuation?: string,
    public comments?: string,
    public legalDescription?: string,
    public meansOfAcq?: number,
    public address?: IAddress,
    public transactions?: ITransaction[]
  ) {}
}
