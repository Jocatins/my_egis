import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IBatch } from 'app/shared/model/batch.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface IParty {
  id?: number;
  partyType?: number;
  partyRoleType?: number;
  partySubRoleType?: number;
  deliveryType?: number;
  partyName?: string;
  shareNominator?: string;
  shareDenominator?: string;
  taxExempt?: string;
  primaryParty?: string;
  otherName?: string;
  personIdType?: number;
  personType?: number;
  fax?: string;
  email?: string;
  emailType?: number;
  phoneNumber?: string;
  payerId?: string;
  taxPayerNumber?: string;
  comments?: string;
  personIdIssuedBy?: number;
  personIdDate?: Moment;
  personIdExpirationDate?: Moment;
  rcNumber?: string;
  organization?: string;
  businessNature?: string;
  birthPlace?: string;
  birthDate?: Moment;
  personTitle?: number;
  gender?: number;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  civilState?: number;
  driverLicenseRegion?: number;
  driverLicence?: string;
  representativeId?: number;
  professionRegNo?: string;
  occupation?: string;
  address?: IAddress;
  batches?: IBatch[];
  transactions?: ITransaction[];
}

export class Party implements IParty {
  constructor(
    public id?: number,
    public partyType?: number,
    public partyRoleType?: number,
    public partySubRoleType?: number,
    public deliveryType?: number,
    public partyName?: string,
    public shareNominator?: string,
    public shareDenominator?: string,
    public taxExempt?: string,
    public primaryParty?: string,
    public otherName?: string,
    public personIdType?: number,
    public personType?: number,
    public fax?: string,
    public email?: string,
    public emailType?: number,
    public phoneNumber?: string,
    public payerId?: string,
    public taxPayerNumber?: string,
    public comments?: string,
    public personIdIssuedBy?: number,
    public personIdDate?: Moment,
    public personIdExpirationDate?: Moment,
    public rcNumber?: string,
    public organization?: string,
    public businessNature?: string,
    public birthPlace?: string,
    public birthDate?: Moment,
    public personTitle?: number,
    public gender?: number,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public civilState?: number,
    public driverLicenseRegion?: number,
    public driverLicence?: string,
    public representativeId?: number,
    public professionRegNo?: string,
    public occupation?: string,
    public address?: IAddress,
    public batches?: IBatch[],
    public transactions?: ITransaction[]
  ) {}
}
