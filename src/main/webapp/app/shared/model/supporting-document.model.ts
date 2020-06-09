import { Moment } from 'moment';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface ISupportingDocument {
  id?: number;
  documentNumber?: string;
  ownershipArea?: string;
  pageCount?: number;
  status?: number;
  provided?: string;
  type?: number;
  name?: string;
  fileSize?: number;
  content?: string;
  contentUrl?: string;
  image?: string;
  date?: Moment;
  documentSubType?: IDictionary;
  documentType?: IDictionary;
  issuedBy?: IDictionary;
  transactions?: ITransaction[];
}

export class SupportingDocument implements ISupportingDocument {
  constructor(
    public id?: number,
    public documentNumber?: string,
    public ownershipArea?: string,
    public pageCount?: number,
    public status?: number,
    public provided?: string,
    public type?: number,
    public name?: string,
    public fileSize?: number,
    public content?: string,
    public contentUrl?: string,
    public image?: string,
    public date?: Moment,
    public documentSubType?: IDictionary,
    public documentType?: IDictionary,
    public issuedBy?: IDictionary,
    public transactions?: ITransaction[]
  ) {}
}
