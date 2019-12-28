import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { ITransaction } from 'app/shared/model/transaction.model';
import { IParty } from 'app/shared/model/party.model';

export interface IBatch {
  id?: number;
  batchNumber?: number;
  batchStatus?: number;
  invoiceNumber?: string;
  createDate?: Moment;
  deliveryDate?: Moment;
  officeId?: number;
  user?: IUser;
  transactions?: ITransaction[];
  parties?: IParty[];
  moreData?: string;
}

export class Batch implements IBatch {
  constructor(
    public id?: number,
    public batchNumber?: number,
    public batchStatus?: number,
    public invoiceNumber?: string,
    public createDate?: Moment,
    public deliveryDate?: Moment,
    public officeId?: number,
    public user?: IUser,
    public transactions?: ITransaction[],
    public parties?: IParty[],
    public moreData?: string
  ) {}
}
