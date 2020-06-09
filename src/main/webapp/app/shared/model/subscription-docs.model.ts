import { IYearSubscription } from 'app/shared/model/year-subscription.model';

export interface ISubscriptionDocs {
  id?: number;
  content?: any;
  type?: string;
  filename?: string;
  yearSubscriptions?: IYearSubscription[];
}

export class SubscriptionDocs implements ISubscriptionDocs {
  constructor(
    public id?: number,
    public content?: any,
    public type?: string,
    public filename?: string,
    public yearSubscriptions?: IYearSubscription[]
  ) {}
}
