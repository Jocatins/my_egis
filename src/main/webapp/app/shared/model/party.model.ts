import { Moment } from 'moment';
import { IAddress } from 'app/shared/model/address.model';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { IBatch } from 'app/shared/model/batch.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface IParty {
  id?: number;
  partyName?: string;
  shareNominator?: string;
  shareDenominator?: string;
  taxExempt?: string;
  otherName?: string;
  fax?: string;
  email?: string;
  phoneNumber?: string;
  payerId?: string;
  taxPayerNumber?: string;
  comments?: string;
  personIdDate?: Moment;
  personIdExpirationDate?: Moment;
  rcNumber?: string;
  organization?: string;
  businessNature?: string;
  birthPlace?: string;
  birthDate?: Moment;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  driverLicence?: string;
  professionRegNo?: string;
  occupation?: string;
  address?: IAddress;
  partyType?: IDictionary;
  partyRoleType?: IDictionary;
  partySubRoleType?: IDictionary;
  deliveryType?: IDictionary;
  primaryParty?: IDictionary;
  personIdType?: IDictionary;
  personType?: IDictionary;
  emailType?: IDictionary;
  personIdIssuedBy?: IDictionary;
  personTitle?: IDictionary;
  gender?: IDictionary;
  civilState?: IDictionary;
  driverLicenseRegion?: IDictionary;
  representativeId?: IDictionary;
  batches?: IBatch[];
  transactions?: ITransaction[];
}

export class Party implements IParty {
  constructor(
    public id?: number,
    public partyName?: string,
    public shareNominator?: string,
    public shareDenominator?: string,
    public taxExempt?: string,
    public otherName?: string,
    public fax?: string,
    public email?: string,
    public phoneNumber?: string,
    public payerId?: string,
    public taxPayerNumber?: string,
    public comments?: string,
    public personIdDate?: Moment,
    public personIdExpirationDate?: Moment,
    public rcNumber?: string,
    public organization?: string,
    public businessNature?: string,
    public birthPlace?: string,
    public birthDate?: Moment,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public driverLicence?: string,
    public professionRegNo?: string,
    public occupation?: string,
    public address?: IAddress,
    public partyType?: IDictionary,
    public partyRoleType?: IDictionary,
    public partySubRoleType?: IDictionary,
    public deliveryType?: IDictionary,
    public primaryParty?: IDictionary,
    public personIdType?: IDictionary,
    public personType?: IDictionary,
    public emailType?: IDictionary,
    public personIdIssuedBy?: IDictionary,
    public personTitle?: IDictionary,
    public gender?: IDictionary,
    public civilState?: IDictionary,
    public driverLicenseRegion?: IDictionary,
    public representativeId?: IDictionary,
    public batches?: IBatch[],
    public transactions?: ITransaction[]
  ) {}
}
