export interface IDictionary {
  id?: number;
  code?: string;
  label?: string;
  descr?: string;
  category?: string;
}

export class Dictionary implements IDictionary {
  constructor(public id?: number, public code?: string, public label?: string, public descr?: string, public category?: string) {}
}
