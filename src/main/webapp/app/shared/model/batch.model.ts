import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { ITransaction } from 'app/shared/model/transaction.model';
import { IParty } from 'app/shared/model/party.model';

export interface IBatch {
  id?: number;
  batchNumber?: number;
  invoiceNumber?: string;
  createDate?: Moment;
  deliveryDate?: Moment;
  officeId?: number;
  user?: IUser;
  batchStatus?: IDictionary;
  transactions?: ITransaction[];
  parties?: IParty[];
  moreData?: string;
}

export class Batch implements IBatch {
  constructor(
    public id?: number,
    public batchNumber?: number,
    public invoiceNumber?: string,
    public createDate?: Moment,
    public deliveryDate?: Moment,
    public officeId?: number,
    public user?: IUser,
    public batchStatus?: IDictionary,
    public transactions?: ITransaction[],
    public parties?: IParty[],
    public moreData?: string
  ) {}
}
