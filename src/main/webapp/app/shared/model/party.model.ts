import { Moment } from 'moment';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { IBatch } from 'app/shared/model/batch.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface IParty {
  id?: number;
  primaryParty?: string;
  emailAddress?: string;
  phoneNumber?: string;
  payerId?: string;
  taxPayerNumber?: string;
  payeNumber?: string;
  comments?: string;
  personIdDate?: Moment;
  personIdExpirationDate?: Moment;
  rcNumber?: string;
  organization?: string;
  birthPlace?: string;
  birthDate?: Moment;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  occupation?: string;
  unitNumber?: string;
  blockNumber?: string;
  plotNumber?: string;
  streetNumber?: string;
  streetName?: string;
  buildingName?: string;
  buildingNumber?: string;
  postalCode?: string;
  city?: string;
  village?: string;
  longAddress?: string;
  town?: string;
  ward?: string;
  nextOfKinPhone?: string;
  iDDocumentIssuedDate?: Moment;
  iDDocumentExpirationDate?: Moment;
  iDDocumentNumber?: string;
  partyType?: IDictionary;
  partyRoleType?: IDictionary;
  personType?: IDictionary;
  emailType?: IDictionary;
  personIdIssuedBy?: IDictionary;
  personTitle?: IDictionary;
  gender?: IDictionary;
  civilState?: IDictionary;
  driverLicenseRegion?: IDictionary;
  businessNature?: IDictionary;
  phoneCategory?: IDictionary;
  nextOfKinPhoneCategory?: IDictionary;
  emailCategory?: IDictionary;
  addressCategory?: IDictionary;
  iDDocumentType?: IDictionary;
  iDDocumentIssuedBy?: IDictionary;
  suffixTitle?: IDictionary;
  stateofOrigin?: IDictionary;
  maritalStatus?: IDictionary;
  streetType?: IDictionary;
  estateName?: IDictionary;
  schemeName?: IDictionary;
  district?: IDictionary;
  localGovernmentArea?: IDictionary;
  country?: IDictionary;
  batches?: IBatch[];
  transactions?: ITransaction[];
}

export class Party implements IParty {
  constructor(
    public id?: number,
    public primaryParty?: string,
    public emailAddress?: string,
    public phoneNumber?: string,
    public payerId?: string,
    public taxPayerNumber?: string,
    public payeNumber?: string,
    public comments?: string,
    public personIdDate?: Moment,
    public personIdExpirationDate?: Moment,
    public rcNumber?: string,
    public organization?: string,
    public birthPlace?: string,
    public birthDate?: Moment,
    public firstName?: string,
    public middleName?: string,
    public lastName?: string,
    public occupation?: string,
    public unitNumber?: string,
    public blockNumber?: string,
    public plotNumber?: string,
    public streetNumber?: string,
    public streetName?: string,
    public buildingName?: string,
    public buildingNumber?: string,
    public postalCode?: string,
    public city?: string,
    public village?: string,
    public longAddress?: string,
    public town?: string,
    public ward?: string,
    public nextOfKinPhone?: string,
    public iDDocumentIssuedDate?: Moment,
    public iDDocumentExpirationDate?: Moment,
    public iDDocumentNumber?: string,
    public partyType?: IDictionary,
    public partyRoleType?: IDictionary,
    public personType?: IDictionary,
    public emailType?: IDictionary,
    public personIdIssuedBy?: IDictionary,
    public personTitle?: IDictionary,
    public gender?: IDictionary,
    public civilState?: IDictionary,
    public driverLicenseRegion?: IDictionary,
    public businessNature?: IDictionary,
    public phoneCategory?: IDictionary,
    public nextOfKinPhoneCategory?: IDictionary,
    public emailCategory?: IDictionary,
    public addressCategory?: IDictionary,
    public iDDocumentType?: IDictionary,
    public iDDocumentIssuedBy?: IDictionary,
    public suffixTitle?: IDictionary,
    public stateofOrigin?: IDictionary,
    public maritalStatus?: IDictionary,
    public streetType?: IDictionary,
    public estateName?: IDictionary,
    public schemeName?: IDictionary,
    public district?: IDictionary,
    public localGovernmentArea?: IDictionary,
    public country?: IDictionary,
    public batches?: IBatch[],
    public transactions?: ITransaction[]
  ) {}
}
