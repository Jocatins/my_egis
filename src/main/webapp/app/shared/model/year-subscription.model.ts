import { Moment } from 'moment';
import { ISurveyor } from 'app/shared/model/surveyor.model';
import { ISubscriptionDocs } from 'app/shared/model/subscription-docs.model';

export interface IYearSubscription {
  id?: number;
  year?: number;
  status?: string;
  requestDate?: Moment;
  processedDate?: Moment;
  surveyors?: ISurveyor[];
  subscriptionDocs?: ISubscriptionDocs[];
}

export class YearSubscription implements IYearSubscription {
  constructor(
    public id?: number,
    public year?: number,
    public status?: string,
    public requestDate?: Moment,
    public processedDate?: Moment,
    public surveyors?: ISurveyor[],
    public subscriptionDocs?: ISubscriptionDocs[]
  ) {}
}
