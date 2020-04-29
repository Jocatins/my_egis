import { Moment } from 'moment';
import { ITransaction } from 'app/shared/model/transaction.model';

export interface ISupportingDocument {
  id?: number;
  documentNumber?: string;
  documentType?: number;
  ownershipArea?: string;
  documentSubType?: number;
  issuedBy?: number;
  pageCount?: number;
  status?: string;
  provided?: string;
  type?: number;
  name?: string;
  fileSize?: number;
  content?: string;
  contentUrl?: string;
  image?: string;
  date?: Moment;
  transactions?: ITransaction[];
  description?: string;
}

export class SupportingDocument implements ISupportingDocument {
  constructor(
    public id?: number,
    public documentNumber?: string,
    public documentType?: number,
    public ownershipArea?: string,
    public documentSubType?: number,
    public issuedBy?: number,
    public pageCount?: number,
    public status?: string,
    public provided?: string,
    public type?: number,
    public name?: string,
    public fileSize?: number,
    public content?: string,
    public contentUrl?: string,
    public image?: string,
    public date?: Moment,
    public transactions?: ITransaction[],
    public description?: string
  ) {}
}
