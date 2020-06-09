export interface IEscalateContact {
  id?: number;
  contact?: string;
}

export class EscalateContact implements IEscalateContact {
  constructor(public id?: number, public contact?: string) {}
}
