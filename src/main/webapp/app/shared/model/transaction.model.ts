import { Moment } from 'moment';
import { ITransactionExt } from 'app/shared/model/transaction-ext.model';
import { IParty } from 'app/shared/model/party.model';
import { IParcel } from 'app/shared/model/parcel.model';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { IBatch } from 'app/shared/model/batch.model';

export interface ITransaction {
  id?: number;
  transactionNumber?: string;
  transactionType?: number;
  transactionSubType?: number;
  applicationDate?: Moment;
  transactionStartDate?: Moment;
  comments?: string;
  ownershipType?: number;
  createDate?: Moment;
  startDate?: Moment;
  completeDate?: Moment;
  tenureType?: number;
  batchId?: number;
  transactionCode?: string;
  ext?: ITransactionExt;
  parties?: IParty[];
  parcels?: IParcel[];
  docs?: ISupportingDocument[];
  batches?: IBatch[];
}

export class Transaction implements ITransaction {
  constructor(
    public id?: number,
    public transactionNumber?: string,
    public transactionType?: number,
    public transactionSubType?: number,
    public applicationDate?: Moment,
    public transactionStartDate?: Moment,
    public comments?: string,
    public ownershipType?: number,
    public createDate?: Moment,
    public startDate?: Moment,
    public completeDate?: Moment,
    public tenureType?: number,
    public batchId?: number,
    public transactionCode?: string,
    public ext?: ITransactionExt,
    public parties?: IParty[],
    public parcels?: IParcel[],
    public docs?: ISupportingDocument[],
    public batches?: IBatch[]
  ) {}
}
