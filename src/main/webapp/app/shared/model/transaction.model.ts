import { Moment } from 'moment';
import { ITransactionExt } from 'app/shared/model/transaction-ext.model';
import { IDictionary } from 'app/shared/model/dictionary.model';
import { IMetadata } from 'app/shared/model/metadata.model';
import { IParty } from 'app/shared/model/party.model';
import { IParcel } from 'app/shared/model/parcel.model';
import { ISupportingDocument } from 'app/shared/model/supporting-document.model';
import { IBatch } from 'app/shared/model/batch.model';

export interface ITransaction {
  id?: number;
  transactionNumber?: string;
  applicationDate?: Moment;
  transactionStartDate?: Moment;
  comments?: string;
  createDate?: Moment;
  startDate?: Moment;
  completeDate?: Moment;
  batchId?: number;
  ext?: ITransactionExt;
  transactionType?: IDictionary;
  transactionSubType?: IDictionary;
  ownershipType?: IDictionary;
  tenureType?: IDictionary;
  transactionCode?: IMetadata;
  parties?: IParty[];
  parcels?: IParcel[];
  docs?: ISupportingDocument[];
  batches?: IBatch[];
}

export class Transaction implements ITransaction {
  constructor(
    public id?: number,
    public transactionNumber?: string,
    public applicationDate?: Moment,
    public transactionStartDate?: Moment,
    public comments?: string,
    public createDate?: Moment,
    public startDate?: Moment,
    public completeDate?: Moment,
    public batchId?: number,
    public ext?: ITransactionExt,
    public transactionType?: IDictionary,
    public transactionSubType?: IDictionary,
    public ownershipType?: IDictionary,
    public tenureType?: IDictionary,
    public transactionCode?: IMetadata,
    public parties?: IParty[],
    public parcels?: IParcel[],
    public docs?: ISupportingDocument[],
    public batches?: IBatch[]
  ) {}
}
