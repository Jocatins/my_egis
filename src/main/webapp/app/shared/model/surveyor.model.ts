import { Moment } from 'moment';
import { IYearSubscription } from 'app/shared/model/year-subscription.model';

export interface ISurveyor {
  id?: number;
  email?: string;
  surconNumber?: string;
  registrationNumber?: string;
  phone?: string;
  status?: string;
  requestDate?: Moment;
  processedDate?: Moment;
  yearSubscriptions?: IYearSubscription[];
}

export class Surveyor implements ISurveyor {
  constructor(
    public id?: number,
    public email?: string,
    public surconNumber?: string,
    public registrationNumber?: string,
    public phone?: string,
    public status?: string,
    public requestDate?: Moment,
    public processedDate?: Moment,
    public yearSubscriptions?: IYearSubscription[]
  ) {}
}
