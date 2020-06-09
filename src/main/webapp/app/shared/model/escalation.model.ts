import { Moment } from 'moment';

export interface IEscalation {
  id?: number;
  escalateDate?: Moment;
}

export class Escalation implements IEscalation {
  constructor(public id?: number, public escalateDate?: Moment) {}
}
